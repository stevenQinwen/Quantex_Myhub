import { observable, action } from 'mobx';
import _ from 'lodash';
import Alert from 'components/Alert';
import API from 'utils/API';
import Util from 'utils/util';

class Store {

  constructor(config) {
    this.config = config;
    this.api = new API(config.transSite || 'auth');
  }

  @observable dictData = new Map();

  /**
   * 翻译多个字段或一个字段
   * @param dictData
   * @param props
   * @returns {*}
   */
  static translate(dictData, props) {
    let { value, nullValueContent, multiple, separator } = props;
    if (value == null) {
      return nullValueContent;
    }
    value += '';
    if (!dictData.size) {
      return value;
    }
    if (multiple) {
      let labels = value.split(',').map((v) => {
        return Store.translateSingle(dictData, v, nullValueContent);
      });
      return labels.join(separator);
    } else {
      return Store.translateSingle(dictData, value, nullValueContent);
    }
  }

  /**
   * 根据字典进行翻译，无翻译值时返回原始值或 nullValueContent
   * @param dictData
   * @param value
   * @param nullValueContent
   * @returns {*}
   */
  static translateSingle(dictData, value, nullValueContent) {
    const key = _.toString(value); // undefined or null ==> ""
    const label = dictData.get(key);
    if (label !== undefined) {
      return label;
    } else {
      return key.length ? value : nullValueContent;
    }
  }

  initDictData() {
    const { dictData, transUrl } = this.config;
    if (dictData.length) {
      if (_.isMap(dictData)) {
        this.setDictData(dictData);
      } else {
        const tempMap = new Map();
        dictData.forEach((item) => {
          tempMap.set(`${item.id}`, item.name);
        });
        this.setDictData(tempMap);
      }
    } else {
      if (!transUrl) return;
      const params = this.getUrlParams(this.config);
      this.api.get(transUrl, params).then((res) => {
        if (res.code == 200) {
          let tempMap = new Map();
          res.data.list.forEach((item) => {
            tempMap.set(`${item.id}`, item.name);
          });
          this.setDictData(tempMap);
        } else {
          Alert.error(res);
        }
      });
    }
  }

  setDictData = action((dictData) => {
    this.dictData = dictData;
  })

  updateDictData() {
    this.initDictData();
  }

  getUrlParams = (config) => {
    return {
      dictKey: config.transKey,
      query: Util.buildFilterParams(config.transParams)
    };
  }

  static getInstance(config) {
    const { dictData, transUrl, transKey } = config;
    let key = '';
    if (dictData && dictData.length) {
      key = Util.generateHash(JSON.stringify(dictData));
    } else {
      key = transUrl + transKey;
    }
    let instanceMap = Store.instanceMap;
    let store = instanceMap.get(key);
    if (store) {
      return {
        exist: true,
        store
      };
    } else {
      store = new Store(config);
      instanceMap.set(key, store);
      logger.log('instanceMap', instanceMap);
      return {
        store
      };
    }
  }
}

Store.instanceMap = new Map();

export default Store;
