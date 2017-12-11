import { observable, action } from 'mobx';
import _ from 'lodash';
import Alert from 'components/Alert';
import API from 'utils/API';
import TableStore from '../Table/Store';

/**
config: {
  api: api,
  // 各字段占用的 span 此配置将统一设置高级搜索框内各字段占用的 span
  fieldSpan: number
  // 是否允许 miniForm 搜索框
  // 为 false 时将不能切换到简易搜索框
  // 为 true 时将不能切换到高级搜素框
  // 不传时按照配置状态自动切换
  mini: bool
  searchUrl: '/api/v2/dictdatas/query',
  defaultSearchParams: {
  },
  searchParams: {
  },
  events: {
    onFetchSuccess: function<list>,
    onFetchFail: function<res>
  },
  fields: [{
    mini: bool // 配置为 false 时此配置字段将不在 简易搜索 中出现
    span: number // 此字段占用的 span
  }]
}
 */

/**
 * SearchForm Store
 */
class SearchStore extends TableStore {
  constructor(config = {}) {
    super(config);
    this.configApi = new API(config.api);
    this.configDefaultSearchParams = config.defaultSearchParams || {};
    this.configSearchParams = config.searchParams || {};
    this.configEvents = config.events || {};
    this.initFormOption();
  }

  initFormOption = () => {
    const fields = this.config.fields || [];
    this.miniNumber = this.config.mini === false ? 0 : fields.filter((va) => { return va.mini !== false; }).length;
    this.fieldsNumber = this.config.mini === true ? 0 : fields.length;
    // 只有一个搜索字段 或 没有简易搜索字段时 不显示切换按钮
    if (this.miniNumber > 0 && this.fieldsNumber > 1) this.showSwitch = true;
    else this.showSwitch = false;
    // 无 简易搜索字段 但是有 高级搜索字段时
    if (this.miniNumber < 1 && this.fieldsNumber > 0) this.setExpand(false);
  };

  /* =================================== SearchForm 部分开始 =================================== */
  searchParams = {}; // search
  @observable expand = this.config.expand !== false; // '简易搜索' : '高级搜索'
  searchFormComponent;

  setSearchFormComponent = (component) => {
    this.searchFormComponent = component;
  };
  // SearchForm 部分结束

  /* =================================== MiniForm 部分开始 =================================== */
  @observable current = ''; // 当前选中的搜索字段
  miniFormComponent;

  setCurrent = action((current) => { this.current = current; });
  SetMiniFormComponent = (component) => {
    this.miniFormComponent = component;
  }
  // MiniForm 部分结束

  /* =================================== 接口 部分开始 =================================== */
  setSearchParam = (params) => {
    this.searchParams = params;
  };

  /**
   * 点击[查询]按钮触发
   * @param searchParams
     */
  searchForm = (searchParams = {}) => {
    this.searchParams = searchParams; // 保存查询参数(用于分页查询)
    this.setCurrentPage(1); // 重置查@observable 询第一页
    this.search();
  };

  /**
   * 查询某一页(分页查询)
   * @param page
     */
  searchPage = (page) => {
    this.setCurrentPage(page);
    this.search();
  };

  /**
   * 查询
   */
  search = () => {
    // 支持通过函数的形式传入 searchParams
    let configSearchParams = typeof this.configSearchParams === 'function' ?
      this.configSearchParams() :
      _.assign({}, this.configSearchParams);
    configSearchParams.orderBy = this.sorter.makeParamOrder(configSearchParams.orderBy);
    let searchParams = Object.assign({}, this.searchParams, this.config.local !== true ? this.filter.filterValue : {});
    for (let key in searchParams) if (searchParams[key] === undefined || searchParams[key].length < 1) delete searchParams[key];
    let params = [
      {},
      this.configDefaultSearchParams,
      configSearchParams,
      searchParams,
      this.pagination
    ];
    this.fetchData(_.assign(...params));
  };

  fetchData = (params) => {
    let searchUrl = this.config.searchUrl;
    this.configApi.query(searchUrl, params)
      .then((res) => {
        if (res.code === 200) {
          let data = res.data;
          let list = data.list;
          logger.log('list', list);
          if (this.configEvents.onFetchSuccess) {
            list = this.configEvents.onFetchSuccess(list);
          }
          this.cacheDatas = list;

          if (this.config.local === true) {
            this.setDatas(this.filter.handleLocalFilter(this.cacheDatas)); // 本地过滤
          } else {
            this.setDatas(this.cacheDatas);
          }
          this.setTotalRecord(data.totalRecord);
          this.refreshTable(); // 刷新table
        } else {
          if (this.configEvents.onFetchFail) {
            this.configEvents.onFetchFail(res);
          }
          Alert.error(res);
        }
      });
  };

  setExpand = action((expand) => {
    this.expand = expand;
  });
  // 接口部分技术
}

export default SearchStore;
