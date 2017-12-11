import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Select, TreeSelect, DateRangePicker, Cascader, CheckboxGroup, Radio, InputGroup } from 'components';
import { FORMITEM_LAYOUT } from 'config/constants'; // 引入labelcol常量
import MiniForm from './MiniForm';

require('../index.scss');

const FormItem = Form.Item;

// 组件的默认配置
const defaultConfig = {
  labelCol: { span: FORMITEM_LAYOUT.FORM_LABEL_LEN },
  wrapperCol: { span: FORMITEM_LAYOUT.FORM_INPUT_LEN },
  itemSpan: FORMITEM_LAYOUT.FORM_ITEM_SPAN,
  Input: {
    type: 'text',
    size: 'small',
  },
  Select: {
    allowClear: true
  },
  TreeSelect: {
    allowClear: true
  },
  DatePicker: {
    size: 'small'
  }
};

@observer
export class SearchFormComponent extends Component {
  /**
   * 生成字段标签
   * @param {object} 字段配置
   */
  static itemComponent = (field) => {
    const { component } = field;
    let itemProps = Object.assign({}, defaultConfig[component], field.props || {});
    switch (component) {
      case 'Input':
        return <Input placeholder={'填写' + field.label} {...itemProps}/>;
      case 'Select':
        if ('dictParams' in itemProps) {
          itemProps.dictParams = SearchFormComponent.evalObjValue(itemProps.dictParams);
        }
        return <Select {...itemProps}/>;
      case 'TreeSelect':
        if ('treeParams' in itemProps) {
          itemProps.treeParams = SearchFormComponent.evalObjValue(itemProps.treeParams);
        }
        if ('notFoundContent' in itemProps) {
          _.isFunction(itemProps.notFoundContent) && (itemProps.notFoundContent = itemProps.notFoundContent());
        }
        return <TreeSelect {...itemProps}/>;
      case 'DateRangePicker':
        return <DateRangePicker {...itemProps}/>;
      case 'Cascader':
        return <Cascader {...itemProps}/>;
      case 'CheckboxGroup':
        return <CheckboxGroup {...itemProps}/>;
      case 'Radio':
        return <Radio {...itemProps}/>;
      case 'InputGroup':
        return <InputGroup {...itemProps}/>;
      case 'DatePicker':
        return <DatePicker {...itemProps}/>;
      default:
        logger.error('FormItemComponent invalid, Please confirm the fields config');
        return component;
    }
  }

  /**
   * 将传入的对象属性值为函数的转化为具体的值
   * @param params
   * @return {{}}
   */
  static evalObjValue = (params = {}) => {
    const returnParams = {};
    for (let i in params) {
      if (_.isFunction(params[i])) {
        returnParams[i] = params[i]();
      } else {
        returnParams[i] = params[i];
      }
    }
    return returnParams;
  }

  constructor(props) {
    super(props);
    props.searchStore.setSearchFormComponent(this); // 将 searchForm 组件实例保存在 searchStore 变量里
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (e) => {
    e && e.preventDefault();
    const { searchStore, form } = this.props;
    let searchParams = form.getFieldsValue();
    searchStore.searchForm(searchParams);
  }

  handleClear = () => {
    this.props.form.resetFields();
  }

  /**
   * 搜索模式切换
   * 不只是一个巧合 而且是一个巧合 这一定非常巧合
   */
  handleToggle = () => {
    const { expand, setExpand, miniFormComponent } = this.props.searchStore;
    setExpand(!expand);
    /**
     * expand 为 true 时正在切换为 高级搜索
     * 此时需要组织 简易搜索 时提交的字段对象对 高级搜索 字段进行重新赋值
     */
    if (expand == true) this.props.form.setFieldsValue(miniFormComponent.props.form.getFieldsValue());
  }

  buildItem = (field) => {
    const { searchStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: field.labelCol || defaultConfig.labelCol,
      wrapperCol: field.wrapperCol || defaultConfig.wrapperCol
    };
    // 存在 field span 时按照 field 配置加载 否则按照默认 span 加载 FormItem span
    return <Col span={field.span || searchStore.config.fieldSpan || defaultConfig.itemSpan} key={field.name}>
      <FormItem {...formItemLayout} label={field.label}>
        {getFieldDecorator(field.name)(SearchFormComponent.itemComponent(field))}
      </FormItem>
    </Col>;
  }

  buildFormItems = (fields = []) => {
    const cols = (field, i) => {
      let items = [];
      items.push(this.buildItem(field));
      items.push(<Col span={1} key={i} />);
      return items;
    };
    return <Row>
      {fields.map((field, i) => { return cols(field, i); }) }
    </Row>;
  };

  render() {
    const { searchStore } = this.props;
    const formItems = this.buildFormItems(searchStore.config.fields);
    return <div className={'search-form'}>
      <MiniForm
        expand={searchStore.expand} // 折中
        options={searchStore.miniOptions}
        searchStore={searchStore}
        onSwitch={this.handleToggle}
      />
      <Form
        className={(!searchStore.expand && searchStore.fieldsNumber > 0 ? 'show' : 'hidden') + ' search-table-form'}
        onSubmit={this.handleSearch}
      >
        {formItems}
        <Row>
          <Col span={23} style={{ textAlign: 'right' }}>
            <Button size='small' type='primary' htmlType='submit'>搜索</Button>
            <Button size='small' style={{ marginLeft: 8 }} onClick={this.handleClear}>清空</Button>
            {searchStore.showSwitch ? <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.handleToggle}>简易搜索</a> : null}
          </Col>
        </Row>
      </Form>
      {this.props.children}
    </div>;
  }
}

const WrappedSearchForm = Form.create()(SearchFormComponent);

export default WrappedSearchForm;
