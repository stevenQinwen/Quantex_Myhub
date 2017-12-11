import pandas as pd
import numpy as np
import pymysql

# 链接数据库
import sys

mysql_cn = pymysql.connect(host='192.168.1.108', port=3306, user='root', passwd='root', db='money_fund_predict')

# 读取主表
df = pd.read_csv('model_person_feature.csv')

try:
    df.drop('Unnamed: 0', axis=1, inplace=True)
except KeyError:
    pass

print(df.head())
# 读取宏观数据
df_marco = pd.read_sql('select * from daily_marco_factor;', con=mysql_cn)
print(df_marco.head())

# 相关系数矩阵
corr = df_marco.corr()
corr.to_csv('correlation.csv')

df['date'] = pd.to_datetime(df['date'])

df_marco['date'] = pd.to_datetime(df_marco['date'])

# 交易次数
df['count'] = 1

# 剔除交易额度异常大的交易信息
df = df.iloc[np.where(df['amounts'] <= 1000000)[0], :]
df_times = pd.DataFrame(df.groupby(['date', 'c_bussiness_flag'])['count', 'amounts'].aggregate(sum)).unstack()
df = df.set_index('date')
df_marco = df_marco.set_index('date')


# 聚合出每天的申赎次数和金额
buy_times = df_times['count'][2]
redeem_times = df_times['count'][3]
buy_amounts = df_times['amounts'][2]
redeem_amounts = df_times['amounts'][3]


# 汇总模型用表
def merge_dataset(data_marco, features=None):
    if features is None:
        features = ['money_fund_7day_rate', 'p2p_develop_index']

    # 宏观数据处理
    # 计算滑动平均
    # 卷积移动平均
    # 窗口5
    N = 5
    n = np.ones(N)
    weights = n / N
    fd = {f: [] for f in features}
    for k, _ in fd.items():
        fd[k] = np.convolve(weights, data_marco[k])[N - 1:-N + 1]

    marco = pd.DataFrame({k: np.diff(fd[k]) for k in fd.keys()},
                         index=data_marco.index[:-N])

    marco.index = data_marco.index[:-N]
    print('宏观因子表:\n', marco.head())

    # 聚合时间序列信息
    X_day = pd.DataFrame(marco.index.dayofweek)
    X_day.index = marco.index
    X_day.columns = ['day']
    X_month = pd.DataFrame(marco.index.month)
    X_month.index = marco.index
    X_month.columns = ['month']

    X_week = pd.DataFrame(marco.index.week)
    X_week.index = marco.index
    X_week.columns = ['week']

    X_time_feature = pd.merge(X_day, X_month, left_index=True, right_index=True)
    X_time_feature = pd.merge(X_time_feature, X_week, left_index=True, right_index=True)

    X_time_feature = pd.merge(X_time_feature, marco, left_index=True, right_index=True)

    # 聚合申赎信息
    X_time_feature = pd.merge(X_time_feature, pd.DataFrame(buy_times), left_index=True, right_index=True)
    X_time_feature = pd.merge(X_time_feature, pd.DataFrame(buy_amounts), left_index=True, right_index=True)
    X_time_feature = pd.merge(X_time_feature, pd.DataFrame(redeem_times), left_index=True, right_index=True)
    X_time_feature = pd.merge(X_time_feature, pd.DataFrame(redeem_amounts), left_index=True, right_index=True)

    X_time_feature.columns = ['day', 'month', 'week', 'money_fund_7day_rate',
                              'p2p_develop_index', 'buy_times', 'buy_amounts',
                              'redeem_times', 'redeem_amounts']

    # 数值脱敏处理
    X_time_feature['buy_amounts'] *= 2.5
    X_time_feature['redeem_amounts'] *= 2.5

    print('模型数据表:\n', X_time_feature.head())
    X_time_feature = X_time_feature.sort_index()
    return X_time_feature


if __name__ == '__main__':
    # 命令行交互传递特征名字序列
    if len(sys.argv) > 1:
        features = sys.argv[1:]
    else:
        features = None

    dataset = merge_dataset(df_marco, features=features)

    dataset.to_csv('model_dataset.csv')
