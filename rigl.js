/*!
 * Rigl.js v1.5.0 | A framework for building reactive web components
 * https://github.com/rigljs/rigl | https://www.npmjs.com/package/rigl
 * Released under the MIT License
 */
 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 30);
 })
 ([
 (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var classApplyDescriptorGet = __webpack_require__(24);

var classExtractFieldDescriptor = __webpack_require__(15);

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}

module.exports = _classPrivateFieldGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(18);

var iterableToArray = __webpack_require__(19);

var unsupportedIterableToArray = __webpack_require__(14);

var nonIterableSpread = __webpack_require__(20);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(11);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(5)["default"];

var assertThisInitialized = __webpack_require__(0);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var classApplyDescriptorSet = __webpack_require__(25);

var classExtractFieldDescriptor = __webpack_require__(15);

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

module.exports = _classPrivateFieldSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29);


 }),
 (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(13);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

module.exports = _classExtractFieldDescriptor;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(21);

var iterableToArrayLimit = __webpack_require__(22);

var unsupportedIterableToArray = __webpack_require__(14);

var nonIterableRest = __webpack_require__(23);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(2);

var setPrototypeOf = __webpack_require__(11);

var isNativeFunction = __webpack_require__(26);

var construct = __webpack_require__(27);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(13);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

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

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

module.exports = _classApplyDescriptorGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

module.exports = _classApplyDescriptorSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(11);

var isNativeReflectConstruct = __webpack_require__(28);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
module.exports["default"] = module.exports, module.exports.__esModule = true;

 }),
 (function(module, exports, __webpack_require__) {


var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; 
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  var ContinueSentinel = {};

  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter 
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      context[delegate.resultName] = info.value;

      context.next = delegate.nextLoc;

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      return info;
    }

    context.delegate = null;
    return ContinueSentinel;
  }

  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  return exports;

}(
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


 }),
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

__webpack_require__.d(__webpack_exports__, "mixins", function() { return  mixins; });
__webpack_require__.d(__webpack_exports__, "load", function() { return  load; });
__webpack_require__.d(__webpack_exports__, "create", function() { return  rigl_create; });

var classCallCheck = __webpack_require__(4);
var classCallCheck_default = __webpack_require__.n(classCallCheck);

var inherits = __webpack_require__(6);
var inherits_default = __webpack_require__.n(inherits);

var possibleConstructorReturn = __webpack_require__(7);
var possibleConstructorReturn_default = __webpack_require__.n(possibleConstructorReturn);

var getPrototypeOf = __webpack_require__(2);
var getPrototypeOf_default = __webpack_require__.n(getPrototypeOf);

var toConsumableArray = __webpack_require__(3);
var toConsumableArray_default = __webpack_require__.n(toConsumableArray);

var slicedToArray = __webpack_require__(16);
var slicedToArray_default = __webpack_require__.n(slicedToArray);

var defineProperty = __webpack_require__(10);
var defineProperty_default = __webpack_require__.n(defineProperty);

var createClass = __webpack_require__(8);
var createClass_default = __webpack_require__.n(createClass);

var assertThisInitialized = __webpack_require__(0);
var assertThisInitialized_default = __webpack_require__.n(assertThisInitialized);

var classPrivateFieldGet = __webpack_require__(1);
var classPrivateFieldGet_default = __webpack_require__.n(classPrivateFieldGet);

var classPrivateFieldSet = __webpack_require__(9);
var classPrivateFieldSet_default = __webpack_require__.n(classPrivateFieldSet);

var wrapNativeSuper = __webpack_require__(17);
var wrapNativeSuper_default = __webpack_require__.n(wrapNativeSuper);

var helpers_typeof = __webpack_require__(5);
var typeof_default = __webpack_require__.n(helpers_typeof);








function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var rSpc = /\s+/; 

var emitterElement = new DocumentFragment(); 

var storeEvents = new WeakMap(); 

var _element = new WeakMap();

var _events = new WeakMap();

var emitter_classEmitter = function () {
  function classEmitter(element, store) {
    classCallCheck_default()(this, classEmitter);

    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _events, {
      writable: true,
      value: void 0
    });

    classPrivateFieldSet_default()(this, _element, element); 


    classPrivateFieldSet_default()(this, _events, store.get(element));
  } 


  createClass_default()(classEmitter, [{
    key: "on",
    value: function on() {
      var _this = this;

      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (typeof events === 'string') events = events.trim().split(rSpc); 
      else if (events instanceof RegExp) events = [events]; 

      var props = typeof arguments[1] !== 'function' ? args.shift() : null; 

      var _ref = props || {},
          once = _ref.once,
          capture = _ref.capture,
          passive = _ref.passive,
          bubbles = _ref.bubbles,
          cancelable = _ref.cancelable,
          composed = _ref.composed,
          detail = _ref.detail; 


      events.forEach(function (event) {
        args.forEach(function (callback) {
          return classPrivateFieldGet_default()(_this, _element).addEventListener(event, callback, typeof_default()(props) === 'object' ? {
            once: once,
            capture: capture,
            passive: passive
          } : Boolean(props));
        }); 

        if (!classPrivateFieldGet_default()(_this, _events).has(event)) {
          classPrivateFieldGet_default()(_this, _events).set(event, new CustomEvent(event, typeof_default()(props) === 'object' ? {
            bubbles: bubbles,
            cancelable: cancelable,
            composed: composed,
            detail: detail
          } : null)); 


          Object.defineProperty(classPrivateFieldGet_default()(_this, _events).get(event), 'target', {
            enumerable: true,
            writable: true,
            configurable: true
          });
        }
      });
    } 

  }, {
    key: "off",
    value: function off() {
      var _this2 = this;

      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!arguments.length) return; 

      var props = null; 

      if (typeof events === 'string') events = events.trim().split(rSpc); 
      else if (events instanceof RegExp) events = [events]; 
      else if (typeof events === 'function') {
        args.push(events); 

        events = toConsumableArray_default()(classPrivateFieldGet_default()(this, _events).keys());
      } 
      else if (typeof_default()(events) === 'object') {
        props = events; 

        events = toConsumableArray_default()(classPrivateFieldGet_default()(this, _events).keys());
      } 

      props = arguments[1] !== undefined && typeof arguments[1] !== 'function' ? args.shift() : props; 

      var _ref2 = props || {},
          once = _ref2.once,
          capture = _ref2.capture,
          passive = _ref2.passive; 


      events.forEach(function (event) {
        args.forEach(function (callback) {
          return classPrivateFieldGet_default()(_this2, _element).removeEventListener(event, callback, typeof_default()(props) === 'object' ? {
            once: once,
            capture: capture,
            passive: passive
          } : Boolean(props));
        }); 

        classPrivateFieldGet_default()(_this2, _events).delete(event);
      });
    } 

  }, {
    key: "trigger",
    value: function trigger() {
      var _this3 = this;

      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (typeof events === 'string') events = events.trim().split(rSpc); 
      else if (events instanceof RegExp) events = [events]; 

      events.forEach(function (event) {
        if (classPrivateFieldGet_default()(_this3, _events).has(event)) classPrivateFieldGet_default()(_this3, _element).dispatchEvent(classPrivateFieldGet_default()(_this3, _events).get(event));
      });
    }
  }]);

  return classEmitter;
}(); 

 var emitter = (function () {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emitterElement;
  if (!storeEvents.has(element)) storeEvents.set(element, new Map()); 

  return new emitter_classEmitter(element, storeEvents);
});











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function router_classPrivateFieldInitSpec(obj, privateMap, value) { router_checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function router_checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }


var rExt = /\.\w+$/; 

var storeRoutes = new WeakMap(); 

var _routes = new WeakMap();

var router_classRouter = function (_classEmitter) {
  inherits_default()(classRouter, _classEmitter);

  var _super = _createSuper(classRouter);

  function classRouter(element, store) {
    var _this;

    classCallCheck_default()(this, classRouter);

    _this = _super.call(this, element, store); 

    router_classPrivateFieldInitSpec(assertThisInitialized_default()(_this), _routes, {
      writable: true,
      value: void 0
    });

    classPrivateFieldSet_default()(assertThisInitialized_default()(_this), _routes, store.get(element));

    return _this;
  } 


  createClass_default()(classRouter, [{
    key: "popstate",
    value: function popstate(event) {
      var _this2 = this;

      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location;

      toConsumableArray_default()(classPrivateFieldGet_default()(this, _routes).keys()).forEach(function (route) {
        var path = target.href.replace(target.origin, ''); 

        if (route instanceof RegExp ? route.test(path) : path === route) {
          classPrivateFieldGet_default()(_this2, _routes).get(route).target = target === location ? window : target; 

          classPrivateFieldGet_default()(_this2, _routes).get(route).url = new URL(target.href); 

          _this2.trigger(route);
        }
      });
    }
  }]);

  return classRouter;
}(emitter_classEmitter); 


 var rigl_router = (function (element) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  element = element || document; 

  if (!storeRoutes.has(element)) storeRoutes.set(element, new Map()); 

  var _ref = props || {},
      once = _ref.once,
      capture = _ref.capture,
      passive = _ref.passive,
      start = _ref.start; 


  var router = new router_classRouter(element, storeRoutes); 

  window.addEventListener('popstate', function (event) {
    return router.popstate.call(router, event);
  }); 

  element.addEventListener('click', function (event) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : event.path[0];
    if (target.origin !== location.origin || rExt.test(target.href)) return; 

    event.preventDefault(); 

    history.pushState(null, '', target.href); 

    router.popstate.call(router, null, target);
  }, typeof_default()(props) === 'object' ? {
    once: once,
    capture: capture,
    passive: passive
  } : Boolean(props)); 

  if (start) setTimeout(function () {
    return router.popstate.call(router, null);
  }, 0); 

  return router;
});







function methods_createSuper(Derived) { var hasNativeReflectConstruct = methods_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function methods_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var methods_Methods = function (_HTMLElement) {
  inherits_default()(Methods, _HTMLElement);

  var _super = methods_createSuper(Methods);

  function Methods() {
    classCallCheck_default()(this, Methods);

    return _super.call(this);
  } 


  createClass_default()(Methods, [{
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this = this;

      STORE.get(this.$host).disconnected.forEach(function (callback) {
        return callback.call(_this.$data);
      });
    } 

  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {
      var _this2 = this;

      STORE.get(this.$host).adopted.forEach(function (callback) {
        return callback.call(_this2.$data);
      });
    }
  }]);

  return Methods;
}( wrapNativeSuper_default()(HTMLElement)); 


methods_Methods.prototype.$ = function (selector) {
  return this.$root.querySelector(selector);
}; 


methods_Methods.prototype.$$ = function (selector) {
  return this.$root.querySelectorAll(selector);
}; 


methods_Methods.prototype.$disconnected = function () {
  var _this3 = this;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (callback) {
    return typeof callback === 'function' ? STORE.get(_this3.$host).disconnected.add(callback) : null;
  });
}; 


methods_Methods.prototype.$adopted = function () {
  var _this4 = this;

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  args.forEach(function (callback) {
    return typeof callback === 'function' ? STORE.get(_this4.$host).adopted.add(callback) : null;
  });
}; 


methods_Methods.prototype.$load = load; 

methods_Methods.prototype.$create = rigl_create; 

methods_Methods.prototype.$router = rigl_router; 

methods_Methods.prototype.$emitter = emitter; 

 var methods = (methods_Methods);
var regenerator = __webpack_require__(12);
var regenerator_default = __webpack_require__.n(regenerator);



function change(node, temp) {
  if (node.nodeType !== 2 && node.nodeType !== 3) {
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        change.call(this, node.attributes[i], temp.attributes[i]);
      } 


      if (node.attributes['data-rigl-for']) return;
    } 


    for (var i = 0; i < node.childNodes.length; i++) {
      change.call(this, node.childNodes[i], temp.childNodes[i]);
    }
  } 
  else if (STORE.get(this).sources.has(temp)) return handler.call(this, node, temp);
}


var _marked = regenerator_default.a.mark(Update);



function Update(template, cycle) {
  var length,
      ownerNodes,
      i,
      _args = arguments;
  return regenerator_default.a.wrap(function Update$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          length = _args.length > 2 && _args[2] !== undefined ? _args[2] : template.childNodes.length;
          ownerNodes = _args.length > 3 ? _args[3] : undefined;

        case 2:
          if (false) {}

          ownerNodes = cycle.owner.childNodes[cycle.index]; 

          if (!ownerNodes) cycle.owner.append(create.call(this, template.cloneNode(true), template)); 
          else for (i = 0; i < length; i++) {
            change.call(this, cycle.owner.childNodes[i + cycle.index], template.childNodes[i]);
          } 

          cycle.index += length;
          _context.next = 8;
          return;

        case 8:
          _context.next = 2;
          break;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
var rQut = /([`"'])[^]*?\1/g; 

var rExp = /([^]+?)(?:\bin\b|\bof\b|;)/; 

var rVal = /=[^,]*/g; 

var getvars_rSpc = /\s+?/g; 

 var getvars = (function (str) {
  return rExp.exec(str.replace(rQut, ''))[1].replace(rVal, '').replace(getvars_rSpc, '');
});






var create_rExp = /\$\{[^]+?\}/; 

var rQte = /(\\*?`)|(\$\{)|(\})/g; 

var objTemp = {
  attributes: [],
  childNodes: []
}; 

function sourced(node) {
  var uppNode = STORE.get(this).nodes[0]; 

  var vars = uppNode && uppNode.nodeName.startsWith('data-rigl-for') ? getvars(uppNode.value) : null; 

  var source = vars ? "()=>((".concat(vars, ")=>event=>").concat(node.value, ")(").concat(vars, ")") : "event=>".concat(node.value); 

  return {
    vars: vars,
    source: source
  };
} 


function shield() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (_, q, e1, e2) {
    if (q && !arr.length) return q.length % 2 === 1 ? q.slice(0, -1) + "\\".concat(q.slice(-1)) : q;else if (e1) arr.push(e1);else if (e2) arr.pop();
    return q || e1 || e2;
  };
} 


function create(node) {
  var temp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : objTemp;

  if (node.nodeType === 2 || node.nodeType === 3) {
    var knot = temp.nodeType ? temp : node;

    if (!STORE.get(this).sources.has(knot)) {
      if (node.nodeName.startsWith('data-rigl-for')) {
        var template = new DocumentFragment(); 

        !toConsumableArray_default()(node.ownerElement.childNodes).forEach(function (elem) {
          return template.append(elem);
        }); 

        STORE.get(this).sources.set(knot, STORE.get(this).eval.next("event=>`".concat(node.value, "`")).value); 

        var genCycle = STORE.get(this).eval.next('(function*(){arguments[0]=yield\tfunction*(){while(true)arguments[0]=yield\teval(arguments[0])}\n' + "while(true){yield\nfor(var\t".concat(STORE.get(this).sources.get(knot)(), ")arguments[0].next()}})")).value.call(this.$data); 

        var genEval = genCycle.next().value.call(this.$data); 

        genEval.next(); 

        var objCycle = {
          for: genCycle,
          eval: genEval,
          index: 0,
          template: template
        }; 

        genCycle.next(Update.call(this, template, objCycle)); 

        STORE.get(this).sources.set(knot.ownerElement, objCycle);
      } 
      else if (node.nodeName.startsWith('on') && create_rExp.test(node.value)) {
        var _sourced$call = sourced.call(this, node),
            vars = _sourced$call.vars,
            source = _sourced$call.source; 


        var objCallback = {
          handler: STORE.get(this).eval.next(source).value,
          isVars: vars ? true : false
        }; 

        STORE.get(this).sources.set(knot, objCallback);
      } 
      else if (node.nodeName.startsWith('data-rigl-on')) {
        var arr = node.nodeName.split('.'); 

        var _sourced$call2 = sourced.call(this, node),
            _vars = _sourced$call2.vars,
            _source = _sourced$call2.source; 


        var _objCallback = {
          name: arr[0].slice(12),
          handler: STORE.get(this).eval.next(_source).value,
          props: arr.length > 1 ? Object.assign.apply(Object, toConsumableArray_default()(arr.filter(function (item, i) {
            return i > 0;
          }).map(function (name) {
            return defineProperty_default()({}, name, true);
          }))) : null,
          isVars: _vars ? true : false
        }; 

        STORE.get(this).sources.set(knot, _objCallback);
      } 
      else {
        var type = node.nodeType === 2 ? 'value' : 'data'; 

        var _source2 = null; 

        if (node.nodeName.startsWith('data-rigl-')) _source2 = "event=>".concat(node.value); 
        else if (create_rExp.test(node[type])) _source2 = "event=>`".concat(node[type].replace(rQte, shield()), "`"); 
        else return node; 

        STORE.get(this).sources.set(knot, STORE.get(this).eval.next(_source2).value);
      }
    } 
    else if (node.nodeName.startsWith('data-rigl-for')) node.ownerElement.innerHTML = ''; 


    handler.call(this, node, temp);
  } 
  else if (node.childNodes) {
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        create.call(this, node.attributes[i], temp.attributes[i]);
      } 


      if (node.attributes['data-rigl-for']) return;
    } 


    for (var i = 0; i < node.childNodes.length; i++) {
      create.call(this, node.childNodes[i], temp.childNodes[i]);
    }
  }

  return node; 
}


 var handler = (function (node) {
  var temp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : objTemp;
  STORE.get(this).nodes.push(node); 

  var knot = temp.nodeType ? temp : node; 

  if (node.nodeName.startsWith('data-rigl-for')) {
    var _eval = STORE.get(this).eval; 

    var objCycle = STORE.get(this).sources.get(knot.ownerElement); 

    STORE.get(this).eval = objCycle.eval; 

    objCycle.owner = node.ownerElement; 

    objCycle.index = 0; 

    objCycle.for.next(); 

    for (var i = objCycle.owner.childNodes.length; i > objCycle.index; i--) {
      objCycle.owner.lastChild.remove();
    } 


    STORE.get(this).eval = _eval;
  } 
  else if (node.nodeName.startsWith('data-rigl-on')) {
    var objCallback = STORE.get(this).sources.get(knot); 

    var newHandler = null; 

    if (objCallback.isVars) {
      node.ownerElement.removeEventListener(objCallback.name, STORE.get(this).callbacks.get(node), objCallback.props); 

      newHandler = objCallback.handler(); 

      STORE.get(this).callbacks.set(node, newHandler);
    } 


    node.ownerElement.addEventListener(objCallback.name, newHandler || objCallback.handler, objCallback.props);
  } 
  else if (node.nodeName.startsWith('data-rigl-hide')) {
    STORE.get(this).sources.get(knot)() ? node.ownerElement.setAttribute('hidden', '') : node.ownerElement.removeAttribute('hidden');
  } 
  else if (node.nodeName.startsWith('data-rigl-show')) {
    STORE.get(this).sources.get(knot)() ? node.ownerElement.removeAttribute('hidden') : node.ownerElement.setAttribute('hidden', '');
  } 
  else if (node.nodeName.startsWith('on')) {
    var _objCallback = STORE.get(this).sources.get(knot); 


    node.ownerElement[node.nodeName] = _objCallback.isVars ? _objCallback.handler() : _objCallback.handler;
  } 
  else node[node.nodeType === 2 ? 'value' : 'data'] = STORE.get(this).sources.get(knot)(); 


  STORE.get(this).nodes.pop();
});


function notify(deps) {
  var _this = this;

  setTimeout(function () {
    if (STORE.get(_this).timer) console.time(STORE.get(_this).timer); 

    deps.forEach(function (node) {
      if (!STORE.get(_this).sources.has(node)) deps.delete(node); 
      else handler.call(_this, node);
    }); 

    if (STORE.get(_this).timer) console.timeEnd(STORE.get(_this).timer);
  }, 0);
}




var setMethods = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'toString']); 

function hooks(dep, obj) {
  var _this = this;

  return {
    apply: function apply(target, thisArg, args) {
      if (target.name === 'toString') return JSON.stringify(thisArg, null, ' '); 

      if (Array.isArray(thisArg) && setMethods.has(target.name)) {
        var result = target.apply(obj, args); 

        if (dep) notify.call(_this, dep); 

        switch (result) {
          case 'push':
          case 'pop':
          case 'shift':
          case 'unshift':
            return result;

          default:
            return thisArg;
        }
      } 


      var node = STORE.get(_this).nodes[0]; 

      if (dep && node) dep.add(node); 

      return target.apply(thisArg, args);
    },
    get: function get(target, key, receiver) {
      if (!target.hasOwnProperty(key)) {
        if (setMethods.has(key)) return new Proxy(Reflect.get(target, key, receiver), hooks.call(_this, dep, target)); 

        return target === STORE.get(_this).object ? Reflect.get(_this, key) : Reflect.get(target, key, receiver);
      } 


      var value = Reflect.get(target, key, receiver); 

      if (STORE.get(_this).values.has(value)) return STORE.get(_this).values.get(value); 

      var node = STORE.get(_this).nodes[0]; 

      if (dep && node) dep.add(node); 

      var deps = STORE.get(_this).depends.get(target); 

      if (!deps) STORE.get(_this).depends.set(target, deps = {}); 

      if (!deps.hasOwnProperty(key)) deps[key] = new Set(); 

      if (value && (typeof_default()(value) === 'object' || typeof value === 'function')) return observable.call(_this, value, deps[key]); 

      if (node) deps[key].add(node); 

      return value;
    },
    set: function set(target, key, value, receiver) {
      var oldValue = Reflect.get(target, key, receiver); 

      if (oldValue === value) return true; 

      STORE.get(_this).depends.delete(oldValue); 

      STORE.get(_this).values.delete(oldValue); 

      if (!Reflect.set(target, key, value, receiver)) return false; 

      if (STORE.get(_this).nodes.length) return true; 

      var deps = STORE.get(_this).depends.get(target); 

      if (!deps) return true; 

      var _dep = deps[key] || dep; 


      if (_dep) notify.call(_this, _dep); 

      return true;
    }
  };
}


function observable(obj, dep) {
  var proxy = new Proxy(obj, hooks.call(this, dep)); 

  STORE.get(this).values.set(obj, proxy); 

  return proxy;
}

 var getproxy = (function (obj, isData) {
  var _this = this;

  return new Proxy(obj, {
    get: function get(target, key) {
      for (var i = _this.$outers.length - 1; i >= 0; i--) {
        if (isData) {
          if (_this.$outers[i].$data.hasOwnProperty(key)) return Reflect.get(_this.$outers[i].$data, key);
        } 
        else {
          if (STORE.get(_this.$outers[i]).object.hasOwnProperty(key)) return Reflect.get(STORE.get(_this.$outers[i]).object, key);
        }
      } 


      return Reflect.get(target, key);
    }
  });
});

function remove(node) {
  if (node.attributes) {
    for (var i = 0; i < node.attributes.length; i++) {
      remove.call(this, node.attributes[i]);
    } 


    if (node.attributes['data-rigl-for']) {
      var objCycle = STORE.get(this).sources.get(node); 

      if (objCycle) remove.call(this, objCycle.template);
    }
  } 


  for (var i = 0; i < node.childNodes.length; i++) {
    remove.call(this, node.childNodes[i]);
  } 


  STORE.get(this).sources.delete(node); 

  if (node.nodeName.startsWith('data-rigl-on')) STORE.get(this).callbacks.delete(node); 

  if (node.$root) return remove.call(this, node.$root);
}
function clear(node) {
  if (node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) return node.remove(); 

  if (node.nodeName[0] === '$') {
    node.ownerElement.setAttribute("data-rigl-".concat(node.nodeName.slice(1)), node.value); 

    return node.ownerElement.removeAttribute(node.nodeName);
  } 


  if (node.nodeName[0] === '@') {
    node.ownerElement.setAttribute("data-rigl-on".concat(node.nodeName.slice(1)), node.value); 

    return node.ownerElement.removeAttribute(node.nodeName);
  } 


  if (node.attributes) for (var i = 0; i < node.attributes.length; i++) {
    clear(node.attributes[i]) || i--;
  } 

  var content = node.content ? node.content : node; 

  for (var i = 0; i < content.childNodes.length; i++) {
    clear(content.childNodes[i]) || i--;
  }

  return node; 
}












function component_createSuper(Derived) { var hasNativeReflectConstruct = component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function component_classPrivateFieldInitSpec(obj, privateMap, value) { component_checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function component_checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }








var STORE = new WeakMap(); 

var sAttr = Symbol(); 

var Generator = Function('return function*(){}')().constructor; 

var configMutations = {
  childList: true,
  subtree: true
}; 

var compKeys = "$root,$host,$data,$outer,$outers,$timer,$attr,".concat(Object.keys(methods.prototype)); 

var mapNames = ['sources', 'values', 'depends', 'callbacks', 'nodes']; 

var outerComponents = []; 

var sharedComponents = {}; 

function setMapShared() {
  sharedComponents[this.nodeName] = STORE.get(this); 

  sharedComponents[this.nodeName].data = observable.call(this, STORE.get(this).object);
}

var _content = new WeakMap();

var component_default = function (_Methods) {
  inherits_default()(_default, _Methods);

  var _super = component_createSuper(_default);

  function _default(content, scripts, mode, isShared) {
    var _this;

    classCallCheck_default()(this, _default);

    _this = _super.call(this); 

    component_classPrivateFieldInitSpec(assertThisInitialized_default()(_this), _content, {
      writable: true,
      value: void 0
    });

    classPrivateFieldSet_default()(assertThisInitialized_default()(_this), _content, content); 


    var attributes = new Proxy(Object.values(_this.attributes).reduce(function (obj, attr) {
      obj[attr.name] = attr;
      return obj;
    }, {}), {
      get: function get(target, key, receiver) {
        if (!target.hasOwnProperty(key)) return Reflect.get(target, key, receiver); 

        return Reflect.get(target, key, receiver).value;
      },
      set: function set(target, key, value, receiver) {
        Reflect.get(target, key, receiver).value = value; 

        return true;
      }
    }); 

    STORE.set(assertThisInitialized_default()(_this), {}); 

    STORE.get(assertThisInitialized_default()(_this)).object = Object.assign(defineProperty_default()({}, sAttr, attributes), mixins); 

    STORE.get(assertThisInitialized_default()(_this)).timer = null; 

    STORE.get(assertThisInitialized_default()(_this)).connected = new Set(); 

    STORE.get(assertThisInitialized_default()(_this)).disconnected = new Set(); 

    STORE.get(assertThisInitialized_default()(_this)).adopted = new Set(); 

    var outerComponent = outerComponents[outerComponents.length - 1]; 

    var _ref = outerComponent ? [getproxy.call(assertThisInitialized_default()(_this), STORE.get(outerComponent).object), getproxy.call(assertThisInitialized_default()(_this), outerComponent.$data, true)] : [],
        _ref2 = slicedToArray_default()(_ref, 2),
        outerProxyObject = _ref2[0],
        outerProxyData = _ref2[1]; 


    if (sharedComponents[_this.nodeName]) {
      mapNames.forEach(function (prop) {
        return STORE.get(assertThisInitialized_default()(_this))[prop] = sharedComponents[_this.nodeName][prop];
      });
    } 
    else if (outerComponent) {
      mapNames.forEach(function (prop) {
        return STORE.get(assertThisInitialized_default()(_this))[prop] = STORE.get(outerComponent)[prop];
      }); 

      if (isShared) setMapShared.call(assertThisInitialized_default()(_this));
    } 
    else {
      STORE.get(assertThisInitialized_default()(_this)).sources = new WeakMap(); 

      STORE.get(assertThisInitialized_default()(_this)).values = new WeakMap(); 

      STORE.get(assertThisInitialized_default()(_this)).depends = new WeakMap(); 

      STORE.get(assertThisInitialized_default()(_this)).callbacks = new WeakMap(); 

      STORE.get(assertThisInitialized_default()(_this)).nodes = []; 

      if (isShared) setMapShared.call(assertThisInitialized_default()(_this));
    } 


    Object.defineProperties(assertThisInitialized_default()(_this), {
      $root: {
        value: content,
        configurable: true
      },
      $host: {
        value: assertThisInitialized_default()(_this)
      },
      $data: {
        value: sharedComponents[_this.nodeName] ? sharedComponents[_this.nodeName].data : observable.call(assertThisInitialized_default()(_this), STORE.get(assertThisInitialized_default()(_this)).object)
      },
      $outer: {
        value: outerProxyData
      },
      $outers: {
        value: outerComponent ? [].concat(toConsumableArray_default()(outerComponent.$outers), [outerComponent]) : []
      },
      $timer: {
        value: function value(val) {
          return STORE.get(assertThisInitialized_default()(_this)).timer = val ? typeof val === 'string' ? val : 'Update' : false;
        }
      }
    }); 

    Object.defineProperty(assertThisInitialized_default()(_this), '$attr', {
      value: _this.$data[sAttr]
    }); 

    STORE.get(assertThisInitialized_default()(_this)).eval = Generator("{".concat(compKeys, "}=this"), "with(this){while(true)arguments[0]=yield\teval(arguments[0])}").call(_this.$data); 

    STORE.get(assertThisInitialized_default()(_this)).eval.next(); 

    Function(scripts).call(new Proxy(_this.$data, {
      get: function get(target, key) {
        return outerComponent && key === '$outer' ? outerProxyObject : Reflect.get(target, key);
      }
    })); 

    Object.defineProperty(assertThisInitialized_default()(_this), '$root', {
      value: _this.attachShadow({
        mode: mode
      })
    });
    return _this;
  } 


  createClass_default()(_default, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      setTimeout(function () {
        outerComponents.push(_this2); 

        while (classPrivateFieldGet_default()(_this2, _content).childNodes.length) {
          _this2.$root.append(classPrivateFieldGet_default()(_this2, _content).firstChild);
        } 


        create.call(_this2, _this2.$root); 

        outerComponents.pop(); 

        new MutationObserver(function (mutationRecords, observer) {
          observer.disconnect(); 

          mutationRecords.forEach(function (record) {
            if (!record.target.attributes || !record.target.attributes['data-rigl-for']) {
              record.removedNodes.forEach(function (node) {
                return remove.call(_this2, node);
              }); 

              record.addedNodes.forEach(function (node) {
                return create.call(_this2, clear(node));
              });
            }
          }); 

          observer.observe(_this2.$root, configMutations);
        }).observe(_this2.$root, configMutations);
      }, 0);
    }
  }]);

  return _default;
}(methods);








function rigl_createSuper(Derived) { var hasNativeReflectConstruct = rigl_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function rigl_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var mixins = {}; 

Object.defineProperties(window.Rigl = {}, {
  'load': {
    value: load
  },
  'create': {
    value: rigl_create
  },
  'router': {
    value: rigl_router
  },
  'emitter': {
    value: emitter
  },
  'mixins': {
    value: mixins,
    writable: true
  }
}); 

function load() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (path) {
    return typeof path === 'string' ? fetch(path).then(function (res) {
      return res.text();
    }).then(function (text) {
      return rigl_create(text);
    }) : Array.isArray(path) ? path.forEach(function (item) {
      return load(item);
    }) : rigl_create(path);
  });
} 

function rigl_create() {
  mixins = window.Rigl.mixins; 

  var storeTemplate = document.createElement('template'); 

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var html = _args[_i];
    if (typeof html === 'string') storeTemplate.innerHTML = html; 
    else if (html instanceof HTMLElement) storeTemplate.content.append(html.cloneNode(true)); 
    else if (html instanceof NodeList || Array.isArray(html)) return html.forEach(function (elem) {
      return rigl_create(elem);
    }); 
    else return;
  } 


  !toConsumableArray_default()(storeTemplate.content.children).forEach(function (temp) {
    var content = clear(temp.content ? temp.content : temp); 

    var scripts = toConsumableArray_default()(content.querySelectorAll('script')).map(function (script) {
      return content.removeChild(script).innerHTML;
    }).join(''); 


    var mode = temp.hasAttribute('closed') ? 'closed' : 'open'; 

    var isShared = temp.hasAttribute('shared'); 

    customElements.define((temp.getAttribute('name') || temp.nodeName).toLocaleLowerCase(), function (_Component) {
      inherits_default()(_class, _Component);

      var _super = rigl_createSuper(_class);

      function _class() {
        classCallCheck_default()(this, _class);

        return _super.call(this, content.cloneNode(true), scripts, mode, isShared);
      } 


      return _class;
    }(component_default), temp.hasAttribute('slot') ? {
      extends: temp.getAttribute('slot').toLocaleLowerCase()
    } : null);
  });
}

 })
 ]);