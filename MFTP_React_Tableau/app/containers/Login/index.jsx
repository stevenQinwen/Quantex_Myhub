import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Form, Button, Input, Icon } from 'antd';
import Alert from 'components/Alert';
import { API } from 'utils';
import styles from './index.scss';

class LoginForm extends Component {
  constructor() {
    super();
    // 错误信息
    this.state = {
      errorMsg: ''
    };
  }

  handleSubmit = () => {
    hashHistory.push("page");
  };

  /**
   * 获取市场当前交易日
   * @param marketCode 市场 code
   */
  fetchTradeDate = (marketCode) => {
    new API('qow').get('/api/v2/trade_dates/{marketCode}', {
      next: 0, // 当前交易日
      marketCode
    }).then((res) => {
      if (res.code == 200) {
        let marketTradeDateMap = new Map();
        marketTradeDateMap.set('IB', res.data.tradeDate);
        userLocalStore.setItem('marketTradeDateMap', marketTradeDateMap);
      } else {
        Alert.error(res);
      }
    });
  };

  /**
   * 去掉登录密码报错信息
   */
  handleLoginNameChange = () => {
    if (this.state.errorMsg.length) {
      this.setState({ errorMsg: '' });
    }
  }

  // 重置表单
  resetForm() {
    this.props.form.resetFields();
  }

  componentDidMount() {
    if (!window.electron) {
      // 浏览器时，阻止后退事件
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.preventBack);
    }
  }

  preventBack = () => {
    history.pushState(null, null, document.URL);
  }

  componentWillUnmount() {
    if (!window.electron) {
      window.removeEventListener('popstate', this.preventBack);
    }
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { errorMsg } = this.state;

    return (
      <Form className={styles['login-form']} onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('loginName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input size="default"
              prefix={<Icon type="yonghuming" />}
              placeholder="用户名"
              onChange={this.handleLoginNameChange} />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('loginPassword', {
            rules: [{ required: true, message: '请输入密码!' }, {
              pattern: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]+$/, message: '至少包含数字、字母和特殊字符中的两种字符!'
            }],
            validateTrigger: ['onBlur']
          })(
            <Input size="default"
              prefix={<Icon type="mima" />}
              placeholder="密码"
              type="password"
              onChange={this.handleLoginNameChange} />
            )}
        </FormItem>
        <p className={styles['err-msg']}>{errorMsg}</p>
        <FormItem className={styles['btn-form-item']}>
          <Button className={styles['btn-login']} size="default" type="primary" htmlType="submit">
            登录<Icon type="right" />
          </Button>
        </FormItem>
        <FormItem>
          <a className={styles['forget-pwd']}>忘记密码?</a>
        </FormItem>
      </Form>
    );
  }
}

const NormalLoginForm = Form.create()(LoginForm);

class LoginContainerComponent extends Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
          </div>
          <NormalLoginForm />
        </div>
        <p className={styles['copy-right']}>宽拓(北京)科技有限公司Copyright ©2016-2017</p>
      </div>
    );
  }
}

export default LoginContainerComponent;
