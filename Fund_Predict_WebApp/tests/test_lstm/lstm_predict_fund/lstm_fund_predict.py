#coding=utf-8
'''
Created on 2017年11月20日

@author: steven
'''
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf


#定义常量
rnn_unit=10       #hidden layer units
input_size=3
output_size=1
lr=0.0002         #学习率
#——————————————————导入数据——————————————————————
# f=open('./dataset/dataset_2.csv')
# f=open('../../p2p_data3.csv')
f=open('./dataSet/full_daily_transaction_and_marco.csv')
df=pd.read_csv(f)     #读入股票数据
df["date"]=pd.to_datetime(df["date"])
df=df.sort_values("date")

del df["Unnamed: 0"]
data=df[["daily_buy_amounts","p2p人气指数","Shibor拆放利率_ON","p2p利率指数"]]

# data=df.iloc[:,2:].values  #取第3-10列
data=data.values  #取第3-10列


#——————————————————定义神经网络变量——————————————————
# 输入层、输出层权重
weights={
    'in':tf.Variable(tf.random_normal([input_size,rnn_unit])),
    'out':tf.Variable(tf.random_normal([rnn_unit,1]))
}

# 输入层、输出层 偏置
biases={
    'in':tf.Variable(tf.constant(0.1,shape=[rnn_unit,])),
    'out':tf.Variable(tf.constant(0.1,shape=[1,]))
}
# -------------------不清楚这两个数据是如何进行切分的数据--------------------------



#获取训练集 batch_size=80,time_step=15,train_begin=2000,train_end=5800
def get_train_data(batch_size=1,time_step=5,train_begin=0,train_end=150): 
#这是默认的参数，如果是不指定就需要这个数据了
    data_train=data[train_begin:train_end]
    normalized_train_data=(data_train-np.mean(data_train,axis=0))/np.std(data_train,axis=0)  #标准化
    train_x,train_y=[],[]   #训练集
    batch_index=[] #这是什么
    for i in range(len(normalized_train_data)-time_step):
       if i % batch_size==0:
           batch_index.append(i)
       x=normalized_train_data[i:i+time_step,1:]
       y=normalized_train_data[i:i+time_step,0,np.newaxis]
       train_x.append(x.tolist())
       train_y.append(y.tolist())
    batch_index.append((len(normalized_train_data)-time_step))
    return batch_index,train_x,train_y



#获取测试集
def get_test_data(time_step=1,test_begin=150):
    data_test=data[test_begin:]
    mean=np.mean(data_test,axis=0)
    std=np.std(data_test,axis=0)
    normalized_test_data=(data_test-mean)/std  #标准化
    size=(len(normalized_test_data)+time_step-1)//time_step  #有size个sample 
    test_x,test_y=[],[]  
    for i in range(size-1):
       x=normalized_test_data[i*time_step:(i+1)*time_step,1:]
       y=normalized_test_data[i*time_step:(i+1)*time_step,0]
       test_x.append(x.tolist())
       test_y.extend(y)
    test_x.append((normalized_test_data[(i+1)*time_step:,1:]).tolist())
    test_y.extend((normalized_test_data[(i+1)*time_step:,0]).tolist())
    return mean,std,test_x,test_y





#——————————————————定义神经网络变量——————————————————
def lstm(X):     
    batch_size=tf.shape(X)[0]
    time_step=tf.shape(X)[1]
    w_in=weights['in']
    b_in=biases['in']  
    input=tf.reshape(X,[-1,input_size])  #需要将tensor转成2维进行计算，计算后的结果作为隐藏层的输入
    input_rnn=tf.matmul(input,w_in)+b_in
    input_rnn=tf.reshape(input_rnn,[-1,time_step,rnn_unit])  #将tensor转成3维，作为lstm cell的输入
    cell=tf.nn.rnn_cell.BasicLSTMCell(rnn_unit)
    init_state=cell.zero_state(batch_size,dtype=tf.float32)
    output_rnn,final_states=tf.nn.dynamic_rnn(cell, input_rnn,initial_state=init_state, dtype=tf.float32)
    #output_rnn是记录lstm每个输出节点的结果，final_states是最后一个cell的结果
    output=tf.reshape(output_rnn,[-1,rnn_unit]) #作为输出层的输入
    w_out=weights['out']
    b_out=biases['out']
    pred=tf.matmul(output,w_out)+b_out
    return pred,final_states



#——————————————————训练模型——————————————————
def train_lstm(batch_size=1,time_step=1,train_begin=0,train_end=150):
    X=tf.placeholder(tf.float32, shape=[None,time_step,input_size])
    Y=tf.placeholder(tf.float32, shape=[None,time_step,output_size])

    batch_index,train_x,train_y=get_train_data(batch_size,time_step,train_begin,train_end)


    pred,_=lstm(X)
    #损失函数
    loss=tf.reduce_mean(tf.square(tf.reshape(pred,[-1])-tf.reshape(Y, [-1])))

    train_op=tf.train.AdamOptimizer(lr).minimize(loss)

    saver=tf.train.Saver(tf.global_variables(),max_to_keep=15)

    # module_file = tf.train.latest_checkpoint()    #上一个没有checkpoint啊，怎么现在就直接这样了
    checkpoint_dir = "./model"    #上一个没有checkpoint啊，怎么现在就直接这样了
    with tf.Session() as sess:
        sess.run(tf.global_variables_initializer())

        ckpt = tf.train.get_checkpoint_state(checkpoint_dir)
        if ckpt and ckpt.model_checkpoint_path:
            saver.restore(sess, ckpt.model_checkpoint_path)
        else:
            pass

        # saver.restore(sess, module_file) #将模型的saver对象指向一个model_flie文件
        #重复训练10000次
        for i in range(200):
            for step in range(len(batch_index)-1):
                _,loss_=sess.run([train_op,loss],
                #在给张量喂养数据的时候出现的错误
                feed_dict={X:train_x[batch_index[step]:batch_index[step+1]],
                 Y:train_y[batch_index[step]:batch_index[step+1]]})

            print(i,loss_)
            if i % 50==0:
                print("保存模型：",saver.save(sess,'./model/fund_predict.model',global_step=i))

#————————————————预测模型————————————————————
def prediction(time_step=1):
    X=tf.placeholder(tf.float32, shape=[None,time_step,input_size])
    #Y=tf.placeholder(tf.float32, shape=[None,time_step,output_size])
    mean,std,test_x,test_y=get_test_data(time_step)
    pred,_=lstm(X)     
    saver=tf.train.Saver(tf.global_variables())
    with tf.Session() as sess:
        #参数恢复
        # module_file = tf.train.latest_checkpoint()
        checkpoint_dir="./model"
        ckpt = tf.train.get_checkpoint_state(checkpoint_dir)
        if ckpt and ckpt.model_checkpoint_path:
            saver.restore(sess, ckpt.model_checkpoint_path)
        else:
            pass
        test_predict=[]
        for step in range(len(test_x)-1):
          prob=sess.run(pred,feed_dict={X:[test_x[step]]})   
          predict=prob.reshape((-1))
          test_predict.extend(predict)
        test_y=np.array(test_y)*std[0]+mean[0]
        test_predict=np.array(test_predict)*std[0]+mean[0] #将缩小的情况按照原来的路返回
        acc=np.average(np.abs(test_predict-test_y[:len(test_predict)])/test_y[:len(test_predict)])  #偏差
        #以折线图表示结果
        plt.figure(figsize=(12,6))

        plt.plot(df["date"][0:150].values, df["daily_buy_amounts"][0:150].values, color='y')


        plt.plot(df["date"][151:].values, test_predict, color='b')
        plt.plot(df["date"][150:].values, test_y,  color='r')
        plt.savefig("img/show2.jpg")
        plt.xlabel("时间")
        plt.ylabel("buy_amount")
        plt.show()



if __name__=='__main__':

    # 分别进行train  和 test
    #train_lstm()

    prediction()










