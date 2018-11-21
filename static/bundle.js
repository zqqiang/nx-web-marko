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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/complain/index.js":
/*!****************************************!*\
  !*** ./node_modules/complain/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var StackParser = __webpack_require__(/*! error-stack-parser */ "./node_modules/error-stack-parser/error-stack-parser.js");
var env = typeof process !== 'undefined' && "development";
var isDevelopment = !env || env === 'dev' || env === 'development';
var showModuleComplains = typeof process !== 'undefined' && Boolean(process.env.SHOW_MODULE_COMPLAINS);
var logger = typeof console !== 'undefined' && console.warn && console;
var cwd = typeof process !== 'undefined' && process.cwd() + '/' || '';
var linebreak = typeof process !== 'undefined' && 'win32' === process.platform ? '\r\n' : '\n';
var newline = /(\r\n|\r|\n)/g;
var slice = [].slice;
var hits = {};

complain = isDevelopment ? complain : noop;
complain.method = isDevelopment ? method : noop;
complain.fn = isDevelopment ? fn : noopReturn;
complain.log = log;
complain.stream = typeof process !== 'undefined' && process.stderr;
complain.silence = false;
complain.color = complain.stream && complain.stream.isTTY;
complain.colors = { warning:'\x1b[31;1m', message:false, location:'\u001b[90m' };
complain.getModuleName = getModuleName;

/* istanbul ignore next */
if ( true && module.exports) {
  module.exports = complain;
} else if(typeof window !== 'undefined') {
  window.complain = complain;
}

function complain() {
  var options;
  var location;
  var getCallToDeprecate;
  var args = arguments;

  if(complain.silence) return;

  if(typeof args[args.length-1] === 'object') {
    options = args[args.length-1];
    args = slice.call(args, 0, -1);
  } else {
    options = {};
  }

  if(options.location === false) {
    // When the user explictly sets location to false,
    // We will get the location of the call to complain()
    // is called, instead of the location of the call to the
    // deprecated function.
    getCallToDeprecate = true;
  }

  location = options.location || getLocation(getCallToDeprecate);
  
  var moduleName = complain.getModuleName(location);

  if (moduleName && !showModuleComplains) {
    if (!hits[moduleName]) {
      var output = format('WARNING!!', complain.colors.warning) 
      output += linebreak + format('The module ['+moduleName+'] is using deprecated features.', complain.colors.message);
      output += linebreak + format('Run with process.env.SHOW_MODULE_COMPLAINS=1 to see all warnings.', complain.colors.message);
      complain.log(linebreak + output + linebreak);
      hits[moduleName] = true;
    }
    return;
  }

  /* istanbul ignore next */
  // Location is only missing in older browsers.
  if(location) {
    if(hits[location]) return;
    else hits[location] = true;
  }

  var output = format('WARNING!!', complain.colors.warning);

  for(var i = 0; i < args.length; i++) {
    output += linebreak + format(args[i], complain.colors.message);
  }

  if(options.location !== false && location) {
    output += linebreak + format('  at '+location.replace(cwd, ''), complain.colors.location);
  }

  complain.log(linebreak + output + linebreak);
};

function method(object, methodName) {
    var originalMethod = object[methodName];
    var args = slice.call(arguments, 2);

    object[methodName] = function() {
        complain.apply(null, args);
        return originalMethod.apply(this, arguments);
    };
}

function fn(original) {
  var args = slice.call(arguments, 1);

  return function() {
    complain.apply(null, args);
    return original.apply(this, arguments);
  }
}

function log(message, color) {
  var formatted = format(message, color);
  if(complain.stream) {
    complain.stream.write(formatted+linebreak);
  } else if(logger) {
    logger.warn(formatted);
  }
}

function format(message, color) {
  return color && complain.color ? color + message + '\x1b[0m' : message;
}

function getLocation(getCallToDeprecate) {
  var stack;
  var frame;
  var location = '';
  var index = getCallToDeprecate ? 2 : 3;

  /**
   * Stack index descriptions.
   * 
   * 0: In getLocation(), the call to new Error()
   * 1: In complain(), the call to getLocation()
   * 2: In the deprecated function, the call to complain()
   * 3: The call to the deprecated function (THIS IS THE DEFAULT)
   */

  try {
    stack = StackParser.parse(new Error());
    frame = stack[index];
    location = frame.fileName+':'+frame.lineNumber+':'+frame.columnNumber;
  } catch(e) {}

  return location;
}

function getModuleName(location) {
  var locationParts = location.replace(cwd, '').split(/\/|\\/g);
  for(var i = locationParts.length-1; i >= 0; i--) {
    if (locationParts[i] === 'node_modules') {
      var moduleName = locationParts[i+1];
      return (moduleName[0] === '@') ? moduleName+'/'+locationParts[i+2] : moduleName;
    }
  }
}

function noop(){};
function noopReturn(r) { return r; };

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/error-stack-parser/error-stack-parser.js":
/*!***************************************************************!*\
  !*** ./node_modules/error-stack-parser/error-stack-parser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! stackframe */ "./node_modules/stackframe/stackframe.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                    var matches = line.match(functionNameRegex);
                    var functionName = matches && matches[1] ? matches[1] : undefined;
                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),

/***/ "./node_modules/events-light/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/events-light/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint newcap:false */
var slice = Array.prototype.slice;

function isFunction(arg) {
    return typeof arg === 'function';
}

function checkListener(listener) {
    if (!isFunction(listener)) {
        throw TypeError('Invalid listener');
    }
}

function invokeListener(ee, listener, args) {
    switch (args.length) {
        // fast cases
        case 1:
            listener.call(ee);
            break;
        case 2:
            listener.call(ee, args[1]);
            break;
        case 3:
            listener.call(ee, args[1], args[2]);
            break;
            // slower
        default:
            listener.apply(ee, slice.call(args, 1));
    }
}

function addListener(eventEmitter, type, listener, prepend) {
    checkListener(listener);

    var events = eventEmitter.$e || (eventEmitter.$e = {});

    var listeners = events[type];
    if (listeners) {
        if (isFunction(listeners)) {
            events[type] = prepend ? [listener, listeners] : [listeners, listener];
        } else {
            if (prepend) {
                listeners.unshift(listener);
            } else {
                listeners.push(listener);
            }
        }

    } else {
        events[type] = listener;
    }
    return eventEmitter;
}

function EventEmitter() {
    this.$e = this.$e || {};
}

EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype = {
    $e: null,

    emit: function(type) {
        var args = arguments;

        var events = this.$e;
        if (!events) {
            return;
        }

        var listeners = events && events[type];
        if (!listeners) {
            // If there is no 'error' event listener then throw.
            if (type === 'error') {
                var error = args[1];
                if (!(error instanceof Error)) {
                    var context = error;
                    error = new Error('Error: ' + context);
                    error.context = context;
                }

                throw error; // Unhandled 'error' event
            }

            return false;
        }

        if (isFunction(listeners)) {
            invokeListener(this, listeners, args);
        } else {
            listeners = slice.call(listeners);

            for (var i=0, len=listeners.length; i<len; i++) {
                var listener = listeners[i];
                invokeListener(this, listener, args);
            }
        }

        return true;
    },

    on: function(type, listener) {
        return addListener(this, type, listener, false);
    },

    prependListener: function(type, listener) {
        return addListener(this, type, listener, true);
    },

    once: function(type, listener) {
        checkListener(listener);

        function g() {
            this.removeListener(type, g);

            if (listener) {
                listener.apply(this, arguments);
                listener = null;
            }
        }

        this.on(type, g);

        return this;
    },

    // emits a 'removeListener' event iff the listener was removed
    removeListener: function(type, listener) {
        checkListener(listener);

        var events = this.$e;
        var listeners;

        if (events && (listeners = events[type])) {
            if (isFunction(listeners)) {
                if (listeners === listener) {
                    delete events[type];
                }
            } else {
                for (var i=listeners.length-1; i>=0; i--) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                    }
                }
            }
        }

        return this;
    },

    removeAllListeners: function(type) {
        var events = this.$e;
        if (events) {
            delete events[type];
        }
    },

    listenerCount: function(type) {
        var events = this.$e;
        var listeners = events && events[type];
        return listeners ? (isFunction(listeners) ? 1 : listeners.length) : 0;
    }
};

module.exports = EventEmitter;

/***/ }),

/***/ "./node_modules/listener-tracker/lib/listener-tracker.js":
/*!***************************************************************!*\
  !*** ./node_modules/listener-tracker/lib/listener-tracker.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var INDEX_EVENT = 0;
var INDEX_USER_LISTENER = 1;
var INDEX_WRAPPED_LISTENER = 2;
var DESTROY = "destroy";

function isNonEventEmitter(target) {
  return !target.once;
}

function EventEmitterWrapper(target) {
    this.$__target = target;
    this.$__listeners = [];
    this.$__subscribeTo = null;
}

EventEmitterWrapper.prototype = {
    $__remove: function(test, testWrapped) {
        var target = this.$__target;
        var listeners = this.$__listeners;

        this.$__listeners = listeners.filter(function(curListener) {
            var curEvent = curListener[INDEX_EVENT];
            var curListenerFunc = curListener[INDEX_USER_LISTENER];
            var curWrappedListenerFunc = curListener[INDEX_WRAPPED_LISTENER];

            if (testWrapped) {
                // If the user used `once` to attach an event listener then we had to
                // wrap their listener function with a new function that does some extra
                // cleanup to avoid a memory leak. If the `testWrapped` flag is set to true
                // then we are attempting to remove based on a function that we had to
                // wrap (not the user listener function)
                if (curWrappedListenerFunc && test(curEvent, curWrappedListenerFunc)) {
                    target.removeListener(curEvent, curWrappedListenerFunc);

                    return false;
                }
            } else if (test(curEvent, curListenerFunc)) {
                // If the listener function was wrapped due to it being a `once` listener
                // then we should remove from the target EventEmitter using wrapped
                // listener function. Otherwise, we remove the listener using the user-provided
                // listener function.
                target.removeListener(curEvent, curWrappedListenerFunc || curListenerFunc);

                return false;
            }

            return true;
        });

        // Fixes https://github.com/raptorjs/listener-tracker/issues/2
        // If all of the listeners stored with a wrapped EventEmitter
        // have been removed then we should unregister the wrapped
        // EventEmitter in the parent SubscriptionTracker
        var subscribeTo = this.$__subscribeTo;

        if (!this.$__listeners.length && subscribeTo) {
            var self = this;
            var subscribeToList = subscribeTo.$__subscribeToList;
            subscribeTo.$__subscribeToList = subscribeToList.filter(function(cur) {
                return cur !== self;
            });
        }
    },

    on: function(event, listener) {
        this.$__target.on(event, listener);
        this.$__listeners.push([event, listener]);
        return this;
    },

    once: function(event, listener) {
        var self = this;

        // Handling a `once` event listener is a little tricky since we need to also
        // do our own cleanup if the `once` event is emitted. Therefore, we need
        // to wrap the user's listener function with our own listener function.
        var wrappedListener = function() {
            self.$__remove(function(event, listenerFunc) {
                return wrappedListener === listenerFunc;
            }, true /* We are removing the wrapped listener */);

            listener.apply(this, arguments);
        };

        this.$__target.once(event, wrappedListener);
        this.$__listeners.push([event, listener, wrappedListener]);
        return this;
    },

    removeListener: function(event, listener) {
        if (typeof event === 'function') {
            listener = event;
            event = null;
        }

        if (listener && event) {
            this.$__remove(function(curEvent, curListener) {
                return event === curEvent && listener === curListener;
            });
        } else if (listener) {
            this.$__remove(function(curEvent, curListener) {
                return listener === curListener;
            });
        } else if (event) {
            this.removeAllListeners(event);
        }

        return this;
    },

    removeAllListeners: function(event) {

        var listeners = this.$__listeners;
        var target = this.$__target;

        if (event) {
            this.$__remove(function(curEvent, curListener) {
                return event === curEvent;
            });
        } else {
            for (var i = listeners.length - 1; i >= 0; i--) {
                var cur = listeners[i];
                target.removeListener(cur[INDEX_EVENT], cur[INDEX_USER_LISTENER]);
            }
            this.$__listeners.length = 0;
        }

        return this;
    }
};

function EventEmitterAdapter(target) {
    this.$__target = target;
}

EventEmitterAdapter.prototype = {
    on: function(event, listener) {
        this.$__target.addEventListener(event, listener);
        return this;
    },

    once: function(event, listener) {
        var self = this;

        // need to save this so we can remove it below
        var onceListener = function() {
          self.$__target.removeEventListener(event, onceListener);
          listener();
        };
        this.$__target.addEventListener(event, onceListener);
        return this;
    },

    removeListener: function(event, listener) {
        this.$__target.removeEventListener(event, listener);
        return this;
    }
};

function SubscriptionTracker() {
    this.$__subscribeToList = [];
}

SubscriptionTracker.prototype = {

    subscribeTo: function(target, options) {
        var addDestroyListener = !options || options.addDestroyListener !== false;
        var wrapper;
        var nonEE;
        var subscribeToList = this.$__subscribeToList;

        for (var i=0, len=subscribeToList.length; i<len; i++) {
            var cur = subscribeToList[i];
            if (cur.$__target === target) {
                wrapper = cur;
                break;
            }
        }

        if (!wrapper) {
            if (isNonEventEmitter(target)) {
              nonEE = new EventEmitterAdapter(target);
            }

            wrapper = new EventEmitterWrapper(nonEE || target);
            if (addDestroyListener && !nonEE) {
                wrapper.once(DESTROY, function() {
                    wrapper.removeAllListeners();

                    for (var i = subscribeToList.length - 1; i >= 0; i--) {
                        if (subscribeToList[i].$__target === target) {
                            subscribeToList.splice(i, 1);
                            break;
                        }
                    }
                });
            }

            // Store a reference to the parent SubscriptionTracker so that we can do cleanup
            // if the EventEmitterWrapper instance becomes empty (i.e., no active listeners)
            wrapper.$__subscribeTo = this;
            subscribeToList.push(wrapper);
        }

        return wrapper;
    },

    removeAllListeners: function(target, event) {
        var subscribeToList = this.$__subscribeToList;
        var i;

        if (target) {
            for (i = subscribeToList.length - 1; i >= 0; i--) {
                var cur = subscribeToList[i];
                if (cur.$__target === target) {
                    cur.removeAllListeners(event);

                    if (!cur.$__listeners.length) {
                        // Do some cleanup if we removed all
                        // listeners for the target event emitter
                        subscribeToList.splice(i, 1);
                    }

                    break;
                }
            }
        } else {
            for (i = subscribeToList.length - 1; i >= 0; i--) {
                subscribeToList[i].removeAllListeners();
            }
            subscribeToList.length = 0;
        }
    }
};

exports = module.exports = SubscriptionTracker;

exports.wrap = function(targetEventEmitter) {
    var nonEE;
    var wrapper;

    if (isNonEventEmitter(targetEventEmitter)) {
      nonEE = new EventEmitterAdapter(targetEventEmitter);
    }

    wrapper = new EventEmitterWrapper(nonEE || targetEventEmitter);
    if (!nonEE) {
      // we don't set this for non EE types
      targetEventEmitter.once(DESTROY, function() {
          wrapper.$__listeners.length = 0;
      });
    }

    return wrapper;
};

exports.createTracker = function() {
    return new SubscriptionTracker();
};


/***/ }),

/***/ "./node_modules/marko/components-browser.marko":
/*!*****************************************************!*\
  !*** ./node_modules/marko/components-browser.marko ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/components */ "./node_modules/marko/src/components/index-browser.js");


/***/ }),

/***/ "./node_modules/marko/src/compiler/util/removeDashes.js":
/*!**************************************************************!*\
  !*** ./node_modules/marko/src/compiler/util/removeDashes.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function removeDashes(str) {
    return str.replace(/-([a-z])/g, function(match, lower) {
        return lower.toUpperCase();
    });
};


/***/ }),

/***/ "./node_modules/marko/src/components/Component.js":
/*!********************************************************!*\
  !*** ./node_modules/marko/src/components/Component.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* jshint newcap:false */

var complain =  true && __webpack_require__(/*! complain */ "./node_modules/complain/index.js");

var domInsert = __webpack_require__(/*! ../runtime/dom-insert */ "./node_modules/marko/src/runtime/dom-insert.js");
var defaultCreateOut = __webpack_require__(/*! ../runtime/createOut */ "./node_modules/marko/src/runtime/createOut.js");
var getComponentsContext = __webpack_require__(/*! ./ComponentsContext */ "./node_modules/marko/src/components/ComponentsContext.js")
    .___getComponentsContext;
var componentsUtil = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js");
var componentLookup = componentsUtil.___componentLookup;
var emitLifecycleEvent = componentsUtil.___emitLifecycleEvent;
var destroyNodeRecursive = componentsUtil.___destroyNodeRecursive;
var EventEmitter = __webpack_require__(/*! events-light */ "./node_modules/events-light/src/index.js");
var RenderResult = __webpack_require__(/*! ../runtime/RenderResult */ "./node_modules/marko/src/runtime/RenderResult.js");
var SubscriptionTracker = __webpack_require__(/*! listener-tracker */ "./node_modules/listener-tracker/lib/listener-tracker.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");
var updateManager = __webpack_require__(/*! ./update-manager */ "./node_modules/marko/src/components/update-manager.js");
var morphdom = __webpack_require__(/*! ../morphdom */ "./node_modules/marko/src/morphdom/index.js");
var eventDelegation = __webpack_require__(/*! ./event-delegation */ "./node_modules/marko/src/components/event-delegation.js");
var domData = __webpack_require__(/*! ./dom-data */ "./node_modules/marko/src/components/dom-data.js");
var componentsByDOMNode = domData.___componentByDOMNode;
var CONTEXT_KEY = "__subtree_context__";

var slice = Array.prototype.slice;

var COMPONENT_SUBSCRIBE_TO_OPTIONS;
var NON_COMPONENT_SUBSCRIBE_TO_OPTIONS = {
    addDestroyListener: false
};

var emit = EventEmitter.prototype.emit;
var ELEMENT_NODE = 1;

function removeListener(removeEventListenerHandle) {
    removeEventListenerHandle();
}

function handleCustomEventWithMethodListener(
    component,
    targetMethodName,
    args,
    extraArgs
) {
    // Remove the "eventType" argument
    args.push(component);

    if (extraArgs) {
        args = extraArgs.concat(args);
    }

    var targetComponent = componentLookup[component.___scope];
    var targetMethod =
        typeof targetMethodName === "function"
            ? targetMethodName
            : targetComponent[targetMethodName];
    if (!targetMethod) {
        throw Error("Method not found: " + targetMethodName);
    }

    targetMethod.apply(targetComponent, args);
}

function resolveKeyHelper(key, index) {
    return index ? key + "_" + index : key;
}

function resolveComponentIdHelper(component, key, index) {
    return component.id + "-" + resolveKeyHelper(key, index);
}

/**
 * This method is used to process "update_<stateName>" handler functions.
 * If all of the modified state properties have a user provided update handler
 * then a rerender will be bypassed and, instead, the DOM will be updated
 * looping over and invoking the custom update handlers.
 * @return {boolean} Returns true if if the DOM was updated. False, otherwise.
 */
function processUpdateHandlers(component, stateChanges, oldState) {
    var handlerMethod;
    var handlers;

    for (var propName in stateChanges) {
        if (stateChanges.hasOwnProperty(propName)) {
            var handlerMethodName = "update_" + propName;

            handlerMethod = component[handlerMethodName];
            if (handlerMethod) {
                (handlers || (handlers = [])).push([propName, handlerMethod]);
            } else {
                // This state change does not have a state handler so return false
                // to force a rerender
                return;
            }
        }
    }

    // If we got here then all of the changed state properties have
    // an update handler or there are no state properties that actually
    // changed.
    if (handlers) {
        // Otherwise, there are handlers for all of the changed properties
        // so apply the updates using those handlers

        handlers.forEach(function(handler) {
            var propertyName = handler[0];
            handlerMethod = handler[1];

            var newValue = stateChanges[propertyName];
            var oldValue = oldState[propertyName];
            handlerMethod.call(component, newValue, oldValue);
        });

        emitLifecycleEvent(component, "update");

        component.___reset();
    }

    return true;
}

function checkInputChanged(existingComponent, oldInput, newInput) {
    if (oldInput != newInput) {
        if (oldInput == null || newInput == null) {
            return true;
        }

        var oldKeys = Object.keys(oldInput);
        var newKeys = Object.keys(newInput);
        var len = oldKeys.length;
        if (len !== newKeys.length) {
            return true;
        }

        for (var i = 0; i < len; i++) {
            var key = oldKeys[i];
            if (oldInput[key] !== newInput[key]) {
                return true;
            }
        }
    }

    return false;
}

var componentProto;

/**
 * Base component type.
 *
 * NOTE: Any methods that are prefixed with an underscore should be considered private!
 */
function Component(id) {
    EventEmitter.call(this);
    this.id = id;
    this.___state = null;
    this.___rootNode = null;
    this.___subscriptions = null;
    this.___domEventListenerHandles = null;
    this.___bubblingDomEvents = null; // Used to keep track of bubbling DOM events for components rendered on the server
    this.___customEvents = null;
    this.___scope = null;
    this.___renderInput = null;
    this.___input = undefined;
    this.___mounted = false;
    this.___global = undefined;

    this.___destroyed = false;
    this.___updateQueued = false;
    this.___dirty = false;
    this.___settingInput = false;

    this.___document = undefined;

    this.___keyedElements = {};
    this.___keySequence = undefined;
}

Component.prototype = componentProto = {
    ___isComponent: true,

    subscribeTo: function(target) {
        if (!target) {
            throw TypeError();
        }

        var subscriptions =
            this.___subscriptions ||
            (this.___subscriptions = new SubscriptionTracker());

        var subscribeToOptions = target.___isComponent
            ? COMPONENT_SUBSCRIBE_TO_OPTIONS
            : NON_COMPONENT_SUBSCRIBE_TO_OPTIONS;

        return subscriptions.subscribeTo(target, subscribeToOptions);
    },

    emit: function(eventType) {
        var customEvents = this.___customEvents;
        var target;

        if (customEvents && (target = customEvents[eventType])) {
            var targetMethodName = target[0];
            var isOnce = target[1];
            var extraArgs = target[2];
            var args = slice.call(arguments, 1);

            handleCustomEventWithMethodListener(
                this,
                targetMethodName,
                args,
                extraArgs
            );

            if (isOnce) {
                delete customEvents[eventType];
            }
        }

        if (this.listenerCount(eventType)) {
            return emit.apply(this, arguments);
        }
    },
    getElId: function(key, index) {
        return resolveComponentIdHelper(this, key, index);
    },
    getEl: function(key, index) {
        if (key) {
            var resolvedKey = resolveKeyHelper(key, index);
            var keyedElement = this.___keyedElements["@" + resolvedKey];

            if (!keyedElement) {
                var keyedComponent = this.getComponent(resolvedKey);

                if (keyedComponent) {
                    // eslint-disable-next-line no-constant-condition
                    if ("MARKO_DEBUG") {
                        complain(
                            "Accessing the elements of a child component using 'component.getEl' is deprecated."
                        );
                    }
                    return keyedComponent.___rootNode.firstChild;
                }
            }

            return keyedElement;
        } else {
            return this.___rootNode && this.___rootNode.firstChild;
        }
    },
    getEls: function(key) {
        key = key + "[]";

        var els = [];
        var i = 0;
        var el;
        while ((el = this.getEl(key, i))) {
            els.push(el);
            i++;
        }
        return els;
    },
    getComponent: function(key, index) {
        var rootNode = this.___keyedElements[resolveKeyHelper(key, index)];
        if (/\[\]$/.test(key)) {
            // eslint-disable-next-line no-constant-condition
            if ("MARKO_DEBUG") {
                complain(
                    "A repeated key[] was passed to getComponent. Use a non-repeating key if there is only one of these components."
                );
            }
            rootNode = rootNode && rootNode[Object.keys(rootNode)[0]];
        }
        return rootNode && componentsByDOMNode.get(rootNode);
    },
    getComponents: function(key) {
        var lookup = this.___keyedElements[key + "[]"];
        return lookup
            ? Object.keys(lookup).map(function(key) {
                  return componentsByDOMNode.get(lookup[key]);
              })
            : [];
    },
    destroy: function() {
        if (this.___destroyed) {
            return;
        }

        var root = this.___rootNode;
        var nodes = this.___rootNode.nodes;

        this.___destroyShallow();

        nodes.forEach(function(node) {
            destroyNodeRecursive(node);

            if (eventDelegation.___handleNodeDetach(node) !== false) {
                node.parentNode.removeChild(node);
            }
        });

        root.detached = true;

        delete componentLookup[this.id];
    },

    ___destroyShallow: function() {
        if (this.___destroyed) {
            return;
        }

        emitLifecycleEvent(this, "destroy");
        this.___destroyed = true;

        componentsByDOMNode.set(this.___rootNode, undefined);

        this.___rootNode = null;

        // Unsubscribe from all DOM events
        this.___removeDOMEventListeners();

        var subscriptions = this.___subscriptions;
        if (subscriptions) {
            subscriptions.removeAllListeners();
            this.___subscriptions = null;
        }
    },

    isDestroyed: function() {
        return this.___destroyed;
    },
    get state() {
        return this.___state;
    },
    set state(newState) {
        var state = this.___state;
        if (!state && !newState) {
            return;
        }

        if (!state) {
            state = this.___state = new this.___State(this);
        }

        state.___replace(newState || {});

        if (state.___dirty) {
            this.___queueUpdate();
        }

        if (!newState) {
            this.___state = null;
        }
    },
    setState: function(name, value) {
        var state = this.___state;

        if (typeof name == "object") {
            // Merge in the new state with the old state
            var newState = name;
            for (var k in newState) {
                if (newState.hasOwnProperty(k)) {
                    state.___set(k, newState[k], true /* ensure:true */);
                }
            }
        } else {
            state.___set(name, value, true /* ensure:true */);
        }
    },

    setStateDirty: function(name, value) {
        var state = this.___state;

        if (arguments.length == 1) {
            value = state[name];
        }

        state.___set(
            name,
            value,
            true /* ensure:true */,
            true /* forceDirty:true */
        );
    },

    replaceState: function(newState) {
        this.___state.___replace(newState);
    },

    get input() {
        return this.___input;
    },
    set input(newInput) {
        if (this.___settingInput) {
            this.___input = newInput;
        } else {
            this.___setInput(newInput);
        }
    },

    ___setInput: function(newInput, onInput, out) {
        onInput = onInput || this.onInput;
        var updatedInput;

        var oldInput = this.___input;
        this.___input = undefined;
        this.___context = (out && out[CONTEXT_KEY]) || this.___context;

        if (onInput) {
            // We need to set a flag to preview `this.input = foo` inside
            // onInput causing infinite recursion
            this.___settingInput = true;
            updatedInput = onInput.call(this, newInput || {}, out);
            this.___settingInput = false;
        }

        newInput = this.___renderInput = updatedInput || newInput;

        if ((this.___dirty = checkInputChanged(this, oldInput, newInput))) {
            this.___queueUpdate();
        }

        if (this.___input === undefined) {
            this.___input = newInput;
            if (newInput && newInput.$global) {
                this.___global = newInput.$global;
            }
        }

        return newInput;
    },

    forceUpdate: function() {
        this.___dirty = true;
        this.___queueUpdate();
    },

    ___queueUpdate: function() {
        if (!this.___updateQueued) {
            this.___updateQueued = true;
            updateManager.___queueComponentUpdate(this);
        }
    },

    update: function() {
        if (this.___destroyed === true || this.___isDirty === false) {
            return;
        }

        var input = this.___input;
        var state = this.___state;

        if (
            this.___dirty === false &&
            state !== null &&
            state.___dirty === true
        ) {
            if (
                processUpdateHandlers(
                    this,
                    state.___changes,
                    state.___old,
                    state
                )
            ) {
                state.___dirty = false;
            }
        }

        if (this.___isDirty === true) {
            // The UI component is still dirty after process state handlers
            // then we should rerender

            if (this.shouldUpdate(input, state) !== false) {
                this.___rerender(false);
            }
        }

        this.___reset();
    },

    get ___isDirty() {
        return (
            this.___dirty === true ||
            (this.___state !== null && this.___state.___dirty === true)
        );
    },

    ___reset: function() {
        this.___dirty = false;
        this.___updateQueued = false;
        this.___renderInput = null;
        var state = this.___state;
        if (state) {
            state.___reset();
        }
    },

    shouldUpdate: function() {
        return true;
    },

    ___emitLifecycleEvent: function(eventType, eventArg1, eventArg2) {
        emitLifecycleEvent(this, eventType, eventArg1, eventArg2);
    },

    ___rerender: function(isRerenderInBrowser) {
        var self = this;
        var renderer = self.___renderer;

        if (!renderer) {
            throw TypeError();
        }

        var rootNode = this.___rootNode;

        var doc = self.___document;
        var input = this.___renderInput || this.___input;
        var globalData = this.___global;

        updateManager.___batchUpdate(function() {
            var createOut = renderer.createOut || defaultCreateOut;
            var out = createOut(globalData);
            out.sync();
            out.___document = self.___document;
            out[CONTEXT_KEY] = self.___context;

            var componentsContext = getComponentsContext(out);
            var globalComponentsContext = componentsContext.___globalContext;
            globalComponentsContext.___rerenderComponent = self;
            globalComponentsContext.___isRerenderInBrowser = isRerenderInBrowser;

            renderer(input, out);

            var result = new RenderResult(out);

            var targetNode = out.___getOutput().___firstChild;

            morphdom(rootNode, targetNode, doc, componentsContext);

            result.afterInsert(doc);
        });

        this.___reset();
    },

    ___detach: function() {
        var root = this.___rootNode;
        root.remove();
        return root;
    },

    ___removeDOMEventListeners: function() {
        var eventListenerHandles = this.___domEventListenerHandles;
        if (eventListenerHandles) {
            eventListenerHandles.forEach(removeListener);
            this.___domEventListenerHandles = null;
        }
    },

    get ___rawState() {
        var state = this.___state;
        return state && state.___raw;
    },

    ___setCustomEvents: function(customEvents, scope) {
        var finalCustomEvents = (this.___customEvents = {});
        this.___scope = scope;

        customEvents.forEach(function(customEvent) {
            var eventType = customEvent[0];
            var targetMethodName = customEvent[1];
            var isOnce = customEvent[2];
            var extraArgs = customEvent[3];

            finalCustomEvents[eventType] = [
                targetMethodName,
                isOnce,
                extraArgs
            ];
        });
    },

    get el() {
        // eslint-disable-next-line no-constant-condition
        if ("MARKO_DEBUG") {
            complain(
                'The "this.el" attribute is deprecated. Please use "this.getEl(key)" instead.'
            );
        }
        return this.___rootNode && this.___rootNode.firstChild;
    },

    get els() {
        // eslint-disable-next-line no-constant-condition
        if ("MARKO_DEBUG") {
            complain(
                'The "this.els" attribute is deprecated. Please use "this.getEls(key)" instead.'
            );
        }
        return (this.___rootNode ? this.___rootNode.nodes : []).filter(function(
            el
        ) {
            return el.nodeType === ELEMENT_NODE;
        });
    }
};

componentProto.elId = componentProto.getElId;
componentProto.___update = componentProto.update;
componentProto.___destroy = componentProto.destroy;

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    componentProto,
    function getEl(component) {
        return component.___detach();
    },
    function afterInsert(component) {
        return component;
    }
);

inherit(Component, EventEmitter);

module.exports = Component;


/***/ }),

/***/ "./node_modules/marko/src/components/ComponentDef.js":
/*!***********************************************************!*\
  !*** ./node_modules/marko/src/components/ComponentDef.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var repeatedRegExp = /\[\]$/;
var componentUtil = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js");
var attachBubblingEvent = componentUtil.___attachBubblingEvent;
var addDelegatedEventHandler = __webpack_require__(/*! ./event-delegation */ "./node_modules/marko/src/components/event-delegation.js")
    .___addDelegatedEventHandler;
var extend = __webpack_require__(/*! raptor-util/extend */ "./node_modules/raptor-util/extend.js");
var KeySequence = __webpack_require__(/*! ./KeySequence */ "./node_modules/marko/src/components/KeySequence.js");

var FLAG_WILL_RERENDER_IN_BROWSER = 1;
/*
var FLAG_HAS_BODY_EL = 2;
var FLAG_HAS_HEAD_EL = 4;
*/

/**
 * A ComponentDef is used to hold the metadata collected at runtime for
 * a single component and this information is used to instantiate the component
 * later (after the rendered HTML has been added to the DOM)
 */
function ComponentDef(component, componentId, globalComponentsContext) {
    this.___globalComponentsContext = globalComponentsContext; // The AsyncWriter that this component is associated with
    this.___component = component;
    this.id = componentId;

    this.___domEvents = undefined; // An array of DOM events that need to be added (in sets of three)

    this.___isExisting = false;

    this.___renderBoundary = false;
    this.___flags = 0;

    this.___nextIdIndex = 0; // The unique integer to use for the next scoped ID

    this.___keySequence = null;

    this.___preservedDOMNodes = null;
}

ComponentDef.prototype = {
    ___nextKey: function(key) {
        var keySequence =
            this.___keySequence || (this.___keySequence = new KeySequence());
        return keySequence.___nextKey(key);
    },

    ___preserveDOMNode: function(key, bodyOnly) {
        var lookup =
            this.___preservedDOMNodes || (this.___preservedDOMNodes = {});
        lookup[key] = bodyOnly ? 2 : 1;
    },

    /**
     * This helper method generates a unique and fully qualified DOM element ID
     * that is unique within the scope of the current component. This method prefixes
     * the the nestedId with the ID of the current component. If nestedId ends
     * with `[]` then it is treated as a repeated ID and we will generate
     * an ID with the current index for the current nestedId.
     * (e.g. "myParentId-foo[0]", "myParentId-foo[1]", etc.)
     */
    elId: function(nestedId) {
        var id = this.id;
        if (nestedId == null) {
            return id;
        } else {
            if (typeof nestedId == "string" && repeatedRegExp.test(nestedId)) {
                return this.___globalComponentsContext.___nextRepeatedId(
                    id,
                    nestedId
                );
            } else {
                return id + "-" + nestedId;
            }
        }
    },
    /**
     * Returns the next auto generated unique ID for a nested DOM element or nested DOM component
     */
    ___nextComponentId: function() {
        return this.id + "-c" + this.___nextIdIndex++;
    },

    d: function(eventName, handlerMethodName, isOnce, extraArgs) {
        addDelegatedEventHandler(eventName);
        return attachBubblingEvent(this, handlerMethodName, isOnce, extraArgs);
    },

    get ___type() {
        return this.___component.___type;
    }
};

ComponentDef.___deserialize = function(o, types, global, registry) {
    var id = o[0];
    var typeName = types[o[1]];
    var input = o[2];
    var extra = o[3];

    var isLegacy = extra.l;
    var state = extra.s;
    var componentProps = extra.w;
    var flags = extra.f;

    var component =
        typeName /* legacy */ &&
        registry.___createComponent(typeName, id, isLegacy);

    // Prevent newly created component from being queued for update since we area
    // just building it from the server info
    component.___updateQueued = true;

    if (flags & FLAG_WILL_RERENDER_IN_BROWSER) {
        if (component.onCreate) {
            component.onCreate(input, { global: global });
        }
        if (component.onInput) {
            input = component.onInput(input, { global: global }) || input;
        }
    } else {
        if (state) {
            var undefinedPropNames = extra.u;
            if (undefinedPropNames) {
                undefinedPropNames.forEach(function(undefinedPropName) {
                    state[undefinedPropName] = undefined;
                });
            }
            // We go through the setter here so that we convert the state object
            // to an instance of `State`
            component.state = state;
        }

        if (componentProps) {
            extend(component, componentProps);
        }
    }

    component.___input = input;

    if (extra.b) {
        component.___bubblingDomEvents = extra.b;
    }

    var scope = extra.p;
    var customEvents = extra.e;
    if (customEvents) {
        component.___setCustomEvents(customEvents, scope);
    }

    component.___global = global;

    return {
        id: id,
        ___component: component,
        ___boundary: extra.r,
        ___domEvents: extra.d,
        ___flags: extra.f || 0
    };
};

module.exports = ComponentDef;


/***/ }),

/***/ "./node_modules/marko/src/components/ComponentsContext.js":
/*!****************************************************************!*\
  !*** ./node_modules/marko/src/components/ComponentsContext.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var GlobalComponentsContext = __webpack_require__(/*! ./GlobalComponentsContext */ "./node_modules/marko/src/components/GlobalComponentsContext.js");

function ComponentsContext(out, parentComponentsContext) {
    var globalComponentsContext;
    var componentDef;

    if (parentComponentsContext) {
        globalComponentsContext = parentComponentsContext.___globalContext;
        componentDef = parentComponentsContext.___componentDef;

        var nestedContextsForParent;
        if (
            !(nestedContextsForParent =
                parentComponentsContext.___nestedContexts)
        ) {
            nestedContextsForParent = parentComponentsContext.___nestedContexts = [];
        }

        nestedContextsForParent.push(this);
    } else {
        globalComponentsContext = out.global.___components;
        if (globalComponentsContext === undefined) {
            out.global.___components = globalComponentsContext = new GlobalComponentsContext(
                out
            );
        }
    }

    this.___globalContext = globalComponentsContext;
    this.___components = [];
    this.___out = out;
    this.___componentDef = componentDef;
    this.___nestedContexts = undefined;
}

ComponentsContext.prototype = {
    ___initComponents: function(doc) {
        var componentDefs = this.___components;

        ComponentsContext.___initClientRendered(componentDefs, doc);

        this.___out.emit("___componentsInitialized");

        // Reset things stored in global since global is retained for
        // future renders
        this.___out.global.___components = undefined;

        return componentDefs;
    }
};

function getComponentsContext(out) {
    return (
        out.___components || (out.___components = new ComponentsContext(out))
    );
}

module.exports = exports = ComponentsContext;

exports.___getComponentsContext = getComponentsContext;


/***/ }),

/***/ "./node_modules/marko/src/components/GlobalComponentsContext.js":
/*!**********************************************************************!*\
  !*** ./node_modules/marko/src/components/GlobalComponentsContext.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nextComponentIdProvider = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js").___nextComponentIdProvider;
var KeySequence = __webpack_require__(/*! ./KeySequence */ "./node_modules/marko/src/components/KeySequence.js");

function GlobalComponentsContext(out) {
    this.___preservedEls = {};
    this.___preservedElBodies = {};
    this.___renderedComponentsById = {};
    this.___rerenderComponent = undefined;
    this.___nextComponentId = nextComponentIdProvider(out);
}

GlobalComponentsContext.prototype = {
    ___createKeySequence: function() {
        return new KeySequence();
    }
};

module.exports = GlobalComponentsContext;


/***/ }),

/***/ "./node_modules/marko/src/components/KeySequence.js":
/*!**********************************************************!*\
  !*** ./node_modules/marko/src/components/KeySequence.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function KeySequence() {
    this.___lookup = {};
}

KeySequence.prototype = {
    ___nextKey: function(key) {
        // var len = key.length;
        // var lastChar = key[len-1];
        // if (lastChar === ']') {
        //     key = key.substring(0, len-2);
        // }
        var lookup = this.___lookup;

        var currentIndex = lookup[key]++;
        if (!currentIndex) {
            lookup[key] = 1;
            currentIndex = 0;
            return key;
        } else {
            return key + "_" + currentIndex;
        }
    }
};

module.exports = KeySequence;


/***/ }),

/***/ "./node_modules/marko/src/components/State.js":
/*!****************************************************!*\
  !*** ./node_modules/marko/src/components/State.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(/*! raptor-util/extend */ "./node_modules/raptor-util/extend.js");

function ensure(state, propertyName) {
    var proto = state.constructor.prototype;
    if (!(propertyName in proto)) {
        Object.defineProperty(proto, propertyName, {
            get: function() {
                return this.___raw[propertyName];
            },
            set: function(value) {
                this.___set(propertyName, value, false /* ensure:false */);
            }
        });
    }
}

function State(component) {
    this.___component = component;
    this.___raw = {};

    this.___dirty = false;
    this.___old = null;
    this.___changes = null;
    this.___forced = null; // An object that we use to keep tracking of state properties that were forced to be dirty

    Object.seal(this);
}

State.prototype = {
    ___reset: function() {
        var self = this;

        self.___dirty = false;
        self.___old = null;
        self.___changes = null;
        self.___forced = null;
    },

    ___replace: function(newState) {
        var state = this;
        var key;

        var rawState = this.___raw;

        for (key in rawState) {
            if (!(key in newState)) {
                state.___set(
                    key,
                    undefined,
                    false /* ensure:false */,
                    false /* forceDirty:false */
                );
            }
        }

        for (key in newState) {
            state.___set(
                key,
                newState[key],
                true /* ensure:true */,
                false /* forceDirty:false */
            );
        }
    },
    ___set: function(name, value, shouldEnsure, forceDirty) {
        var rawState = this.___raw;

        if (shouldEnsure) {
            ensure(this, name);
        }

        if (forceDirty) {
            var forcedDirtyState = this.___forced || (this.___forced = {});
            forcedDirtyState[name] = true;
        } else if (rawState[name] === value) {
            return;
        }

        if (!this.___dirty) {
            // This is the first time we are modifying the component state
            // so introduce some properties to do some tracking of
            // changes to the state
            this.___dirty = true; // Mark the component state as dirty (i.e. modified)
            this.___old = rawState;
            this.___raw = rawState = extend({}, rawState);
            this.___changes = {};
            this.___component.___queueUpdate();
        }

        this.___changes[name] = value;

        if (value === undefined) {
            // Don't store state properties with an undefined or null value
            delete rawState[name];
        } else {
            // Otherwise, store the new value in the component state
            rawState[name] = value;
        }
    },
    toJSON: function() {
        return this.___raw;
    }
};

module.exports = State;


/***/ }),

/***/ "./node_modules/marko/src/components/beginComponent-browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/marko/src/components/beginComponent-browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ComponentDef = __webpack_require__(/*! ./ComponentDef */ "./node_modules/marko/src/components/ComponentDef.js");

module.exports = function beginComponent(
    componentsContext,
    component,
    key,
    ownerComponentDef
) {
    var componentId = component.id;

    var globalContext = componentsContext.___globalContext;
    var componentDef = (componentsContext.___componentDef = new ComponentDef(
        component,
        componentId,
        globalContext
    ));
    globalContext.___renderedComponentsById[componentId] = true;
    componentsContext.___components.push(componentDef);

    var out = componentsContext.___out;
    out.bc(component, key, ownerComponentDef && ownerComponentDef.___component);
    return componentDef;
};


/***/ }),

/***/ "./node_modules/marko/src/components/defineComponent.js":
/*!**************************************************************!*\
  !*** ./node_modules/marko/src/components/defineComponent.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* jshint newcap:false */

var BaseState = __webpack_require__(/*! ./State */ "./node_modules/marko/src/components/State.js");
var BaseComponent = __webpack_require__(/*! ./Component */ "./node_modules/marko/src/components/Component.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");

module.exports = function defineComponent(def, renderer) {
    if (def.___isComponent) {
        return def;
    }

    var ComponentClass = function() {};
    var proto;

    var type = typeof def;

    if (type == "function") {
        proto = def.prototype;
    } else if (type == "object") {
        proto = def;
    } else {
        throw TypeError();
    }

    ComponentClass.prototype = proto;

    // We don't use the constructor provided by the user
    // since we don't invoke their constructor until
    // we have had a chance to do our own initialization.
    // Instead, we store their constructor in the "initComponent"
    // property and that method gets called later inside
    // init-components-browser.js
    function Component(id) {
        BaseComponent.call(this, id);
    }

    if (!proto.___isComponent) {
        // Inherit from Component if they didn't already
        inherit(ComponentClass, BaseComponent);
    }

    // The same prototype will be used by our constructor after
    // we he have set up the prototype chain using the inherit function
    proto = Component.prototype = ComponentClass.prototype;

    // proto.constructor = def.constructor = Component;

    // Set a flag on the constructor function to make it clear this is
    // a component so that we can short-circuit this work later
    Component.___isComponent = true;

    function State(component) {
        BaseState.call(this, component);
    }
    inherit(State, BaseState);
    proto.___State = State;
    proto.___renderer = renderer;

    return Component;
};


/***/ }),

/***/ "./node_modules/marko/src/components/dom-data.js":
/*!*******************************************************!*\
  !*** ./node_modules/marko/src/components/dom-data.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var counter = 0;
var seed = /*require.resolve*/(/*! ./dom-data */ "./node_modules/marko/src/components/dom-data.js");
var WeakMap =
    global.WeakMap ||
    function WeakMap() {
        var id = seed + counter++;
        return {
            get: function(ref) {
                return ref[id];
            },
            set: function(ref, value) {
                ref[id] = value;
            }
        };
    };

module.exports = {
    ___vPropsByDOMNode: new WeakMap(),
    ___vElementByDOMNode: new WeakMap(),
    ___componentByDOMNode: new WeakMap(),
    ___detachedByDOMNode: new WeakMap(),
    ___keyByDOMNode: new WeakMap()
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/marko/src/components/endComponent-browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/marko/src/components/endComponent-browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function endComponent(out) {
    out.ee(); // endElement() (also works for VComponent nodes pushed on to the stack)
};


/***/ }),

/***/ "./node_modules/marko/src/components/event-delegation.js":
/*!***************************************************************!*\
  !*** ./node_modules/marko/src/components/event-delegation.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var componentsUtil = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js");
var runtimeId = componentsUtil.___runtimeId;
var componentLookup = componentsUtil.___componentLookup;
var getMarkoPropsFromEl = componentsUtil.___getMarkoPropsFromEl;

// We make our best effort to allow multiple marko runtimes to be loaded in the
// same window. Each marko runtime will get its own unique runtime ID.
var listenersAttachedKey = "$MDE" + runtimeId;
var delegatedEvents = {};

function getEventFromEl(el, eventName) {
    var virtualProps = getMarkoPropsFromEl(el);
    var eventInfo = virtualProps[eventName];

    if (typeof eventInfo === "string") {
        eventInfo = eventInfo.split(" ");
        if (eventInfo[2]) {
            eventInfo[2] = eventInfo[2] === "true";
        }
        if (eventInfo.length == 4) {
            eventInfo[3] = parseInt(eventInfo[3], 10);
        }
    }

    return eventInfo;
}

function delegateEvent(node, eventName, target, event) {
    var targetMethod = target[0];
    var targetComponentId = target[1];
    var isOnce = target[2];
    var extraArgs = target[3];

    if (isOnce) {
        var virtualProps = getMarkoPropsFromEl(node);
        delete virtualProps[eventName];
    }

    var targetComponent = componentLookup[targetComponentId];

    if (!targetComponent) {
        return;
    }

    var targetFunc =
        typeof targetMethod === "function"
            ? targetMethod
            : targetComponent[targetMethod];
    if (!targetFunc) {
        throw Error("Method not found: " + targetMethod);
    }

    if (extraArgs != null) {
        if (typeof extraArgs === "number") {
            extraArgs = targetComponent.___bubblingDomEvents[extraArgs];
        }
    }

    // Invoke the component method
    if (extraArgs) {
        targetFunc.apply(targetComponent, extraArgs.concat(event, node));
    } else {
        targetFunc.call(targetComponent, event, node);
    }
}

function addDelegatedEventHandler(eventType) {
    if (!delegatedEvents[eventType]) {
        delegatedEvents[eventType] = true;
    }
}

function addDelegatedEventHandlerToDoc(eventType, doc) {
    var body = doc.body || doc;
    var listeners = (doc[listenersAttachedKey] =
        doc[listenersAttachedKey] || {});
    if (!listeners[eventType]) {
        body.addEventListener(
            eventType,
            (listeners[eventType] = function(event) {
                var propagationStopped = false;

                // Monkey-patch to fix #97
                var oldStopPropagation = event.stopPropagation;

                event.stopPropagation = function() {
                    oldStopPropagation.call(event);
                    propagationStopped = true;
                };

                var curNode = event.target;
                if (!curNode) {
                    return;
                }

                // event.target of an SVGElementInstance does not have a
                // `getAttribute` function in IE 11.
                // See https://github.com/marko-js/marko/issues/796
                curNode = curNode.correspondingUseElement || curNode;

                // Search up the tree looking DOM events mapped to target
                // component methods
                var propName = "on" + eventType;
                var target;

                // Attributes will have the following form:
                // on<event_type>("<target_method>|<component_id>")

                do {
                    if ((target = getEventFromEl(curNode, propName))) {
                        delegateEvent(curNode, propName, target, event);

                        if (propagationStopped) {
                            break;
                        }
                    }
                } while (
                    (curNode = curNode.parentNode) &&
                    curNode.getAttribute
                );
            }),
            true
        );
    }
}

function noop() {}

exports.___handleNodeAttach = noop;
exports.___handleNodeDetach = noop;
exports.___delegateEvent = delegateEvent;
exports.___getEventFromEl = getEventFromEl;
exports.___addDelegatedEventHandler = addDelegatedEventHandler;
exports.___init = function(doc) {
    Object.keys(delegatedEvents).forEach(function(eventType) {
        addDelegatedEventHandlerToDoc(eventType, doc);
    });
};


/***/ }),

/***/ "./node_modules/marko/src/components/helpers-browser.js":
/*!**************************************************************!*\
  !*** ./node_modules/marko/src/components/helpers-browser.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./ */ "./node_modules/marko/src/components/index-browser.js");

exports.c = __webpack_require__(/*! ./defineComponent */ "./node_modules/marko/src/components/defineComponent.js"); // Referenced by compiled templates
exports.r = __webpack_require__(/*! ./renderer */ "./node_modules/marko/src/components/renderer.js"); // Referenced by compiled templates
exports.rc = __webpack_require__(/*! ./registry */ "./node_modules/marko/src/components/registry-browser.js").___register; // Referenced by compiled templates


/***/ }),

/***/ "./node_modules/marko/src/components/index-browser.js":
/*!************************************************************!*\
  !*** ./node_modules/marko/src/components/index-browser.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var componentsUtil = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js");
var initComponents = __webpack_require__(/*! ./init-components */ "./node_modules/marko/src/components/init-components-browser.js");
var registry = __webpack_require__(/*! ./registry */ "./node_modules/marko/src/components/registry-browser.js");

__webpack_require__(/*! ./ComponentsContext */ "./node_modules/marko/src/components/ComponentsContext.js").___initClientRendered =
    initComponents.___initClientRendered;

exports.getComponentForEl = componentsUtil.___getComponentForEl;
exports.init = window.$initComponents = initComponents.___initServerRendered;

exports.register = function(id, component) {
    registry.___register(id, function() {
        return component;
    });
};


/***/ }),

/***/ "./node_modules/marko/src/components/init-components-browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/marko/src/components/init-components-browser.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var warp10Finalize = __webpack_require__(/*! warp10/finalize */ "./node_modules/warp10/finalize.js");
var eventDelegation = __webpack_require__(/*! ./event-delegation */ "./node_modules/marko/src/components/event-delegation.js");
var win = window;
var defaultDocument = document;
var createFragmentNode = __webpack_require__(/*! ../morphdom/fragment */ "./node_modules/marko/src/morphdom/fragment.js").___createFragmentNode;
var componentsUtil = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js");
var componentLookup = componentsUtil.___componentLookup;
var addComponentRootToKeyedElements =
    componentsUtil.___addComponentRootToKeyedElements;
var ComponentDef = __webpack_require__(/*! ./ComponentDef */ "./node_modules/marko/src/components/ComponentDef.js");
var registry = __webpack_require__(/*! ./registry */ "./node_modules/marko/src/components/registry-browser.js");
var domData = __webpack_require__(/*! ./dom-data */ "./node_modules/marko/src/components/dom-data.js");
var componentsByDOMNode = domData.___componentByDOMNode;
var serverRenderedGlobals = {};
var serverComponentRootNodes = {};
var keyedElementsByComponentId = {};

var FLAG_WILL_RERENDER_IN_BROWSER = 1;

function indexServerComponentBoundaries(node, runtimeId, stack) {
    var componentId;
    var ownerId;
    var ownerComponent;
    var keyedElements;
    var nextSibling;
    var runtimeLength = runtimeId.length;
    stack = stack || [];

    node = node.firstChild;
    while (node) {
        nextSibling = node.nextSibling;
        if (node.nodeType === 8) {
            // Comment node
            var commentValue = node.nodeValue;
            if (commentValue.slice(0, runtimeLength) === runtimeId) {
                var firstChar = commentValue[runtimeLength];

                if (firstChar === "^" || firstChar === "#") {
                    stack.push(node);
                } else if (firstChar === "/") {
                    var endNode = node;
                    var startNode = stack.pop();
                    var rootNode;

                    if (startNode.parentNode === endNode.parentNode) {
                        rootNode = createFragmentNode(
                            startNode.nextSibling,
                            endNode
                        );
                    } else {
                        rootNode = createFragmentNode(
                            endNode.parentNode.firstChild,
                            endNode
                        );
                    }

                    componentId = startNode.nodeValue.substring(
                        runtimeLength + 1
                    );
                    firstChar = startNode.nodeValue[runtimeLength];

                    if (firstChar === "^") {
                        var parts = componentId.split(/ /g);
                        var key = parts[2];
                        ownerId = parts[1];
                        componentId = parts[0];
                        if ((ownerComponent = componentLookup[ownerId])) {
                            keyedElements = ownerComponent.___keyedElements;
                        } else {
                            keyedElements =
                                keyedElementsByComponentId[ownerId] ||
                                (keyedElementsByComponentId[ownerId] = {});
                        }
                        addComponentRootToKeyedElements(
                            keyedElements,
                            key,
                            rootNode,
                            componentId
                        );
                    }

                    serverComponentRootNodes[componentId] = rootNode;

                    startNode.parentNode.removeChild(startNode);
                    endNode.parentNode.removeChild(endNode);
                }
            }
        } else if (node.nodeType === 1) {
            // HTML element node
            var markoKey = node.getAttribute("data-marko-key");
            var markoProps = node.getAttribute("data-marko");
            if (markoKey) {
                var separatorIndex = markoKey.indexOf(" ");
                ownerId = markoKey.substring(separatorIndex + 1);
                markoKey = markoKey.substring(0, separatorIndex);
                if ((ownerComponent = componentLookup[ownerId])) {
                    keyedElements = ownerComponent.___keyedElements;
                } else {
                    keyedElements =
                        keyedElementsByComponentId[ownerId] ||
                        (keyedElementsByComponentId[ownerId] = {});
                }
                keyedElements[markoKey] = node;
            }
            if (markoProps) {
                markoProps = JSON.parse(markoProps);
                Object.keys(markoProps).forEach(function(key) {
                    if (key.slice(0, 2) === "on") {
                        eventDelegation.___addDelegatedEventHandler(
                            key.slice(2)
                        );
                    }
                });
            }
            indexServerComponentBoundaries(node, runtimeId, stack);
        }

        node = nextSibling;
    }
}

function invokeComponentEventHandler(component, targetMethodName, args) {
    var method = component[targetMethodName];
    if (!method) {
        throw Error("Method not found: " + targetMethodName);
    }

    method.apply(component, args);
}

function addEventListenerHelper(el, eventType, isOnce, listener) {
    var eventListener = listener;
    if (isOnce) {
        eventListener = function(event) {
            listener(event);
            el.removeEventListener(eventType, eventListener);
        };
    }

    el.addEventListener(eventType, eventListener, false);

    return function remove() {
        el.removeEventListener(eventType, eventListener);
    };
}

function addDOMEventListeners(
    component,
    el,
    eventType,
    targetMethodName,
    isOnce,
    extraArgs,
    handles
) {
    var removeListener = addEventListenerHelper(el, eventType, isOnce, function(
        event
    ) {
        var args = [event, el];
        if (extraArgs) {
            args = extraArgs.concat(args);
        }

        invokeComponentEventHandler(component, targetMethodName, args);
    });
    handles.push(removeListener);
}

function initComponent(componentDef, doc) {
    var component = componentDef.___component;

    if (!component || !component.___isComponent) {
        return; // legacy
    }

    component.___reset();
    component.___document = doc;

    var isExisting = componentDef.___isExisting;
    var id = component.id;

    componentLookup[id] = component;

    if (componentDef.___flags & FLAG_WILL_RERENDER_IN_BROWSER) {
        component.___rerender(true);
        return;
    }

    if (isExisting) {
        component.___removeDOMEventListeners();
    }

    var domEvents = componentDef.___domEvents;
    if (domEvents) {
        var eventListenerHandles = [];

        domEvents.forEach(function(domEventArgs) {
            // The event mapping is for a direct DOM event (not a custom event and not for bubblign dom events)

            var eventType = domEventArgs[0];
            var targetMethodName = domEventArgs[1];
            var eventEl = component.___keyedElements[domEventArgs[2]];
            var isOnce = domEventArgs[3];
            var extraArgs = domEventArgs[4];

            addDOMEventListeners(
                component,
                eventEl,
                eventType,
                targetMethodName,
                isOnce,
                extraArgs,
                eventListenerHandles
            );
        });

        if (eventListenerHandles.length) {
            component.___domEventListenerHandles = eventListenerHandles;
        }
    }

    if (component.___mounted) {
        component.___emitLifecycleEvent("update");
    } else {
        component.___mounted = true;
        component.___emitLifecycleEvent("mount");
    }
}

/**
 * This method is used to initialized components associated with UI components
 * rendered in the browser. While rendering UI components a "components context"
 * is added to the rendering context to keep up with which components are rendered.
 * When ready, the components can then be initialized by walking the component tree
 * in the components context (nested components are initialized before ancestor components).
 * @param  {Array<marko-components/lib/ComponentDef>} componentDefs An array of ComponentDef instances
 */
function initClientRendered(componentDefs, doc) {
    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    eventDelegation.___init(doc);

    doc = doc || defaultDocument;
    for (var i = componentDefs.length - 1; i >= 0; i--) {
        var componentDef = componentDefs[i];
        initComponent(componentDef, doc);
    }
}

/**
 * This method initializes all components that were rendered on the server by iterating over all
 * of the component IDs.
 */
function initServerRendered(renderedComponents, doc) {
    if (!renderedComponents) {
        renderedComponents = win.$components;

        if (renderedComponents && renderedComponents.forEach) {
            renderedComponents.forEach(function(renderedComponent) {
                initServerRendered(renderedComponent, doc);
            });
        }

        win.$components = {
            concat: initServerRendered
        };

        return;
    }

    doc = doc || defaultDocument;

    renderedComponents = warp10Finalize(renderedComponents);

    var componentDefs = renderedComponents.w;
    var typesArray = renderedComponents.t;
    var runtimeId = renderedComponents.r;

    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    indexServerComponentBoundaries(doc, runtimeId);
    eventDelegation.___init(doc);

    var globals = window.$MG;
    if (globals) {
        serverRenderedGlobals = warp10Finalize(globals);
        delete window.$MG;
    }

    componentDefs.forEach(function(componentDef) {
        componentDef = ComponentDef.___deserialize(
            componentDef,
            typesArray,
            serverRenderedGlobals,
            registry
        );

        if (!hydrateComponent(componentDef, doc)) {
            // hydrateComponent will return false if there is not rootNode
            // for the component.  If this is the case, we'll wait until the
            // DOM has fully loaded to attempt to init the component again.
            doc.addEventListener("DOMContentLoaded", function() {
                if (!hydrateComponent(componentDef, doc)) {
                    indexServerComponentBoundaries(doc, runtimeId);
                    hydrateComponent(componentDef, doc);
                }
            });
        }
    });
}

function hydrateComponent(componentDef, doc) {
    var componentId = componentDef.id;
    var component = componentDef.___component;
    var rootNode = serverComponentRootNodes[componentId];

    if (rootNode) {
        delete serverComponentRootNodes[componentId];

        component.___rootNode = rootNode;
        componentsByDOMNode.set(rootNode, component);
        component.___keyedElements =
            keyedElementsByComponentId[componentId] || {};

        delete keyedElementsByComponentId[componentId];

        initComponent(componentDef, doc || defaultDocument);
        return true;
    }
}

exports.___initClientRendered = initClientRendered;
exports.___initServerRendered = initServerRendered;


/***/ }),

/***/ "./node_modules/marko/src/components/registry-browser.js":
/*!***************************************************************!*\
  !*** ./node_modules/marko/src/components/registry-browser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var complain =  true && __webpack_require__(/*! complain */ "./node_modules/complain/index.js");
var defineComponent = __webpack_require__(/*! ./defineComponent */ "./node_modules/marko/src/components/defineComponent.js");
var loader = __webpack_require__(/*! ../loader */ "./node_modules/marko/src/loader/index-browser.js");

var registered = {};
var loaded = {};
var componentTypes = {};

function register(componentId, def) {
    // We do this to kick off registering of nested components
    // but we don't use the return value just yet since there
    // is a good chance that it resulted in a circular dependency
    def();

    registered[componentId] = def;
    delete loaded[componentId];
    delete componentTypes[componentId];
    return componentId;
}

function load(typeName, isLegacy) {
    var target = loaded[typeName];
    if (!target) {
        target = registered[typeName];

        if (target) {
            target = target();
        } else if (isLegacy) {
            target = window.$markoLegacy.load(typeName);
        } else {
            target = loader(typeName);
            // eslint-disable-next-line no-constant-condition
            if ("MARKO_DEBUG") {
                complain(
                    "Looks like you used `require:` in your browser.json to load a component.  This requires that Marko has knowledge of how lasso generates paths and will be removed in a future version.  `marko-dependencies:/path/to/template.marko` should be used instead."
                );
            }
        }

        if (!target) {
            throw Error("Component not found: " + typeName);
        }

        loaded[typeName] = target;
    }

    return target;
}

function getComponentClass(typeName, isLegacy) {
    var ComponentClass = componentTypes[typeName];

    if (ComponentClass) {
        return ComponentClass;
    }

    ComponentClass = load(typeName, isLegacy);

    ComponentClass = ComponentClass.Component || ComponentClass;

    if (!ComponentClass.___isComponent) {
        ComponentClass = defineComponent(
            ComponentClass,
            ComponentClass.renderer
        );
    }

    // Make the component "type" accessible on each component instance
    ComponentClass.prototype.___type = typeName;

    componentTypes[typeName] = ComponentClass;

    return ComponentClass;
}

function createComponent(typeName, id, isLegacy) {
    var ComponentClass = getComponentClass(typeName, isLegacy);
    return new ComponentClass(id);
}

exports.___register = register;
exports.___createComponent = createComponent;


/***/ }),

/***/ "./node_modules/marko/src/components/renderer.js":
/*!*******************************************************!*\
  !*** ./node_modules/marko/src/components/renderer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var componentsUtil = __webpack_require__(/*! ./util */ "./node_modules/marko/src/components/util-browser.js");
var componentLookup = componentsUtil.___componentLookup;
var emitLifecycleEvent = componentsUtil.___emitLifecycleEvent;

var ComponentsContext = __webpack_require__(/*! ./ComponentsContext */ "./node_modules/marko/src/components/ComponentsContext.js");
var getComponentsContext = ComponentsContext.___getComponentsContext;
var registry = __webpack_require__(/*! ./registry */ "./node_modules/marko/src/components/registry-browser.js");
var copyProps = __webpack_require__(/*! raptor-util/copyProps */ "./node_modules/raptor-util/copyProps.js");
var isServer = componentsUtil.___isServer === true;
var beginComponent = __webpack_require__(/*! ./beginComponent */ "./node_modules/marko/src/components/beginComponent-browser.js");
var endComponent = __webpack_require__(/*! ./endComponent */ "./node_modules/marko/src/components/endComponent-browser.js");

var COMPONENT_BEGIN_ASYNC_ADDED_KEY = "$wa";

function resolveComponentKey(key, parentComponentDef) {
    if (key[0] === "#") {
        return key.substring(1);
    } else {
        return parentComponentDef.id + "-" + parentComponentDef.___nextKey(key);
    }
}

function handleBeginAsync(event) {
    var parentOut = event.parentOut;
    var asyncOut = event.out;
    var componentsContext = parentOut.___components;

    if (componentsContext !== undefined) {
        // We are going to start a nested ComponentsContext
        asyncOut.___components = new ComponentsContext(
            asyncOut,
            componentsContext
        );
    }
    // Carry along the component arguments
    asyncOut.c(
        parentOut.___assignedComponentDef,
        parentOut.___assignedKey,
        parentOut.___assignedCustomEvents
    );
}

function createRendererFunc(
    templateRenderFunc,
    componentProps,
    renderingLogic
) {
    renderingLogic = renderingLogic || {};
    var onInput = renderingLogic.onInput;
    var typeName = componentProps.___type;
    var isSplit = componentProps.___split === true;
    var isImplicitComponent = componentProps.___implicit === true;

    var shouldApplySplitMixins = isSplit;

    return function renderer(input, out) {
        var outGlobal = out.global;

        if (out.isSync() === false) {
            if (!outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
                outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
                out.on("beginAsync", handleBeginAsync);
            }
        }

        var componentsContext = getComponentsContext(out);
        var globalComponentsContext = componentsContext.___globalContext;

        var component = globalComponentsContext.___rerenderComponent;
        var isRerender = component !== undefined;
        var id;
        var isExisting;
        var customEvents;
        var parentComponentDef = componentsContext.___componentDef;
        var ownerComponentDef = out.___assignedComponentDef;
        var ownerComponentId = ownerComponentDef && ownerComponentDef.id;
        var key = out.___assignedKey;

        if (component) {
            // If component is provided then we are currently rendering
            // the top-level UI component as part of a re-render
            id = component.id; // We will use the ID of the component being re-rendered
            isExisting = true; // This is a re-render so we know the component is already in the DOM
            globalComponentsContext.___rerenderComponent = null;
        } else {
            // Otherwise, we are rendering a nested UI component. We will need
            // to match up the UI component with the component already in the
            // DOM (if any) so we will need to resolve the component ID from
            // the assigned key. We also need to handle any custom event bindings
            // that were provided.
            if (parentComponentDef) {
                // console.log('componentArgs:', componentArgs);
                customEvents = out.___assignedCustomEvents;

                if (key != null) {
                    id = resolveComponentKey(
                        key.toString(),
                        parentComponentDef
                    );
                } else {
                    id = parentComponentDef.___nextComponentId();
                }
            } else {
                id = globalComponentsContext.___nextComponentId();
            }
        }

        if (isServer) {
            // If we are rendering on the server then things are simplier since
            // we don't need to match up the UI component with a previously
            // rendered component already mounted to the DOM. We also create
            // a lightweight ServerComponent
            component = registry.___createComponent(
                renderingLogic,
                id,
                input,
                out,
                typeName,
                customEvents,
                ownerComponentId
            );

            // This is the final input after running the lifecycle methods.
            // We will be passing the input to the template for the `input` param
            input = component.___updatedInput;

            component.___updatedInput = undefined; // We don't want ___updatedInput to be serialized to the browser
        } else {
            if (!component) {
                if (
                    isRerender &&
                    (component = componentLookup[id]) &&
                    component.___type !== typeName
                ) {
                    // Destroy the existing component since
                    component.destroy();
                    component = undefined;
                }

                if (component) {
                    isExisting = true;
                } else {
                    isExisting = false;
                    // We need to create a new instance of the component
                    component = registry.___createComponent(typeName, id);

                    if (shouldApplySplitMixins === true) {
                        shouldApplySplitMixins = false;

                        var renderingLogicProps =
                            typeof renderingLogic == "function"
                                ? renderingLogic.prototype
                                : renderingLogic;

                        copyProps(
                            renderingLogicProps,
                            component.constructor.prototype
                        );
                    }
                }

                // Set this flag to prevent the component from being queued for update
                // based on the new input. The component is about to be rerendered
                // so we don't want to queue it up as a result of calling `setInput()`
                component.___updateQueued = true;

                if (customEvents !== undefined) {
                    component.___setCustomEvents(
                        customEvents,
                        ownerComponentId
                    );
                }

                if (isExisting === false) {
                    emitLifecycleEvent(component, "create", input, out);
                }

                input = component.___setInput(input, onInput, out);

                if (isExisting === true) {
                    if (
                        component.___isDirty === false ||
                        component.shouldUpdate(input, component.___state) ===
                            false
                    ) {
                        // We put a placeholder element in the output stream to ensure that the existing
                        // DOM node is matched up correctly when using morphdom. We flag the VElement
                        // node to track that it is a preserve marker
                        out.___preserveComponent(component);
                        globalComponentsContext.___renderedComponentsById[
                            id
                        ] = true;
                        component.___reset(); // The component is no longer dirty so reset internal flags
                        return;
                    }
                }
            }

            component.___global = outGlobal;

            emitLifecycleEvent(component, "render", out);
        }

        var componentDef = beginComponent(
            componentsContext,
            component,
            key,
            ownerComponentDef,
            isSplit,
            isImplicitComponent
        );

        componentDef.___isExisting = isExisting;

        // Render the template associated with the component using the final template
        // data that we constructed
        templateRenderFunc(
            input,
            out,
            componentDef,
            component,
            component.___rawState
        );

        endComponent(out, componentDef);
        componentsContext.___componentDef = parentComponentDef;
    };
}

module.exports = createRendererFunc;

// exports used by the legacy renderer
createRendererFunc.___resolveComponentKey = resolveComponentKey;
createRendererFunc.___handleBeginAsync = handleBeginAsync;


/***/ }),

/***/ "./node_modules/marko/src/components/update-manager.js":
/*!*************************************************************!*\
  !*** ./node_modules/marko/src/components/update-manager.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updatesScheduled = false;
var batchStack = []; // A stack of batched updates
var unbatchedQueue = []; // Used for scheduled batched updates

var nextTick = __webpack_require__(/*! ../runtime/nextTick */ "./node_modules/marko/src/runtime/nextTick-browser.js");

/**
 * This function is called when we schedule the update of "unbatched"
 * updates to components.
 */
function updateUnbatchedComponents() {
    if (unbatchedQueue.length) {
        try {
            updateComponents(unbatchedQueue);
        } finally {
            // Reset the flag now that this scheduled batch update
            // is complete so that we can later schedule another
            // batched update if needed
            updatesScheduled = false;
        }
    }
}

function scheduleUpdates() {
    if (updatesScheduled) {
        // We have already scheduled a batched update for the
        // process.nextTick so nothing to do
        return;
    }

    updatesScheduled = true;

    nextTick(updateUnbatchedComponents);
}

function updateComponents(queue) {
    // Loop over the components in the queue and update them.
    // NOTE: It is okay if the queue grows during the iteration
    //       since we will still get to them at the end
    for (var i = 0; i < queue.length; i++) {
        var component = queue[i];
        component.___update(); // Do the actual component update
    }

    // Clear out the queue by setting the length to zero
    queue.length = 0;
}

function batchUpdate(func) {
    // If the batched update stack is empty then this
    // is the outer batched update. After the outer
    // batched update completes we invoke the "afterUpdate"
    // event listeners.
    var batch = {
        ___queue: null
    };

    batchStack.push(batch);

    try {
        func();
    } finally {
        try {
            // Update all of the components that where queued up
            // in this batch (if any)
            if (batch.___queue) {
                updateComponents(batch.___queue);
            }
        } finally {
            // Now that we have completed the update of all the components
            // in this batch we need to remove it off the top of the stack
            batchStack.length--;
        }
    }
}

function queueComponentUpdate(component) {
    var batchStackLen = batchStack.length;

    if (batchStackLen) {
        // When a batch update is started we push a new batch on to a stack.
        // If the stack has a non-zero length then we know that a batch has
        // been started so we can just queue the component on the top batch. When
        // the batch is ended this component will be updated.
        var batch = batchStack[batchStackLen - 1];

        // We default the batch queue to null to avoid creating an Array instance
        // unnecessarily. If it is null then we create a new Array, otherwise
        // we push it onto the existing Array queue
        if (batch.___queue) {
            batch.___queue.push(component);
        } else {
            batch.___queue = [component];
        }
    } else {
        // We are not within a batched update. We need to schedule a batch update
        // for the process.nextTick (if that hasn't been done already) and we will
        // add the component to the unbatched queued
        scheduleUpdates();
        unbatchedQueue.push(component);
    }
}

exports.___queueComponentUpdate = queueComponentUpdate;
exports.___batchUpdate = batchUpdate;


/***/ }),

/***/ "./node_modules/marko/src/components/util-browser.js":
/*!***********************************************************!*\
  !*** ./node_modules/marko/src/components/util-browser.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var domData = __webpack_require__(/*! ./dom-data */ "./node_modules/marko/src/components/dom-data.js");
var componentsByDOMNode = domData.___componentByDOMNode;
var keysByDOMNode = domData.___keyByDOMNode;
var vElementsByDOMNode = domData.___vElementByDOMNode;
var vPropsByDOMNode = domData.___vPropsByDOMNode;
var markoUID = window.$MUID || (window.$MUID = { i: 0 });
var runtimeId = markoUID.i++;

var componentLookup = {};

var defaultDocument = document;
var EMPTY_OBJECT = {};

function getParentComponentForEl(node) {
    while (node && !componentsByDOMNode.get(node)) {
        node = node.previousSibling || node.parentNode;
        node = (node && node.fragment) || node;
    }
    return node && componentsByDOMNode.get(node);
}

function getComponentForEl(el, doc) {
    if (el) {
        var node =
            typeof el == "string"
                ? (doc || defaultDocument).getElementById(el)
                : el;
        if (node) {
            return getParentComponentForEl(node);
        }
    }
}

var lifecycleEventMethods = {};

["create", "render", "update", "mount", "destroy"].forEach(function(eventName) {
    lifecycleEventMethods[eventName] =
        "on" + eventName[0].toUpperCase() + eventName.substring(1);
});

/**
 * This method handles invoking a component's event handler method
 * (if present) while also emitting the event through
 * the standard EventEmitter.prototype.emit method.
 *
 * Special events and their corresponding handler methods
 * include the following:
 *
 * beforeDestroy --> onBeforeDestroy
 * destroy       --> onDestroy
 * beforeUpdate  --> onBeforeUpdate
 * update        --> onUpdate
 * render        --> onRender
 */
function emitLifecycleEvent(component, eventType, eventArg1, eventArg2) {
    var listenerMethod = component[lifecycleEventMethods[eventType]];

    if (listenerMethod !== undefined) {
        listenerMethod.call(component, eventArg1, eventArg2);
    }

    component.emit(eventType, eventArg1, eventArg2);
}

function destroyComponentForNode(node) {
    var componentToDestroy = componentsByDOMNode.get(node.fragment || node);
    if (componentToDestroy) {
        componentToDestroy.___destroyShallow();
        delete componentLookup[componentToDestroy.id];
    }
}
function destroyNodeRecursive(node, component) {
    destroyComponentForNode(node);
    if (node.nodeType === 1 || node.nodeType === 12) {
        var key;

        if (component && (key = keysByDOMNode.get(node))) {
            if (node === component.___keyedElements[key]) {
                if (componentsByDOMNode.get(node) && /\[\]$/.test(key)) {
                    delete component.___keyedElements[key][
                        componentsByDOMNode.get(node).id
                    ];
                } else {
                    delete component.___keyedElements[key];
                }
            }
        }

        var curChild = node.firstChild;
        while (curChild && curChild !== node.endNode) {
            destroyNodeRecursive(curChild, component);
            curChild = curChild.nextSibling;
        }
    }
}

function nextComponentId() {
    // Each component will get an ID that is unique across all loaded
    // marko runtimes. This allows multiple instances of marko to be
    // loaded in the same window and they should all place nice
    // together
    return "c" + markoUID.i++;
}

function nextComponentIdProvider() {
    return nextComponentId;
}

function attachBubblingEvent(
    componentDef,
    handlerMethodName,
    isOnce,
    extraArgs
) {
    if (handlerMethodName) {
        var componentId = componentDef.id;
        if (extraArgs) {
            return [handlerMethodName, componentId, isOnce, extraArgs];
        } else {
            return [handlerMethodName, componentId, isOnce];
        }
    }
}

function getMarkoPropsFromEl(el) {
    var vElement = vElementsByDOMNode.get(el);
    var virtualProps;

    if (vElement) {
        virtualProps = vElement.___properties;
    } else {
        virtualProps = vPropsByDOMNode.get(el);
        if (!virtualProps) {
            virtualProps = el.getAttribute("data-marko");
            vPropsByDOMNode.set(
                el,
                (virtualProps = virtualProps
                    ? JSON.parse(virtualProps)
                    : EMPTY_OBJECT)
            );
        }
    }

    return virtualProps;
}

function normalizeComponentKey(key, parentId) {
    if (key[0] === "#") {
        key = key.replace("#" + parentId + "-", "");
    }
    return key;
}

function addComponentRootToKeyedElements(
    keyedElements,
    key,
    rootNode,
    componentId
) {
    if (/\[\]$/.test(key)) {
        var repeatedElementsForKey = (keyedElements[key] =
            keyedElements[key] || {});
        repeatedElementsForKey[componentId] = rootNode;
    } else {
        keyedElements[key] = rootNode;
    }
}

exports.___runtimeId = runtimeId;
exports.___componentLookup = componentLookup;
exports.___getComponentForEl = getComponentForEl;
exports.___emitLifecycleEvent = emitLifecycleEvent;
exports.___destroyComponentForNode = destroyComponentForNode;
exports.___destroyNodeRecursive = destroyNodeRecursive;
exports.___nextComponentIdProvider = nextComponentIdProvider;
exports.___attachBubblingEvent = attachBubblingEvent;
exports.___getMarkoPropsFromEl = getMarkoPropsFromEl;
exports.___addComponentRootToKeyedElements = addComponentRootToKeyedElements;
exports.___normalizeComponentKey = normalizeComponentKey;


/***/ }),

/***/ "./node_modules/marko/src/index-browser.js":
/*!*************************************************!*\
  !*** ./node_modules/marko/src/index-browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.createOut = __webpack_require__(/*! ./runtime/createOut */ "./node_modules/marko/src/runtime/createOut.js");
exports.load = __webpack_require__(/*! ./loader */ "./node_modules/marko/src/loader/index-browser.js");


/***/ }),

/***/ "./node_modules/marko/src/loader/index-browser.js":
/*!********************************************************!*\
  !*** ./node_modules/marko/src/loader/index-browser.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function load(templatePath) {
    throw Error("Not found: " + templatePath);
};


/***/ }),

/***/ "./node_modules/marko/src/morphdom/fragment.js":
/*!*****************************************************!*\
  !*** ./node_modules/marko/src/morphdom/fragment.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/marko/src/morphdom/helpers.js");
var insertBefore = helpers.___insertBefore;

var fragmentPrototype = {
    nodeType: 12,
    get firstChild() {
        var firstChild = this.startNode.nextSibling;
        return firstChild === this.endNode ? undefined : firstChild;
    },
    get lastChild() {
        var lastChild = this.endNode.previousSibling;
        return lastChild === this.startNode ? undefined : lastChild;
    },
    get parentNode() {
        var parentNode = this.startNode.parentNode;
        return parentNode === this.detachedContainer ? undefined : parentNode;
    },
    get nextSibling() {
        return this.endNode.nextSibling;
    },
    get nodes() {
        var nodes = [];
        var current = this.startNode;
        while (current !== this.endNode) {
            nodes.push(current);
            current = current.nextSibling;
        }
        nodes.push(current);
        return nodes;
    },
    insertBefore: function(newChildNode, referenceNode) {
        var actualReference =
            referenceNode == null ? this.endNode : referenceNode;
        return insertBefore(
            newChildNode,
            actualReference,
            this.startNode.parentNode
        );
    },
    insertInto: function(newParentNode, referenceNode) {
        this.nodes.forEach(function(node) {
            insertBefore(node, referenceNode, newParentNode);
        }, this);
        return this;
    },
    remove: function() {
        this.nodes.forEach(function(node) {
            this.detachedContainer.appendChild(node);
        }, this);
    }
};

function createFragmentNode(startNode, nextNode, parentNode) {
    var fragment = Object.create(fragmentPrototype);
    fragment.startNode = document.createTextNode("");
    fragment.endNode = document.createTextNode("");
    fragment.startNode.fragment = fragment;
    fragment.endNode.fragment = fragment;
    var detachedContainer = (fragment.detachedContainer = document.createDocumentFragment());
    parentNode =
        parentNode || (startNode && startNode.parentNode) || detachedContainer;
    insertBefore(fragment.startNode, startNode, parentNode);
    insertBefore(fragment.endNode, nextNode, parentNode);
    return fragment;
}

function beginFragmentNode(startNode, parentNode) {
    var fragment = createFragmentNode(startNode, null, parentNode);
    fragment.___finishFragment = function(nextNode) {
        fragment.___finishFragment = null;
        insertBefore(
            fragment.endNode,
            nextNode,
            parentNode || startNode.parentNode
        );
    };
    return fragment;
}

exports.___createFragmentNode = createFragmentNode;
exports.___beginFragmentNode = beginFragmentNode;


/***/ }),

/***/ "./node_modules/marko/src/morphdom/helpers.js":
/*!****************************************************!*\
  !*** ./node_modules/marko/src/morphdom/helpers.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function insertBefore(node, referenceNode, parentNode) {
    if (node.insertInto) {
        return node.insertInto(parentNode, referenceNode);
    }
    return parentNode.insertBefore(
        node,
        (referenceNode && referenceNode.startNode) || referenceNode
    );
}

function insertAfter(node, referenceNode, parentNode) {
    return insertBefore(
        node,
        referenceNode && referenceNode.nextSibling,
        parentNode
    );
}

function nextSibling(node) {
    var next = node.nextSibling;
    var fragment = next && next.fragment;
    if (fragment) {
        return next === fragment.startNode ? fragment : null;
    }
    return next;
}

function firstChild(node) {
    var next = node.firstChild;
    return (next && next.fragment) || next;
}

function removeChild(node) {
    if (node.remove) node.remove();
    else node.parentNode.removeChild(node);
}

exports.___insertBefore = insertBefore;
exports.___insertAfter = insertAfter;
exports.___nextSibling = nextSibling;
exports.___firstChild = firstChild;
exports.___removeChild = removeChild;


/***/ }),

/***/ "./node_modules/marko/src/morphdom/index.js":
/*!**************************************************!*\
  !*** ./node_modules/marko/src/morphdom/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var specialElHandlers = __webpack_require__(/*! ./specialElHandlers */ "./node_modules/marko/src/morphdom/specialElHandlers.js");
var componentsUtil = __webpack_require__(/*! ../components/util */ "./node_modules/marko/src/components/util-browser.js");
var existingComponentLookup = componentsUtil.___componentLookup;
var destroyNodeRecursive = componentsUtil.___destroyNodeRecursive;
var addComponentRootToKeyedElements =
    componentsUtil.___addComponentRootToKeyedElements;
var normalizeComponentKey = componentsUtil.___normalizeComponentKey;
var VElement = __webpack_require__(/*! ../runtime/vdom/vdom */ "./node_modules/marko/src/runtime/vdom/vdom.js").___VElement;
var virtualizeElement = VElement.___virtualize;
var morphAttrs = VElement.___morphAttrs;
var eventDelegation = __webpack_require__(/*! ../components/event-delegation */ "./node_modules/marko/src/components/event-delegation.js");
var fragment = __webpack_require__(/*! ./fragment */ "./node_modules/marko/src/morphdom/fragment.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/marko/src/morphdom/helpers.js");
var domData = __webpack_require__(/*! ../components/dom-data */ "./node_modules/marko/src/components/dom-data.js");
var keysByDOMNode = domData.___keyByDOMNode;
var componentByDOMNode = domData.___componentByDOMNode;
var vElementByDOMNode = domData.___vElementByDOMNode;
var detachedByDOMNode = domData.___detachedByDOMNode;

var insertBefore = helpers.___insertBefore;
var insertAfter = helpers.___insertAfter;
var nextSibling = helpers.___nextSibling;
var firstChild = helpers.___firstChild;
var removeChild = helpers.___removeChild;
var createFragmentNode = fragment.___createFragmentNode;
var beginFragmentNode = fragment.___beginFragmentNode;

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var COMPONENT_NODE = 2;
var FRAGMENT_NODE = 12;

// var FLAG_IS_SVG = 1;
// var FLAG_IS_TEXTAREA = 2;
// var FLAG_SIMPLE_ATTRS = 4;
var FLAG_PRESERVE = 8;
// var FLAG_CUSTOM_ELEMENT = 16;

function isAutoKey(key) {
    return !/^@/.test(key);
}

function compareNodeNames(fromEl, toEl) {
    return fromEl.___nodeName === toEl.___nodeName;
}

function onNodeAdded(node, componentsContext) {
    if (node.nodeType === 1) {
        eventDelegation.___handleNodeAttach(node, componentsContext);
    }
}

function morphdom(fromNode, toNode, doc, componentsContext) {
    var globalComponentsContext;
    var isRerenderInBrowser = false;
    var keySequences = {};

    if (componentsContext) {
        globalComponentsContext = componentsContext.___globalContext;
        isRerenderInBrowser = globalComponentsContext.___isRerenderInBrowser;
    }

    function insertVirtualNodeBefore(
        vNode,
        key,
        referenceEl,
        parentEl,
        ownerComponent,
        parentComponent
    ) {
        var realNode = vNode.___actualize(doc);
        insertBefore(realNode, referenceEl, parentEl);

        if (
            vNode.___nodeType === ELEMENT_NODE ||
            vNode.___nodeType === FRAGMENT_NODE
        ) {
            if (key) {
                keysByDOMNode.set(realNode, key);
                (isAutoKey(key)
                    ? parentComponent
                    : ownerComponent
                ).___keyedElements[key] = realNode;
            }

            morphChildren(realNode, vNode, parentComponent);
        }

        onNodeAdded(realNode, componentsContext);
    }

    function insertVirtualComponentBefore(
        vComponent,
        referenceNode,
        referenceNodeParentEl,
        component,
        key,
        ownerComponent,
        parentComponent
    ) {
        var rootNode = (component.___rootNode = insertBefore(
            createFragmentNode(),
            referenceNode,
            referenceNodeParentEl
        ));
        componentByDOMNode.set(rootNode, component);

        if (key && ownerComponent) {
            key = normalizeComponentKey(key, parentComponent.id);
            addComponentRootToKeyedElements(
                ownerComponent.___keyedElements,
                key,
                rootNode,
                component.id
            );
            keysByDOMNode.set(rootNode, key);
        }

        morphComponent(component, vComponent);
    }

    function morphComponent(component, vComponent) {
        morphChildren(component.___rootNode, vComponent, component);
    }

    var detachedNodes = [];

    function detachNode(node, parentNode, ownerComponent) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === FRAGMENT_NODE) {
            detachedNodes.push(node);
            detachedByDOMNode.set(node, ownerComponent || true);
        } else {
            destroyNodeRecursive(node);
            removeChild(node);
        }
    }

    function destroyComponent(component) {
        component.destroy();
    }

    function morphChildren(fromNode, toNode, parentComponent) {
        var curFromNodeChild = firstChild(fromNode);
        var curToNodeChild = toNode.___firstChild;

        var curToNodeKey;
        var curFromNodeKey;
        var curToNodeType;

        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        var matchingFromComponent;
        var curVFromNodeChild;
        var fromComponent;

        outer: while (curToNodeChild) {
            toNextSibling = curToNodeChild.___nextSibling;
            curToNodeType = curToNodeChild.___nodeType;
            curToNodeKey = curToNodeChild.___key;

            var ownerComponent =
                curToNodeChild.___ownerComponent || parentComponent;
            var referenceComponent;

            if (curToNodeType === COMPONENT_NODE) {
                var component = curToNodeChild.___component;
                if (
                    (matchingFromComponent =
                        existingComponentLookup[component.id]) === undefined
                ) {
                    if (isRerenderInBrowser === true) {
                        var rootNode = beginFragmentNode(
                            curFromNodeChild,
                            fromNode
                        );
                        component.___rootNode = rootNode;
                        componentByDOMNode.set(rootNode, component);

                        if (ownerComponent && curToNodeKey) {
                            curToNodeKey = normalizeComponentKey(
                                curToNodeKey,
                                parentComponent.id
                            );
                            addComponentRootToKeyedElements(
                                ownerComponent.___keyedElements,
                                curToNodeKey,
                                rootNode,
                                component.id
                            );

                            keysByDOMNode.set(rootNode, curToNodeKey);
                        }

                        morphComponent(component, curToNodeChild);

                        curFromNodeChild = nextSibling(rootNode);
                    } else {
                        insertVirtualComponentBefore(
                            curToNodeChild,
                            curFromNodeChild,
                            fromNode,
                            component,
                            curToNodeKey,
                            ownerComponent,
                            parentComponent
                        );
                    }
                } else {
                    if (
                        matchingFromComponent.___rootNode !== curFromNodeChild
                    ) {
                        if (
                            curFromNodeChild &&
                            (fromComponent = componentByDOMNode.get(
                                curFromNodeChild
                            )) &&
                            globalComponentsContext.___renderedComponentsById[
                                fromComponent.id
                            ] === undefined
                        ) {
                            // The component associated with the current real DOM node was not rendered
                            // so we should just remove it out of the real DOM by destroying it
                            curFromNodeChild = nextSibling(
                                fromComponent.___rootNode
                            );
                            destroyComponent(fromComponent);
                            continue;
                        }

                        // We need to move the existing component into
                        // the correct location
                        insertBefore(
                            matchingFromComponent.___rootNode,
                            curFromNodeChild,
                            fromNode
                        );
                    } else {
                        curFromNodeChild =
                            curFromNodeChild && nextSibling(curFromNodeChild);
                    }

                    if (!curToNodeChild.___preserve) {
                        morphComponent(component, curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                continue;
            } else if (curToNodeKey) {
                curVFromNodeChild = undefined;
                curFromNodeKey = undefined;
                var curToNodeKeyOriginal = curToNodeKey;

                if (isAutoKey(curToNodeKey)) {
                    if (ownerComponent !== parentComponent) {
                        curToNodeKey += ":" + ownerComponent.id;
                    }
                    referenceComponent = parentComponent;
                } else {
                    referenceComponent = ownerComponent;
                }

                var keySequence =
                    keySequences[referenceComponent.id] ||
                    (keySequences[
                        referenceComponent.id
                    ] = globalComponentsContext.___createKeySequence());

                // We have a keyed element. This is the fast path for matching
                // up elements
                curToNodeKey = keySequence.___nextKey(curToNodeKey);

                if (curFromNodeChild) {
                    curFromNodeKey = keysByDOMNode.get(curFromNodeChild);
                    curVFromNodeChild = vElementByDOMNode.get(curFromNodeChild);
                    fromNextSibling = nextSibling(curFromNodeChild);
                }

                if (curFromNodeKey === curToNodeKey) {
                    // Elements line up. Now we just have to make sure they are compatible
                    if (
                        (curToNodeChild.___flags & FLAG_PRESERVE) === 0 &&
                        !curToNodeChild.___preserve
                    ) {
                        // We just skip over the fromNode if it is preserved

                        if (
                            compareNodeNames(curToNodeChild, curVFromNodeChild)
                        ) {
                            morphEl(
                                curFromNodeChild,
                                curVFromNodeChild,
                                curToNodeChild,
                                curToNodeKey,
                                ownerComponent,
                                parentComponent
                            );
                        } else {
                            // Remove the old node
                            detachNode(
                                curFromNodeChild,
                                fromNode,
                                ownerComponent
                            );

                            // Incompatible nodes. Just move the target VNode into the DOM at this position
                            insertVirtualNodeBefore(
                                curToNodeChild,
                                curToNodeKey,
                                curFromNodeChild,
                                fromNode,
                                ownerComponent,
                                parentComponent
                            );
                        }
                    } else {
                        // this should be preserved.
                    }
                } else {
                    if (
                        (matchingFromEl =
                            referenceComponent.___keyedElements[
                                curToNodeKey
                            ]) === undefined
                    ) {
                        if (isRerenderInBrowser === true && curFromNodeChild) {
                            if (
                                curFromNodeChild.nodeType === ELEMENT_NODE &&
                                curFromNodeChild.nodeName ===
                                    curToNodeChild.___nodeName
                            ) {
                                curVFromNodeChild = virtualizeElement(
                                    curFromNodeChild
                                );
                                keysByDOMNode.set(
                                    curFromNodeChild,
                                    curToNodeKey
                                );
                                morphEl(
                                    curFromNodeChild,
                                    curVFromNodeChild,
                                    curToNodeChild,
                                    curToNodeKey,
                                    ownerComponent,
                                    parentComponent
                                );
                                curToNodeChild = toNextSibling;
                                curFromNodeChild = fromNextSibling;
                                continue;
                            } else if (
                                curToNodeChild.___nodeType === FRAGMENT_NODE &&
                                curFromNodeChild.nodeType === COMMENT_NODE
                            ) {
                                var content = curFromNodeChild.nodeValue;
                                if (content == "F#" + curToNodeKeyOriginal) {
                                    var endNode = curFromNodeChild;
                                    while (
                                        endNode.nodeType !== COMMENT_NODE ||
                                        endNode.nodeValue !== "F/"
                                    )
                                        endNode = endNode.nextSibling;

                                    var fragment = createFragmentNode(
                                        curFromNodeChild,
                                        endNode.nextSibling,
                                        fromNode
                                    );
                                    keysByDOMNode.set(fragment, curToNodeKey);
                                    vElementByDOMNode.set(
                                        fragment,
                                        curToNodeChild
                                    );
                                    referenceComponent.___keyedElements[
                                        curToNodeKey
                                    ] = fragment;
                                    removeChild(curFromNodeChild);
                                    removeChild(endNode);

                                    if (!curToNodeChild.___preserve) {
                                        morphChildren(
                                            fragment,
                                            curToNodeChild,
                                            parentComponent
                                        );
                                    }

                                    curToNodeChild = toNextSibling;
                                    curFromNodeChild = fragment.nextSibling;
                                    continue;
                                }
                            }
                        }

                        insertVirtualNodeBefore(
                            curToNodeChild,
                            curToNodeKey,
                            curFromNodeChild,
                            fromNode,
                            ownerComponent,
                            parentComponent
                        );
                        fromNextSibling = curFromNodeChild;
                    } else {
                        if (
                            detachedByDOMNode.get(matchingFromEl) !== undefined
                        ) {
                            detachedByDOMNode.set(matchingFromEl, undefined);
                        }

                        curVFromNodeChild = vElementByDOMNode.get(
                            matchingFromEl
                        );

                        if (
                            compareNodeNames(curVFromNodeChild, curToNodeChild)
                        ) {
                            if (fromNextSibling === matchingFromEl) {
                                // Single element removal:
                                // A <-> A
                                // B <-> C <-- We are here
                                // C     D
                                // D
                                //
                                // Single element swap:
                                // A <-> A
                                // B <-> C <-- We are here
                                // C     B

                                if (
                                    toNextSibling &&
                                    toNextSibling.___key === curFromNodeKey
                                ) {
                                    // Single element swap

                                    // We want to stay on the current real DOM node
                                    fromNextSibling = curFromNodeChild;

                                    // But move the matching element into place
                                    insertBefore(
                                        matchingFromEl,
                                        curFromNodeChild,
                                        fromNode
                                    );
                                } else {
                                    // Single element removal

                                    // We need to remove the current real DOM node
                                    // and the matching real DOM node will fall into
                                    // place. We will continue diffing with next sibling
                                    // after the real DOM node that just fell into place
                                    fromNextSibling = nextSibling(
                                        fromNextSibling
                                    );

                                    if (curFromNodeChild) {
                                        detachNode(
                                            curFromNodeChild,
                                            fromNode,
                                            ownerComponent
                                        );
                                    }
                                }
                            } else {
                                // A <-> A
                                // B <-> D <-- We are here
                                // C
                                // D

                                // We need to move the matching node into place
                                insertAfter(
                                    matchingFromEl,
                                    curFromNodeChild,
                                    fromNode
                                );

                                if (curFromNodeChild) {
                                    detachNode(
                                        curFromNodeChild,
                                        fromNode,
                                        ownerComponent
                                    );
                                }
                            }

                            if (
                                (curToNodeChild.___flags & FLAG_PRESERVE) ===
                                0
                            ) {
                                morphEl(
                                    matchingFromEl,
                                    curVFromNodeChild,
                                    curToNodeChild,
                                    curToNodeKey,
                                    ownerComponent,
                                    parentComponent
                                );
                            }
                        } else {
                            insertVirtualNodeBefore(
                                curToNodeChild,
                                curToNodeKey,
                                curFromNodeChild,
                                fromNode,
                                ownerComponent,
                                parentComponent
                            );
                            detachNode(
                                matchingFromEl,
                                fromNode,
                                ownerComponent
                            );
                        }
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue;
            }

            // The know the target node is not a VComponent node and we know
            // it is also not a preserve node. Let's now match up the HTML
            // element, text node, comment, etc.
            while (curFromNodeChild) {
                fromNextSibling = nextSibling(curFromNodeChild);

                if (
                    (fromComponent = componentByDOMNode.get(curFromNodeChild))
                ) {
                    // The current "to" element is not associated with a component,
                    // but the current "from" element is associated with a component

                    // Even if we destroy the current component in the original
                    // DOM or not, we still need to skip over it since it is
                    // not compatible with the current "to" node
                    curFromNodeChild = fromNextSibling;

                    if (
                        !globalComponentsContext.___renderedComponentsById[
                            fromComponent.id
                        ]
                    ) {
                        destroyComponent(fromComponent);
                    }

                    continue; // Move to the next "from" node
                }

                var curFromNodeType = curFromNodeChild.nodeType;

                var isCompatible = undefined;

                if (curFromNodeType === curToNodeType) {
                    if (curFromNodeType === ELEMENT_NODE) {
                        // Both nodes being compared are Element nodes
                        curVFromNodeChild = vElementByDOMNode.get(
                            curFromNodeChild
                        );
                        if (curVFromNodeChild === undefined) {
                            if (isRerenderInBrowser === true) {
                                curVFromNodeChild = virtualizeElement(
                                    curFromNodeChild
                                );
                            } else {
                                // Skip over nodes that don't look like ours...
                                curFromNodeChild = fromNextSibling;
                                continue;
                            }
                        } else if (
                            (curFromNodeKey = curVFromNodeChild.___key)
                        ) {
                            // We have a keyed element here but our target VDOM node
                            // is not keyed so this not doesn't belong
                            isCompatible = false;
                        }

                        isCompatible =
                            isCompatible !== false &&
                            compareNodeNames(
                                curVFromNodeChild,
                                curToNodeChild
                            ) === true;

                        if (isCompatible === true) {
                            // We found compatible DOM elements so transform
                            // the current "from" node to match the current
                            // target DOM node.
                            morphEl(
                                curFromNodeChild,
                                curVFromNodeChild,
                                curToNodeChild,
                                curToNodeKey,
                                ownerComponent,
                                parentComponent
                            );
                        }
                    } else if (
                        curFromNodeType === TEXT_NODE ||
                        curFromNodeType === COMMENT_NODE
                    ) {
                        // Both nodes being compared are Text or Comment nodes
                        isCompatible = true;
                        // Simply update nodeValue on the original node to
                        // change the text value
                        if (
                            curFromNodeChild.nodeValue !==
                            curToNodeChild.___nodeValue
                        ) {
                            curFromNodeChild.nodeValue =
                                curToNodeChild.___nodeValue;
                        }
                    }
                }

                if (isCompatible === true) {
                    // Advance both the "to" child and the "from" child since we found a match
                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                    continue outer;
                }

                if (curFromNodeKey) {
                    if (
                        globalComponentsContext.___preservedEls[
                            curFromNodeKey
                        ] === undefined
                    ) {
                        detachNode(curFromNodeChild, fromNode, ownerComponent);
                    }
                } else {
                    detachNode(curFromNodeChild, fromNode, ownerComponent);
                }

                curFromNodeChild = fromNextSibling;
            } // END: while (curFromNodeChild)

            // If we got this far then we did not find a candidate match for
            // our "to node" and we exhausted all of the children "from"
            // nodes. Therefore, we will just append the current "to" node
            // to the end
            insertVirtualNodeBefore(
                curToNodeChild,
                curToNodeKey,
                curFromNodeChild,
                fromNode,
                ownerComponent,
                parentComponent
            );

            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
        }

        // We have processed all of the "to nodes".
        if (fromNode.___finishFragment) {
            // If we are in an unfinished fragment, we have reached the end of the nodes
            // we were matching up and need to end the fragment
            fromNode.___finishFragment(curFromNodeChild);
        } else {
            // If curFromNodeChild is non-null then we still have some from nodes
            // left over that need to be removed
            while (curFromNodeChild) {
                fromNextSibling = nextSibling(curFromNodeChild);

                if (
                    (fromComponent = componentByDOMNode.get(curFromNodeChild))
                ) {
                    curFromNodeChild = fromNextSibling;
                    if (
                        !globalComponentsContext.___renderedComponentsById[
                            fromComponent.id
                        ]
                    ) {
                        destroyComponent(fromComponent);
                    }
                    continue;
                }

                curVFromNodeChild = vElementByDOMNode.get(curFromNodeChild);

                // For transcluded content, we need to check if the element belongs to a different component
                // context than the current component and ensure it gets removed from its key index.
                if (isAutoKey(keysByDOMNode.get(fromNode))) {
                    referenceComponent = parentComponent;
                } else {
                    referenceComponent =
                        curVFromNodeChild &&
                        curVFromNodeChild.___ownerComponent;
                }

                detachNode(curFromNodeChild, fromNode, referenceComponent);

                curFromNodeChild = fromNextSibling;
            }
        }
    }

    function morphEl(
        fromEl,
        vFromEl,
        toEl,
        toElKey,
        ownerComponent,
        parentComponent
    ) {
        var nodeName = toEl.___nodeName;

        if (isRerenderInBrowser === true && toElKey) {
            ownerComponent.___keyedElements[toElKey] = fromEl;
        }

        var constId = toEl.___constId;
        if (constId !== undefined && vFromEl.___constId === constId) {
            return;
        }

        morphAttrs(fromEl, vFromEl, toEl);

        if (
            toElKey &&
            globalComponentsContext.___preservedElBodies[toElKey] === true
        ) {
            // Don't morph the children since they are preserved
            return;
        }

        if (nodeName !== "TEXTAREA") {
            morphChildren(fromEl, toEl, parentComponent);
        }

        var specialElHandler = specialElHandlers[nodeName];
        if (specialElHandler !== undefined) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    morphChildren(fromNode, toNode, toNode.___component);

    detachedNodes.forEach(function(node) {
        var detachedFromComponent = detachedByDOMNode.get(node);

        if (detachedFromComponent !== undefined) {
            detachedByDOMNode.set(node, undefined);

            var componentToDestroy = componentByDOMNode.get(node);
            if (componentToDestroy) {
                componentToDestroy.destroy();
            } else if (node.parentNode) {
                destroyNodeRecursive(
                    node,
                    detachedFromComponent !== true && detachedFromComponent
                );

                if (eventDelegation.___handleNodeDetach(node) != false) {
                    removeChild(node);
                }
            }
        }
    });
}

module.exports = morphdom;


/***/ }),

/***/ "./node_modules/marko/src/morphdom/specialElHandlers.js":
/*!**************************************************************!*\
  !*** ./node_modules/marko/src/morphdom/specialElHandlers.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, "");
        } else {
            fromEl.removeAttribute(name, "");
        }
    }
}

// We use a JavaScript class to benefit from fast property lookup
function SpecialElHandlers() {}
SpecialElHandlers.prototype = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, "checked");
        syncBooleanAttrProp(fromEl, toEl, "disabled");

        if (fromEl.value != toEl.___value) {
            fromEl.value = toEl.___value;
        }

        if (fromEl.hasAttribute("value") && !toEl.___hasAttribute("value")) {
            fromEl.removeAttribute("value");
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.___value;
        if (fromEl.value != newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (
                oldValue == newValue ||
                (!newValue && oldValue == fromEl.placeholder)
            ) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!toEl.___hasAttribute("multiple")) {
            var i = -1;
            var selected = 0;
            var curChild = toEl.___firstChild;
            while (curChild) {
                if (curChild.___nodeName == "OPTION") {
                    i++;
                    if (curChild.___hasAttribute("selected")) {
                        selected = i;
                    }
                }
                curChild = curChild.___nextSibling;
            }

            if (fromEl.selectedIndex !== selected) {
                fromEl.selectedIndex = selected;
            }
        }
    }
};

module.exports = new SpecialElHandlers();


/***/ }),

/***/ "./node_modules/marko/src/runtime/RenderResult.js":
/*!********************************************************!*\
  !*** ./node_modules/marko/src/runtime/RenderResult.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var domInsert = __webpack_require__(/*! ./dom-insert */ "./node_modules/marko/src/runtime/dom-insert.js");

function getComponentDefs(result) {
    var componentDefs = result.___components;

    if (!componentDefs) {
        throw Error("No component");
    }
    return componentDefs;
}

function RenderResult(out) {
    this.out = this.___out = out;
    this.___components = undefined;
}

module.exports = RenderResult;

var proto = (RenderResult.prototype = {
    getComponent: function() {
        return this.getComponents()[0];
    },
    getComponents: function(selector) {
        if (this.___components === undefined) {
            throw Error("Not added to DOM");
        }

        var componentDefs = getComponentDefs(this);

        var components = [];

        componentDefs.forEach(function(componentDef) {
            var component = componentDef.___component;
            if (!selector || selector(component)) {
                components.push(component);
            }
        });

        return components;
    },

    afterInsert: function(doc) {
        var out = this.___out;
        var componentsContext = out.___components;
        if (componentsContext) {
            this.___components = componentsContext.___initComponents(doc);
        } else {
            this.___components = null;
        }

        return this;
    },
    getNode: function(doc) {
        return this.___out.___getNode(doc);
    },
    getOutput: function() {
        return this.___out.___getOutput();
    },
    toString: function() {
        return this.___out.toString();
    },
    document: typeof document != "undefined" && document
});

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    proto,
    function getEl(renderResult, referenceEl) {
        return renderResult.getNode(referenceEl.ownerDocument);
    },
    function afterInsert(renderResult, referenceEl) {
        var isShadow =
            typeof ShadowRoot === "function" &&
            referenceEl instanceof ShadowRoot;
        return renderResult.afterInsert(
            isShadow ? referenceEl : referenceEl.ownerDocument
        );
    }
);


/***/ }),

/***/ "./node_modules/marko/src/runtime/createOut.js":
/*!*****************************************************!*\
  !*** ./node_modules/marko/src/runtime/createOut.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var actualCreateOut;

function setCreateOut(createOutFunc) {
    actualCreateOut = createOutFunc;
}

function createOut(globalData) {
    return actualCreateOut(globalData);
}

createOut.___setCreateOut = setCreateOut;

module.exports = createOut;


/***/ }),

/***/ "./node_modules/marko/src/runtime/dom-insert.js":
/*!******************************************************!*\
  !*** ./node_modules/marko/src/runtime/dom-insert.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(/*! raptor-util/extend */ "./node_modules/raptor-util/extend.js");
var componentsUtil = __webpack_require__(/*! ../components/util */ "./node_modules/marko/src/components/util-browser.js");
var destroyComponentForNode = componentsUtil.___destroyComponentForNode;
var destroyNodeRecursive = componentsUtil.___destroyNodeRecursive;
var helpers = __webpack_require__(/*! ../morphdom/helpers */ "./node_modules/marko/src/morphdom/helpers.js");

var insertBefore = helpers.___insertBefore;
var insertAfter = helpers.___insertAfter;
var removeChild = helpers.___removeChild;

function resolveEl(el) {
    if (typeof el == "string") {
        var elId = el;
        el = document.getElementById(elId);
        if (!el) {
            throw Error("Not found: " + elId);
        }
    }
    return el;
}

function beforeRemove(referenceEl) {
    destroyNodeRecursive(referenceEl);
    destroyComponentForNode(referenceEl);
}

module.exports = function(target, getEl, afterInsert) {
    extend(target, {
        appendTo: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            insertBefore(el, null, referenceEl);
            return afterInsert(this, referenceEl);
        },
        prependTo: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            insertBefore(el, referenceEl.firstChild || null, referenceEl);
            return afterInsert(this, referenceEl);
        },
        replace: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            beforeRemove(referenceEl);
            insertBefore(el, referenceEl, referenceEl.parentNode);
            removeChild(referenceEl);
            return afterInsert(this, referenceEl);
        },
        replaceChildrenOf: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);

            var curChild = referenceEl.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling; // Just in case the DOM changes while removing
                beforeRemove(curChild);
                curChild = nextSibling;
            }

            referenceEl.innerHTML = "";
            insertBefore(el, null, referenceEl);
            return afterInsert(this, referenceEl);
        },
        insertBefore: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            insertBefore(el, referenceEl, referenceEl.parentNode);
            return afterInsert(this, referenceEl);
        },
        insertAfter: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            insertAfter(el, referenceEl, referenceEl.parentNode);
            return afterInsert(this, referenceEl);
        }
    });
};


/***/ }),

/***/ "./node_modules/marko/src/runtime/helpers.js":
/*!***************************************************!*\
  !*** ./node_modules/marko/src/runtime/helpers.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var removeDashes = __webpack_require__(/*! ../compiler/util/removeDashes */ "./node_modules/marko/src/compiler/util/removeDashes.js");
var ComponentsContext = __webpack_require__(/*! ../components/ComponentsContext */ "./node_modules/marko/src/components/ComponentsContext.js");
var getComponentsContext = ComponentsContext.___getComponentsContext;
var ComponentDef = __webpack_require__(/*! ../components/ComponentDef */ "./node_modules/marko/src/components/ComponentDef.js");
var isArray = Array.isArray;
var RENDER_BODY_TOKEN = "%FN";
var RENDER_BODY_TO_JSON = function() {
    return RENDER_BODY_TOKEN;
};
var FLAG_WILL_RERENDER_IN_BROWSER = 1;
var IS_SERVER = typeof window === "undefined";

function isFunction(arg) {
    return typeof arg == "function";
}

function classList(arg, classNames) {
    var len;

    if (arg) {
        if (typeof arg == "string") {
            if (arg) {
                classNames.push(arg);
            }
        } else if (typeof (len = arg.length) == "number") {
            for (var i = 0; i < len; i++) {
                classList(arg[i], classNames);
            }
        } else if (typeof arg == "object") {
            for (var name in arg) {
                if (arg.hasOwnProperty(name)) {
                    var value = arg[name];
                    if (value) {
                        classNames.push(name);
                    }
                }
            }
        }
    }
}

function createDeferredRenderer(handler) {
    function deferredRenderer(input, out) {
        deferredRenderer.renderer(input, out);
    }

    // This is the initial function that will do the rendering. We replace
    // the renderer with the actual renderer func on the first render
    deferredRenderer.renderer = function(input, out) {
        var rendererFunc = handler.renderer || handler._ || handler.render;
        if (!isFunction(rendererFunc)) {
            throw Error("Invalid renderer");
        }
        // Use the actual renderer from now on
        deferredRenderer.renderer = rendererFunc;
        rendererFunc(input, out);
    };

    return deferredRenderer;
}

function resolveRenderer(handler) {
    var renderer = handler.renderer || handler._;

    if (renderer) {
        return renderer;
    }

    if (isFunction(handler)) {
        return handler;
    }

    // If the user code has a circular function then the renderer function
    // may not be available on the module. Since we can't get a reference
    // to the actual renderer(input, out) function right now we lazily
    // try to get access to it later.
    return createDeferredRenderer(handler);
}

var helpers = {
    /**
     * Internal helper method to prevent null/undefined from being written out
     * when writing text that resolves to null/undefined
     * @private
     */
    s: function strHelper(str) {
        return str == null ? "" : str.toString();
    },

    /**
     * Internal helper method to handle loops without a status variable
     * @private
     */
    f: function forEachHelper(array, callback) {
        if (isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                callback(array[i]);
            }
        } else if (isFunction(array)) {
            // Also allow the first argument to be a custom iterator function
            array(callback);
        }
    },

    /**
     * Helper to render a dynamic tag
     */
    d: function dynamicTag(tag, attrs, out, componentDef, key, customEvents) {
        if (tag) {
            var component = componentDef && componentDef.___component;
            if (typeof tag === "string") {
                var events =
                    customEvents &&
                    customEvents.reduce(function(events, eventArray) {
                        events["on" + eventArray[0]] = componentDef.d(
                            eventArray[0],
                            eventArray[1],
                            eventArray[2],
                            eventArray[3]
                        );
                        return events;
                    }, {});
                if (attrs.renderBody) {
                    var renderBody = attrs.renderBody;
                    var otherAttrs = {};
                    for (var attrKey in attrs) {
                        if (attrKey !== "renderBody") {
                            otherAttrs[attrKey] = attrs[attrKey];
                        }
                    }
                    out.___beginElementDynamic(
                        tag,
                        otherAttrs,
                        key,
                        component,
                        0,
                        0,
                        events
                    );
                    renderBody(out);
                    out.___endElement();
                } else {
                    out.___elementDynamic(
                        tag,
                        attrs,
                        key,
                        component,
                        0,
                        0,
                        events
                    );
                }
            } else {
                attrs = Object.keys(attrs).reduce(function(r, key) {
                    r[removeDashes(key)] = attrs[key];
                    return r;
                }, {});
                if (tag._ || tag.renderer || tag.render) {
                    var renderer = tag._ || tag.renderer || tag.render;
                    out.c(componentDef, key, customEvents);
                    renderer(attrs, out);
                    out.___assignedComponentDef = null;
                } else {
                    var render = (tag && tag.renderBody) || tag;
                    var isFn = typeof render === "function";
                    var isToken = render === RENDER_BODY_TOKEN;

                    if (isFn || isToken) {
                        var flags = componentDef ? componentDef.___flags : 0;
                        var willRerender =
                            flags & FLAG_WILL_RERENDER_IN_BROWSER;
                        var preserve = IS_SERVER ? willRerender : isToken;
                        out.___beginFragment(key, component, preserve);
                        if (isFn) {
                            var componentsContext = getComponentsContext(out);
                            var parentComponentDef =
                                componentsContext.___componentDef;
                            var globalContext =
                                componentsContext.___globalContext;
                            componentsContext.___componentDef = new ComponentDef(
                                component,
                                parentComponentDef.id +
                                    "-" +
                                    parentComponentDef.___nextKey(key),
                                globalContext
                            );
                            render.toJSON = RENDER_BODY_TO_JSON;
                            render(out, attrs);
                            componentsContext.___componentDef = parentComponentDef;
                        }
                        out.___endFragment();
                    } else {
                        out.error("Invalid dynamic tag value");
                    }
                }
            }
        }
    },

    /**
     * Helper to load a custom tag
     */
    t: function loadTagHelper(renderer) {
        if (renderer) {
            renderer = resolveRenderer(renderer);
        }

        return function wrappedRenderer(
            input,
            out,
            componentDef,
            key,
            customEvents
        ) {
            out.c(componentDef, key, customEvents);
            renderer(input, out);
            out.___assignedComponentDef = null;
        };
    },

    /**
     * classList(a, b, c, ...)
     * Joines a list of class names with spaces. Empty class names are omitted.
     *
     * classList('a', undefined, 'b') --> 'a b'
     *
     */
    cl: function classListHelper() {
        var classNames = [];
        classList(arguments, classNames);
        return classNames.join(" ");
    }
};

module.exports = helpers;


/***/ }),

/***/ "./node_modules/marko/src/runtime/nextTick-browser.js":
/*!************************************************************!*\
  !*** ./node_modules/marko/src/runtime/nextTick-browser.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* globals window */

var win = window;
var setImmediate = win.setImmediate;

if (!setImmediate) {
    if (win.postMessage) {
        var queue = [];
        var messageName = "si";
        win.addEventListener(
            "message",
            function(event) {
                var source = event.source;
                if (source == win || (!source && event.data === messageName)) {
                    event.stopPropagation();
                    if (queue.length > 0) {
                        var fn = queue.shift();
                        fn();
                    }
                }
            },
            true
        );

        setImmediate = function(fn) {
            queue.push(fn);
            win.postMessage(messageName, "*");
        };
    } else {
        setImmediate = setTimeout;
    }
}

module.exports = setImmediate;


/***/ }),

/***/ "./node_modules/marko/src/runtime/renderable.js":
/*!******************************************************!*\
  !*** ./node_modules/marko/src/runtime/renderable.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defaultCreateOut = __webpack_require__(/*! ./createOut */ "./node_modules/marko/src/runtime/createOut.js");
var extend = __webpack_require__(/*! raptor-util/extend */ "./node_modules/raptor-util/extend.js");

function safeRender(renderFunc, finalData, finalOut, shouldEnd) {
    try {
        renderFunc(finalData, finalOut);

        if (shouldEnd) {
            finalOut.end();
        }
    } catch (err) {
        var actualEnd = finalOut.end;
        finalOut.end = function() {};

        setTimeout(function() {
            finalOut.end = actualEnd;
            finalOut.error(err);
        }, 0);
    }
    return finalOut;
}

module.exports = function(target, renderer) {
    var renderFunc =
        renderer && (renderer.renderer || renderer.render || renderer);
    var createOut = target.createOut || renderer.createOut || defaultCreateOut;

    return extend(target, {
        createOut: createOut,

        renderToString: function(data, callback) {
            var localData = data || {};
            var render = renderFunc || this._;
            var globalData = localData.$global;
            var out = createOut(globalData);

            out.global.template = this;

            if (globalData) {
                localData.$global = undefined;
            }

            if (callback) {
                out.on("finish", function() {
                    callback(null, out.toString(), out);
                }).once("error", callback);

                return safeRender(render, localData, out, true);
            } else {
                out.sync();
                render(localData, out);
                return out.toString();
            }
        },

        renderSync: function(data) {
            var localData = data || {};
            var render = renderFunc || this._;
            var globalData = localData.$global;
            var out = createOut(globalData);
            out.sync();

            out.global.template = this;

            if (globalData) {
                localData.$global = undefined;
            }

            render(localData, out);
            return out.___getResult();
        },

        /**
         * Renders a template to either a stream (if the last
         * argument is a Stream instance) or
         * provides the output to a callback function (if the last
         * argument is a Function).
         *
         * Supported signatures:
         *
         * render(data)
         * render(data, out)
         * render(data, stream)
         * render(data, callback)
         *
         * @param  {Object} data The view model data for the template
         * @param  {AsyncStream/AsyncVDOMBuilder} out A Stream, an AsyncStream/AsyncVDOMBuilder instance, or a callback function
         * @return {AsyncStream/AsyncVDOMBuilder} Returns the AsyncStream/AsyncVDOMBuilder instance that the template is rendered to
         */
        render: function(data, out) {
            var callback;
            var finalOut;
            var finalData;
            var globalData;
            var render = renderFunc || this._;
            var shouldBuffer = this.___shouldBuffer;
            var shouldEnd = true;

            if (data) {
                finalData = data;
                if ((globalData = data.$global)) {
                    finalData.$global = undefined;
                }
            } else {
                finalData = {};
            }

            if (out && out.___isOut) {
                finalOut = out;
                shouldEnd = false;
                extend(out.global, globalData);
            } else if (typeof out == "function") {
                finalOut = createOut(globalData);
                callback = out;
            } else {
                finalOut = createOut(
                    globalData, // global
                    out, // writer(AsyncStream) or parentNode(AsyncVDOMBuilder)
                    undefined, // parentOut
                    shouldBuffer // ignored by AsyncVDOMBuilder
                );
            }

            if (callback) {
                finalOut
                    .on("finish", function() {
                        callback(null, finalOut.___getResult());
                    })
                    .once("error", callback);
            }

            globalData = finalOut.global;

            globalData.template = globalData.template || this;

            return safeRender(render, finalData, finalOut, shouldEnd);
        }
    });
};


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/AsyncVDOMBuilder.js":
/*!*****************************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/AsyncVDOMBuilder.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events-light */ "./node_modules/events-light/src/index.js");
var vdom = __webpack_require__(/*! ./vdom */ "./node_modules/marko/src/runtime/vdom/vdom.js");
var VElement = vdom.___VElement;
var VDocumentFragment = vdom.___VDocumentFragment;
var VComment = vdom.___VComment;
var VText = vdom.___VText;
var VComponent = vdom.___VComponent;
var VFragment = vdom.___VFragment;
var virtualizeHTML = vdom.___virtualizeHTML;
var RenderResult = __webpack_require__(/*! ../RenderResult */ "./node_modules/marko/src/runtime/RenderResult.js");
var defaultDocument = vdom.___defaultDocument;
var morphdom = __webpack_require__(/*! ../../morphdom */ "./node_modules/marko/src/morphdom/index.js");
var attrsHelper = __webpack_require__(/*! ./helper-attrs */ "./node_modules/marko/src/runtime/vdom/helper-attrs.js");

var EVENT_UPDATE = "update";
var EVENT_FINISH = "finish";

function State(tree) {
    this.___events = new EventEmitter();
    this.___tree = tree;
    this.___finished = false;
}

function AsyncVDOMBuilder(globalData, parentNode, parentOut) {
    if (!parentNode) {
        parentNode = new VDocumentFragment();
    }

    var state;

    if (parentOut) {
        state = parentOut.___state;
    } else {
        state = new State(parentNode);
    }

    this.___remaining = 1;
    this.___lastCount = 0;
    this.___last = null;
    this.___parentOut = parentOut;

    this.data = {};
    this.___state = state;
    this.___parent = parentNode;
    this.global = globalData || {};
    this.___stack = [parentNode];
    this.___sync = false;
    this.___vnode = undefined;
    this.___components = null;

    this.___assignedComponentDef = null;
    this.___assignedKey = null;
    this.___assignedCustomEvents = null;
}

var proto = (AsyncVDOMBuilder.prototype = {
    ___isOut: true,
    ___document: defaultDocument,

    bc: function(component, key, ownerComponent) {
        var vComponent = new VComponent(component, key, ownerComponent);
        return this.___beginNode(vComponent, 0, true);
    },

    ___preserveComponent: function(component, key, ownerComponent) {
        var vComponent = new VComponent(component, key, ownerComponent, true);
        this.___beginNode(vComponent, 0);
    },

    ___beginNode: function(child, childCount, pushToStack) {
        this.___parent.___appendChild(child);
        if (pushToStack === true) {
            this.___stack.push(child);
            this.___parent = child;
        }
        return childCount === 0 ? this : child;
    },

    element: function(
        tagName,
        attrs,
        key,
        component,
        childCount,
        flags,
        props
    ) {
        var element = new VElement(
            tagName,
            attrs,
            key,
            component,
            childCount,
            flags,
            props
        );
        return this.___beginNode(element, childCount);
    },

    ___elementDynamic: function(
        tagName,
        attrs,
        key,
        component,
        childCount,
        flags,
        props
    ) {
        var element = VElement.___createElementDynamicTag(
            tagName,
            attrsHelper(attrs),
            key,
            component,
            childCount,
            flags,
            props
        );
        return this.___beginNode(element, childCount);
    },

    n: function(node, component) {
        // NOTE: We do a shallow clone since we assume the node is being reused
        //       and a node can only have one parent node.
        var clone = node.___cloneNode();
        this.node(clone);
        clone.___ownerComponent = component;

        return this;
    },

    node: function(node) {
        this.___parent.___appendChild(node);
        return this;
    },

    text: function(text) {
        var type = typeof text;

        if (type != "string") {
            if (text == null) {
                return;
            } else if (type === "object") {
                if (text.toHTML) {
                    return this.h(text.toHTML());
                }
            }

            text = text.toString();
        }

        this.___parent.___appendChild(new VText(text));
        return this;
    },

    comment: function(comment) {
        return this.node(new VComment(comment));
    },

    html: function(html) {
        if (html != null) {
            var vdomNode = virtualizeHTML(html, this.___document || document);
            this.node(vdomNode);
        }

        return this;
    },

    beginElement: function(
        tagName,
        attrs,
        key,
        component,
        childCount,
        flags,
        props
    ) {
        var element = new VElement(
            tagName,
            attrs,
            key,
            component,
            childCount,
            flags,
            props
        );
        this.___beginNode(element, childCount, true);
        return this;
    },

    ___beginElementDynamic: function(
        tagName,
        attrs,
        key,
        component,
        childCount,
        flags,
        props
    ) {
        var element = VElement.___createElementDynamicTag(
            tagName,
            attrsHelper(attrs),
            key,
            component,
            childCount,
            flags,
            props
        );
        this.___beginNode(element, childCount, true);
        return this;
    },

    ___beginFragment: function(key, component, preserve) {
        var fragment = new VFragment(key, component, preserve);
        this.___beginNode(fragment, null, true);
        return this;
    },

    ___endFragment: function() {
        this.endElement();
    },

    endElement: function() {
        var stack = this.___stack;
        stack.pop();
        this.___parent = stack[stack.length - 1];
    },

    end: function() {
        this.___parent = undefined;

        var remaining = --this.___remaining;
        var parentOut = this.___parentOut;

        if (remaining === 0) {
            if (parentOut) {
                parentOut.___handleChildDone();
            } else {
                this.___doFinish();
            }
        } else if (remaining - this.___lastCount === 0) {
            this.___emitLast();
        }

        return this;
    },

    ___handleChildDone: function() {
        var remaining = --this.___remaining;

        if (remaining === 0) {
            var parentOut = this.___parentOut;
            if (parentOut) {
                parentOut.___handleChildDone();
            } else {
                this.___doFinish();
            }
        } else if (remaining - this.___lastCount === 0) {
            this.___emitLast();
        }
    },

    ___doFinish: function() {
        var state = this.___state;
        state.___finished = true;
        state.___events.emit(EVENT_FINISH, this.___getResult());
    },

    ___emitLast: function() {
        var lastArray = this._last;

        var i = 0;

        function next() {
            if (i === lastArray.length) {
                return;
            }
            var lastCallback = lastArray[i++];
            lastCallback(next);

            if (!lastCallback.length) {
                next();
            }
        }

        next();
    },

    error: function(e) {
        try {
            this.emit("error", e);
        } finally {
            // If there is no listener for the error event then it will
            // throw a new Error here. In order to ensure that the async fragment
            // is still properly ended we need to put the end() in a `finally`
            // block
            this.end();
        }

        return this;
    },

    beginAsync: function(options) {
        if (this.___sync) {
            throw Error(
                "Tried to render async while in sync mode. Note: Client side await is not currently supported in re-renders (Issue: #942)."
            );
        }

        var state = this.___state;

        if (options) {
            if (options.last) {
                this.___lastCount++;
            }
        }

        this.___remaining++;

        var documentFragment = this.___parent.___appendDocumentFragment();
        var asyncOut = new AsyncVDOMBuilder(
            this.global,
            documentFragment,
            this
        );

        state.___events.emit("beginAsync", {
            out: asyncOut,
            parentOut: this
        });

        return asyncOut;
    },

    createOut: function() {
        return new AsyncVDOMBuilder(this.global);
    },

    flush: function() {
        var events = this.___state.___events;

        if (events.listenerCount(EVENT_UPDATE)) {
            events.emit(EVENT_UPDATE, new RenderResult(this));
        }
    },

    ___getOutput: function() {
        return this.___state.___tree;
    },

    ___getResult: function() {
        return this.___result || (this.___result = new RenderResult(this));
    },

    on: function(event, callback) {
        var state = this.___state;

        if (event === EVENT_FINISH && state.___finished) {
            callback(this.___getResult());
        } else if (event === "last") {
            this.onLast(callback);
        } else {
            state.___events.on(event, callback);
        }

        return this;
    },

    once: function(event, callback) {
        var state = this.___state;

        if (event === EVENT_FINISH && state.___finished) {
            callback(this.___getResult());
        } else if (event === "last") {
            this.onLast(callback);
        } else {
            state.___events.once(event, callback);
        }

        return this;
    },

    emit: function(type, arg) {
        var events = this.___state.___events;
        switch (arguments.length) {
            case 1:
                events.emit(type);
                break;
            case 2:
                events.emit(type, arg);
                break;
            default:
                events.emit.apply(events, arguments);
                break;
        }
        return this;
    },

    removeListener: function() {
        var events = this.___state.___events;
        events.removeListener.apply(events, arguments);
        return this;
    },

    sync: function() {
        this.___sync = true;
    },

    isSync: function() {
        return this.___sync;
    },

    onLast: function(callback) {
        var lastArray = this._last;

        if (lastArray === undefined) {
            this._last = [callback];
        } else {
            lastArray.push(callback);
        }

        return this;
    },

    ___getNode: function(doc) {
        var node = this.___vnode;
        if (!node) {
            var vdomTree = this.___getOutput();
            // Create the root document fragment node
            doc = doc || this.___document || document;
            this.___vnode = node = vdomTree.___actualize(doc);
            morphdom(node, vdomTree, doc, this.___components);
        }
        return node;
    },

    toString: function(doc) {
        var docFragment = this.___getNode(doc);
        var html = "";

        var child = docFragment.firstChild;
        while (child) {
            var nextSibling = child.nextSibling;
            if (child.nodeType != 1) {
                var container = docFragment.ownerDocument.createElement("div");
                container.appendChild(child.cloneNode());
                html += container.innerHTML;
            } else {
                html += child.outerHTML;
            }

            child = nextSibling;
        }

        return html;
    },

    then: function(fn, fnErr) {
        var out = this;
        var promise = new Promise(function(resolve, reject) {
            out.on("error", reject).on(EVENT_FINISH, function(result) {
                resolve(result);
            });
        });

        return Promise.resolve(promise).then(fn, fnErr);
    },

    catch: function(fnErr) {
        return this.then(undefined, fnErr);
    },

    isVDOM: true,

    c: function(componentDef, key, customEvents) {
        this.___assignedComponentDef = componentDef;
        this.___assignedKey = key;
        this.___assignedCustomEvents = customEvents;
    }
});

proto.e = proto.element;
proto.be = proto.beginElement;
proto.ee = proto.___endElement = proto.endElement;
proto.t = proto.text;
proto.h = proto.w = proto.write = proto.html;

module.exports = AsyncVDOMBuilder;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VComment.js":
/*!*********************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VComment.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");

function VComment(value) {
    this.___VNode(-1 /* no children */);
    this.___nodeValue = value;
}

VComment.prototype = {
    ___nodeType: 8,

    ___actualize: function(doc) {
        var nodeValue = this.___nodeValue;
        return doc.createComment(nodeValue);
    },

    ___cloneNode: function() {
        return new VComment(this.___nodeValue);
    }
};

inherit(VComment, VNode);

module.exports = VComment;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VComponent.js":
/*!***********************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VComponent.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");

function VComponent(component, key, ownerComponent, preserve) {
    this.___VNode(null /* childCount */);
    this.___key = key;
    this.___component = component;
    this.___ownerComponent = ownerComponent;
    this.___preserve = preserve;
}

VComponent.prototype = {
    ___nodeType: 2
};

inherit(VComponent, VNode);

module.exports = VComponent;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VDocumentFragment.js":
/*!******************************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VDocumentFragment.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");
var extend = __webpack_require__(/*! raptor-util/extend */ "./node_modules/raptor-util/extend.js");

function VDocumentFragmentClone(other) {
    extend(this, other);
    this.___parentNode = null;
    this.___nextSiblingInternal = null;
}

function VDocumentFragment(out) {
    this.___VNode(null /* childCount */);
    this.___out = out;
}

VDocumentFragment.prototype = {
    ___nodeType: 11,

    ___DocumentFragment: true,

    ___cloneNode: function() {
        return new VDocumentFragmentClone(this);
    },

    ___actualize: function(doc) {
        return doc.createDocumentFragment();
    }
};

inherit(VDocumentFragment, VNode);

VDocumentFragmentClone.prototype = VDocumentFragment.prototype;

module.exports = VDocumentFragment;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VElement.js":
/*!*********************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VElement.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* jshint newcap:false */
var domData = __webpack_require__(/*! ../../components/dom-data */ "./node_modules/marko/src/components/dom-data.js");
var vElementByDOMNode = domData.___vElementByDOMNode;
var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");
var NS_XLINK = "http://www.w3.org/1999/xlink";
var ATTR_XLINK_HREF = "xlink:href";
var xmlnsRegExp = /^xmlns(:|$)/;

var toString = String;

var FLAG_IS_SVG = 1;
var FLAG_IS_TEXTAREA = 2;
var FLAG_SIMPLE_ATTRS = 4;
// var FLAG_PRESERVE = 8;
var FLAG_CUSTOM_ELEMENT = 16;

var defineProperty = Object.defineProperty;

var ATTR_HREF = "href";
var EMPTY_OBJECT = Object.freeze({});

function convertAttrValue(type, value) {
    if (value === true) {
        return "";
    } else if (type == "object") {
        return JSON.stringify(value);
    } else {
        return toString(value);
    }
}

function assign(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
}

function setAttribute(el, namespaceURI, name, value) {
    if (namespaceURI === null) {
        el.setAttribute(name, value);
    } else {
        el.setAttributeNS(namespaceURI, name, value);
    }
}

function removeAttribute(el, namespaceURI, name) {
    if (namespaceURI === null) {
        el.removeAttribute(name);
    } else {
        el.removeAttributeNS(namespaceURI, name);
    }
}

function VElementClone(other) {
    this.___firstChildInternal = other.___firstChildInternal;
    this.___parentNode = null;
    this.___nextSiblingInternal = null;

    this.___key = other.___key;
    this.___attributes = other.___attributes;
    this.___properties = other.___properties;
    this.___namespaceURI = other.___namespaceURI;
    this.___nodeName = other.___nodeName;
    this.___flags = other.___flags;
    this.___valueInternal = other.___valueInternal;
    this.___constId = other.___constId;
    this.___isTextArea = other.___isTextArea;
}

function VElement(
    tagName,
    attrs,
    key,
    ownerComponent,
    childCount,
    flags,
    props
) {
    this.___VNode(childCount);

    var constId;
    var namespaceURI;
    var isTextArea;

    if (props) {
        constId = props.i;
    }

    if ((this.___flags = flags || 0)) {
        if (flags & FLAG_IS_SVG) {
            namespaceURI = "http://www.w3.org/2000/svg";
        }
        if (flags & FLAG_IS_TEXTAREA) {
            isTextArea = true;
        }
    }

    this.___key = key;
    this.___ownerComponent = ownerComponent;
    this.___attributes = attrs || EMPTY_OBJECT;
    this.___properties = props || EMPTY_OBJECT;
    this.___namespaceURI = namespaceURI;
    this.___nodeName = tagName;
    this.___valueInternal = null;
    this.___constId = constId;
    this.___isTextArea = isTextArea;
}

VElement.prototype = {
    ___nodeType: 1,

    ___cloneNode: function() {
        return new VElementClone(this);
    },

    /**
     * Shorthand method for creating and appending an HTML element
     *
     * @param  {String} tagName    The tag name (e.g. "div")
     * @param  {int|null} attrCount  The number of attributes (or `null` if not known)
     * @param  {int|null} childCount The number of child nodes (or `null` if not known)
     */
    e: function(tagName, attrs, key, ownerComponent, childCount, flags, props) {
        var child = this.___appendChild(
            new VElement(
                tagName,
                attrs,
                key,
                ownerComponent,
                childCount,
                flags,
                props
            )
        );

        if (childCount === 0) {
            return this.___finishChild();
        } else {
            return child;
        }
    },

    /**
     * Shorthand method for creating and appending an HTML element with a dynamic namespace
     *
     * @param  {String} tagName    The tag name (e.g. "div")
     * @param  {int|null} attrCount  The number of attributes (or `null` if not known)
     * @param  {int|null} childCount The number of child nodes (or `null` if not known)
     */
    ed: function(
        tagName,
        attrs,
        key,
        ownerComponent,
        childCount,
        flags,
        props
    ) {
        var child = this.___appendChild(
            VElement.___createElementDynamicTag(
                tagName,
                attrs,
                key,
                ownerComponent,
                childCount,
                flags,
                props
            )
        );

        if (childCount === 0) {
            return this.___finishChild();
        } else {
            return child;
        }
    },

    /**
     * Shorthand method for creating and appending a static node. The provided node is automatically cloned
     * using a shallow clone since it will be mutated as a result of setting `nextSibling` and `parentNode`.
     *
     * @param  {String} value The value for the new Comment node
     */
    n: function(node, ownerComponent) {
        node = node.___cloneNode();
        node.___ownerComponent = ownerComponent;
        this.___appendChild(node);
        return this.___finishChild();
    },

    ___actualize: function(doc) {
        var namespaceURI = this.___namespaceURI;
        var tagName = this.___nodeName;

        var attributes = this.___attributes;
        var flags = this.___flags;

        var el =
            namespaceURI !== undefined
                ? doc.createElementNS(namespaceURI, tagName)
                : doc.createElement(tagName);

        if (flags & FLAG_CUSTOM_ELEMENT) {
            assign(el, attributes);
        } else {
            for (var attrName in attributes) {
                var attrValue = attributes[attrName];

                if (attrValue !== false && attrValue != null) {
                    var type = typeof attrValue;

                    if (type !== "string") {
                        // Special attributes aren't copied to the real DOM. They are only
                        // kept in the virtual attributes map
                        attrValue = convertAttrValue(type, attrValue);
                    }

                    if (attrName == ATTR_XLINK_HREF) {
                        setAttribute(el, NS_XLINK, ATTR_HREF, attrValue);
                    } else {
                        el.setAttribute(attrName, attrValue);
                    }
                }
            }

            if (flags & FLAG_IS_TEXTAREA) {
                el.value = this.___value;
            }
        }

        vElementByDOMNode.set(el, this);

        return el;
    },

    ___hasAttribute: function(name) {
        // We don't care about the namespaces since the there
        // is no chance that attributes with the same name will have
        // different namespaces
        var value = this.___attributes[name];
        return value != null && value !== false;
    }
};

inherit(VElement, VNode);

var proto = (VElementClone.prototype = VElement.prototype);

["checked", "selected", "disabled"].forEach(function(name) {
    defineProperty(proto, name, {
        get: function() {
            var value = this.___attributes[name];
            return value !== false && value != null;
        }
    });
});

defineProperty(proto, "___value", {
    get: function() {
        var value = this.___valueInternal;
        if (value == null) {
            value = this.___attributes.value;
        }
        return value != null
            ? toString(value)
            : this.___attributes.type === "checkbox" ||
              this.___attributes.type === "radio"
                ? "on"
                : "";
    }
});

VElement.___createElementDynamicTag = function(
    tagName,
    attrs,
    key,
    ownerComponent,
    childCount,
    flags,
    props
) {
    var namespace = attrs && attrs.xmlns;
    tagName = namespace ? tagName : tagName.toUpperCase();
    var element = new VElement(
        tagName,
        attrs,
        key,
        ownerComponent,
        childCount,
        flags,
        props
    );
    element.___namespaceURI = namespace;
    return element;
};

VElement.___removePreservedAttributes = function(attrs) {
    // By default this static method is a no-op, but if there are any
    // compiled components that have "no-update" attributes then
    // `preserve-attrs.js` will be imported and this method will be replaced
    // with a method that actually does something
    return attrs;
};

function virtualizeElement(node, virtualizeChildNodes) {
    var attributes = node.attributes;
    var attrCount = attributes.length;

    var attrs;

    if (attrCount) {
        attrs = {};
        for (var i = 0; i < attrCount; i++) {
            var attr = attributes[i];
            var attrName = attr.name;
            if (!xmlnsRegExp.test(attrName) && attrName !== "data-marko") {
                var attrNamespaceURI = attr.namespaceURI;
                if (attrNamespaceURI === NS_XLINK) {
                    attrs[ATTR_XLINK_HREF] = attr.value;
                } else {
                    attrs[attrName] = attr.value;
                }
            }
        }
    }

    var flags = 0;

    var tagName = node.nodeName;
    if (tagName === "TEXTAREA") {
        flags |= FLAG_IS_TEXTAREA;
    }

    var vdomEl = new VElement(
        tagName,
        attrs,
        null /*key*/,
        null /*ownerComponent*/,
        0 /*child count*/,
        flags,
        null /*props*/
    );
    if (node.namespaceURI !== "http://www.w3.org/1999/xhtml") {
        vdomEl.___namespaceURI = node.namespaceURI;
    }

    if (vdomEl.___isTextArea) {
        vdomEl.___valueInternal = node.value;
    } else {
        if (virtualizeChildNodes) {
            virtualizeChildNodes(node, vdomEl);
        }
    }

    return vdomEl;
}

VElement.___virtualize = virtualizeElement;

VElement.___morphAttrs = function(fromEl, vFromEl, toEl) {
    var removePreservedAttributes = VElement.___removePreservedAttributes;

    var fromFlags = vFromEl.___flags;
    var toFlags = toEl.___flags;

    vElementByDOMNode.set(fromEl, toEl);

    var attrs = toEl.___attributes;
    var props = toEl.___properties;

    if (toFlags & FLAG_CUSTOM_ELEMENT) {
        return assign(fromEl, attrs);
    }

    var attrName;

    // We use expando properties to associate the previous HTML
    // attributes provided as part of the VDOM node with the
    // real VElement DOM node. When diffing attributes,
    // we only use our internal representation of the attributes.
    // When diffing for the first time it's possible that the
    // real VElement node will not have the expando property
    // so we build the attribute map from the expando property

    var oldAttrs = vFromEl.___attributes;

    if (oldAttrs) {
        if (oldAttrs === attrs) {
            // For constant attributes the same object will be provided
            // every render and we can use that to our advantage to
            // not waste time diffing a constant, immutable attribute
            // map.
            return;
        } else {
            oldAttrs = removePreservedAttributes(oldAttrs, props);
        }
    }

    var attrValue;

    if (toFlags & FLAG_SIMPLE_ATTRS && fromFlags & FLAG_SIMPLE_ATTRS) {
        if (oldAttrs["class"] !== (attrValue = attrs["class"])) {
            fromEl.className = attrValue;
        }
        if (oldAttrs.id !== (attrValue = attrs.id)) {
            fromEl.id = attrValue;
        }
        if (oldAttrs.style !== (attrValue = attrs.style)) {
            fromEl.style.cssText = attrValue;
        }
        return;
    }

    // In some cases we only want to set an attribute value for the first
    // render or we don't want certain attributes to be touched. To support
    // that use case we delete out all of the preserved attributes
    // so it's as if they never existed.
    attrs = removePreservedAttributes(attrs, props, true);

    var namespaceURI;

    // Loop over all of the attributes in the attribute map and compare
    // them to the value in the old map. However, if the value is
    // null/undefined/false then we want to remove the attribute
    for (attrName in attrs) {
        attrValue = attrs[attrName];
        namespaceURI = null;

        if (attrName === ATTR_XLINK_HREF) {
            namespaceURI = NS_XLINK;
            attrName = ATTR_HREF;
        }

        if (attrValue == null || attrValue === false) {
            removeAttribute(fromEl, namespaceURI, attrName);
        } else if (oldAttrs[attrName] !== attrValue) {
            var type = typeof attrValue;

            if (type !== "string") {
                attrValue = convertAttrValue(type, attrValue);
            }

            setAttribute(fromEl, namespaceURI, attrName, attrValue);
        }
    }

    // If there are any old attributes that are not in the new set of attributes
    // then we need to remove those attributes from the target node
    //
    // NOTE: We can skip this if the the element is keyed because if the element
    //       is keyed then we know we already processed all of the attributes for
    //       both the target and original element since target VElement nodes will
    //       have all attributes declared. However, we can only skip if the node
    //       was not a virtualized node (i.e., a node that was not rendered by a
    //       Marko template, but rather a node that was created from an HTML
    //       string or a real DOM node).
    if (toEl.___key === null) {
        for (attrName in oldAttrs) {
            if (!(attrName in attrs)) {
                if (attrName === ATTR_XLINK_HREF) {
                    fromEl.removeAttributeNS(ATTR_XLINK_HREF, ATTR_HREF);
                } else {
                    fromEl.removeAttribute(attrName);
                }
            }
        }
    }
};

module.exports = VElement;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VFragment.js":
/*!**********************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VFragment.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var domData = __webpack_require__(/*! ../../components/dom-data */ "./node_modules/marko/src/components/dom-data.js");
var keysByDOMNode = domData.___keyByDOMNode;
var vElementByDOMNode = domData.___vElementByDOMNode;
var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");
var createFragmentNode = __webpack_require__(/*! ../../morphdom/fragment */ "./node_modules/marko/src/morphdom/fragment.js")
    .___createFragmentNode;

function VFragment(key, ownerComponent, preserve) {
    this.___VNode(null /* childCount */);
    this.___key = key;
    this.___ownerComponent = ownerComponent;
    this.___preserve = preserve;
}

VFragment.prototype = {
    ___nodeType: 12,
    ___actualize: function() {
        var fragment = createFragmentNode();
        keysByDOMNode.set(fragment, this.___key);
        vElementByDOMNode.set(fragment, this);
        return fragment;
    }
};

inherit(VFragment, VNode);

module.exports = VFragment;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VNode.js":
/*!******************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VNode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint newcap:false */
function VNode() {}

VNode.prototype = {
    ___VNode: function(finalChildCount) {
        this.___finalChildCount = finalChildCount;
        this.___childCount = 0;
        this.___firstChildInternal = null;
        this.___lastChild = null;
        this.___parentNode = null;
        this.___nextSiblingInternal = null;
    },

    ___ownerComponent: null,

    get ___firstChild() {
        var firstChild = this.___firstChildInternal;

        if (firstChild && firstChild.___DocumentFragment) {
            var nestedFirstChild = firstChild.___firstChild;
            // The first child is a DocumentFragment node.
            // If the DocumentFragment node has a first child then we will return that.
            // Otherwise, the DocumentFragment node is not *really* the first child and
            // we need to skip to its next sibling
            return nestedFirstChild || firstChild.___nextSibling;
        }

        return firstChild;
    },

    get ___nextSibling() {
        var nextSibling = this.___nextSiblingInternal;

        if (nextSibling) {
            if (nextSibling.___DocumentFragment) {
                var firstChild = nextSibling.___firstChild;
                return firstChild || nextSibling.___nextSibling;
            }
        } else {
            var parentNode = this.___parentNode;
            if (parentNode && parentNode.___DocumentFragment) {
                return parentNode.___nextSibling;
            }
        }

        return nextSibling;
    },

    ___appendChild: function(child) {
        this.___childCount++;

        if (this.___isTextArea === true) {
            if (child.___Text) {
                var childValue = child.___nodeValue;
                this.___valueInternal =
                    (this.___valueInternal || "") + childValue;
            } else {
                throw TypeError();
            }
        } else {
            var lastChild = this.___lastChild;

            child.___parentNode = this;

            if (lastChild) {
                lastChild.___nextSiblingInternal = child;
            } else {
                this.___firstChildInternal = child;
            }

            this.___lastChild = child;
        }

        return child;
    },

    ___finishChild: function finishChild() {
        if (
            this.___childCount === this.___finalChildCount &&
            this.___parentNode
        ) {
            return this.___parentNode.___finishChild();
        } else {
            return this;
        }
    }

    // ,toJSON: function() {
    //     var clone = Object.assign({
    //         nodeType: this.nodeType
    //     }, this);
    //
    //     for (var k in clone) {
    //         if (k.startsWith('_')) {
    //             delete clone[k];
    //         }
    //     }
    //     delete clone._nextSibling;
    //     delete clone._lastChild;
    //     delete clone.parentNode;
    //     return clone;
    // }
};

module.exports = VNode;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/VText.js":
/*!******************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/VText.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var inherit = __webpack_require__(/*! raptor-util/inherit */ "./node_modules/raptor-util/inherit.js");

function VText(value) {
    this.___VNode(-1 /* no children */);
    this.___nodeValue = value;
}

VText.prototype = {
    ___Text: true,

    ___nodeType: 3,

    ___actualize: function(doc) {
        return doc.createTextNode(this.___nodeValue);
    },

    ___cloneNode: function() {
        return new VText(this.___nodeValue);
    }
};

inherit(VText, VNode);

module.exports = VText;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/helper-attrs.js":
/*!*************************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/helper-attrs.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Helper for processing dynamic attributes
 */
module.exports = function(attributes) {
    if (attributes.style || attributes.class) {
        var newAttributes = {};
        Object.keys(attributes).forEach(function(name) {
            if (name === "class") {
                newAttributes[name] = classAttr(attributes[name]);
            } else if (name === "style") {
                newAttributes[name] = styleAttr(attributes[name]);
            } else {
                newAttributes[name] = attributes[name];
            }
        });
        return newAttributes;
    }
    return attributes;
};

var styleAttr = __webpack_require__(/*! ./helper-styleAttr */ "./node_modules/marko/src/runtime/vdom/helper-styleAttr.js");
var classAttr = __webpack_require__(/*! ./helpers */ "./node_modules/marko/src/runtime/vdom/helpers.js").ca;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/helper-styleAttr.js":
/*!*****************************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/helper-styleAttr.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var dashedNames = {};

/**
 * Helper for generating the string for a style attribute
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
module.exports = function styleHelper(style) {
    if (!style) {
        return null;
    }

    var type = typeof style;

    if (type !== "string") {
        var styles = "";

        if (Array.isArray(style)) {
            for (var i = 0, len = style.length; i < len; i++) {
                var next = styleHelper(style[i]);
                if (next)
                    styles += next + (next[next.length - 1] !== ";" ? ";" : "");
            }
        } else if (type === "object") {
            for (var name in style) {
                var value = style[name];
                if (value != null) {
                    if (typeof value === "number" && value) {
                        value += "px";
                    }

                    var nameDashed = dashedNames[name];
                    if (!nameDashed) {
                        nameDashed = dashedNames[name] = name
                            .replace(/([A-Z])/g, "-$1")
                            .toLowerCase();
                    }
                    styles += nameDashed + ":" + value + ";";
                }
            }
        }

        return styles || null;
    }

    return style;
};


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/helpers.js":
/*!********************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/helpers.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vdom = __webpack_require__(/*! ./vdom */ "./node_modules/marko/src/runtime/vdom/vdom.js");
var VElement = vdom.___VElement;
var VText = vdom.___VText;

var commonHelpers = __webpack_require__(/*! ../helpers */ "./node_modules/marko/src/runtime/helpers.js");
var extend = __webpack_require__(/*! raptor-util/extend */ "./node_modules/raptor-util/extend.js");

var classList = commonHelpers.cl;

var helpers = extend(
    {
        e: function(tagName, attrs, key, component, childCount, flags, props) {
            return new VElement(
                tagName,
                attrs,
                key,
                component,
                childCount,
                flags,
                props
            );
        },

        t: function(value) {
            return new VText(value);
        },

        const: function(id) {
            var i = 0;
            return function() {
                return id + i++;
            };
        },

        /**
         * Internal helper method to handle the "class" attribute. The value can either
         * be a string, an array or an object. For example:
         *
         * ca('foo bar') ==> ' class="foo bar"'
         * ca({foo: true, bar: false, baz: true}) ==> ' class="foo baz"'
         * ca(['foo', 'bar']) ==> ' class="foo bar"'
         */
        ca: function(classNames) {
            if (!classNames) {
                return null;
            }

            if (typeof classNames === "string") {
                return classNames;
            } else {
                return classList(classNames);
            }
        },

        as: __webpack_require__(/*! ./helper-attrs */ "./node_modules/marko/src/runtime/vdom/helper-attrs.js")
    },
    commonHelpers
);

module.exports = helpers;


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/index.js":
/*!******************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ../../ */ "./node_modules/marko/src/index-browser.js");

// helpers provide a core set of various utility methods
// that are available in every template
var AsyncVDOMBuilder = __webpack_require__(/*! ./AsyncVDOMBuilder */ "./node_modules/marko/src/runtime/vdom/AsyncVDOMBuilder.js");
var makeRenderable = __webpack_require__(/*! ../renderable */ "./node_modules/marko/src/runtime/renderable.js");

/**
 * Method is for internal usage only. This method
 * is invoked by code in a compiled Marko template and
 * it is used to create a new Template instance.
 * @private
 */
exports.t = function createTemplate(path) {
    return new Template(path);
};

function Template(path, func) {
    this.path = path;
    this._ = func;
    this.meta = undefined;
}

function createOut(globalData, parent, parentOut) {
    return new AsyncVDOMBuilder(globalData, parent, parentOut);
}

var Template_prototype = (Template.prototype = {
    createOut: createOut
});

makeRenderable(Template_prototype);

exports.Template = Template;
exports.___createOut = createOut;

__webpack_require__(/*! ../createOut */ "./node_modules/marko/src/runtime/createOut.js").___setCreateOut(createOut);


/***/ }),

/***/ "./node_modules/marko/src/runtime/vdom/vdom.js":
/*!*****************************************************!*\
  !*** ./node_modules/marko/src/runtime/vdom/vdom.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(/*! ./VNode */ "./node_modules/marko/src/runtime/vdom/VNode.js");
var VComment = __webpack_require__(/*! ./VComment */ "./node_modules/marko/src/runtime/vdom/VComment.js");
var VDocumentFragment = __webpack_require__(/*! ./VDocumentFragment */ "./node_modules/marko/src/runtime/vdom/VDocumentFragment.js");
var VElement = __webpack_require__(/*! ./VElement */ "./node_modules/marko/src/runtime/vdom/VElement.js");
var VText = __webpack_require__(/*! ./VText */ "./node_modules/marko/src/runtime/vdom/VText.js");
var VComponent = __webpack_require__(/*! ./VComponent */ "./node_modules/marko/src/runtime/vdom/VComponent.js");
var VFragment = __webpack_require__(/*! ./VFragment */ "./node_modules/marko/src/runtime/vdom/VFragment.js");

var defaultDocument = typeof document != "undefined" && document;
var specialHtmlRegexp = /[&<]/;

function virtualizeChildNodes(node, vdomParent) {
    var curChild = node.firstChild;
    while (curChild) {
        vdomParent.___appendChild(virtualize(curChild));
        curChild = curChild.nextSibling;
    }
}

function virtualize(node) {
    switch (node.nodeType) {
        case 1:
            return VElement.___virtualize(node, virtualizeChildNodes);
        case 3:
            return new VText(node.nodeValue);
        case 8:
            return new VComment(node.nodeValue);
        case 11:
            var vdomDocFragment = new VDocumentFragment();
            virtualizeChildNodes(node, vdomDocFragment);
            return vdomDocFragment;
    }
}

function virtualizeHTML(html, doc) {
    if (!specialHtmlRegexp.test(html)) {
        return new VText(html);
    }

    var container = doc.createElement("body");
    container.innerHTML = html;
    var vdomFragment = new VDocumentFragment();

    var curChild = container.firstChild;
    while (curChild) {
        vdomFragment.___appendChild(virtualize(curChild));
        curChild = curChild.nextSibling;
    }

    return vdomFragment;
}

var Node_prototype = VNode.prototype;

/**
 * Shorthand method for creating and appending a Text node with a given value
 * @param  {String} value The text value for the new Text node
 */
Node_prototype.t = function(value) {
    var type = typeof value;
    var vdomNode;

    if (type !== "string") {
        if (value == null) {
            value = "";
        } else if (type === "object") {
            if (value.toHTML) {
                vdomNode = virtualizeHTML(value.toHTML(), document);
            }
        }
    }

    this.___appendChild(vdomNode || new VText(value.toString()));
    return this.___finishChild();
};

/**
 * Shorthand method for creating and appending a Comment node with a given value
 * @param  {String} value The value for the new Comment node
 */
Node_prototype.c = function(value) {
    this.___appendChild(new VComment(value));
    return this.___finishChild();
};

Node_prototype.___appendDocumentFragment = function() {
    return this.___appendChild(new VDocumentFragment());
};

exports.___VComment = VComment;
exports.___VDocumentFragment = VDocumentFragment;
exports.___VElement = VElement;
exports.___VText = VText;
exports.___VComponent = VComponent;
exports.___VFragment = VFragment;
exports.___virtualize = virtualize;
exports.___virtualizeHTML = virtualizeHTML;
exports.___defaultDocument = defaultDocument;


/***/ }),

/***/ "./node_modules/marko/src/vdom.js":
/*!****************************************!*\
  !*** ./node_modules/marko/src/vdom.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./runtime/vdom */ "./node_modules/marko/src/runtime/vdom/index.js");


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/raptor-util/copyProps.js":
/*!***********************************************!*\
  !*** ./node_modules/raptor-util/copyProps.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function copyProps(from, to) {
    Object.getOwnPropertyNames(from).forEach(function(name) {
        var descriptor = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(to, name, descriptor);
    });
};

/***/ }),

/***/ "./node_modules/raptor-util/extend.js":
/*!********************************************!*\
  !*** ./node_modules/raptor-util/extend.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function extend(target, source) { //A simple function to copy properties from one object to another
    if (!target) { //Check if a target was provided, otherwise create a new empty object to return
        target = {};
    }

    if (source) {
        for (var propName in source) {
            if (source.hasOwnProperty(propName)) { //Only look at source properties that are not inherited
                target[propName] = source[propName]; //Copy the property
            }
        }
    }

    return target;
};

/***/ }),

/***/ "./node_modules/raptor-util/inherit.js":
/*!*********************************************!*\
  !*** ./node_modules/raptor-util/inherit.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyProps = __webpack_require__(/*! ./copyProps */ "./node_modules/raptor-util/copyProps.js");

function inherit(ctor, superCtor, shouldCopyProps) {
    var oldProto = ctor.prototype;
    var newProto = ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            writable: true,
            configurable: true
        }
    });
    if (oldProto && shouldCopyProps !== false) {
        copyProps(oldProto, newProto);
    }
    ctor.$super = superCtor;
    ctor.prototype = newProto;
    return ctor;
}


module.exports = inherit;
inherit._inherit = inherit;


/***/ }),

/***/ "./node_modules/stackframe/stackframe.js":
/*!***********************************************!*\
  !*** ./node_modules/stackframe/stackframe.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
        if (obj instanceof Object) {
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),

/***/ "./node_modules/warp10/finalize.js":
/*!*****************************************!*\
  !*** ./node_modules/warp10/finalize.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/finalize */ "./node_modules/warp10/src/finalize.js");

/***/ }),

/***/ "./node_modules/warp10/src/finalize.js":
/*!*********************************************!*\
  !*** ./node_modules/warp10/src/finalize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var isArray = Array.isArray;

function resolve(object, path, len) {
    var current = object;
    for (var i=0; i<len; i++) {
        current = current[path[i]];
    }

    return current;
}

function resolveType(info) {
    if (info.type === 'Date') {
        return new Date(info.value);
    } else {
        throw new Error('Bad type');
    }
}

module.exports = function finalize(outer) {
    if (!outer) {
        return outer;
    }

    var assignments = outer.$$;
    if (assignments) {
        var object = outer.o;
        var len;

        if (assignments && (len=assignments.length)) {
            for (var i=0; i<len; i++) {
                var assignment = assignments[i];

                var rhs = assignment.r;
                var rhsValue;

                if (isArray(rhs)) {
                    rhsValue = resolve(object, rhs, rhs.length);
                } else {
                    rhsValue = resolveType(rhs);
                }

                var lhs = assignment.l;
                var lhsLast = lhs.length-1;

                if (lhsLast === -1) {
                    object = outer.o = rhsValue;
                    break;
                } else {
                    var lhsParent = resolve(object, lhs, lhsLast);
                    lhsParent[lhs[lhsLast]] = rhsValue;
                }
            }
        }

        assignments.length = 0; // Assignments have been applied, do not reapply

        return object == null ? null : object;
    } else {
        return outer;
    }

};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! src/components/app */ "./src/components/app/index.marko");
__webpack_require__(/*! marko/components */ "./node_modules/marko/components-browser.marko").init();


/***/ }),

/***/ "./src/components/app/index.marko":
/*!****************************************!*\
  !*** ./src/components/app/index.marko ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Compiled using marko@4.13.10 - DO NOT EDIT


var marko_template = module.exports = __webpack_require__(/*! marko/src/vdom */ "./node_modules/marko/src/vdom.js").t(),
    components_helpers = __webpack_require__(/*! marko/src/components/helpers */ "./node_modules/marko/src/components/helpers-browser.js"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/nx-web-marko$0.0.1/src/components/app/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = __webpack_require__(/*! marko/src/runtime/vdom/helpers */ "./node_modules/marko/src/runtime/vdom/helpers.js"),
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("0d027c"),
    marko_node0 = marko_createElement("H1", null, "0", null, 1, 0, {
        i: marko_const_nextId()
      })
      .t("Demo");

function render(input, out, __component, component, state) {
  var data = input;

  out.n(marko_node0, component);
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map