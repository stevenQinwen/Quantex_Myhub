import React from 'react';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import { Select, DateRangePicker, Cascader, CheckboxGroup, Radio, InputGroup } from 'components';

import FilterStore from './Store';

/**
 * Table 过滤用 Form
 */
@observer
class TableFilter extends React.Component {
  static itemComponent = (field) => {
    switch (field.component) {
      case 'Input': return <p style={{ padding: '7px 8px' }}>
        <Input
          {...field.props}
          size='small'
          placeholder='请填写'
          onChange={(e) => { field.props.onChange(field.props.name, e.target.value); }}
        />
      </p>;
      case 'Select':
        return <Select
          {...field.props}
          placeholder='请选择'
          onChange={(value) => { field.props.onChange(field.props.name, value); }}
        />;
      case 'DateRangePicker':
        return <DateRangePicker
          className='search-table-filter-date-range-picker'
          {...field.props}
          onChange={(value) => { field.props.onChange(field.props.name, value); }}
        />;
      case 'Cascader':
        return <Cascader
          {...field.props}
          onChange={(value, options) => { field.props.onChange(field.props.name, options); }}
        />;
      case 'CheckboxGroup': return <CheckboxGroup
        className='search-table-filter-checkbox'
        {...field.props}
        showCheckAll
        vertical
        onChange={(value) => { field.props.onChange(field.props.name, value); }}
      />;
      case 'Radio':
        return <Radio
          className='search-table-filter-radio'
          {...field.props}
          vertical
          onChange={(value) => { field.props.onChange(field.props.name, value); }}
        />;
      case 'InputGroup':
        return <InputGroup
          className='search-table-filter-input-group'
          {...field.props}
          onChange={(value) => { field.props.onChange(field.props.name, value); }}
        />;
      default: return <field.component {...field.props} />;
    }
  };

  state = {
    childComponent: null
  };

  handleSubmit = () => {
    this.props.onSubmit(this.props.name);
  };

  handleReset = () => {
    this.props.onReset(this.props.name);
    this.setState({ childComponent: this.makeComponent() });
  };

  makeComponent = () => {
    return () => { return TableFilter.itemComponent(this.props.field); };
  };

  constructor(props) {
    super(props);
    this.state.childComponent = this.makeComponent();
  }

  render() {
    return <div className='ant-table-filter-dropdown search-table-filter'>
      {<this.state.childComponent />}
      <div className='search-table-filter-footer'>
        <a onClick={this.handleSubmit} className='float-left'>搜索</a>
        <a onClick={this.handleReset} className='float-right'>重置</a>
      </div>
    </div>;
  }
}

TableFilter.propTypes = {
  name: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired,
  field: React.PropTypes.object.isRequired
};

TableFilter.FilterStore = FilterStore;

export default TableFilter;
