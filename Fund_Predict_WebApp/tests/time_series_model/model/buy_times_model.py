import os
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:root@192.168.1.108:3306/money_fund_predict?charset=utf8")

if __name__ == '__main__':

    x_time_feature = pd.read_csv('model_dataset.csv')
    x_time_feature['date'] = pd.to_datetime(x_time_feature['date'])
    x_time_feature = x_time_feature.set_index('date')
    print(x_time_feature.head())

    # 申购次数的数据集
    X_train, X_test = x_time_feature[['day_buy', 'month', 'week']][45:164], \
                      x_time_feature[['day_buy', 'month', 'week']][164:169]
    y_train, y_test = x_time_feature['buy_times'][45:164], x_time_feature['buy_times'][164:169]

    # 赎回次数的数据
    X_train2, X_test2 = x_time_feature[['day_redeem', 'month', 'week']][:164], \
                        x_time_feature[['day_redeem', 'month', 'week']][164:169]
    y_train2, y_test2 = x_time_feature['redeem_times'][:164], x_time_feature['redeem_times'][164:169]

    rf = RandomForestRegressor()
    lr = LinearRegression()

    param_grid = {'n_estimators': [10, 50, 100],
                  'criterion': ['mse', 'mae'],
                  'min_weight_fraction_leaf': [0, 0.01, 0.1],
                  'random_state':[0, 10, 25],
                  'min_impurity_decrease': [0, 0.1, 0.5]}

    grid1 = GridSearchCV(rf, param_grid=param_grid, cv=5, n_jobs=-1)
    grid2 = GridSearchCV(rf, param_grid=param_grid, cv=5, n_jobs=-1)
    # 申购训练
    grid1.fit(X_train, y_train)
    grid2.fit(X_train2, y_train2)

    print('申购预测表现： {:.2f}'.format(grid1.score(X_test, y_test)))
    print('赎回预测表现： {:.2f}'.format(grid2.score(X_test2, y_test2)))

    # rf.fit(X_train, y_train)
    pred1 = grid1.predict(X_test)

    plt.plot(x_time_feature['buy_times'][45:164])
    plt.plot(x_time_feature['buy_times'].index.values[45:164], grid1.predict(X_train), '-k')
    plt.plot(x_time_feature['buy_times'].index.values[164:169], y_test)
    plt.plot(x_time_feature['buy_times'].index.values[164:169], pred1, '--')
    plt.xticks(rotation=30)
    plt.title('buy')
    plt.show()

    pred2 = grid2.predict(X_test2)

    plt.plot(x_time_feature['redeem_times'][:164])
    plt.plot(x_time_feature['redeem_times'].index.values[:164], grid2.predict(X_train2), '-k')
    plt.plot(x_time_feature['redeem_times'].index.values[164:169], y_test2)
    plt.plot(x_time_feature['redeem_times'].index.values[164:169], pred2, '--')
    plt.xticks(rotation=30)
    plt.title('redeem')
    plt.show()

    x_time_feature['申购次数预测'] = grid1.predict(x_time_feature[['day_buy', 'month', 'week']])
    x_time_feature['赎回次数预测'] = grid2.predict(x_time_feature[['day_redeem', 'month', 'week']])

    print("Buy times Best parameters: {}".format(grid1.best_params_))
    print("Redeem times Best parameters: {}".format(grid2.best_params_))
    df_parameters = pd.DataFrame({'names': list(grid1.best_params_.keys()),
                                  'buy_param': list(grid1.best_params_.values()),
                                  'redeem_param': list(grid2.best_params_.values())})
    print(df_parameters)
    df_parameters.to_sql('random_forest_param', engine, if_exists='replace')
    # results1 = pd.DataFrame(grid1.cv_results_)
    # results2 = pd.DataFrame(grid2.cv_results_)
    # results1.to_csv('buy_result_cv.csv')
    # results2.to_csv('redeem_result_cv.csv')
    x_time_feature.to_csv('prediction.csv')
