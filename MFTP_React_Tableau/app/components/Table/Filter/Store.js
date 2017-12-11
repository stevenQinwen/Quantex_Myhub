import { observable, action } from 'mobx';
import { Util } from 'utils';

/**
 * filters: {
 *  ...options
 * }
 *
 * options: {
 *  filtered: bool, // 已经过滤状态
 *  filterDropdownVisible bool, // filter 框显示状态
 *  onFilterDropdownVisibleChange: function, // 显示 关闭 自定义过滤框的回调函数
 *
 *  field: object, // 用于生成 TableFilterComponent 的参数
 *  onSubmit: function // 提交的回调函数
 *  onReset: function // 重置的回调函数
 * }
 */

/**
 * values: {
 *  name: value
 * }
 */

/**
 * 服务器端过滤
 */
export default class Filter {
  constructor(tableStore) {
    this.initFilters(tableStore.config.columns);
    this.tableStore = tableStore;
  }

  searchStore; // store
  @observable filters = {}; // 过滤字段配置
  values = {}; // 过滤字段值
  options = {};

  setFilters = action((filters) => { this.filters = filters; }); // 函数方法
  setFilter = action((name, filter) => { this.filters[name] = filter; }); // 函数方法
  setValues = (values) => { this.values = values; }; // 函数方法
  setValue = (name, value) => { this.values[name] = value; }; // 函数方法
  setOptions = (options) => { this.options = options; }; // 函数方法
  setOption = (name, option) => { this.options[name] = option; }; // 函数方法

  /**
   * 整理过滤字段值
   * 检查修改过滤状态
   * @return {object} 参数值
   */
  get filterValue() {
    let param = {};
    let filtered = [];
    let noneFiltered = [];
    for (let key in this.values) {
      let value = this.values[key];
      if (value === undefined || value === null || value === '' || value.length < 1) {
        noneFiltered.push(key);
        continue;
      }
      if (this.filters[key].field.filedValue) value = this.filters[key].field.filedValue(value) || value;
      param[key] = value && value.slice ? value.slice() : value;
      filtered.push(key);
    }
    this.toggleAllCustomFiltered(filtered, noneFiltered);
    return param;
  }

  /**
   * 打开或关闭指定的 TableFilterComponent 搜索框
   * @param {string} name 字段名
   * @param {bool} show 显示状态
   */
  toggleCustomFilter = action((name, show) => {
    if (this.filters[name]) this.filters[name].filterDropdownVisible = show;
    if (show === false) this.tableStore.onTableChange();
  });

  /**
   * 打开或关闭指定的 过滤字段过滤状态
   * @param {string} name 字段名
   * @param {bool} filtered 过滤状态
   */
  toggleCustomFiltered = action((name, filtered) => {
    if (this.filters[name]) this.filters[name].filtered = filtered;
  });

  /**
   * 打开或关闭指定的 过滤字段过滤状态
   * @param {array<string>} filtered 已过滤字段
   * @param {array<string>} noneFiltered 未过滤字段
   */
  toggleAllCustomFiltered = action((filtered, noneFiltered) => {
    for (let name in this.filters) {
      if (filtered.indexOf(name) > -1) this.filters[name].filtered = true;
      if (noneFiltered.indexOf(name) > -1) this.filters[name].filtered = false;
    }
  });

  /**
   * 自定义过滤框的提交回调函数
   * @param {string} name 字段名
   */
  handleSearchTableFilterValue = (name) => {
    this.toggleCustomFilter(name, false);
  };

  /**
   * 自定义过滤框重置回调函数
   * @param {string} name 字段名
   */
  handleResetTableFilterValue = (name) => {
    this.handleClearTableFilterValue(name);
    this.toggleCustomFilter(name, false);
  };

  /**
   * 自定义过滤框清除回调函数
   * @param {string} name 字段名
   */
  handleClearTableFilterValue = (name) => {
    this.setValue(name, undefined);
  };

  /**
   * 清除自定义过滤框回调函数
   */
  handleClearAllTableFilterValue = () => {
    let param = {};
    Object.keys(this.values).forEach((key) => {
      param[key] = undefined;
    });
    this.setFilterValues(param);
  };

  /**
   * config.columns 参数初始化和整理
   * 过滤 columns 中的本地过滤和自定义过滤部分字段
   * 并为 自定义过滤字段组织 TableFilterComponent 参数
   * @param {array} columns 列表字段
   * @return {object<{antd, custom, filterValues}>} 本地过滤及antd默认滤字段-antd 和自定义过滤字段-custom, filterValues
   */
  initFilters = (columns = []) => {
    let filters = {};
    let values = {};
    let options = {};
    columns.forEach((va) => {
      if (va.filters && va.filters.component) {
        let name = (va.filters ? va.filters.name : '') || va.dataIndex;
        options[va.dataIndex] = va;
        // TableFilterComponent 参数 用于生成 TableFilterComponent
        const field = Object.assign(
          {}, va.filters, {
            props: Object.assign(
              {}, va.filters.props, {
                label: va.title,
                name: name,
                onChange: this.setValue
              }
            )
          }
        );
        // antd Table Filter 相关控制状态 用于生成 自定义搜索框
        // 部分 TableFilterComponent 参数
        const option = {
          filterDropdownVisible: false, // filter 框显示状态
          filtered: false, // 已经过滤状态
          field: field, // 用于生成 TableFilterComponent 的参数
          onSubmit: this.handleSearchTableFilterValue, // 提交的回调函数
          onReset: this.handleResetTableFilterValue, // 重置的回调函数
          onFilterDropdownVisibleChange: (show) => { this.toggleCustomFilter(name, show); } // 显示 关闭 自定义过滤框的回调函数
        };
        filters[name] = option;
        values[name] = undefined;
      }
      // 默认情况下 filters 为数组是加载 antd Table filter 默认样式
    });
    this.setFilters(filters);
    this.setValues(values);
    this.setOptions(options);
  };

  /**
   * 本地过滤回调函数
   * 整理当前 antd Table 中的符合本地过滤的数据行
   * @param {array} list 要过滤的数组
   * @return {array} 过滤后的数组
   */
  handleLocalFilter = (list = [], filterValue) => {
    filterValue = filterValue || Util.buildFilterParams(this.filterValue).filterGroup.rules;
    return list.filter((data) => { return this.dataFilter(data, filterValue); });
  };

  /**
   * 本地过滤规则
   * 此函数依托 handleLocalFilter 存在 是 handleLocalFilter 函数 filter 的回调函数
   * 用于判断当前数据行是不是符合过滤要求
   * @param {object} antd Table row 一行数据
   * @return {bool} 是否符合过滤标准
   */
  dataFilter = (data, filterValue) => {
    if (data.children && data.children.length > 0) {
      data.children = this.handleLocalFilter(data.children, filterValue);
      if (data.children.length > 0) return true;
    }
    for (let i = 0, z = filterValue.length; i < z; i++) {
      let { field, op, value } = filterValue[i];
      if (value === null) continue;
      let callback = this.options[field].fieldValue;
      let fieldValue = callback ? callback(data[field], data) : data[field];
      if (this.fieldFilter(fieldValue, op, value) === false) return false;
    }
    return true;
  };

  fieldFilter = (fieldValue, op, value) => {
    let bo = fieldValue === undefined || fieldValue === null;
    switch (op) {
      case 'like':
        if (bo || fieldValue.toString().indexOf(value) < 0) return false;
        break;
      case 'in':
        if (bo || value.slice().indexOf(fieldValue.toString()) < 0) return false;
        break;
      // TODO: not in case
      // case 'nin':
      //   if (!bo || value.slice().indexOf(fieldValue.toString()) > -1) return false;
      //   break;
      case 'gte':
        if (bo || parseFloat(fieldValue, 10) < value) return false;
        break;
      case 'gt':
        if (bo || parseFloat(fieldValue, 10) <= value) return false;
        break;
      case 'lte':
        if (bo || parseFloat(fieldValue, 10) > value) return false;
        break;
      case 'lt':
        if (bo || parseFloat(fieldValue, 10) >= value) return false;
        break;
      // TODO: not eq case
      // case 'neq':
      //   if (!bo || fieldValue.toString() == value) return false;
      //   break;
      default: // eq 过滤
        if (bo || fieldValue.toString() != value) return false;
        break;
    }
    return true;
  };
}
