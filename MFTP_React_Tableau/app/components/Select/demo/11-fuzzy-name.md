---
order: 11
title: 按需模糊搜索
---

## zh-CN

按不同字段模糊搜索。

````jsx
import { Select } from 'components';

function setFuzzyName(value){
  if (!isNaN(parseInt(value, 10))) {
    return 'ibcounterHcode$like';
  } else {
    return 'cname$like';
  }
}

ReactDOM.render(
  <Select fuzzyName={setFuzzyName} fuzzySearch={true} dictSite="qcw"  dictUrl="/api/v2/refibcounterinfos/dict" dictKey="ibcounterHcode_cname" />
, mountNode);
````
