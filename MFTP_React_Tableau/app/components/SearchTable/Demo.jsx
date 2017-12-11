import React from 'react';
import Translate from '../Translate';
import SearchTable from './index';
import Table from '../Table';

const { SearchForm, SearchStore } = SearchTable;

const fields = [
  { name: 'code$like', label: '员工编号', component: 'Input' },
  { name: 'name$like', label: '员工姓名', component: 'Input' },
  {
    name: 'roleIds$fin',
    label: '系统角色',
    component: 'TreeSelect',
    props: {
      multiple: true,
      treeUrl: '/api/v2/roles/list',
      treeCheckable: true
    }
  },
  {
    name: 'enable',
    label: '启用状态',
    component: 'Select',
    props: {
      dictUrl: '/api/v2/dictdatas/dict',
      dictKey: 'user_enable',
    }
  }
];

const columns = [
  { title: '用户编码', dataIndex: 'code' },
  { title: '用户名称', dataIndex: 'name' },
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
  { title: '邮箱', dataIndex: 'email' },
  {
    title: '启用状态',
    dataIndex: 'enable',
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
    this.initSearchStore();
  }

  initSearchStore = () => {
    const searchStoreConfig = {
      api: 'auth',
      searchUrl: '/api/v2/users/query',
      searchParams: { status: 1 },
      fields: fields,
      columns: columns
    };
    this.searchStore = new SearchStore(searchStoreConfig);

    const localFilterSearchConfigColumns = Object.assign([], columns);
    localFilterSearchConfigColumns[9] = {
      title: '启用状态',
      dataIndex: 'enable',
      filters: {
        name: 'enable$in',
        component: 'CheckboxGroup',
        props: {
          options: [
            { name: '可用', id: '1' },
            { name: '禁用', id: '0' }
          ]
        }
      },
      render: (text, record) => {
        return (
          <Translate value={record.enable} transUrl='/api/v2/dictdatas/dict' transKey='user_enable' />
        );
      }
    };
    const localFilterSearchStoreConfig = {
      api: 'auth',
      searchUrl: '/api/v2/users/query',
      searchParams: { status: 1 },
      fields: fields,
      columns: localFilterSearchConfigColumns
    };
    this.localFilterSearchStore = new SearchStore(localFilterSearchStoreConfig);

    const apiFilterSearchConfigColumns = Object.assign([], columns);
    apiFilterSearchConfigColumns[9] = {
      title: '启用状态',
      dataIndex: 'enable',
      filters: {
        name: 'enable$in',
        component: 'CheckboxGroup',
        props: {
          dictUrl: '/api/v2/dictdatas/dict',
          dictKey: 'user_enable'
        }
      },
      render: (text, record) => {
        return (
          <Translate value={record.enable} transUrl='/api/v2/dictdatas/dict' transKey='user_enable' />
        );
      }
    };
    const apiFilterSearchStoreConfig = {
      api: 'auth',
      searchUrl: '/api/v2/users/query',
      searchParams: { status: 1 },
      fields: fields,
      columns: apiFilterSearchConfigColumns
    };
    this.apiFilterSearchStore = new SearchStore(apiFilterSearchStoreConfig);

    const otherApiFilterSearchConfigColumns = Object.assign([], columns);
    otherApiFilterSearchConfigColumns[0] = {
      title: '用户编码',
      dataIndex: 'code',
      sorter: true,
      filters: {
        name: 'code$like',
        component: 'Input'
      }
    };
    const otherApiFilterSearchStoreConfig = {
      api: 'auth',
      searchUrl: '/api/v2/users/query',
      searchParams: { status: 1 },
      fields: fields,
      columns: otherApiFilterSearchConfigColumns
    };
    this.otherApiFilterSearchStore = new SearchStore(otherApiFilterSearchStoreConfig);

    const localSearchConfigColumns = Object.assign([], columns);
    localSearchConfigColumns[0] = {
      title: '用户编码',
      dataIndex: 'code',
      sorter: (a, b) => { return a.code > b.code ? -1 : 1; }
    };
    localSearchConfigColumns[1] = {
      title: '用户名称',
      dataIndex: 'name',
      sorter: (a, b) => { return a.name > b.name ? -1 : 1; }
    };
    localSearchConfigColumns[9] = {
      title: '启用状态',
      dataIndex: 'enable',
      filters: {
        name: 'enable$in',
        component: 'CheckboxGroup',
        props: {
          options: [
            { name: '可用', id: '1' },
            { name: '禁用', id: '0' }
          ]
        }
      },
      render: (text, record) => {
        return (
          <Translate value={record.enable} transUrl='/api/v2/dictdatas/dict' transKey='user_enable' />
        );
      }
    };
    const localSearchStoreConfig = {
      api: 'auth',
      searchUrl: '/api/v2/users/list',
      local: true,
      searchParams: { status: 1 },
      fields: fields,
      columns: localSearchConfigColumns
    };
    this.localSearchStore = new SearchStore(localSearchStoreConfig);

    const apiSearchConfigColumns = Object.assign([], columns);
    apiSearchConfigColumns[0] = {
      title: '用户编码',
      dataIndex: 'code',
      sorter: true
    };
    apiSearchConfigColumns[9] = {
      title: '启用状态',
      dataIndex: 'enable',
      filters: {
        name: 'enable$in',
        component: 'CheckboxGroup',
        props: {
          dictUrl: '/api/v2/dictdatas/dict',
          dictKey: 'user_enable'
        }
      },
      render: (text, record) => {
        return (
          <Translate value={record.enable} transUrl='/api/v2/dictdatas/dict' transKey='user_enable' />
        );
      }
    };
    const apiSearchStoreConfig = {
      api: 'auth',
      searchUrl: '/api/v2/users/query',
      searchParams: { status: 1 },
      fields: fields,
      columns: apiSearchConfigColumns
    };
    this.apiSearchStore = new SearchStore(apiSearchStoreConfig);
  }

  render() {
    return <div style={{ height: '100%' }}>
      <h1>普通展示</h1>
      <SearchForm searchStore={this.searchStore} />
      <Table tableStore={this.searchStore} />
      <h1>普通展示</h1>
      <code>{`支持 options 静态加载 checkbox `}</code>
      <SearchForm searchStore={this.localFilterSearchStore} />
      <Table tableStore={this.localFilterSearchStore} />
      <h1>普通展示</h1>
      <code>{`支持接口加载 checkbox `}</code>
      <SearchForm searchStore={this.apiFilterSearchStore} />
      <Table tableStore={this.apiFilterSearchStore} />
      <h1>普通展示</h1>
      <code>{`支持其他插件的 filter 操作 目前只支持 Input `}</code>
      <SearchForm searchStore={this.otherApiFilterSearchStore} />
      <Table tableStore={this.otherApiFilterSearchStore} />
      <h1>支持本地排序和过滤</h1>
      <code>{`此时 config 中 local 应为 true ，各字段 sorter 应传递一个函数，传递非函数时将切换服务器端排序过滤 本地过滤时分页会被禁用 注意传递的 url 要禁用分页查询`}</code>
      <SearchForm searchStore={this.localSearchStore} />
      <Table tableStore={this.localSearchStore} />
      <h1>支持服务器端排序和过滤</h1>
      <code>{`此时 config 中应不传 local 或传 false ，各字段 sorter 应传递一个 true ，传递非 true 时将会被指定为 true 并进行服务器端排序`}</code>
      <SearchForm searchStore={this.apiSearchStore} />
      <Table tableStore={this.apiSearchStore} />
    </div>;
  }
}

export default DemoComponent;
