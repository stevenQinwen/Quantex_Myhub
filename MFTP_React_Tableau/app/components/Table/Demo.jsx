import React from 'react';
import _ from 'lodash';
import API from 'utils/API';
import Translate from '../Translate';
import Table from './index';
import TableStore from './Store';

const columns = [
  {
    title: '用户编码',
    dataIndex: 'code',
    sorter: (a, b) => { return a.code > b.code ? -1 : 1; },
    defaultSorter: 'asc',
    filters: {
      name: 'code',
      component: "Input"
    }
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    filters: {
      name: 'name$like',
      component: "Input"
    }
  },
  {
    title: '所属公司',
    dataIndex: 'companyId',
    render: (text, record) => {
      return (
        <Translate value={record.companyId} transUrl='/api/v2/companies/dict' transKey='id_name' />
      );
    }
  },
  {
    title: '系统角色',
    dataIndex: 'roleIds',
    render: (text, record) => {
      return (
        <Translate value={record.roleIds} transUrl='/api/v2/roles/dict' multiple transKey='id_name' />
      );
    }
  },
  {
    title: '用户组',
    dataIndex: 'groupIds',
    render: (text, record) => {
      return (
        <Translate value={record.groupIds} transUrl='/api/v2/groups/dict' multiple transKey='id_name' />
      );
    }
  },
  { title: '岗位', dataIndex: 'position' },
  { title: '移动电话', dataIndex: 'mobilePhone' },
  { title: '办公电话', dataIndex: 'officePhone' },
  {
    title: '邮箱',
    dataIndex: 'email',
    filters: {
      name: 'email$gte$$s_timestamp-email$lte$$e_timestamp',
      component: 'DateRangePicker'
    }
  },
  {
    title: '启用状态',
    dataIndex: 'enable',
    filters: {
      name: 'enable$gte-enable$lte',
      component: 'InputGroup',
      props: {
        items: [{
          component: 'TenThousandNumber',
          index: 0,
          props: {
            placeholder: '最小金额'
          }
        }, {
          component: 'TenThousandNumber',
          index: 1,
          props: {
            placeholder: '最大金额'
          }
        }]
      }
    },
    render: (text, record) => {
      return (
        <Translate value={record.enable} transUrl='/api/v2/dictdatas/dict' transKey='user_enable' />
      );
    }
  }
];

class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.tableStore = new TableStore({
      columns: columns,
      // local: true,
      tableProps: {
        onChange: this.search
      }
    });

    let hideTableColumns = _.cloneDeep(columns);
    this.hideTableStore = new TableStore({
      columns: hideTableColumns,
      // local: true,
      tableProps: {
        onChange: this.search
      }
    });
  }

  componentDidMount() {
    this.search({ page: 1, pageSize: 20 });
  }

  search = (param = {}) => {
    new API('auth').query('/api/v2/users/query', param).then((res) => {
      if (res.code == 200) {
        this.tableStore.refreshTable(res.data.list, res.data.totalRecord);
        this.hideTableStore.refreshTable(res.data.list, res.data.totalRecord);
      }
    });
  };

  hide = () => {
    this.hideTableStore.config.columns[0].hidden = !this.hideTableStore.config.columns[0].hidden;
    this.hideTableStore.refreshTable();
  };

  render() {
    return <div style={{ height: '100%' }}>
      <h1>普通展示</h1>
      <Table tableStore={this.tableStore} />
      <h1>普通展示 隐藏指定的列</h1>
      <a onClick={this.hide}>hide code</a>
      <Table tableStore={this.hideTableStore} />
    </div>;
  }
}

export default DemoComponent;
