import { observable, action } from 'mobx';

/**
 * {
 *   order: 'descend',
 *   columnKey: 'age',
 * }
 */
export default class Sorter {
  constructor(tableStore) {
    this.initFilters(tableStore.config.columns);
    this.tableStore = tableStore;
  }

  @observable sorter = {};
  params = [];
  setSorter = action((sorter) => { this.sorter = sorter; });

  /**
   * 将 orderBy 字符串转换成 antd sorter 对象格式
   * @param {array<object<sorter>>} orders antd sorter 对象的数组
   */
  setParamOrder = (orders) => {
    return orders ? orders.split(',').map((va) => {
      let order = va.split(' ');
      return {
        field: order[0],
        order: order.length < 2 || order[1].length < 1 || order[1] == 'asc' ? 'ascend' : 'descend'
      };
    }) : [];
  };

  /**
   * 将 antd sorder 对象转换成 orderBy 字符串格式
   * @param {object<sorter>} order antd sorter 对象
   */
  getParamOrder = (order) => {
    return order.field ? order.field + (order.order == 'ascend' ? '' : ' desc') : undefined;
  };

  makeParamOrder = (orderBy) => {
    if (this.sorter.field) return this.getParamOrder(this.sorter);
    else return orderBy;
  };

  initFilters = (columns = []) => {
    columns.forEach((va) => {
      if (va.sorter && va.defaultSorter) {
        this.setSorter(this.setParamOrder(va.dataIndex + (typeof va.defaultSorter == 'string' ? ' ' + va.defaultSorter : ''))[0]);
      }
    });
  };
}

