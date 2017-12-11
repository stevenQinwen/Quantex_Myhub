import { observable, action } from 'mobx';
import _ from 'lodash';
import { PAGINATION } from '_config/constants';
import FilterStore from './Filter/Store';
import SorterStore from './sorter/Store';

/**
config: {
  local: bool, // 大开关, true: 本地数据过滤, false: 服务器端数据过滤
  scroll: true || {详细配置见 FixedTable 组件}, // 默认为空
  tableProps: {
    pagination: false
  }
  columns: [{
    // filters 过滤字段避免和 defaultExpandAllRows 一起使用
    // 本地排序过滤 避免和 服务器端接口排序过滤一起使用
    sorter: bool || function, // bool 时为服务器端排序 function 时为本地排序
    defaultSorter: 'asc' 'desc', // 首次加载默认排序
    hidden: bool || function, // 是否显示 hidden 为 true 或 返回 true 时 隐藏该列

    // array 时为 antd 默认过滤样式 配合 filterMultiple 决定加载单选或复选框
    // object { component, props, name } 时为自定义输入框过滤样式 目前只支持单个输入框加载 参数格式基本与 SearchForm 相同
    // name 字段为提交参数名 与 dataIndex 相同时可省略 反之请指定
    filters: array || object<{
      ... value: function 整理回传value的回调函数
    }>,
  }]
}
 */

/**
 * SearchForm Store
 */
class TableStore {
  constructor(config) {
    this.config = config;
    this.config.columns = this.config.columns || [];
    this.configTableProps = config.tableProps || {};
    // 自定义过滤字段
    this.filter = new FilterStore(this);
    this.sorter = new SorterStore(this);

    if (config.dataSource) this.setDataSource(config.dataSource);
  }

  /* =================================== OrderTable 部分开始 =================================== */
  @observable tableKey; // 负责刷新Table组件，每次需要更新Table组件数据时，更新tableKey即可
  datas = []; // antd Table 显示数据 从 cacheDatas 整理而来
  cacheDatas = [];
  pagination = { // 分页相关
    page: 1, // 默认当前页为第一页
    pageSize: PAGINATION.PAGE_SIZE
  };
  totalRecord = 0; // 用户记录数

  // 设置数据
  setDatas = (datas) => { this.datas = datas || []; };
  setPage = (page) => { this.pagination.page = page; };
  setPageSize = (pageSize) => { this.pagination.pageSize = pageSize; };
  setTotalRecord = (total) => { this.totalRecord = total || this.datas.length; };

  setCurrentPage = (current, pageSize) => {
    this.setPagination({
      page: current,
      pageSize: pageSize || this.pagination.pageSize
    });
  };
  setPagination = (pagination) => { this.pagination = pagination; };

  // 备注(Sharon): 当没有 searchForm 时, 通过服务器过滤数据则需要在 tableProps 添加一个 onTableChange 方法
  onTableChange = () => {
    if (this.config.local === true) {
      this.setDatas(this.filter.handleLocalFilter(_.cloneDeep(this.cacheDatas)));
      this.refreshTable();
    } else {
      if (this.search) this.search();
      else {
        let searchParams = {};
        if (this.sorter.sorter.field) {
          searchParams.orderBy = this.sorter.getParamOrder(this.sorter.sorter);
        }
        this.configTableProps.onChange(Object.assign(
          {},
          this.pagination,
          this.filter.filterValue,
          searchParams
        ));
      }
    }
  };

  // 设置table数据源 存在本地过滤排序时 会深拷贝数据源并进行一次过滤
  setDataSource = (datas, totalRecord) => {
    if (datas) {
      this.cacheDatas = datas;
      if (this.config.local === true) {
        this.setDatas(this.filter.handleLocalFilter(this.cacheDatas)); // 本地过滤
      } else {
        this.setDatas(this.cacheDatas);
      }
      this.totalRecord = totalRecord || datas.length;
    }
  };

  // 刷新Table数据
  refreshTable = action((datas, totalRecord) => {
    this.setDataSource(datas, totalRecord);
    this.tableKey = _.uniqueId('table');
  });
}

export default TableStore;
