// src/index.ts
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _async_generator(gen) {
    var front, back;
    function send(key, arg) {
        return new Promise(function(resolve, reject) {
            var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
            };
            if (back) {
                back = back.next = request;
            } else {
                front = back = request;
                resume(key, arg);
            }
        });
    }
    function resume(key, arg) {
        try {
            var result = gen[key](arg);
            var value = result.value;
            var wrappedAwait = value instanceof _await_value;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
                if (wrappedAwait) {
                    resume("next", arg);
                    return;
                }
                settle(result.done ? "return" : "normal", arg);
            }, function(err) {
                resume("throw", err);
            });
        } catch (err) {
            settle("throw", err);
        }
    }
    function settle(type, value) {
        switch(type){
            case "return":
                front.resolve({
                    value: value,
                    done: true
                });
                break;
            case "throw":
                front.reject(value);
                break;
            default:
                front.resolve({
                    value: value,
                    done: false
                });
                break;
        }
        front = front.next;
        if (front) {
            resume(front.key, front.arg);
        } else {
            back = null;
        }
    }
    this._invoke = send;
    if (typeof gen.return !== "function") {
        this.return = undefined;
    }
}
if (typeof Symbol === "function" && Symbol.asyncIterator) {
    _async_generator.prototype[Symbol.asyncIterator] = function() {
        return this;
    };
}
_async_generator.prototype.next = function(arg) {
    return this._invoke("next", arg);
};
_async_generator.prototype.throw = function(arg) {
    return this._invoke("throw", arg);
};
_async_generator.prototype.return = function(arg) {
    return this._invoke("return", arg);
};
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _await_async_generator(value) {
    return new _await_value(value);
}
function _await_value(value) {
    this.wrapped = value;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
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
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _wrap_async_generator(fn) {
    return function() {
        return new _async_generator(fn.apply(this, arguments));
    };
}
function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrap_native_super = function wrapNativeSuper(Class) {
        if (Class === null || !_is_native_function(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _set_prototype_of(Wrapper, Class);
    };
    return _wrap_native_super(Class);
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import xior2 from "xior";
import { curry, clamp, isNil } from "ramda";
// package.json
var package_default = {
    name: "runpod-sdk",
    version: "1.0.7",
    description: "JavaScript SDK for Runpod",
    main: "dist/index.js",
    types: "dist/index.d.ts",
    module: "dist/index.mjs",
    type: "module",
    author: "Runpod",
    dependencies: {
        "@actions/core": "^1.10.0",
        "@actions/github": "^5.1.1",
        dotenv: "^16.3.1",
        graphql: "^16.8.1",
        ramda: "^0.29.0",
        xior: "^0.1.4"
    },
    devDependencies: {
        "@swc/core": "^1.4.13",
        "@types/ramda": "^0.29.7",
        esm: "^3.2.25",
        tsup: "^8.0.2",
        typescript: "^5.2.2"
    },
    scripts: {
        build: "tsc"
    }
};
// src/api/queries/user.ts
var QUERY_USER = "\nquery myself {\n  myself {\n    id\n    pubKey\n    networkVolumes {\n      id\n      name\n      size\n      dataCenterId\n    }\n  }\n}\n";
// src/api/mutations/user.ts
function generateUserMutation(pubkey) {
    var escapedPubkey = pubkey.replace(/\n/g, "\\n");
    var inputFields = [
        'pubKey: "'.concat(escapedPubkey, '"')
    ];
    var inputString = inputFields.join(", ");
    return "\n  mutation {\n      updateUserSettings(\n          input: {\n              ".concat(inputString, "\n          }\n      ) {\n          id\n          pubKey\n      }\n  }\n  ");
}
// src/api/queries/gpus.ts
var QUERY_GPU_TYPES = "\nquery GpuTypes {\n  gpuTypes {\n    id\n    displayName\n    memoryInGb\n  }\n}\n";
var generateGpuQuery = function(gpuId) {
    var gpuCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    return '\n    query GpuTypes {\n      gpuTypes(input: {id: "'.concat(gpuId, '"}) {\n        maxGpuCount\n        id\n        displayName\n        manufacturer\n        memoryInGb\n        cudaCores\n        secureCloud\n        communityCloud\n        securePrice\n        communityPrice\n        oneMonthPrice\n        threeMonthPrice\n        oneWeekPrice\n        communitySpotPrice\n        secureSpotPrice\n        lowestPrice(input: {gpuCount: ').concat(gpuCount, "}) {\n          minimumBidPrice\n          uninterruptablePrice\n        }\n      }\n    }\n  ");
};
// src/api/queries/pods.ts
var QUERY_POD = "\nquery myPods {\n    myself {\n        pods {\n            id\n            containerDiskInGb\n            costPerHr\n            desiredStatus\n            dockerArgs\n            dockerId\n            env\n            gpuCount\n            imageName\n            lastStatusChange\n            machineId\n            memoryInGb\n            name\n            podType\n            port\n            ports\n            uptimeSeconds\n            vcpuCount\n            volumeInGb\n            volumeMountPath\n            runtime {\n                ports{\n                    ip\n                    isIpPublic\n                    privatePort\n                    publicPort\n                    type\n                }\n            }\n            machine {\n                gpuDisplayName\n            }\n        }\n    }\n}".replace(/\n/g, " ").replace(/\s+/g, " ");
function generatePodQuery(podId) {
    return '\n    query pod {\n        pod(input: { podId: "'.concat(podId, '" }) {\n            id\n            containerDiskInGb\n            costPerHr\n            desiredStatus\n            dockerArgs\n            dockerId\n            env\n            gpuCount\n            imageName\n            lastStatusChange\n            machineId\n            memoryInGb\n            name\n            podType\n            port\n            ports\n            uptimeSeconds\n            vcpuCount\n            volumeInGb\n            volumeMountPath\n            runtime {\n                ports {\n                    ip\n                    isIpPublic\n                    privatePort\n                    publicPort\n                    type\n                }\n            }\n            machine {\n                gpuDisplayName\n            }\n        }\n    }');
}
// src/api/mutations/pods.ts
function generatePodDeploymentMutation(options) {
    var inputFields = [
        'name: "'.concat(options.name, '"'),
        'imageName: "'.concat(options.imageName, '"'),
        'gpuTypeId: "'.concat(options.gpuTypeId, '"')
    ];
    inputFields.push("cloudType: ".concat(options.cloudType || "ALL"));
    inputFields.push(options.startSsh !== false ? "startSsh: true" : "startSsh: false");
    inputFields.push(options.supportPublicIp !== false ? "supportPublicIp: true" : "supportPublicIp: false");
    if (options.dataCenterId) {
        inputFields.push('dataCenterId: "'.concat(options.dataCenterId, '"'));
    }
    if (options.countryCode) {
        inputFields.push('countryCode: "'.concat(options.countryCode, '"'));
    }
    if (options.gpuCount) {
        inputFields.push("gpuCount: ".concat(options.gpuCount));
    }
    if (options.volumeInGb) {
        inputFields.push("volumeInGb: ".concat(options.volumeInGb));
    }
    if (options.containerDiskInGb) {
        inputFields.push("containerDiskInGb: ".concat(options.containerDiskInGb));
    }
    if (options.minVcpuCount) {
        inputFields.push("minVcpuCount: ".concat(options.minVcpuCount));
    }
    if (options.minMemoryInGb) {
        inputFields.push("minMemoryInGb: ".concat(options.minMemoryInGb));
    }
    if (options.dockerArgs) {
        inputFields.push('dockerArgs: "'.concat(options.dockerArgs, '"'));
    }
    if (options.ports) {
        var cleanedPorts = options.ports.replace(" ", "");
        inputFields.push('ports: "'.concat(cleanedPorts, '"'));
    }
    if (options.volumeMountPath) {
        inputFields.push('volumeMountPath: "'.concat(options.volumeMountPath, '"'));
    }
    if (options.env) {
        var envString = Object.entries(options.env).map(function(param) {
            var _param = _sliced_to_array(param, 2), key = _param[0], value = _param[1];
            return '{ key: "'.concat(key, '", value: "').concat(value, '"}');
        }).join(", ");
        inputFields.push("env: [".concat(envString, "]"));
    }
    if (options.templateId) {
        inputFields.push('templateId: "'.concat(options.templateId, '"'));
    }
    if (options.networkVolumeId) {
        inputFields.push('networkVolumeId: "'.concat(options.networkVolumeId, '"'));
    }
    if (options.allowedCudaVersions) {
        var allowedCudaVersionsString = options.allowedCudaVersions.map(function(version) {
            return '"'.concat(version, '"');
        }).join(", ");
        inputFields.push("allowedCudaVersions: [".concat(allowedCudaVersionsString, "]"));
    }
    var inputString = inputFields.join(", ");
    return "\n    mutation {\n      podFindAndDeployOnDemand(\n        input: {\n          ".concat(inputString, "\n        }\n      ) {\n        id\n        desiredStatus\n        imageName\n        env\n        machineId\n        machine {\n          podHostId\n        }\n      }\n    }\n  ");
}
function generatePodStopMutation(podId) {
    return '\n    mutation {\n      podStop(input: { podId: "'.concat(podId, '" }) {\n        id\n        desiredStatus\n      }\n    }\n  ');
}
function generatePodResumeMutation(podId, gpuCount) {
    return '\n    mutation {\n      podResume(input: { podId: "'.concat(podId, '", gpuCount: ').concat(gpuCount, " }) {\n        id\n        desiredStatus\n        imageName\n        env\n        machineId\n        machine {\n          podHostId\n        }\n      }\n    }\n  ");
}
// src/api/api.ts
import xior from "xior";
var axios = xior.create();
var HTTP_STATUS_UNAUTHORIZED = 401;
var AuthenticationError = /*#__PURE__*/ function(Error1) {
    "use strict";
    _inherits(AuthenticationError, Error1);
    var _super = _create_super(AuthenticationError);
    function AuthenticationError(message) {
        _class_call_check(this, AuthenticationError);
        var _this;
        _this = _super.call(this, message);
        _this.name = "AuthenticationError";
        return _this;
    }
    return AuthenticationError;
}(_wrap_native_super(Error));
var QueryError = /*#__PURE__*/ function(Error1) {
    "use strict";
    _inherits(QueryError, Error1);
    var _super = _create_super(QueryError);
    function QueryError(message, query) {
        _class_call_check(this, QueryError);
        var _this;
        _this = _super.call(this, "".concat(message, " - while processing query: ").concat(query));
        _this.name = "QueryError";
        return _this;
    }
    return QueryError;
}(_wrap_native_super(Error));
var RunPodApi = /*#__PURE__*/ function() {
    "use strict";
    function RunPodApi(apiKey) {
        _class_call_check(this, RunPodApi);
        this.apiKey = apiKey;
    }
    _create_class(RunPodApi, [
        {
            key: "runGraphqlQuery",
            value: function runGraphqlQuery(query) {
                var _this = this;
                return _async_to_generator(function() {
                    var url, headers, data;
                    return _ts_generator(this, function(_state) {
                        url = "https://api.runpod.io/graphql?api_key=".concat(_this.apiKey);
                        headers = {
                            "Content-Type": "application/json",
                            "User-Agent": "RunPodClient/1.0"
                        };
                        data = {
                            query: query
                        };
                        return [
                            2,
                            axios.post(url, data, {
                                headers: headers,
                                timeout: 3e4
                            }).then(function(response) {
                                return response.data;
                            }).catch(function(error) {
                                if (error.response && error.response.status === HTTP_STATUS_UNAUTHORIZED) {
                                    throw new AuthenticationError("Unauthorized request, please check your API key.");
                                }
                                if (error.response) {
                                    var jsonResponse = error.response.data;
                                    if (jsonResponse && jsonResponse.errors && jsonResponse.errors.length > 0) {
                                        throw new QueryError(jsonResponse.errors[0].message, query);
                                    }
                                }
                                throw error;
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "getUser",
            value: function getUser() {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(QUERY_USER)
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.myself;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateUserSettings",
            value: function updateUserSettings(pubkey) {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(generateUserMutation(pubkey))
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.updateUserSettings;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getGpus",
            value: function getGpus() {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(QUERY_GPU_TYPES)
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.gpuTypes;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getGpu",
            value: function getGpu(gpuId) {
                var gpuQuantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(generateGpuQuery(gpuId, gpuQuantity))
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.gpuTypes;
                                if (cleanedResponse.length < 1) {
                                    throw new Error("No GPU found with the specified ID, run getGpus() to get a list of all GPUs");
                                }
                                return [
                                    2,
                                    cleanedResponse[0]
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getPods",
            value: function getPods() {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(QUERY_POD)
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.myself.pods;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getPod",
            value: function getPod(podId) {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(generatePodQuery(podId))
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                return [
                                    2,
                                    rawResponse.data.pod
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createPod",
            value: function createPod(param) {
                var name = param.name, imageName = param.imageName, gpuTypeId = param.gpuTypeId, _param_cloudType = param.cloudType, cloudType = _param_cloudType === void 0 ? "ALL" : _param_cloudType, _param_supportPublicIp = param.supportPublicIp, supportPublicIp = _param_supportPublicIp === void 0 ? false : _param_supportPublicIp, _param_startSsh = param.startSsh, startSsh = _param_startSsh === void 0 ? false : _param_startSsh, _param_dataCenterId = param.dataCenterId, dataCenterId = _param_dataCenterId === void 0 ? void 0 : _param_dataCenterId, _param_countryCode = param.countryCode, countryCode = _param_countryCode === void 0 ? void 0 : _param_countryCode, _param_gpuCount = param.gpuCount, gpuCount = _param_gpuCount === void 0 ? 1 : _param_gpuCount, _param_volumeInGb = param.volumeInGb, volumeInGb = _param_volumeInGb === void 0 ? 10 : _param_volumeInGb, _param_containerDiskInGb = param.containerDiskInGb, containerDiskInGb = _param_containerDiskInGb === void 0 ? void 0 : _param_containerDiskInGb, _param_minVcpuCount = param.minVcpuCount, minVcpuCount = _param_minVcpuCount === void 0 ? 1 : _param_minVcpuCount, _param_minMemoryInGb = param.minMemoryInGb, minMemoryInGb = _param_minMemoryInGb === void 0 ? 1 : _param_minMemoryInGb, _param_dockerArgs = param.dockerArgs, dockerArgs = _param_dockerArgs === void 0 ? "" : _param_dockerArgs, _param_ports = param.ports, ports = _param_ports === void 0 ? void 0 : _param_ports, _param_volumeMountPath = param.volumeMountPath, volumeMountPath = _param_volumeMountPath === void 0 ? "" : _param_volumeMountPath, _param_env = param.env, env = _param_env === void 0 ? void 0 : _param_env, _param_templateId = param.templateId, templateId = _param_templateId === void 0 ? void 0 : _param_templateId, _param_networkVolumeId = param.networkVolumeId, networkVolumeId = _param_networkVolumeId === void 0 ? void 0 : _param_networkVolumeId, _param_allowedCudaVersions = param.allowedCudaVersions, allowedCudaVersions = _param_allowedCudaVersions === void 0 ? [] : _param_allowedCudaVersions;
                var _this = this;
                return _async_to_generator(function() {
                    var userInfo, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, networkVolume, rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.getGpu(gpuTypeId)
                                ];
                            case 1:
                                _state.sent();
                                if (![
                                    "ALL",
                                    "COMMUNITY",
                                    "SECURE"
                                ].includes(cloudType)) {
                                    throw new Error("cloudType must be one of ALL, COMMUNITY or SECURE");
                                }
                                if (!(networkVolumeId && !dataCenterId)) return [
                                    3,
                                    3
                                ];
                                return [
                                    4,
                                    _this.getUser()
                                ];
                            case 2:
                                userInfo = _state.sent();
                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                try {
                                    for(_iterator = userInfo.networkVolumes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                        networkVolume = _step.value;
                                        if (networkVolume.id === networkVolumeId) {
                                            dataCenterId = networkVolume.dataCenterId;
                                            break;
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally{
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally{
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                                _state.label = 3;
                            case 3:
                                if (containerDiskInGb === null && templateId === null) {
                                    containerDiskInGb = 10;
                                }
                                return [
                                    4,
                                    _this.runGraphqlQuery(generatePodDeploymentMutation({
                                        name: name,
                                        imageName: imageName,
                                        gpuTypeId: gpuTypeId,
                                        cloudType: cloudType,
                                        supportPublicIp: supportPublicIp,
                                        startSsh: startSsh,
                                        dataCenterId: dataCenterId,
                                        countryCode: countryCode,
                                        gpuCount: gpuCount,
                                        volumeInGb: volumeInGb,
                                        containerDiskInGb: containerDiskInGb,
                                        minVcpuCount: minVcpuCount,
                                        minMemoryInGb: minMemoryInGb,
                                        dockerArgs: dockerArgs,
                                        ports: ports,
                                        volumeMountPath: volumeMountPath,
                                        env: env,
                                        templateId: templateId,
                                        networkVolumeId: networkVolumeId,
                                        allowedCudaVersions: allowedCudaVersions
                                    }))
                                ];
                            case 4:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.podFindAndDeployOnDemand;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "stopPod",
            value: function stopPod(podId) {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(generatePodStopMutation(podId))
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.podStop;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "resumePod",
            value: function resumePod(podId, gpuCount) {
                var _this = this;
                return _async_to_generator(function() {
                    var rawResponse, cleanedResponse;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.runGraphqlQuery(generatePodResumeMutation(podId, gpuCount))
                                ];
                            case 1:
                                rawResponse = _state.sent();
                                cleanedResponse = rawResponse.data.podResume;
                                return [
                                    2,
                                    cleanedResponse
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return RunPodApi;
}();
// src/index.ts
var axios2 = xior2.create();
function getUserAgent() {
    var sdkVersion = package_default.version;
    var environmentInfo = "Unknown Environment";
    if (typeof window !== "undefined" && window.navigator) {
        environmentInfo = "Browser/".concat(window.navigator.userAgent);
    }
    return "RunPod-JS-SDK/".concat(sdkVersion, " (").concat(environmentInfo, ")");
}
var getAuthHeader = function(apiKey) {
    return {
        headers: {
            "Authorization": "Bearer ".concat(apiKey),
            "content-type": "application/json",
            "User-Agent": getUserAgent()
        }
    };
};
var print = console.log;
var handleErrors = function() {
    var _ref = _async_to_generator(function(axiosRequest) {
        var resp, status2, statusText;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        axiosRequest
                    ];
                case 1:
                    resp = _state.sent();
                    status2 = resp.status, statusText = resp.statusText;
                    if (status2 !== 200) {
                        return [
                            2,
                            {
                                status: status2,
                                statusText: statusText
                            }
                        ];
                    }
                    return [
                        2,
                        resp.data
                    ];
            }
        });
    });
    return function handleErrors(axiosRequest) {
        return _ref.apply(this, arguments);
    };
}();
var handleErrorsStatus = function() {
    var _ref = _async_to_generator(function(axiosRequest) {
        var resp, status2, statusText;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        axiosRequest
                    ];
                case 1:
                    resp = _state.sent();
                    status2 = resp.status, statusText = resp.statusText;
                    if (status2 !== 200) {
                        return [
                            2,
                            {
                                status: status2,
                                statusText: statusText,
                                started: false
                            }
                        ];
                    }
                    return [
                        2,
                        _object_spread_props(_object_spread({}, resp.data), {
                            started: true,
                            completed: isCompleted(resp.data.status),
                            succeeded: resp.data.status === "COMPLETED"
                        })
                    ];
            }
        });
    });
    return function handleErrorsStatus(axiosRequest) {
        return _ref.apply(this, arguments);
    };
}();
var runpodServerlessBaseUrlProd = "https://api.runpod.ai/v2";
var runpodServerlessBaseUrlDev = "https://dev-api.runpod.ai/v2";
var getEndpointUrl = curry(function(baseUrl, endpointId) {
    return "".concat(baseUrl, "/").concat(endpointId);
});
var isCompleted = function(status2) {
    return [
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "TIMED_OUT"
    ].includes(status2);
};
var runSync = curry(function() {
    var _ref = _async_to_generator(function(baseUrl, apiKey, endpointId, request) {
        var timeout, startTime, getRemainingTime, runResp, data, id, start;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    timeout = _arguments.length > 4 && _arguments[4] !== void 0 ? _arguments[4] : 9e4;
                    startTime = Date.now();
                    getRemainingTime = function() {
                        return clamp(1e3, 9e4, timeout - (Date.now() - startTime));
                    };
                    return [
                        4,
                        runsync(baseUrl, apiKey, endpointId, request, timeout)
                    ];
                case 1:
                    runResp = _state.sent();
                    data = _object_spread({}, runResp);
                    id = data.id;
                    start = Date.now();
                    _state.label = 2;
                case 2:
                    if (!!isCompleted(data.status)) return [
                        3,
                        4
                    ];
                    if (Date.now() - start > timeout) {
                        print("".concat(id, " timed out after ").concat(timeout / 1e3, " seconds"));
                        return [
                            2,
                            _object_spread_props(_object_spread({}, data), {
                                started: true,
                                completed: false
                            })
                        ];
                    }
                    return [
                        4,
                        statusSync(baseUrl, apiKey, endpointId, id, getRemainingTime())
                    ];
                case 3:
                    data = _state.sent();
                    print("".concat(id, ": ").concat(data.status));
                    return [
                        3,
                        2
                    ];
                case 4:
                    return [
                        2,
                        _object_spread_props(_object_spread({}, data), {
                            started: true,
                            completed: true,
                            succeeded: data.status === "COMPLETED"
                        })
                    ];
            }
        });
    });
    return function(baseUrl, apiKey, endpointId, request) {
        return _ref.apply(this, arguments);
    };
}());
var statusSync = curry(function(baseUrl, apiKey, endpointId, requestId) {
    var timeout = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 9e4;
    var wait = clamp(1e3, 9e4, timeout);
    var url = getEndpointUrl(baseUrl, endpointId) + "/status-sync/" + requestId + "?wait=".concat(wait);
    var authHeader = getAuthHeader(apiKey);
    return handleErrorsStatus(axios2.get(url, _object_spread({}, authHeader)));
});
var runsync = curry(function(baseUrl, apiKey, endpointId, request) {
    var timeout = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 9e4;
    var wait = clamp(1e3, 9e4, timeout);
    var url = getEndpointUrl(baseUrl, endpointId) + "/runsync?wait=".concat(wait);
    var authHeader = getAuthHeader(apiKey);
    return handleErrorsStatus(axios2.post(url, request, _object_spread({}, authHeader)));
});
var run = curry(function(baseUrl, apiKey, endpointId, request) {
    var timeout = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 3e3;
    var url = getEndpointUrl(baseUrl, endpointId) + "/run";
    var authHeader = getAuthHeader(apiKey);
    return handleErrors(axios2.post(url, request, _object_spread_props(_object_spread({}, authHeader), {
        timeout: timeout
    })));
});
var status = curry(function(baseUrl, apiKey, endpointId, requestId) {
    var timeout = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 3e3;
    var url = getEndpointUrl(baseUrl, endpointId) + "/status/" + requestId;
    var authHeader = getAuthHeader(apiKey);
    return handleErrorsStatus(axios2.get(url, _object_spread_props(_object_spread({}, authHeader), {
        timeout: timeout
    })));
});
function stream(baseUrl, apiKey, endpointId, requestId) {
    return _stream.apply(this, arguments);
}
function _stream() {
    _stream = _wrap_async_generator(function(baseUrl, apiKey, endpointId, requestId) {
        var timeout, completed, start, url, authHeader, resp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, output, err;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    timeout = _arguments.length > 4 && _arguments[4] !== void 0 ? _arguments[4] : 0;
                    completed = false;
                    start = Date.now();
                    _state.label = 1;
                case 1:
                    if (!!completed) return [
                        3,
                        11
                    ];
                    url = getEndpointUrl(baseUrl, endpointId) + "/stream/" + requestId;
                    authHeader = getAuthHeader(apiKey);
                    return [
                        4,
                        _await_async_generator(handleErrors(axios2.get(url, authHeader)))
                    ];
                case 2:
                    resp = _state.sent();
                    if (timeout !== 0 && Date.now() - start > timeout) {
                        print("stream timed out after ".concat(timeout / 1e3, " seconds"));
                        completed = true;
                    }
                    if (isCompleted(resp.status)) {
                        completed = true;
                    }
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        8,
                        9,
                        10
                    ]);
                    _iterator = (resp === null || resp === void 0 ? void 0 : resp.stream)[Symbol.iterator]();
                    _state.label = 4;
                case 4:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        7
                    ];
                    output = _step.value;
                    return [
                        4,
                        output
                    ];
                case 5:
                    _state.sent();
                    _state.label = 6;
                case 6:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        4
                    ];
                case 7:
                    return [
                        3,
                        10
                    ];
                case 8:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        10
                    ];
                case 9:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 10:
                    return [
                        3,
                        1
                    ];
                case 11:
                    return [
                        2
                    ];
            }
        });
    });
    return _stream.apply(this, arguments);
}
var cancel = curry(function(baseUrl, apiKey, endpointId, requestId) {
    var timeout = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 3e3;
    var url = getEndpointUrl(baseUrl, endpointId) + "/cancel/" + requestId;
    var authHeader = getAuthHeader(apiKey);
    return handleErrors(axios2.post(url, {}, _object_spread_props(_object_spread({}, authHeader), {
        timeout: timeout
    })));
});
var health = curry(function(baseUrl, apiKey, endpointId) {
    var timeout = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 3e3;
    var url = getEndpointUrl(baseUrl, endpointId) + "/health";
    var authHeader = getAuthHeader(apiKey);
    return handleErrors(axios2.get(url, _object_spread_props(_object_spread({}, authHeader), {
        timeout: timeout
    })));
});
var purgeQueue = curry(function(baseUrl, apiKey, endpointId) {
    var timeout = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 3e3;
    var url = getEndpointUrl(baseUrl, endpointId) + "/purge-queue";
    var authHeader = getAuthHeader(apiKey);
    return handleErrors(axios2.post(url, {}, _object_spread_props(_object_spread({}, authHeader), {
        timeout: timeout
    })));
});
var Endpoint = /*#__PURE__*/ function() {
    "use strict";
    function Endpoint(baseUrl, apiKey, endpointId) {
        _class_call_check(this, Endpoint);
        this.endpointId = "";
        this.baseUrl = runpodServerlessBaseUrlProd;
        this.apiKey = "";
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.endpointId = endpointId;
    }
    _create_class(Endpoint, [
        {
            key: "runSync",
            value: function runSync1(request) {
                var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9e4;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            runSync(_this.baseUrl, _this.apiKey, _this.endpointId, request, timeout)
                        ];
                    });
                })();
            }
        },
        {
            key: "run",
            value: function run1(request) {
                var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3e3;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            run(_this.baseUrl, _this.apiKey, _this.endpointId, request, timeout)
                        ];
                    });
                })();
            }
        },
        {
            key: "status",
            value: function status1(requestId) {
                var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3e3;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            status(_this.baseUrl, _this.apiKey, _this.endpointId, requestId, timeout)
                        ];
                    });
                })();
            }
        },
        {
            key: "statusSync",
            value: function statusSync1(requestId) {
                var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9e4;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            statusSync(_this.baseUrl, _this.apiKey, _this.endpointId, requestId, timeout)
                        ];
                    });
                })();
            }
        },
        {
            //default to no timeout
            key: "stream",
            value: function stream1(requestId) {
                var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                return stream(this.baseUrl, this.apiKey, this.endpointId, requestId, timeout);
            }
        },
        {
            key: "cancel",
            value: function cancel1(requestId) {
                var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3e3;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            cancel(_this.baseUrl, _this.apiKey, _this.endpointId, requestId, timeout)
                        ];
                    });
                })();
            }
        },
        {
            key: "health",
            value: function health1() {
                var timeout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3e3;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            health(_this.baseUrl, _this.apiKey, _this.endpointId, timeout)
                        ];
                    });
                })();
            }
        },
        {
            key: "purgeQueue",
            value: function purgeQueue1() {
                var timeout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3e3;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            purgeQueue(_this.baseUrl, _this.apiKey, _this.endpointId, timeout)
                        ];
                    });
                })();
            }
        }
    ]);
    return Endpoint;
}();
var defaultSdkOptions = {
    baseUrl: runpodServerlessBaseUrlProd
};
var RunpodSdk = /*#__PURE__*/ function() {
    "use strict";
    function RunpodSdk(apiKey, options) {
        _class_call_check(this, RunpodSdk);
        this.apiKey = "";
        this.baseUrl = runpodServerlessBaseUrlProd;
        if (isNil(apiKey)) {
            print("Api key not supplied");
            return;
        }
        this.apiKey = apiKey;
        var _options_baseUrl;
        this.baseUrl = (_options_baseUrl = options.baseUrl) !== null && _options_baseUrl !== void 0 ? _options_baseUrl : this.baseUrl;
    }
    _create_class(RunpodSdk, [
        {
            key: "endpoint",
            value: function endpoint(endpointId) {
                if (isNil(endpointId)) {
                    print("Endpoint id not supplied");
                    return null;
                }
                return new Endpoint(this.baseUrl, this.apiKey, endpointId);
            }
        },
        {
            //pod...
            key: "pod",
            value: function pod() {
                return new RunPodApi(this.apiKey);
            }
        }
    ]);
    return RunpodSdk;
}();
var src_default = function(apiKey) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultSdkOptions;
    return new RunpodSdk(apiKey, options);
};
export { src_default as default, health, purgeQueue, run, runSync, runpodServerlessBaseUrlDev, runpodServerlessBaseUrlProd, status, stream };
//# sourceMappingURL=index.js.map