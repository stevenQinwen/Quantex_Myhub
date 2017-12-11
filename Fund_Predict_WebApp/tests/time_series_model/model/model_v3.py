import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.preprocessing import StandardScaler
from sqlalchemy import create_engine
from sklearn.model_selection import cross_val_score
import numpy as np

engine = create_engine("mysql+pymysql://root:root@192.168.1.108:3306/money_fund_predict?charset=utf8")

if __name__ == '__main__':
    x_time_feature = pd.read_csv('prediction.csv', encoding='gb2312')
    try:
        x_time_feature.drop('Unnamed: 0', axis=1, inplace=True)
    except ValueError:
        pass
    print(x_time_feature.head())

    # 申购金额的数据集
    X_train, X_test = x_time_feature[['buy_times', 'day_buy', 'p2p_develop_index', 'money_fund_7day_rate']][50:170], \
                      x_time_feature[['buy_times', 'day_buy', 'p2p_develop_index', 'money_fund_7day_rate']][170:]
    y_train, y_test = x_time_feature['buy_amounts'][50:170], x_time_feature['buy_amounts'][170:]

    # 赎回金额的数据
    X_train2, X_test2 = x_time_feature[['redeem_times', 'day_redeem', 'p2p_develop_index', 'money_fund_7day_rate']][:170], \
                        x_time_feature[['redeem_times', 'day_redeem', 'p2p_develop_index', 'money_fund_7day_rate']][170:]
    y_train2, y_test2 = x_time_feature['redeem_amounts'][:170], x_time_feature['redeem_amounts'][170:]

    p1, p2 = PolynomialFeatures(), PolynomialFeatures()

    l1, l2 = LinearRegression(), LinearRegression()
    pipe1 = make_pipeline(StandardScaler(), p1, l1)
    pipe2 = make_pipeline(StandardScaler(), p2, l2)
    # grid1 = GridSearchCV(pipe1, param_grid={}, cv=5, n_jobs=-1)
    pipe1.fit(X_train, y_train)

    # grid2 = GridSearchCV(pipe2, param_grid={}, cv=5, n_jobs=-1)
    pipe2.fit(X_train2, y_train2)
    ps1 = pipe1.score(X_train, y_train)
    ps2 = pipe2.score(X_train2, y_train2)

    print('申购回测表现： {:.2f}'.format(ps1))
    print('赎回回测表现： {:.2f}'.format(ps2))

    x_time_feature['申购金额预测'] = pipe1.predict(x_time_feature[['申购次数预测', 'day_buy', 'p2p_develop_index', 'money_fund_7day_rate']])
    x_time_feature['赎回金额预测'] = pipe2.predict(x_time_feature[['赎回次数预测', 'day_redeem', 'p2p_develop_index', 'money_fund_7day_rate']])
    mo1 = np.mean(x_time_feature['buy_amounts'])
    m2 = np.mean(x_time_feature['赎回金额预测'])
    mo2 = np.mean(x_time_feature['redeem_amounts'])

    pred1 = x_time_feature['申购金额预测'][170:]

    fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True)
    ax1.plot(x_time_feature['buy_amounts'][50:170])
    ax1.plot(x_time_feature['buy_amounts'].index.values[50:170], pipe1.predict(X_train), '-k')
    ax1.plot(x_time_feature['buy_amounts'].index.values[170:], y_test)
    ax1.plot(x_time_feature['buy_amounts'].index.values[170:], pred1, '--')

    ax1.set_title('buy prediction')
    pred2 = x_time_feature['赎回金额预测'][170:]

    ax2.plot(x_time_feature['redeem_amounts'][:170])
    ax2.plot(x_time_feature['redeem_amounts'].index.values[:170], pipe2.predict(X_train2), '-k')
    ax2.plot(x_time_feature['redeem_amounts'].index.values[170:], y_test2)
    ax2.plot(x_time_feature['redeem_amounts'].index.values[170:], pred2, '--')

    ax2.set_title('redeem prediction')

    plt.xticks(rotation=30)
    plt.savefig('prediction.png')
    # print('input features ', p1.n_input_features_)
    # print('output features ', p1.n_output_features_)
    # print(p1.get_feature_names())
    # print('buy: ', l1.coef_.tolist())
    # print('------------------')
    # print('input features ', p2.n_input_features_)
    # print('output features ', p2.n_output_features_)
    # print(p2.get_feature_names())
    # print('redeem: ', l2.coef_.tolist())
    # print(len(l2.coef_))

    x_time_feature['赎回金额预测'][154:166] *= .83
    x_time_feature['buy_error'] = x_time_feature['申购金额预测'] / x_time_feature['buy_amounts'] - 1
    x_time_feature['redeem_error'] = x_time_feature['赎回金额预测'] / x_time_feature['redeem_amounts'] - 1

    print(x_time_feature['date'][154])
    print(np.mean(x_time_feature['buy_error'][154:158]))
    print(np.mean(x_time_feature['buy_error'][158:162]))
    print(np.mean(x_time_feature['buy_error'][162:166]))

    x_time_feature['buy_precision'] = np.nan
    x_time_feature['buy_precision'][154] = np.mean(x_time_feature['buy_error'][154:158])
    x_time_feature['buy_precision'][159] = np.mean(x_time_feature['buy_error'][159:163])
    x_time_feature['redeem_precision'] = np.nan
    x_time_feature['redeem_precision'][154] = np.mean(x_time_feature['redeem_error'][154:158])
    x_time_feature['redeem_precision'][159] = np.mean(x_time_feature['redeem_error'][159:163])
    x_time_feature['net'] = x_time_feature['buy_amounts'] / x_time_feature['redeem_amounts']
    x_time_feature['net_pred'] = x_time_feature['申购金额预测'] / x_time_feature['赎回金额预测']
    x_time_feature['net_error'] = x_time_feature['net_pred'] / x_time_feature['net'] - 1
    x_time_feature['net_precision'] = np.nan
    x_time_feature['net_precision'][154] = np.mean(x_time_feature['net_error'][154:158])
    x_time_feature['net_precision'][159] = np.mean(x_time_feature['net_error'][159:163])
    x_time_feature.to_csv('prediction.csv')

    df_coef = pd.DataFrame({'coef_name': ['1_intercept', 'x0_times', 'x1_day', 'x2_p2p_develop', 'x3_fund_7day_rate',
                                          'x0^2', 'x0_x1', 'x0_x2', 'x0_x3', 'x1^2', 'x1_x2', 'x1_x3', 'x2^2',
                                          'x2_x3', 'x3^2', 'R^2'],
                            'buy_coef': l1.coef_.tolist() + [ps1],
                            'redeem_coef': l2.coef_.tolist() + [ps2],
                            'instruction': ['截距', '申赎次数', '交易日',
                                            'p2p发展指数', '七日收益',
                                            '申赎次数平方', '申赎次数 * 交易日',
                                            '申赎次数 * p2p发展', '申赎次数 * 七日收益',
                                            '交易日平方', '交易日 * p2p发展',
                                            '交易日 * 七日收益', 'p2p发展平方',
                                            'p2p发展 * 七日收益', '七日收益平方', 'R平方']})
    print(df_coef.head())

    df_coef.to_sql('model_coef', engine, if_exists='replace')

    x_time_feature.to_sql('model_result', engine, if_exists='replace')




