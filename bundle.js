'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactHooks = require('react-hooks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// with placeholders for the methods in Analytics.js, so you don't have to wait for it to
// load before recording data. The data is stored and replayed once the script loads.
// Taken from segment snippet v.4.13.2.

var stubAnalytics = [];
stubAnalytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'page', 'once', 'off', 'on'];

stubAnalytics.factory = function (method) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(method);
    stubAnalytics.push(args);
    return stubAnalytics;
  };
};

for (var i = 0; i < stubAnalytics.methods.length; i++) {
  var key = stubAnalytics.methods[i];
  stubAnalytics[key] = stubAnalytics.factory(key);
}

var AnalyticsContext = /*#__PURE__*/React.createContext();
var AnalyticsProvider = function AnalyticsProvider(_ref) {
  var writeKey = _ref.writeKey,
      children = _ref.children;

  /*
    An Context Provider which injects the Analytics.js script in
    the page head, and creates a context with the analytics object,
  */
  var _useState = React.useState(stubAnalytics),
      _useState2 = _slicedToArray(_useState, 2),
      analytics = _useState2[0],
      setAnalytics = _useState2[1];

  var onLoad = function onLoad() {
    return setAnalytics(window.analytics);
  };

  reactHooks.useScript("https://cdn.segment.com/analytics.js/v1/" + writeKey + "/analytics.min.js", onLoad);
  return /*#__PURE__*/React__default['default'].createElement(AnalyticsContext.Provider, {
    value: {
      analytics: analytics
    }
  }, children);
};
var useAnalytics = function useAnalytics() {
  /*
   Hook that allows you to access the analytics object in function components.
  */
  var context = React.useContext(AnalyticsContext);

  if (context === undefined) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider');
  } // return memoized analytics object, so you can use it as a dependency in e.g.
  // useEffect without having to include it in the dependency array.


  return reactHooks.useDeepCompareMemo(function () {
    return context.analytics;
  }, [context.analytics]);
};

exports.AnalyticsContext = AnalyticsContext;
exports.AnalyticsProvider = AnalyticsProvider;
exports.useAnalytics = useAnalytics;
