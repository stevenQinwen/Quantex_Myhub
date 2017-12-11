'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var AbstractMenu = function (_Component) {
  _inherits(AbstractMenu, _Component);

  function AbstractMenu(props) {
    _classCallCheck(this, AbstractMenu);

    var _this = _possibleConstructorReturn(this, (AbstractMenu.__proto__ || Object.getPrototypeOf(AbstractMenu)).call(this, props));

    _initialiseProps.call(_this);

    _this.seletedItemRef = null;
    _this.state = {
      selectedItem: null,
      forceSubMenuOpen: false
    };
    return _this;
  }

  return AbstractMenu;
}(_react.Component);

AbstractMenu.propTypes = {
  children: _propTypes2.default.node.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleKeyNavigation = function (e) {
    switch (e.keyCode) {
      case 37: // left arrow
      case 27:
        // escape
        e.preventDefault();
        _this2.hideMenu(e);
        break;
      case 38:
        // up arrow
        e.preventDefault();
        _this2.selectChildren(true);
        break;
      case 40:
        // down arrow
        e.preventDefault();
        _this2.selectChildren(false);
        break;
      case 39:
        // right arrow
        _this2.tryToOpenSubMenu(e);
        break;
      case 13:
        // enter
        e.preventDefault();
        _this2.tryToOpenSubMenu(e);
        if (_this2.seletedItemRef && _this2.seletedItemRef.ref instanceof HTMLElement) {
          _this2.seletedItemRef.ref.click();
        }
        break;
      default:
      // do nothing
    }
  };

  this.handleForceClose = function () {
    _this2.setState({ forceSubMenuOpen: false });
  };

  this.tryToOpenSubMenu = function (e) {
    if (_this2.state.selectedItem && _this2.state.selectedItem.type === _this2.getSubMenuType()) {
      e.preventDefault();
      _this2.setState({ forceSubMenuOpen: true });
    }
  };

  this.selectChildren = function (forward) {
    var selectedItem = _this2.state.selectedItem;

    var children = [];
    _react2.default.Children.forEach(_this2.props.children, function (child) {
      if ([_MenuItem2.default, _this2.getSubMenuType()].indexOf(child.type) > -1 && !child.props.divider) {
        children.push(child);
      }
    });
    var currentIndex = children.indexOf(selectedItem);
    if (currentIndex < 0) {
      _this2.setState({
        selectedItem: forward ? children[children.length - 1] : children[0],
        forceSubMenuOpen: false
      });
    } else if (forward) {
      _this2.setState({
        selectedItem: children[currentIndex - 1 < 0 ? children.length - 1 : currentIndex - 1],
        forceSubMenuOpen: false
      });
    } else {
      _this2.setState({
        selectedItem: children[currentIndex + 1 < children.length ? currentIndex + 1 : 0],
        forceSubMenuOpen: false
      });
    }
  };

  this.onChildMouseMove = function (child) {
    if (_this2.state.selectedItem !== child) {
      _this2.setState({ selectedItem: child, forceSubMenuOpen: false });
    }
  };

  this.onChildMouseLeave = function () {
    _this2.setState({ selectedItem: null, forceSubMenuOpen: false });
  };

  this.renderChildren = function (children) {
    return _react2.default.Children.map(children, function (child) {
      var props = {};
      if (!_react2.default.isValidElement(child)) return null;
      if (child.type === _this2.getSubMenuType()) {
        props.forceOpen = _this2.state.forceSubMenuOpen && _this2.state.selectedItem === child;
        props.forceClose = _this2.handleForceClose;
        props.parentKeyNavigationHandler = _this2.handleKeyNavigation;
      }
      if ([_MenuItem2.default, _this2.getSubMenuType()].indexOf(child.type) > -1 && !child.props.divider) {
        if (_this2.state.selectedItem === child) {
          props.selected = true;
          props.onMouseLeave = _this2.onChildMouseLeave.bind(_this2);
          props.ref = function (ref) {
            _this2.seletedItemRef = ref;
          };
          return _react2.default.cloneElement(child, props);
        }
      }
      props.onMouseMove = function () {
        return _this2.onChildMouseMove(child);
      };
      props.onMouseLeave = _this2.onChildMouseLeave.bind(_this2);
      return _react2.default.cloneElement(child, props);
    });
  };
};

exports.default = AbstractMenu;
