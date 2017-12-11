import React, { Component } from 'react';
import API from 'utils/API';
import Alert from 'components/Alert';
import { Form, Input, Button } from 'antd';
import { FORMITEM_LAYOUT } from '_config/constants'; // 引入labelcol常量
import Util from 'utils/util';

const FormItem = Form.Item;

/**
 * 用户信息Form
 */
class UpdatePassword extends Component {

  constructor(props) {
    super(props);
    this.api = new API('auth');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err) => {
      if (!err) {
        let formData = form.getFieldsValue();
        const params = Util.buildFormData(formData);
        this.api.put('/api/v2/users/pwdupdate', params)
          .then((res) => {
            if (res.code === 200) {
              this.props.onClose();
              Alert.success("修改成功", (close) => {
                close();
                this.props.handleLogout();
              });
            } else {
              Alert.error(res);
            }
          });
      }
    });
  }

  handleCancel = () => {
    this.props.onClose();
  }

  /**
   * 验证确认密码和新密码一致
   * @param rule
   * @param value 确认密码值
   * @param callback
   */
  handleConfirmPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码输入不一致');
    } else {
      // 必须总是返回一个callback,否则 validtateFieldAndScroll(对表单内的各个 field 进行再次校验) 无法响应
      callback();
    }
  }

  render() {
    const formItemLayout = {
      labelCol: { span: FORMITEM_LAYOUT.FORM_LABEL_LEN },
      wrapperCol: { span: FORMITEM_LAYOUT.FORM_INPUT_LEN }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="password-form" onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}>
            {
              getFieldDecorator('oldPassword')(
                <Input className="password-input" size="small" type="password" placeholder="原密码"/>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout}>
            {
              getFieldDecorator('newPassword', {
                rules: [{
                  required: true, message: '必填'
                }, {
                  pattern: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]+$/, message: '至少包含数字、字母和特殊字符中的两种字符!'
                }],
                validateTrigger: ['onBlur']
              })(
                <Input className="password-input" size="small" type="password" placeholder="新密码"/>
              )
            }
          </FormItem>
          <FormItem {...formItemLayout}>
            {
              getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: '请再次输入以确认新密码'
                }, {
                  validator: this.handleConfirmPassword,
                }],
                validateTrigger: ['onBlur']
              })(
                <Input className="password-input" size="small" type="password" placeholder="确认密码"/>
              )
            }
          </FormItem>
          <div className="password-button">
            <Button type="default" size="small" onClick={this.handleCancel}>取消</Button>
            <Button type="primary" size="small" htmlType="submit">确定</Button>
          </div>
      </Form>
    );
  }
}

const UpdatePasswordForm = Form.create({
  mapPropsToFields(props) {
    return Util.mapPropsToFields(props.dataSource);
  }
})(UpdatePassword);

export default UpdatePasswordForm;
