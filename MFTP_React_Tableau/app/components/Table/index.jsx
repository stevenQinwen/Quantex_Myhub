import React from 'react';
import { observer } from 'mobx-react';
import { Table, Icon } from 'antd';
import { PAGINATION } from 'config/constants';
import Util from 'utils/util';
import FixedTable from './FixedTable';
import TableFilter from './Filter';
import TableStore from './Store';

import './index.scss';

@observer
class TableComponent extends React.Component {

  ActiveTable = Table;

  constructor(props) {
    super(props);
    if (props.tableStore.config.scroll) {
      this.ActiveTable = FixedTable; // 根据配置项确认是否启用固定表头组件
    }
  }

  handleChangeTable = (pager, filter, sorterInfo) => {
    this.props.tableStore.sorter.setSorter(sorterInfo.field ? {
      field: sorterInfo.field,
      order: sorterInfo.order
    } : {});
    this.props.tableStore.onTableChange();
  };

  getRowKey = (record) => {
    let newRecord = {};
    for (let p in record) {
      let r = record[p];
      if (typeof r === 'string' || typeof r === 'number') {
        newRecord[p] = r;
      }
    }
    return newRecord;
  }

  getTotalPage = () => {
    const { tableStore } = this.props;
    const { pageSize } = tableStore.pagination;
    return `共 ${Math.ceil(tableStore.totalRecord / pageSize)}页`;
  }

  /**
   * 整理columns中的排序字段和className
   * @param {object} column column
   * @return {object} build column
   */
  buildColumn = (column) => {
    const { tableStore } = this.props;
    const { config, sorter } = tableStore;
    let _column = Object.assign({}, column);
    if (column.sorter) {
      if (config.local === true && column.sorter === true) {
        _column.sorter = (a, b) => { return a[column.dataIndex] > b[column.dataIndex] ? -1 : 1; };
      }
      _column.sortOrder = sorter.sorter.field === column.dataIndex && sorter.sorter.order;
    }
    // 过滤 hidden 标记为不显示的列
    // 整理 columns className
    let hidden = column.hidden === true || (column.hidden && column.hidden(column)) === true ? 'hidden' : '';
    let className = '';
    if (column.className && hidden) className = column.className + ' ' + hidden;
    else className = column.className || hidden;
    if (className) _column.className = className;
    return _column;
  };

  render() {
    const { tableStore, ...searchTableProps } = this.props;
    const { pagination, totalRecord, config, filter, datas } = tableStore;
    const columns = config.columns.map((va) => {
      // 检查是否存在自定义过滤字段
      let name = (va.filters ? va.filters.name : '') || va.dataIndex;
      let custom = filter.filters[name];
      if (!custom) return this.buildColumn(va);
      else {
        return Object.assign({}, this.buildColumn(va), {
          filterIcon: <Icon type='filter' style={{ color: custom.filtered ? '#108ee9' : '#aaa' }} />,
          filterDropdownVisible: custom.filterDropdownVisible,
          filterDropdown: <TableFilter
            name={name}
            onSubmit={custom.onSubmit}
            onReset={custom.onReset}
            field={custom.field}
          />,
          onFilterDropdownVisibleChange: custom.onFilterDropdownVisibleChange,
          onFilter: custom.onFilter
        }, { filters: undefined });
      }
    });
    // 分页相关属性
    const paginationProps = {
      size: 'small',
      // defaultCurrent: pagination.page,
      current: pagination.page,
      defaultPageSize: pagination.pageSize,
      total: totalRecord,
      showSizeChanger: true, // 是否可以改变pageSize
      showQuickJumper: true, // 是否可快速跳转至某页
      pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
      onShowSizeChange: tableStore.setCurrentPage,
      onChange: tableStore.setPage, // 切换分页
      showTotal: this.getTotalPage
    };
    const tableProps = {
      size: 'small',
      bordered: false,
      dataSource: datas,
      columns: columns,
      tableKey: tableStore.tableKey,
      rowKey: (record) => { return Util.generateHash(JSON.stringify(this.getRowKey(record))); },
      pagination: config.local === true ? false : paginationProps
    };
    // 初始化 FixedTable 需要的 props
    let scroll = config.scroll;
    if (scroll) {
      if (scroll === true) scroll = {};
      tableProps.scroll = scroll;
    }
    // set div className
    const { className } = searchTableProps;
    searchTableProps.className = className ? `search-table ${className}` : 'search-table';
    return (
      <div {...searchTableProps}>
        {
          config.showEmptyTable !== true || datas.length ?
            <this.ActiveTable {...tableProps} {...tableStore.configTableProps} onChange={this.handleChangeTable} /> :
            <Table key="empty-table" {...tableProps} bordered={false} />
        }
      </div>
    );
  }
}

TableComponent.TableStore = TableStore;
TableComponent.FixedTable = FixedTable;

export default TableComponent;
