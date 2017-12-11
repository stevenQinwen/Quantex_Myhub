import os
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
import re
from datetime import datetime
import pymysql
matplotlib.rcParams['font.family'] = 'Microsoft Yahei'

# 链接数据库
mysql_cn = pymysql.connect(host='192.168.1.108', port=3306, user='root', passwd='root', db='money_fund_predict')


# 如果还没有清洗过原始的用户静态数据
# 则会生成清洗过后的csv文件
def raw_clean():
    if not os.path.exists('cleaned_cust_info.csv'):
        df = pd.read_sql('select * from t_cust_info;', con=mysql_cn)
        if 'index' in df.columns:
            df.drop(['index'], axis=1, inplace=True)

        converted_obj = pd.DataFrame()
        df_obj = df.select_dtypes(include=['object'])
        for obj in df_obj.columns:
            converted_obj.loc[:, obj] = df[obj].astype('category')
        df[converted_obj.columns] = converted_obj

        print(df.info())

        # 性别处理
        print('processing sex format ...')
        print(df['C_SEX'][:10])
        df['C_SEX'] = df['C_SEX'].astype('str')
        df['C_SEX'] = df['C_SEX'].apply(lambda s: re.sub(r'.0$', '', s))
        df['C_SEX'] = df['C_SEX'].apply(lambda s: np.nan if s == 'nan' else s)
        df['C_SEX'] = df['C_SEX'].fillna(9)
        df['C_SEX'] = df['C_SEX'].astype(int)

        df_temp = pd.DataFrame()
        df_temp = df['C_SEX'].apply(lambda s: 1 if s not in [0, 1, 9] else s)
        df['C_SEX'] = df_temp
        print(df['C_SEX'][:10])

        # 生日转换年龄
        print('processing age ...')
        # 加载的生日字段类型是浮点型,转换成字符串
        df['C_BIRTHDAY'] = df['C_BIRTHDAY'].astype(str)

        df['C_BIRTHDAY'] = df['C_BIRTHDAY'].apply(lambda s: s.replace('-', ''))
        df['C_BIRTHDAY'] = df['C_BIRTHDAY'].apply(lambda s: s.replace('.0', ''))
        print(df['C_BIRTHDAY'][:10])
        # 空值赋予19000101的生日
        df['C_BIRTHDAY'] = df['C_BIRTHDAY'].apply(lambda s: re.sub(r'nan$', '19000101', s))
        # 字符串长度不符合要求
        ind = np.where(df['C_BIRTHDAY'].apply(lambda s: len(s) < 6))

        print('------------------  长度调整  ----------------------')
        for i in ind:
            df['C_BIRTHDAY'][i] = df['C_BIRTHDAY'][i] + '0101'
        ind = np.where(df['C_BIRTHDAY'].apply(lambda s: len(s) == 6))

        for i in ind:
            df['C_BIRTHDAY'][i] = df['C_BIRTHDAY'][i] + '01'
        print(df['C_BIRTHDAY'][:10])
        # 拼接成year-month-day格式
        res = []
        for i in df['C_BIRTHDAY']:
            res.append(i[:4] + '-' + i[4:6] + '-' + i[6:])
        print(df['C_BIRTHDAY'][:10])

        print('------------------  转换年龄  ----------------------')
        res = []
        for i in range(df.shape[0]):
            res.append(int(df['C_BIRTHDAY'][i][:4]))
        df['age'] = res
        df['age'] = datetime.now().year - df['age']
        print(df['age'][:10])

        df.to_csv('cleaned_cust_info.csv')

    else:
        print('already cleaned')


# 生成主要数据表函数
# dates参数是year-month-day格式的字符串
def gen_person_info(dates):
    # 如果不存在用户交易与静态信息表
    if not os.path.exists('model_person_feature.csv'):

        # 读取用户交易明细表
        df = pd.read_sql('select * from t_cust_buy_redeem;', con=mysql_cn)

        if 'index' in df.columns:
            df.drop(['index'], axis=1, inplace=True)
        print(df.head())

        df_info = pd.read_csv('cleaned_cust_info.csv')

        try:
            df_info.drop('Unnamed: 0', axis=1, inplace=True)
        except KeyError:
            pass

        # 不需要的字段剔除
        df_info.drop(['C_BIRTHDAY', 'C_RISKLEVEL', 'C_CITYNO', 'C_INCOME', 'C_VOCATION', 'C_CUSTTYPE'], axis=1, inplace=True)

        # 拼接用户信息与交易明细表
        df_person_info = pd.merge(df, df_info, on='C_CUSTNO', how='left')

        # 处理交易日期
        res = []
        for i in df_person_info['D_CDATE'].astype(str):
            res.append(i[:4] + '-' + i[4:6] + '-' + i[6:])

        df_person_info['D_CDATE'] = pd.Series(res)

        print(df_person_info.head())
        del df
        del df_info
        df_person_info.columns = ['cust_no', 'c_bussiness_flag', 'date', 'amounts', 'sex', 'age']

    else:
        # 存在主文件就读取并更新时间间隔
        df_person_info = pd.read_csv('model_person_feature.csv')

        try:
            df_person_info.drop('Unnamed: 0', axis=1, inplace=True)
        except KeyError:
            pass

    # 标定的日期dates
    # 根据参数来标定时间间隔
    df_person_info['date'] = df_person_info['date'].apply(lambda s: datetime.strptime(s, '%Y-%m-%d'))
    target = datetime.strptime(dates, '%Y-%m-%d')

    # 日期间隔
    df_person_info['day_delta'] = (target - df_person_info['date']).apply(lambda s: s.days)

    df_person_info.to_csv('model_person_feature.csv')


if __name__ == '__main__':
    # 支持脚本交互
    if len(sys.argv) > 1:
        dates = sys.argv[1]
    else:
        dates = '2017-3-24'

    raw_clean()
    gen_person_info(dates)