import { observable, action } from 'mobx';
import _ from 'lodash';
import { Alert } from 'components';
import { API } from 'utils';

export default class Store {
  option = {};
  @observable chartKey;
  @observable loading = false;
  constructor(config) {
    const { api = "pas" } = config;
    this.config = config;
    this.api = new API(api);
  }

  refreshChart = action(() => {
    this.chartKey = _.uniqueId("chart_");
  })

  setLoadingStatus = action((status) => {
    this.loading = status;
  })

  fetchData = () => {
    const { params = {}, url = "", makeOption } = this.config;
    let par = typeof params === "function" ? params() : params;
    this.setLoadingStatus(true);
    this.api.get(url, par)
      .then((res) => {
        if (res.code === 200) {
          if (makeOption) {
            this.option = makeOption(res.data);
            this.refreshChart();
          }
        } else {
          Alert.error(res);
        }
        this.setLoadingStatus(false);
      });
  }
}
