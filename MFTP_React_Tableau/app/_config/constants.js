// FormItem 布局相关常量
const FORMITEM_LAYOUT = {
  FORM_ITEM_SPAN: 7, // FormItem span 默认一行 3 个
  FORM_LABEL_LEN: 7, // FormItem label span
  FORM_INPUT_LEN: 17 // FormItem input span
};

// 分页相关常量
const PAGINATION = {
  PAGE_SIZE: 20, // 默认每页记录数
  PAGE_SIZE_OPTIONS: ['10', '20', '30'] // 指定每页可以显示多少条数据
};

// 资产类型常量
const ASSET_TYPE = {
  FUND: 1,   // 基金
  SUB_FUND: 2,  // 子基金
  ASSET_UNIT: 3,  // 资产单元
  STRATEGY: 4,    // 独享资金策略
  SHARE_STRATEGY: 5,  // 共享资金策略
  CASH_ACCOUNT: 6   // 子账户
};

// 资金、持仓冻结解冻
const POSITION_FROZEN = {
  FROZEN: 1,   // 冻结
  UNFROZEN: 2  // 解冻
};

// 指令状态
const INST_STATUS = {
  NEW: 1,
  NEW_COMPLICANCE_APPROVED: 2,
  NEW_COMPLICANCE_REJECTED: 3,
  NEW_APPROVED: 4,
  NEW_REJECTED: 5,
  NEW_CANCELED: 6,
  ACCEPTED_SENT: 7,
  ACCEPTED_EXECUTED: 8,
  FILLED: 9,
  CANCELING: 10,
  EXECUTED_CANCELED: 11
};

export { FORMITEM_LAYOUT, PAGINATION, ASSET_TYPE, POSITION_FROZEN, INST_STATUS };
