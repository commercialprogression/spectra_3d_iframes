/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
(function() {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/*** EXPORTS FROM exports-loader ***/
module.exports = global.fetch;
}.call(global));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fetch) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONHTTPError = exports.TextHTTPError = exports.HTTPError = exports.getPagination = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pagination = __webpack_require__(10);

Object.defineProperty(exports, "getPagination", {
  enumerable: true,
  get: function get() {
    return _pagination.getPagination;
  }
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var HTTPError = exports.HTTPError = function (_extendableBuiltin2) {
  _inherits(HTTPError, _extendableBuiltin2);

  function HTTPError(response) {
    _classCallCheck(this, HTTPError);

    var _this = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, response.statusText));

    _this.name = _this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(response.statusText).stack;
    }
    _this.status = response.status;
    return _this;
  }

  return HTTPError;
}(_extendableBuiltin(Error));

var TextHTTPError = exports.TextHTTPError = function (_HTTPError) {
  _inherits(TextHTTPError, _HTTPError);

  function TextHTTPError(response, data) {
    _classCallCheck(this, TextHTTPError);

    var _this2 = _possibleConstructorReturn(this, (TextHTTPError.__proto__ || Object.getPrototypeOf(TextHTTPError)).call(this, response));

    _this2.data = data;
    return _this2;
  }

  return TextHTTPError;
}(HTTPError);

var JSONHTTPError = exports.JSONHTTPError = function (_HTTPError2) {
  _inherits(JSONHTTPError, _HTTPError2);

  function JSONHTTPError(response, json) {
    _classCallCheck(this, JSONHTTPError);

    var _this3 = _possibleConstructorReturn(this, (JSONHTTPError.__proto__ || Object.getPrototypeOf(JSONHTTPError)).call(this, response));

    _this3.json = json;
    return _this3;
  }

  return JSONHTTPError;
}(HTTPError);

var API = function () {
  function API() {
    var apiURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments[1];

    _classCallCheck(this, API);

    this.apiURL = apiURL;
    if (this.apiURL.match(/\/[^\/]?/)) {
      // eslint-disable-line no-useless-escape
      this._sameOrigin = true;
    }
    this.defaultHeaders = options && options.defaultHeaders || {};
  }

  _createClass(API, [{
    key: "headers",
    value: function headers() {
      var _headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({}, this.defaultHeaders, {
        "Content-Type": "application/json"
      }, _headers);
    }
  }, {
    key: "parseJsonResponse",
    value: function parseJsonResponse(response) {
      return response.json().then(function (json) {
        if (!response.ok) {
          return Promise.reject(new JSONHTTPError(response, json));
        }

        var pagination = (0, _pagination.getPagination)(response);
        return pagination ? { pagination: pagination, items: json } : json;
      });
    }
  }, {
    key: "request",
    value: function request(path) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var headers = this.headers(options.headers || {});
      if (this._sameOrigin) {
        options.credentials = options.credentials || "same-origin";
      }
      return fetch(this.apiURL + path, _extends({}, options, { headers: headers })).then(function (response) {
        var contentType = response.headers.get("Content-Type");
        if (contentType && contentType.match(/json/)) {
          return _this4.parseJsonResponse(response);
        }

        if (!response.ok) {
          return response.text().then(function (data) {
            return Promise.reject(new TextHTTPError(response, data));
          });
        }
        return response.text().then(function (data) {
          data;
        });
      });
    }
  }]);

  return API;
}();

exports.default = API;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.user = undefined;

var _gotrueJs = __webpack_require__(9);

var _gotrueJs2 = _interopRequireDefault(_gotrueJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup the auth object.
var auth = new _gotrueJs2.default({
  APIUrl: "https://dentsplyprosthetics-clinician.netlify.com/.netlify/identity"
});

// Attempt to grab user.

// Import our stuffs.
var user = auth.currentUser();

// Netlify CMS.
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", function (user) {
    if (!user) {
      window.netlifyIdentity.on("login", function () {
        document.location.href = "/";
      });
    }
  });
}

// Export some things.
exports.user = user;
exports.auth = auth;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _microApiClient = __webpack_require__(4);

var _microApiClient2 = _interopRequireDefault(_microApiClient);

var _user = __webpack_require__(11);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTPRegexp = /^http:\/\//;
var defaultApiURL = "/.netlify/identity";

var GoTrue = function () {
  function GoTrue() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$APIUrl = _ref.APIUrl,
        APIUrl = _ref$APIUrl === undefined ? defaultApiURL : _ref$APIUrl,
        _ref$audience = _ref.audience,
        audience = _ref$audience === undefined ? "" : _ref$audience,
        _ref$setCookie = _ref.setCookie,
        setCookie = _ref$setCookie === undefined ? false : _ref$setCookie;

    _classCallCheck(this, GoTrue);

    if (APIUrl.match(HTTPRegexp)) {
      console.warn("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely.");
    }

    if (audience) {
      this.audience = audience;
    }

    this.setCookie = setCookie;

    this.api = new _microApiClient2.default(APIUrl);
  }

  _createClass(GoTrue, [{
    key: "_request",
    value: function _request(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options.headers = options.headers || {};
      var aud = options.audience || this.audience;
      if (aud) {
        options.headers["X-JWT-AUD"] = aud;
      }
      return this.api.request(path, options).catch(function (err) {
        if (err instanceof _microApiClient.JSONHTTPError && err.json) {
          if (err.json.msg) {
            err.message = err.json.msg;
          } else if (err.json.error) {
            err.message = err.json.error + ": " + err.json.error_description;
          }
        }
        return Promise.reject(err);
      });
    }
  }, {
    key: "settings",
    value: function settings() {
      return this._request("/settings");
    }
  }, {
    key: "signup",
    value: function signup(email, password, data) {
      return this._request("/signup", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password, data: data })
      });
    }
  }, {
    key: "login",
    value: function login(email, password, remember) {
      var _this = this;

      this._setRememberHeaders(remember);
      return this._request("/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=password&username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password)
      }).then(function (response) {
        _user2.default.removeSavedSession();
        return _this.createUser(response, remember);
      });
    }
  }, {
    key: "loginExternalUrl",
    value: function loginExternalUrl(provider) {
      return this.api.apiURL + "/authorize?provider=" + provider;
    }
  }, {
    key: "confirm",
    value: function confirm(token, remember) {
      this._setRememberHeaders(remember);
      return this.verify("signup", token, remember);
    }
  }, {
    key: "requestPasswordRecovery",
    value: function requestPasswordRecovery(email) {
      return this._request("/recover", {
        method: "POST",
        body: JSON.stringify({ email: email })
      });
    }
  }, {
    key: "recover",
    value: function recover(token, remember) {
      this._setRememberHeaders(remember);
      return this.verify("recovery", token, remember);
    }
  }, {
    key: "acceptInvite",
    value: function acceptInvite(token, password, remember) {
      var _this2 = this;

      this._setRememberHeaders(remember);
      return this._request("/verify", {
        method: "POST",
        body: JSON.stringify({ token: token, password: password, type: "signup" })
      }).then(function (response) {
        return _this2.createUser(response, remember);
      });
    }
  }, {
    key: "acceptInviteExternalUrl",
    value: function acceptInviteExternalUrl(provider, token) {
      return this.api.apiURL + "/authorize?provider=" + provider + "&invite_token=" + token;
    }
  }, {
    key: "createUser",
    value: function createUser(tokenResponse) {
      var remember = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._setRememberHeaders(remember);
      var user = new _user2.default(this.api, tokenResponse, this.audience);
      return user.getUserData().then(function (user) {
        if (remember) {
          user._saveSession();
        }
        return user;
      });
    }
  }, {
    key: "currentUser",
    value: function currentUser() {
      var user = _user2.default.recoverSession(this.api);
      user && this._setRememberHeaders(user._fromStorage);
      return user;
    }
  }, {
    key: "verify",
    value: function verify(type, token, remember) {
      var _this3 = this;

      this._setRememberHeaders(remember);
      return this._request("/verify", {
        method: "POST",
        body: JSON.stringify({ token: token, type: type })
      }).then(function (response) {
        return _this3.createUser(response, remember);
      });
    }
  }, {
    key: "_setRememberHeaders",
    value: function _setRememberHeaders(remember) {
      if (this.setCookie) {
        this.api.defaultHeaders = this.api.defaultHeaders || {};
        this.api.defaultHeaders["X-Use-Cookie"] = remember ? "1" : "session";
      }
    }
  }]);

  return GoTrue;
}();

exports.default = GoTrue;


if (typeof window !== "undefined") {
  window.GoTrue = GoTrue;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getPagination = getPagination;
function getPagination(response) {
  var links = response.headers.get("Link");
  var pagination = {};
  //var link, url, rel, m, page;
  if (links == null) {
    return null;
  }
  links = links.split(",");
  var total = response.headers.get("X-Total-Count");

  for (var i = 0, len = links.length; i < len; i++) {
    var link = links[i].replace(/(^\s*|\s*$)/, "");

    var _link$split = link.split(";"),
        _link$split2 = _slicedToArray(_link$split, 2),
        url = _link$split2[0],
        rel = _link$split2[1];

    var m = url.match(/page=(\d+)/);
    var page = m && parseInt(m[1], 10);
    if (rel.match(/last/)) {
      pagination.last = page;
    } else if (rel.match(/next/)) {
      pagination.next = page;
    } else if (rel.match(/prev/)) {
      pagination.prev = page;
    } else if (rel.match(/first/)) {
      pagination.first = page;
    }
  }

  pagination.last = Math.max(pagination.last || 0, pagination.prev && pagination.prev + 1 || 0);
  pagination.current = pagination.next ? pagination.next - 1 : pagination.last || 1;
  pagination.total = total ? parseInt(total, 10) : null;

  return pagination;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _microApiClient = __webpack_require__(4);

var _microApiClient2 = _interopRequireDefault(_microApiClient);

var _admin = __webpack_require__(12);

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpiryMargin = 60 * 1000;
var storageKey = "gotrue.user";
var refreshPromises = {};
var currentUser = null;
var forbiddenUpdateAttributes = { api: 1, token: 1, audience: 1, url: 1 };
var forbiddenSaveAttributes = { api: 1 };

var User = function () {
  function User(api, tokenResponse, audience) {
    _classCallCheck(this, User);

    this.api = api;
    this.url = api.apiURL;
    this.audience = audience;
    this._processTokenResponse(tokenResponse);
    currentUser = this;
  }

  _createClass(User, [{
    key: "update",
    value: function update(attributes) {
      var _this = this;

      return this._request("/user", {
        method: "PUT",
        body: JSON.stringify(attributes)
      }).then(function (response) {
        return _this._saveUserData(response)._refreshSavedSession();
      });
    }
  }, {
    key: "jwt",
    value: function jwt(forceRefresh) {
      var _tokenDetails = this.tokenDetails(),
          expires_at = _tokenDetails.expires_at,
          refresh_token = _tokenDetails.refresh_token,
          access_token = _tokenDetails.access_token;

      if (forceRefresh || expires_at - ExpiryMargin < Date.now()) {
        return this._refreshToken(refresh_token);
      }
      return Promise.resolve(access_token);
    }
  }, {
    key: "logout",
    value: function logout() {
      return this._request("/logout", { method: "POST" }).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this));
    }
  }, {
    key: "_refreshToken",
    value: function _refreshToken(refresh_token) {
      var _this2 = this;

      if (refreshPromises[refresh_token]) {
        return refreshPromises[refresh_token];
      }
      return refreshPromises[refresh_token] = this.api.request("/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=refresh_token&refresh_token=" + refresh_token
      }).then(function (response) {
        delete refreshPromises[refresh_token];
        _this2._processTokenResponse(response);
        _this2._refreshSavedSession();
        return _this2.token.access_token;
      }).catch(function (error) {
        delete refreshPromises[refresh_token];
        _this2.clearSession();
        return Promise.reject(error);
      });
    }
  }, {
    key: "_request",
    value: function _request(path) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options.headers = options.headers || {};

      var aud = options.audience || this.audience;
      if (aud) {
        options.headers["X-JWT-AUD"] = aud;
      }

      return this.jwt().then(function (token) {
        return _this3.api.request(path, _extends({
          headers: Object.assign(options.headers, {
            Authorization: "Bearer " + token
          })
        }, options)).catch(function (err) {
          if (err instanceof _microApiClient.JSONHTTPError && err.json) {
            if (err.json.msg) {
              err.message = err.json.msg;
            } else if (err.json.error) {
              err.message = err.json.error + ": " + err.json.error_description;
            }
          }
          return Promise.reject(err);
        });
      });
    }
  }, {
    key: "getUserData",
    value: function getUserData() {
      return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this));
    }
  }, {
    key: "_saveUserData",
    value: function _saveUserData(attributes, fromStorage) {
      for (var key in attributes) {
        if (key in User.prototype || key in forbiddenUpdateAttributes) {
          continue;
        }
        this[key] = attributes[key];
      }
      if (fromStorage) {
        this._fromStorage = true;
      }
      return this;
    }
  }, {
    key: "_processTokenResponse",
    value: function _processTokenResponse(tokenResponse) {
      this.token = tokenResponse;
      var claims = void 0;
      try {
        claims = JSON.parse(urlBase64Decode(tokenResponse.access_token.split(".")[1]));
        this.token.expires_at = claims.exp * 1000;
      } catch (e) {
        console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: " + JSON.stringify(tokenResponse)));
      }
    }
  }, {
    key: "_refreshSavedSession",
    value: function _refreshSavedSession() {
      // only update saved session if we previously saved something
      if (localStorage.getItem(storageKey)) {
        this._saveSession();
      }
      return this;
    }
  }, {
    key: "_saveSession",
    value: function _saveSession() {
      localStorage.setItem(storageKey, JSON.stringify(this._details));
      return this;
    }
  }, {
    key: "tokenDetails",
    value: function tokenDetails() {
      return this.token;
    }
  }, {
    key: "clearSession",
    value: function clearSession() {
      User.removeSavedSession();
      this.token = null;
      currentUser = null;
    }
  }, {
    key: "admin",
    get: function get() {
      return new _admin2.default(this);
    }
  }, {
    key: "_details",
    get: function get() {
      var userCopy = {};
      for (var key in this) {
        if (key in User.prototype || key in forbiddenSaveAttributes) {
          continue;
        }
        userCopy[key] = this[key];
      }
      return userCopy;
    }
  }], [{
    key: "removeSavedSession",
    value: function removeSavedSession() {
      localStorage.removeItem(storageKey);
    }
  }, {
    key: "recoverSession",
    value: function recoverSession(apiInstance) {
      if (currentUser) {
        return currentUser;
      }

      var json = localStorage.getItem(storageKey);
      if (json) {
        try {
          var data = JSON.parse(json);
          var url = data.url,
              token = data.token,
              audience = data.audience;

          if (!url || !token) {
            return null;
          }

          var api = apiInstance || new _microApiClient2.default(url, {});
          return new User(api, token, audience)._saveUserData(data, true);
        } catch (ex) {
          console.error(new Error("Gotrue-js: Error recovering session: " + ex));
          return null;
        }
      }

      return null;
    }
  }]);

  return User;
}();

exports.default = User;


function urlBase64Decode(str) {
  // From https://jwt.io/js/jwt.js
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  try {
    return decodeURIComponent(escape(result));
  } catch (err) {
    return result;
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function () {
  function Admin(user) {
    _classCallCheck(this, Admin);

    this.user = user;
  }

  // Return a list of all users in an audience


  _createClass(Admin, [{
    key: "listUsers",
    value: function listUsers(aud) {
      return this.user._request("/admin/users", {
        method: "GET",
        audience: aud
      });
    }
  }, {
    key: "getUser",
    value: function getUser(user) {
      return this.user._request("/admin/users/" + user.id);
    }
  }, {
    key: "updateUser",
    value: function updateUser(user) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.user._request("/admin/users/" + user.id, {
        method: "PUT",
        body: JSON.stringify(attributes)
      });
    }
  }, {
    key: "createUser",
    value: function createUser(email, password) {
      var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      attributes.email = email;
      attributes.password = password;
      return this.user._request("/admin/users", {
        method: "POST",
        body: JSON.stringify(attributes)
      });
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(user) {
      return this.user._request("/admin/users/" + user.id, {
        method: "DELETE"
      });
    }
  }]);

  return Admin;
}();

exports.default = Admin;

/***/ })
/******/ ]);