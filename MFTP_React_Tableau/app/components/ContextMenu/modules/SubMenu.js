'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AbstractMenu2 = require('./AbstractMenu');

var _AbstractMenu3 = _interopRequireDefault(_AbstractMenu2);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
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

var SubMenu = function (_AbstractMenu) {
  _inherits(SubMenu, _AbstractMenu);

  function SubMenu(props) {
    _classCallCheck(this, SubMenu);

    var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

    _this.getMenuPosition = function () {
      var _window = window,
        innerWidth = _window.innerWidth,
        innerHeight = _window.innerHeight;

      var rect = _this.subMenu.getBoundingClientRect();
      var position = {};

      if (rect.bottom > innerHeight) {
        position.bottom = 0;
      } else {
        position.top = 0;
      }

      if (rect.right < innerWidth) {
        position.left = '100%';
      } else {
        position.right = '100%';
      }

      return position;
    };

    _this.getRTLMenuPosition = function () {
      var _window2 = window,
        innerHeight = _window2.innerHeight;

      var rect = _this.subMenu.getBoundingClientRect();
      var position = {};

      if (rect.bottom > innerHeight) {
        position.bottom = 0;
      } else {
        position.top = 0;
      }

      if (rect.left < 0) {
        position.left = '100%';
      } else {
        position.right = '100%';
      }

      return position;
    };

    _this.hideMenu = function () {
      if (_this.props.forceOpen) {
        _this.props.forceClose();
      }
      _this.setState({ visible: false, selectedItem: null });
    };

    _this.handleClick = function (e) {
      e.preventDefault();
    };

    _this.handleMouseEnter = function () {
      if (_this.closetimer) clearTimeout(_this.closetimer);

      if (_this.props.disabled || _this.state.visible) return;

      _this.opentimer = setTimeout(function () {
        return _this.setState({
          visible: true,
          selectedItem: null
        });
      }, _this.props.hoverDelay);
    };

    _this.handleMouseLeave = function () {
      if (_this.opentimer) clearTimeout(_this.opentimer);

      if (!_this.state.visible) return;

      _this.closetimer = setTimeout(function () {
        return _this.setState({
          visible: false,
          selectedItem: null
        });
      }, _this.props.hoverDelay);
    };

    _this.menuRef = function (c) {
      _this.menu = c;
    };

    _this.subMenuRef = function (c) {
      _this.subMenu = c;
    };

    _this.registerHandlers = function () {
      document.removeEventListener('keydown', _this.props.parentKeyNavigationHandler);
      document.addEventListener('keydown', _this.handleKeyNavigation);
    };

    _this.unregisterHandlers = function () {
      document.removeEventListener('keydown', _this.handleKeyNavigation);
      document.addEventListener('keydown', _this.props.parentKeyNavigationHandler);
    };

    _this.state = Object.assign({}, _this.state, {
      visible: false
    });
    return _this;
  }

  _createClass(SubMenu, [{
    key: 'getSubMenuType',
    value: function getSubMenuType() {
      // eslint-disable-line class-methods-use-this
      return SubMenu;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      this.isVisibilityChange = (this.state.visible !== nextState.visible || this.props.forceOpen !== nextProps.forceOpen) && !(this.state.visible && nextProps.forceOpen) && !(this.props.forceOpen && nextState.visible);
      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (!this.isVisibilityChange) return;
      if (this.props.forceOpen || this.state.visible) {
        var wrapper = window.requestAnimationFrame || setTimeout;
        wrapper(function () {
          var styles = _this2.props.rtl ? _this2.getRTLMenuPosition() : _this2.getMenuPosition();

          _this2.subMenu.style.removeProperty('top');
          _this2.subMenu.style.removeProperty('bottom');
          _this2.subMenu.style.removeProperty('left');
          _this2.subMenu.style.removeProperty('right');

          if ((0, _helpers.hasOwnProp)(styles, 'top')) _this2.subMenu.style.top = styles.top;
          if ((0, _helpers.hasOwnProp)(styles, 'left')) _this2.subMenu.style.left = styles.left;
          if ((0, _helpers.hasOwnProp)(styles, 'bottom')) _this2.subMenu.style.bottom = styles.bottom;
          if ((0, _helpers.hasOwnProp)(styles, 'right')) _this2.subMenu.style.right = styles.right;
          _this2.subMenu.classList.add(_helpers.cssClasses.menuVisible);

          _this2.registerHandlers();
          _this2.setState({ selectedItem: null });
        });
      } else {
        this.subMenu.classList.remove(_helpers.cssClasses.menuVisible);
        this.subMenu.style.removeProperty('bottom');
        this.subMenu.style.removeProperty('right');
        this.subMenu.style.top = 0;
        this.subMenu.style.left = '100%';
        this.unregisterHandlers();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.opentimer) clearTimeout(this.opentimer);

      if (this.closetimer) clearTimeout(this.closetimer);

      this.unregisterHandlers();
    }
  }, {
    key: 'render',
    value: function render() {
      var _cx;

      var _props = this.props,
        children = _props.children,
        disabled = _props.disabled,
        title = _props.title,
        selected = _props.selected;
      var visible = this.state.visible;

      var menuProps = {
        ref: this.menuRef,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        className: (0, _classnames2.default)(_helpers.cssClasses.menuItem, _helpers.cssClasses.subMenu),
        style: {
          position: 'relative'
        }
      };
      var menuItemProps = {
        className: (0, _classnames2.default)(_helpers.cssClasses.menuItem, (_cx = {}, _defineProperty(_cx, _helpers.cssClasses.menuItemDisabled, disabled), _defineProperty(_cx, _helpers.cssClasses.menuItemActive, visible), _defineProperty(_cx, _helpers.cssClasses.menuItemSelected, selected), _cx)),
        onMouseMove: this.props.onMouseMove,
        onMouseOut: this.props.onMouseOut,
        onClick: this.handleClick
      };
      var subMenuProps = {
        ref: this.subMenuRef,
        style: {
          position: 'absolute',
          top: 0,
          left: '100%'
        },
        className: (0, _classnames2.default)(_helpers.cssClasses.menu, this.props.className)
      };

      return _react2.default.createElement(
        'nav',
        _extends({}, menuProps, { role: 'menuitem', tabIndex: '-1', 'aria-haspopup': 'true' }),
        _react2.default.createElement(
          'div',
          menuItemProps,
          title
        ),
        _react2.default.createElement(
          'nav',
          _extends({}, subMenuProps, { role: 'menu', tabIndex: '-1' }),
          this.renderChildren(children)
        )
      );
    }
  }]);

  return SubMenu;
}(_AbstractMenu3.default);

SubMenu.propTypes = {
  children: _propTypes2.default.node.isRequired,
  title: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  hoverDelay: _propTypes2.default.number,
  rtl: _propTypes2.default.bool,
  selected: _propTypes2.default.bool,
  onMouseMove: _propTypes2.default.func.isRequired,
  onMouseOut: _propTypes2.default.func.isRequired,
  forceOpen: _propTypes2.default.bool.isRequired,
  forceClose: _propTypes2.default.func.isRequired,
  parentKeyNavigationHandler: _propTypes2.default.func.isRequired
};
SubMenu.defaultProps = {
  disabled: false,
  hoverDelay: 500,
  className: '',
  rtl: false,
  selected: false
};
exports.default = SubMenu;
