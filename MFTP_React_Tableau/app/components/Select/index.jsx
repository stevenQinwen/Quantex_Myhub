import React from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import Util from 'utils/util';
import API from 'utils/API';

const styles = require('./index.scss');

const Option = Select.Option;
const FUZZY_SEARCH_DEBOUNCE_DELAY = 800;

class SelectComponent extends React.Component {

  constructor(props) {
    super(props);
    this.api = new API(props.dictSite);
    this.fetchFuzzySearchDictData = _.debounce(this.fetchFuzzySearchDictData, FUZZY_SEARCH_DEBOUNCE_DELAY);
  }

  state = {
    options: []
  }

  componentDidMount() {
    // TODO 移开焦点让组件自动选中第一项时不会触发 onSelect 事件
    // 设置模糊搜索标志位，解决 issue：https://github.com/ant-design/ant-design/issues/2954
    this.fuzzySearch = true;
    this.initDictData(this.props);
    // 添加一个初始化数值的trigger
    // 使用场景：比如「风控管理-基础数据-证券池设置-编辑动态证券池表单」，初进表单时，多行表单，Input1有值，Input3要依赖Input1的onChange事件来获取它的类型和取选项方式
    //          即：使初始化已有值时，触发原来onChange的事件
    this.props.onInit();
  }

  /**
   * 判断 props 的更改是否达到了更新组件的条件
   * 只有几个主要的数据属性变化 props 的更新操作不直接造成组件的更新
   * 而是通过 initDictData 中去触发 setState 方法重新渲染组件
   * @param nextProps
     */
  componentWillReceiveProps(nextProps) {
    // 一旦 dictSite 有变化，重新赋值 this.api
    if (this.props.dictSite !== nextProps.dictSite) {
      this.api = new API(nextProps.dictSite);
    }
    if (nextProps.forceUpdateDict
      || this.shouldUpdateWhenMainPropsChange(nextProps)) {
      this.updateWhenMainPropsChange = true;
      this.initDictData(nextProps);
    } else {
      this.updateWhenMainPropsChange = false;
    }
  }

  /**
   * 如果是 state 的改变引起的更新操作, 则一定会重新渲染组件
   * 如果是 props 的改变造成的更新则不进行重新的 render
   * 如果 forceUpdateDict 属性为 true 则会强制重新渲染组件
   * 如果非主要数据属性的更改造成的 props 变化会重新render
   * @param nextProps
   * @param nextState
   * @returns {boolean}
     */
  shouldComponentUpdate(nextProps, nextState) {
    return this.shouldUpdateWhenStateChange(nextState)
      || !this.updateWhenMainPropsChange;
  }

  /**
   * 如果是 dictData/dictUrl/dictParams 等影响数据变化的主要属性有所变化则会返回 true
   * 满足以下两种情况之一即视为 props 的更改会造成组件重新渲染
   * @param nextProps
   * @returns {*|boolean}
     */
  shouldUpdateWhenMainPropsChange = (nextProps) => {
    const { dictData, dictUrl, dictParams, dictKey } = this.props;
    return (
      !Util.isArrayEqual(dictData, nextProps.dictData)
      || !_.isEqual(dictParams, nextProps.dictParams)
      || dictUrl !== nextProps.dictUrl
      || dictKey !== nextProps.dictKey
    );
  }

  /**
   * 判断是 state 的变化是否会影响组件重新渲染
   * @param nextState
   * @returns {boolean}
   */
  shouldUpdateWhenStateChange = (nextState) => {
    const { options } = this.state;
    return !Util.isArrayEqual(options, nextState.options);
  }

  setOptions = (options = []) => {
    this.setState({
      options
    });
  }

  getUrlParams = (props, fuzzySearchDictParams = {}) => {
    return Object.assign({
      dictKey: props.dictKey,
      query: Util.buildFilterParams(props.dictParams, fuzzySearchDictParams)
    });
  }

  /**
   * 主要是初始化网络请求数据
   * @param props
     */
  initDictData = (props) => {
    const { dictData, dictUrl, fuzzySearch } = props;
    if (!fuzzySearch) {
      // 非模糊搜索模式下的初始化处理
      if (dictData.length) {
        this.setOptions(dictData);
      } else if (dictUrl) {
        const params = this.getUrlParams(props);
        this.api.get(dictUrl, params).then((res) => {
          if (res.code == 200) {
            this.setOptions(res.data.list);
          }
        });
      }
    } else {
      // 如果是模糊搜索类型, 则配置一个是否已经请求完初始化模糊搜索数据的标志位, 用于 render 的时候判断是第一次挂载
      fuzzySearch && (this.isInitFuzzySearch = false);
      this.fetchFuzzySearchDictData('');
    }
  }

  /**
   * 模糊搜索网络查询
   * @param value
     */
  fetchFuzzySearchDictData = (value) => {
    const { dictUrl, fuzzyName } = this.props;
    const { options } = this.state;

    let fuzzyPropName = fuzzyName;
    if (_.isFunction(fuzzyName)) {
      fuzzyPropName = fuzzyName(value); // 入参为人为输入的 search 值
    }
    const params = this.getUrlParams(this.props, {
      [fuzzyPropName]: value, // 根据 input 框的值进行模糊搜索
      pageSize: 8 // 请求数据条数限制
    });

    options.length && this.setOptions([]); // 如果当前下拉列表有数据则清空

    this.api.get(dictUrl, params)
      .then((res) => {
        if (!this.isInitFuzzySearch) {
          this.isInitFuzzySearch = true; // 第一次请求返回结果之后这个标志位
        }
        this.setOptions(res.data.list);
      });
  };

  /**
   * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
   * @param value string/object/array
     */
  onChange = (value) => {
    // 单选情况下 value 为 string
    // labelInValue 为 true 时 value 为 object { key: '', label: '' }
    // 多选情况下 value 为 array
    logger.log('value:', value, window.event);
    this.props.onChange(value);
  };

  /**
   * 选中某一项触发
   * @param value
   * @param option
   */
  onSelect = (value, option) => {
    logger.log('select:', value);
    this.fuzzySearch = false;
    this.props.onSelect(value, option);
  };

  /**
   * 选中某一项触发
   * @param value
   * @param option
   */
  onBlur = (value) => {
    logger.log('blur:', value);
    this.props.onBlur(value);
  };

  /**
   * 文本框值变化时回调
   * @param value string
     */
  onSearch = (value) => {
    logger.log('searchValue:', value);
    const { fuzzySearch } = this.props;
    // 模糊搜索
    if (fuzzySearch && this.fuzzySearch) {
      this.fetchFuzzySearchDictData(value);
    }
    if (this.fuzzySearch === false) {
      this.fuzzySearch = true;
    }
    this.props.onSearch(value);
  }

  /**
   * 根据过滤条件渲染 Options
   * @returns {Array}
     */
  renderOptions = (options) => {
    let { disabledValues, hiddenValues } = this.props;
    disabledValues = Util.valuesToStrings(disabledValues);
    hiddenValues = Util.valuesToStrings(hiddenValues);

    if ('enabledValues' in this.props) {
      // 如果传入了 enableValues 则重新生成 disabledValues
      let { enabledValues } = this.props;
      disabledValues = [];
      enabledValues = Util.valuesToStrings(enabledValues);
      options.forEach((item) => {
        if (!enabledValues.includes(`${item.id}`)) {
          disabledValues.push(`${item.id}`);
        }
      });
    }

    // 过滤掉隐藏的数据
    if (hiddenValues.length) {
      options = options.filter((item) => {
        return !hiddenValues.includes(`${item.id}`);
      });
    }
    return options.map((item) => {
      const id = `${item.id}`;
      return (
        <Option key={id}
                value={id}
                disabled={disabledValues.includes(id)}
        >{item.name}</Option>
      );
    });
  }

  render() {
    let { fuzzySearch, notFoundContent, mode, defaultValue, value, defaultSelectFirstOption, preHandleDictData, disabled } = this.props;
    let { options } = this.state;

    if (preHandleDictData) {
      options = preHandleDictData(options);
    }

    // 将 defaultValue 内的所有值转成字符串
    defaultValue = Util.valuesToStrings(defaultValue);
    // 将 value 内的所有值转成字符串
    value = Util.valuesToStrings(value);

    // 如果外部没有传入 defaultValue 且 defaultSelectFirstOption 为 true 则会进行默认选中第一项的赋值
    if (_.isUndefined(defaultValue) && defaultSelectFirstOption && _.isObject(options[0])) {
      if (mode === 'multiple' || mode === 'tags') {
        defaultValue = [`${options[0].id}`];
      } else {
        defaultValue = `${options[0].id}`;
      }
    }
    const props = {
      defaultValue,
      onChange: this.onChange,
      onSearch: this.onSearch,
      onSelect: this.onSelect,
      onBlur: this.onBlur,
      ref: this.props.innerRef,
      className: `${styles.root} ${this.props.className || ''}`,
      onInit: this.onInit
    };

    // 当 this.props.value 不为空时才能传入 value 这个字段到 Select 组件, 不然会导致默认显示出 bug
    if (!_.isUndefined(value)) {
      props.value = value;
    }

    return (
      options.length || fuzzySearch && this.isInitFuzzySearch ? (
        <Select {...this.props} {...props}>
          {this.renderOptions(options)}
        </Select>
      ) : (
        <Select key="empty-select" notFoundContent={notFoundContent} className={styles.root} size="small" disabled={disabled}/>
      )
    );
  }
}

SelectComponent.propTypes = {
  // ===========Custom-Select==============
  dictData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  dictKey: React.PropTypes.string,
  dictParams: React.PropTypes.object,
  dictSite: React.PropTypes.string,
  disabledValues: React.PropTypes.array,
  enabledValues: React.PropTypes.array,
  hiddenValues: React.PropTypes.array,
  fuzzySearch: React.PropTypes.bool,
  fuzzyName: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  forceUpdateDict: React.PropTypes.bool,
  preHandleDictData: React.PropTypes.func,
  onInit: React.PropTypes.func,                         // 设置初始值时（edit表单），触发事件 - 函数类型
};

SelectComponent.defaultProps = {
  // ===========Custom-Select==============
  dictData: [],
  dictParams: {},
  dictSite: 'auth',
  disabledValues: [],
  hiddenValues: [],
  fuzzySearch: false,
  fuzzyName: 'name$like', // 自定义模糊搜索字段名
  // =============Ant-Select===============
  // mode 默认为单选且不带自动提示
  // 'multiple'(多选)
  // 'tags'(自定义条目)
  // 'combobox'(自动提示,不清除value,所以无需从第一个字符重新进行搜索)
  placeholder: "请选择",
  notFoundContent: "暂无数据",
  size: 'small',
  showSearch: true,
  // 根据显示值与option显示值的比较来过滤
  filterOption: (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
  optionFilterProp: "children", // 默认搜索label值
  optionLabelProp: "children", // 默认均将item.name值回填到输入框中
  onChange: () => {},
  onSearch: () => {},
  onSelect: () => {},
  onBlur: () => {},
  innerRef: () => {}, // 设置ref属性
  onInit: () => {},                                     // 设置初始值时（edit表单），触发事件
};

export default SelectComponent;
