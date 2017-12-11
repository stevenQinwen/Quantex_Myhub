import React from 'react';
import { NumberFormat, Translate } from 'components';
import moment from 'moment';
import _ from 'lodash';

const { PercentFormat } = NumberFormat;

/**
 * 渲染业绩基准方法
 * @param {Array} benchmark
 */
const renderBenchmark = (benchmark) => {
  if (benchmark) {
    return benchmark.map((item, i) => {
      return <span key={i}>{i !== 0 && <span className="m-r-6"><br />+</span>}<Translate transUrl="/api/v1/dicts/{dictKey}" transSite="pas" transKey="benchmark" value={item.benchmarkCode} /> x<PercentFormat value={item.benchmarkRatio} /></span>;
    });
  } else {
    return "--";
  }
};

/**
 * 获取日期数组,1日,2周,3月
 */
const getDateList = (start, end, type = 1) => {
  type = Number(type);
  let startTime = new Date(start);
  let endTime = new Date(end);
  let length = 0;   //  日期跨度变量
  const DateFormat = "YYYY-MM-DD";
  const MonthFormat = "YYYY-MM";
  let arr = [];
  switch (type) {
    case 1:
      length = ((+endTime) - (+startTime)) / (1000 * 24 * 60 * 60) + 1;
      arr.push(moment(startTime).format(DateFormat));
      for (let i = 1; i < length; i++) {
        startTime.setDate(startTime.getDate() + 1);
        arr.push(moment(startTime).format(DateFormat));
      }
      break;
    case 2:
      length = ((+endTime) - (+startTime)) / (1000 * 24 * 60 * 60 * 7) + 1;
      arr.push(moment(startTime).format(DateFormat));
      for (let i = 1; i < length; i++) {
        startTime.setDate(startTime.getDate() + 7);
        arr.push(moment(startTime).format(DateFormat));
      }
      break;
    case 3:
      length = (endTime.getFullYear() - startTime.getFullYear()) * 12 + (endTime.getMonth() - startTime.getMonth()) + 1;
      arr.push(moment(startTime).format(MonthFormat));
      for (let i = 1; i < length; i++) {
        startTime.setMonth(startTime.getMonth() + 1);
        arr.push(moment(startTime).format(MonthFormat));
      }
      break;
    default:
      length = (endTime.getTime() - startTime.getTime()) / (1000 * 24 * 60 * 60) + 1;
      for (let i = 1; i < length; i++) {
        startTime.setDate(startTime.getDate() + 1);
        arr.push(moment(startTime).format(DateFormat));
      }
  }
  return arr;
};

/**
 * 转化为百分比并且保留2位小数
 * @param {*} value
 * @param {*} precision
 */
const fixedToPercent = (value, precision = 2) => {
  if (value instanceof Array) {
    value = value.map((item) => {
      return item && _.round(item * 100, precision);
    });
  } else {
    value = value && _.round(value * 100, precision);
  }
  return value;
};

/**
 * 转化为万元并且保留2位小数
 * @param {*} value
 * @param {*} precision
 */
const fixedToTenThousent = (value, precision = 2) => {
  if (value instanceof Array) {
    value = value.map((item) => {
      return item && _.round(item / 10000, precision);
    });
  } else {
    value = value && _.round(value / 10000, precision);
  }
  return value;
};

/**
 * 自定义Tooltip显示数值的后缀
 * @param {*} params
 * @param {String||Array} config 为了方便，第二个参数可以是 字符串 也可以是 数组 。
 * config为字符串时，所有项都加后缀config(此时config即suffix)。
 * 为数组时，需包括key(seriesName)，suffix后缀。
 *
 * config=[{
 *   key:"产品单位净值",
 *   suffix:"元"
 * },{
 *   key:"回撤",
 *   suffix:"%"
 * }]
 */
const CustomToolTipFormatter = (params, config, precision = 2) => {
  const configType = typeof config;
  let result = params.map((item) => {
    // 如果是空，返回--
    if (typeof item.value !== "number") {
      return `<div>${item.marker} ${item.seriesName}: --</div>`;
    }
    item.value = item.value.toFixed(precision);
    // 如果第二个参数是字符串，就把所有的项都加后缀
    if (configType === "string") {
      return `<div>${item.marker} ${item.seriesName}: ${item.value} ${config}</div>`;
    }
    const matchItem = config.find((configItem) => { return configItem.key === item.seriesName; });  /* TODO -> 如果横轴是刻度value，会有bug，目前没有这种需求所以懒得改  */
    // 如果在配置里找到了，则加后缀
    if (matchItem) {
      return `<div>${item.marker} ${item.seriesName}: ${item.value} ${matchItem.suffix}</div>`;
    } else {
      return `<div>${item.marker} ${item.seriesName}: ${item.value}</div>`;
    }
  });
  return `<div><div>${params[0].axisValue}</div>${result.join("")}</div>`;
};

export {
  renderBenchmark,
  getDateList,
  fixedToPercent,
  fixedToTenThousent,
  CustomToolTipFormatter
};
