import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
class TranslateComponent extends React.Component {

  constructor(props) {
    super(props);
    const { ...config } = props;
    const instance = Store.getInstance(config);
    this.store = instance.store;
    this.existInstance = instance.exist;
  }

  componentDidMount() {
    !this.existInstance && this.store.initDictData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceUpdateTrans) {
      this.store.updateDictData();
    }
  }

  /**
   * 如果 props 有变化不会直接造成组件重新 render
   * @returns {boolean}
     */
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const { showTitle } = this.props;
    let text = Store.translate(this.store.dictData, this.props);
    let props = {
      className: this.props.className
    };
    showTitle && (props.title = text);
    return (
      <span {...props}>
        {text}
      </span>
    );
  }
}

TranslateComponent.propTypes = {
  dictData: React.PropTypes.array,
  transUrl: React.PropTypes.string,
  transKey: React.PropTypes.string,
  transParams: React.PropTypes.object,
  transSite: React.PropTypes.string,
  forceUpdateTrans: React.PropTypes.bool,
  multiple: React.PropTypes.bool,
  separator: React.PropTypes.string,
  showTitle: React.PropTypes.bool
};
TranslateComponent.defaultProps = {
  localUniqueId: '', // 如果是直接传入翻译字典数据, 则需要此项来区分是不一样的本地翻译字典
  dictData: [],
  transUrl: '',
  transKey: '',
  transParams: {},
  transSite: 'auth',
  separator: '/',
  nullValueContent: '--',
  showTitle: false // 用于展示翻译的title
};

export default TranslateComponent;
