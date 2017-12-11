/**
 * 数据字典常量定义
 * 代码由程序生成,请勿修改该文件
 * 如需增加常量,请到数据字典管理哪里增加,并通知相关人员重新生成常量文件
 */
const DICT = {
  a_test2_error: 1,  // 异常

  a_test3_normal: 2,  // 正常AA

  // 账户类型
  account_type_extacct: 0,  // 外部账户
  account_type_internal: 1,  // 内部账户

  // 审批状态
  approval_status_new: 0,  // 未审批
  approval_status_approved: 1,  // 审批通过
  approval_status_rejected: 2,  // 审批拒绝

  // 归档状态
  archive_status_undeal: 0,  // 未处理
  archive_status_success: 1,  // 成功
  archive_status_failed: 2,  // 失败

  // 资产类型
  asset_type_fund: 1,  // 基金
  asset_type_sub_fund: 2,  // 子基金
  asset_type_asset_unit: 3,  // 资产单元
  asset_type_strategy: 4,  // 独享资金策略
  asset_type_share_strategy: 5,  // 共享资金策略
  asset_type_cash_account: 6,  // 子账户

  // 资产单元内部子账户类型
  asset_unit_type_default: 0,  // 默认策略下的子账户
  asset_unit_type_unlock: 1,  // 未锁定的所有子账户
  asset_unit_type_all: 2,  // 资产单元下所有子账户

  // 数据权限操作
  bizprivilege_operation_showonly: -1,  // 只显示
  bizprivilege_operation_readonly: 0,  // 只读
  bizprivilege_operation_readwrite: 1,  // 读写

  // 业务类型
  business_type_stock: 0,  // 股票指令
  business_type_repo: 1,  // 债券指令
  business_type_ibbond: 2,  // 银行间现券买卖指令
  business_type_bond_enquiry: 3,  // 银行间现券买卖询价
  business_type_cd: 4,  // 同业存单

  // 按钮状态
  button_status_0: 0,  // 禁用
  button_status_1: 1,  // 启用
  button_status_2: 2,  // 禁用隐藏

  // 同业存单_期限
  cd_duration_1: 1,  // 1M
  cd_duration_12: 12,  // 12M
  cd_duration_13: 13,  // 一年以上
  cd_duration_3: 3,  // 3M
  cd_duration_6: 6,  // 6M
  cd_duration_9: 9,  // 9M

  // 同业存单_指令状态
  cd_instruction_status_0: 0,  // 意向创建
  cd_instruction_status_1: 1,  // 指令创建
  cd_instruction_status_2: 2,  // 完成投标
  cd_instruction_status_3: 3,  // 已中标
  cd_instruction_status_4: 4,  // 已缴款
  cd_instruction_status_5: 5,  // 已清算
  cd_instruction_status_6: 6,  // 已结算

  // 同业存单_标的类型
  cd_type_0: 0,  // 同业存单
  cd_type_1: 1,  // PPN
  cd_type_2: 2,  // 存款
  cd_type_3: 3,  // 其他

  // 结算方式
  clearing_type_FOP: 1,  // 纯券过户
  clearing_type_DVP: 2,  // 券款对付
  clearing_type_PAD: 3,  // 见券付款
  clearing_type_DAP: 4,  // 见款付券

  // 公司内层级
  company_group_type_company: 1,  // 公司
  company_group_type_user_group: 2,  // 用户组
  company_group_type_user: 3,  // 用户

  // 同业存单_计息方式
  compound_method_0: 0,  // 固定利率
  compound_method_1: 1,  // 浮动利率
  compound_method_4: 4,  // 累进利率
  compound_method_5: 5,  // 贴现（零息）
  compound_method_6: 6,  // 无序利率

  // 币种
  currency_CNY: 'CNY',  // 人民币
  currency_HKD: 'HKD',  // 港元
  currency_USD: 'USD',  // 美元

  // 处理结果标志
  deal_flag_undeal: 0,  // 未处理
  deal_flag_success: 1,  // 成功
  deal_flag_failed: 2,  // 失败

  // 字典类型
  dict_type_static: 0,  // 静态
  dict_type_dynamic: 1,  // 动态

  // 成交状态
  execution_status_executed: 1,  // 已成交
  execution_status_settled: 2,  // 已交收
  execution_status_end_settled: 3,  // 到期已交收

  // 计费天数
  expense_days_360: 1,  // 360
  expense_days_365: 2,  // 365

  // 费率类型
  expense_rate_type_total: 0,  // 固定金额
  expense_rate_type_rate: 1,  // 浮动费率
  expense_rate_type_segement: 2,  // 分段计费

  // 外部资金账户类型
  extaccount_type_trust_account_rmb: 1,  // 人名币托管账户
  extaccount_type_trust_account_foreign: 2,  // 外币托管账户
  extaccount_type_future_account: 3,  // 期货分仓账户

  // 质押券需求
  fi_class_1: 1,  // 利率债
  fi_class_2: 2,  // 高等级信用债
  fi_class_3: 3,  // 其他等级信用债
  fi_class_4: 4,  // 存单

  // 处理状态
  file_deal_none: 0,  // 未处理
  file_deal_success: 1,  // 成功
  file_deal_fail: 2,  // 失败

  // 冻结日类型
  freeze_day_type_paystartday: 0,  // 支付起始日
  freeze_day_type_payendday: 1,  // 支付截止日

  // 计提频率
  frequency_day: 1,  // 日
  frequency_onebyone: 2,  // 逐笔
  frequency_onebyoneeach: 3,  // 单券逐笔
  frequency_moreeach: 4,  // 多券逐笔
  frequency_month: 5,  // 月
  frequency_quarter: 6,  // 季
  frequency_year: 7,  // 年

  // 产品关闭状态
  fund_close_status_uncheck: 1,  // 未复核
  fund_close_status_firstpassed: 2,  // 首次结盘已申请
  fund_close_status_firstapproed: 3,  // 首次结盘已复核
  fund_close_status_firstreject: 4,  // 首次结盘已拒绝
  fund_close_status_clearpassed: 5,  // 产品关闭已申请
  fund_close_status_clearapproed: 6,  // 产品关闭已复核
  fund_close_status_clearreject: 7,  // 产品关闭已拒绝

  // 产品类型（待删除）
  fund_type_0: 0,  // 股票基金
  fund_type_1: 1,  // 债券基金
  fund_type_2: 2,  // 货币市场基金
  fund_type_3: 3,  // 混合基金
  fund_type_4: 4,  // 其它

  // 现券询价状态
  ibbond_enquiry_status_new: 1,  // 新询价
  ibbond_enquiry_status_unexecuted: 2,  // 未执行
  ibbond_enquiry_status_sented: 3,  // 已委托
  ibbond_enquiry_status_cancelled: 4,  // 已撤销

  // 现券买卖指令状态
  ibbond_instruction_status_canceling: 10,  // 撤销中
  ibbond_instruction_status_executed_canceled: 11,  // 已撤销
  ibbond_instruction_status_finished: 13,  // 已完成
  ibbond_instruction_status_new_complicance_rejected: 3,  // 废指令
  ibbond_instruction_status_accepted_sent: 7,  // 未执行
  ibbond_instruction_status_accepted_executed: 8,  // 执行中

  // 同业存单_信息来源
  info_source_0: 0,  // 人工
  info_source_1: 1,  // 系统

  // 指令操作类型
  instruction_operation_type_modify: 1,  // 指令修改
  instruction_operation_type_bid_adjust: 10,  // 中标调整
  instruction_operation_type_approve: 2,  // 指令审批
  instruction_operation_type_operator: 3,  // 指令操作
  instruction_operation_type_create: 4,  // 指令创建
  instruction_operation_type_cancel: 5,  // 指令撤销
  instruction_operation_type_change: 6,  // 指令变更
  instruction_operation_type_finish: 7,  // 指令完成
  instruction_operation_type_exec: 8,  // 指令执行
  instruction_operation_type_assign: 9,  // 指令重新分配

  // 指令状态
  instruction_status_stop: 0,  // 暂停中
  instruction_status_new: 1,  // 新指令
  instruction_status_canceling: 10,  // 撤销中
  instruction_status_executed_canceled: 11,  // 执行后已撤销
  instruction_status_changed: 12,  // 已变更
  instruction_status_finished: 13,  // 已完成
  instruction_status_new_complicance_approved: 2,  // 风控通过
  instruction_status_new_complicance_rejected: 3,  // 风控不通过
  instruction_status_new_approved: 4,  // 已审批
  instruction_status_new_rejected: 5,  // 已拒绝
  instruction_status_new_canceled: 6,  // 已撤销
  instruction_status_accepted_sent: 7,  // 未执行
  instruction_status_accepted_executed: 8,  // 执行中
  instruction_status_filled: 9,  // 全成交

  // 指令类型
  instruction_type_stock: 0,  // 股票指令
  instruction_type_repo: 1,  // 债券指令

  // 同业存单_付息方式
  interest_payment_way_0: 0,  // 年付
  interest_payment_way_1: 1,  // 半年付
  interest_payment_way_2: 2,  // 到期一次付

  // 是否标准费用
  is_standardfee_non_standard: 0,  // 非标准
  is_standardfee_standard: 1,  // 标准

  // 同业存单_上市地点
  listing_place_0: 0,  // 银行间交易中心
  listing_place_1: 1,  // 上海证券交易所
  listing_place_2: 2,  // 深圳证券交易所
  listing_place_3: 3,  // 其它

  // 市场编码
  market_code_IB: 'IB',  // 银行间
  market_code_SH: 'SH',  // 上海证券交易所
  market_code_SZ: 'SZ',  // 深圳证券交易所

  // 市场状态
  market_status_normal: 0,  // 正常
  market_status_stop: 1,  // 暂停交易

  // 匹配状态
  match_status_pending_match: 1,  // 待匹配
  match_status_matching: 2,  // 匹配中
  match_status_matched: 3,  // 已匹配
  match_status_executed: 4,  // 已委托
  match_status_canceled: 5,  // 已撤销

  // 用户菜单状态
  menu_status_true: 1,  // 启用
  menu_status_false: 2,  // 禁用

  // 指令执行状态
  order_execution_status_normal: 1,  // 正常
  order_execution_status_stop: 2,  // 暂停

  // 支付日类型
  pay_day_type_today: 0,  // 当天
  pay_day_type_month_firstday: 1,  // 月第一天
  pay_day_type_quarter_firstday: 2,  // 季度第一天
  pay_day_type_year_firstday: 3,  // 年第一天

  // 支付周期
  payment_frequency_day: 0,  // 日
  payment_frequency_month: 1,  // 月
  payment_frequency_quarter: 2,  // 季度
  payment_frequency_year: 3,  // 年

  // 收费单位
  payment_thrid_party_fundcompany: 0,  // 基金公司
  payment_thrid_party_chinabond: 1,  // 中债登
  payment_thrid_party_ib: 2,  // 银行间
  payment_thrid_party_clearingHouse: 3,  // 上清算
  payment_thrid_party_shse: 4,  // 上交所
  payment_thrid_party_szse: 5,  // 深交所
  payment_thrid_party_secucomm: 6,  // 证监会

  // 指令审批状态(简写)
  proc_approval_short_status_null: 0,  // 空
  proc_approval_short_status_pending_approval: 1,  // 待审批
  proc_approval_short_status_accepted: 2,  // 已通过
  proc_approval_short_status_rejected: 3,  // 已拒绝

  // 指令审批状态
  proc_approval_status_none: 0,  // 无需审批
  proc_approval_status_pending_approve: 1,  // 待审批
  proc_approval_status_first_accepted: 2,  // 一级审批通过
  proc_approval_status_first_rejected: 3,  // 一级审批拒绝
  proc_approval_status_second_accepted: 4,  // 二级审批通过
  proc_approval_status_second_rejected: 5,  // 二级审批拒绝
  proc_approval_status_third_accepted: 6,  // 三级审批通过
  proc_approval_status_third_rejected: 7,  // 三级审批拒绝

  // 指令流程分类
  proc_def_category_pledge_repo: 1,  // 质押式回购指令流程

  // eod流程状态
  process_state_unhandle: 0,  // 未处理
  process_state_handling: 1,  // 处理中
  process_state_handled: 2,  // 处理完成
  process_state_exception: 3,  // 处理失败

  // 回购指令状态
  repo_instruction_status_canceling: 10,  // 撤销中
  repo_instruction_status_canceled: 11,  // 已撤销
  repo_instruction_status_changed: 12,  // 已变更
  repo_instruction_status_finished: 13,  // 已完成
  repo_instruction_status_new_complicance_approved: 2,  // 待审批
  repo_instruction_status_complicance_rejected: 3,  // 废指令
  repo_instruction_status_pending_execute: 7,  // 未执行
  repo_instruction_status_accepted_executed: 8,  // 执行中
  repo_instruction_status_filled: 9,  // 已完成

  // 风控触警状态
  rule_check_status_err: -1,  // 异常
  rule_check_status_normal: 0,  // 正常
  rule_check_status_warn: 1,  // 预警
  rule_check_status_approve: 2,  // 审批
  rule_check_status_forbidden: 3,  // 禁止

  // 风控条款控制层级
  rule_control_level_company: 0,  // 公司
  rule_control_level_fundgroup: 1,  // 产品组
  rule_control_level_fund: 2,  // 产品
  rule_control_level_assetunit: 3,  // 资产单元
  rule_control_level_strategy: 4,  // 策略

  // 风控条款设置维度
  rule_dimension_type: 0,  // 按类型
  rule_dimension_fund: 1,  // 按产品

  // 风控交易对手级别
  rule_ibcounter_level_first: 1,  // 一级
  rule_ibcounter_level_second: 2,  // 二级
  rule_ibcounter_level_third: 3,  // 三级
  rule_ibcounter_level_fourth: 4,  // 四级

  // 交易对手黑白名单类型
  rule_ibcounter_type_white_list: 0,  // 白名单
  rule_ibcounter_type_black_list: 1,  // 黑名单

  // 风控投向池类型
  rule_invest_pool_type_allowed: 0,  // 投资池
  rule_invest_pool_type_banned: 1,  // 禁投池

  // 风控复杂因子证券属性
  rule_secu_prop_secutype: 0,  // 证券类型
  rule_secu_prop_secuboard: 1,  // 证券板块
  rule_secu_prop_market: 2,  // 交易市场

  // 风控条款状态
  rule_status_pause: 0,  // 暂停
  rule_status_start: 1,  // 启动

  // 风控条款数量单位
  rule_unit_none: 0,  // 无
  rule_unit_percent: 1,  // %(比例)
  rule_unit_stock: 2,  // 股
  rule_unit_hand: 3,  // 手
  rule_unit_sheet: 4,  // 张
  rule_unit_day: 5,  // 天
  rule_unit_month: 6,  // 月
  rule_unit_year: 7,  // 年

  // 风控条款创建步骤
  ruleitem_create_step_select_rule: 0,  // 公式选择
  ruleitem_create_step_basic_prop: 1,  // 基本属性
  ruleitem_create_step_control_prop: 2,  // 控制属性
  ruleitem_create_step_created: 3,  // 创建完成

  // 分段标准
  segement_type_due: 0,  // 期限
  segement_type_amt: 1,  // 金额

  // 分段计费取值类型
  segement_value_type_rate: 1,  // 费率
  segement_value_type_total: 2,  // 固定费用

  // 清算场所(cbr = china bond registor  shch = shanghai clearning house)
  setting_h_code_cbr: 1,  // 中债登
  setting_h_code_shch: 2,  // 上清所

  // 结算方式
  settle_method_DVP: 1,  // 券款对付
  settle_method_PUD: 2,  // 见券付款
  settle_method_DUP: 3,  // 见款付券

  // 当前所处清算页面
  settlement_page_start: 0,  // 清算开始页面
  settlement_page_process: 1,  // 清算流程页面
  settlement_page_end: 2,  // 清算结束页面

  // 清算速度
  settlement_speed_t0: 0,  // T+0
  settlement_speed_t1: 1,  // T+1

  // 日终清算步骤
  settlement_step_backup: 1,  // 数据库备份
  settlement_step_file_handle: 2,  // 文件处理
  settlement_step_execution_check: 3,  // 成交核对
  settlement_step_settlement_start: 4,  // 清算估值
  settlement_step_backup2: 5,  // 数据库再次备份

  // 状态变更操作
  status_chg_record_operation_frozen: 1,  // 冻结
  status_chg_record_operation_unfrozen: 2,  // 解冻
  status_chg_record_operation_forbit_open: 3,  // 限制开仓
  status_chg_record_operation_permit_open: 4,  // 允许开仓
  status_chg_record_operation_active: 5,  // 产品激活

  // 系统状态
  sys_status_nornal: 0,  // 正常交易
  sys_status_setting: 1,  // 清算中
  sys_status_settled: 2,  // 清算完成
  sys_status_initializing: 3,  // 初始化中
  sys_status_initialized: 4,  // 初始化完成

  // 期限类型
  term_type_0: 0,  // 行权期限
  term_type_1: 1,  // 到期期限

  // 交易方向
  trade_type_code_buy: 'B',  // 买入
  trade_type_code_RR: 'RR',  // 逆回购
  trade_type_code_sell: 'S',  // 卖出
  trade_type_code_SR: 'SR',  // 正回购

  // 消息模版操作类型
  transType_edit: 0,  // 编辑
  transType_add: 1,  // 添加

  // 持仓划拨状态
  transfer_position_status_fail: 0,  // 失败
  transfer_position_status_success: 1,  // 成功

  // 划拨状态
  transfer_status_new: 1,  // 新建
  transfer_status_passed: 2,  // 通过
  transfer_status_reject: 3,  // 拒绝
  transfer_status_part_passed: 4,  // 部分通过

  // 用户是否启用
  user_enable_false: 0,  // 禁用
  user_enable_true: 1,  // 启用

  // 用户组角色
  user_group_role_member: 0,  // 组员
  user_group_role_leader: 1,  // 组长

  // 用户状态
  user_status_status: -1,  // 状态
  user_status_frozen: 0,  // 已冻结
  user_status_enable: 1,  // 正常
  user_status_canceled: 2,  // 已注销

  // 是否
  yes_no_no: 0,  // 否
  yes_no_yes: 1,  // 是

};
export default DICT;
