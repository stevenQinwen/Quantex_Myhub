import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import LoginContainerComponent from '../index';

/**
 * 获取真实DOM节点
 * @param conponent 登陆界面组件
 * @returns {*}
 */
const getApp = function (conponent) {
  const app = TestUtils.renderIntoDocument(conponent);
  const appDOM = findDOMNode(app);
  return appDOM;
}

let appDOM = getApp(<LoginContainerComponent/>); // 获取登陆界面真实DOM节点
let userInput = appDOM.querySelector('#loginName'), // 用户名输入框
  pwdInput = appDOM.querySelector('#loginPassword'), // 密码输入框
  loginButton = appDOM.querySelector('button[type="submit"]'), // 获取登陆按钮标签
  curErrorDiv; // 提示信息标签


describe('DOM Rendering', function () {
  it('loginName can not be empty', function (done) {
    // 模拟点击登录按钮
    TestUtils.Simulate.submit(loginButton);

    curErrorDiv = userInput.nextElementSibling; // 未输入用户名提示信息 标签
    expect(curErrorDiv.innerHTML).to.equal('请输入用户名!');
    done();  // 当测试结束的时候，必须显式调用这个函数，告诉Mocha测试结束了。否则，Mocha就无法知道，测试是否结束，会一直等到超时报错。
  });

  it('loginPassword can not be empty', function (done) {
    userInput.value = '123'; // 模拟用户名输入框值为'123'

    TestUtils.Simulate.submit(loginButton);

    curErrorDiv = pwdInput.nextElementSibling; // 未输入密码提示信息标签
    expect(curErrorDiv.innerHTML).to.equal('请输入密码!');
    done();
  });

  it('loginPassword contain at least two character types', function (done) {
    userInput.value = '123';

    // 模拟修改密码输入内容
    TestUtils.Simulate.change(pwdInput, {target: {value: '123'}});

    curErrorDiv = pwdInput.nextElementSibling; // 未输入密码提示信息标签
    expect(curErrorDiv.innerHTML).to.equal('密码至少包含数字、字母和特殊字符三种中的其中两种!');
    done();
  });

  it('Save user info to localstorage after logining in successfully,', function (done) {
    // mock 用户名和密码输入框值
    userInput.value = '123';
    pwdInput.value = 'asd123';

    TestUtils.Simulate.submit(loginButton);

    // 如果登陆成功后,获取localstorage中的userInfo信息与刚刚输入的内容对比
    done();
  });
});

