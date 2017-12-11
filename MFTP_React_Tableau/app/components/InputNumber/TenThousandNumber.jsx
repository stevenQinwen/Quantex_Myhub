import InputNumber from './InputNumber';

class TenThousandNumber extends InputNumber {

}

TenThousandNumber.defaultProps = Object.assign({}, InputNumber.defaultProps, {
  addonAfter: '万',
  scale: 10000
});

export default TenThousandNumber;
