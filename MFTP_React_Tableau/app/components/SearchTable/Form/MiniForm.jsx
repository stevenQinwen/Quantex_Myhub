import React from 'react';
import { observer } from 'mobx-react';
import { Form, Row, Col, Button } from 'antd';
import { Select } from 'components';
import classNames from 'classnames';

import { SearchFormComponent } from './SearchForm';

const FormItem = Form.Item;
/**
 * span 配置
 * showSwitch 为 false 时 switchSpan 会合并到 inputSpan
 */
const OPTIONS = {
  titleSpan: 5,
  inputSpan: 13,
  buttonSpan: 3,
  switchSpan: 3
};

@observer
class MiniSearchComponent extends React.Component {
  selectProps = []; // select props
  components = []; // 缓存各字段生成标签

  /**
   * 配置字段配置数组为Select用数组
   * @param {Array} fields 字段配置数组
   */
  makeFields = (fields = []) => {
    this.selectProps = fields.filter((va) => {
      return va.mini !== false;
    }).map((va, i) => {
      const option = {
        id: va.name,
        name: va.label
      };
      this.components[va.name] = SearchFormComponent.itemComponent(va);
      /**
       * selectProps 为本类私有 初始为空 且 在 componentDidMount 中初始化 无法触发更新
       * setCurrent 确保初始化更新组件
       */
      if (!this.props.searchStore.current && i == 0) {
        this.props.searchStore.setCurrent(va.name);
      }
      return option;
    });
  }

  /**
   * 选中字段回调函数
   * @param {string} key field.name 当前字段绑定的字段英文名
   */
  onSelect = (key) => {
    this.props.form.resetFields();
    this.props.searchStore.setCurrent(key); // 更新当前选中字段
  }

  /**
   * 高级搜索 切换按钮点击事件
   */
  onSwitch = () => {
    this.props.onSwitch();
  }

  /**
   * Form 提交事件
   */
  submit = (e) => {
    const { form, searchStore } = this.props;
    searchStore.searchForm(form.getFieldsValue());
    e.preventDefault();
  }

  /**
   * 从 searchStore 中组织应该赋值给 简易搜索 框的参数和值
   * @return {object} 应赋值参数
   */
  makeParam = () => {
    const { current, searchFormComponent, config } = this.props.searchStore;
    let param = {};
    // 获取 SearchForm 实例中的参数
    const searchParams = searchFormComponent.props.form.getFieldsValue();
    // searchForm 有值时使用已有字段赋值
    for (let i = 0, z = config.fields.length; i < z; i++) {
      const field = config.fields[i].name;
      // 需要判断当前 简易搜索 是否包含要赋值的字段
      const has = this.selectProps.filter((va) => { return va.id == field; }).length;
      if (searchParams[field] && has > 0) {
        param[field] = searchParams[field];
        this.props.searchStore.setCurrent(field);
        return param;
      }
    }
    // 无值时 清空当前的值
    param[current] = undefined;
    return param;
  };

  constructor(props) {
    super(props);
    this.options = Object.assign({}, OPTIONS, this.props.options);
    props.searchStore.SetMiniFormComponent(this);
  }

  componentDidMount() {
    this.makeFields(this.props.searchStore.config.fields);
  }

  /**
   * 折中方案 此插件无法通过 class 变化推测当前是否为 简易搜索 状态
   * expand 被放在 props 中传递 可以在 componentWillReceiveProps 中被检查
   * expand 值变化为 true 时 表示正在切换为 简易搜索
   * 此时会依据 高级搜索 的字段对象对 简易搜索 进行赋值
   * @param {object} nextProps next props
   */
  componentWillReceiveProps(nextProps) {
    // 此生命周期需要检查此次更新是由 expand触发 还是 form input触发
    if (nextProps.expand != this.props.expand && nextProps.expand && nextProps.form) {
      this.props.form.setFieldsValue(this.makeParam());
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchStore } = this.props;
    const { current } = searchStore;
    const className = classNames('mini-search', 'mini-search-form', {
      'hidden': !this.props.expand || searchStore.miniNumber < 1
    });
    const inputSpan = searchStore.showSwitch ? this.options.inputSpan : this.options.inputSpan + this.options.switchSpan;
    return <div className={className}>
      <Form onSubmit={this.submit}>
        <Row>
          <Col span={this.options.titleSpan}>
            <Select
              disabled={this.selectProps.length < 2}
              showSearch={false}
              dictData={this.selectProps}
              value={current}
              onSelect={this.onSelect}
            />
          </Col>
          <Col span={inputSpan} className='mini-form-item'>
            {this.selectProps.map((va, i) => {
              return <FormItem key={i} className={current == va.id ? 'show' : 'hidden'}>
                {getFieldDecorator(va.id)(this.components[va.id])}
              </FormItem>;
            })}
          </Col>
          <Col span={this.options.buttonSpan}>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Col>
          {searchStore.showSwitch ? <Col span={this.options.switchSpan} className='mini-form-switch'>
            <a onClick={this.onSwitch}>高级搜索</a>
          </Col> : null}
        </Row>
      </Form>
    </div>;
  }
}

MiniSearchComponent.propTypes = {
  expand: React.PropTypes.bool, // 折中方案 此值由外部 searchForm 传入 用来标识当前搜索状态
  searchStore: React.PropTypes.object, // store
  options: React.PropTypes.object // 配置信息
};

MiniSearchComponent.defaultProps = {
  options: {}
};

const MiniSearch = Form.create()(MiniSearchComponent);

export default MiniSearch;
