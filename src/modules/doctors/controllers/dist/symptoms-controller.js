"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mobx_1 = require("mobx");
var axios_1 = require("axios");
var SympController = /** @class */ (function () {
    function SympController() {
        var _this = this;
        this.items = [
            { title: "М", sourseSvg: [1, 2], active: true, id: 0 },
            { title: "Ж", sourseSvg: [3, 4], active: false, id: 1 },
        ];
        this.bodyPart = 'Голова';
        this.doctors = [];
        this.symptoms = [];
        this.loading = true;
        this.isErrorBadgeOpen = false;
        this.isErrorBadgeOpenCh = false;
        this.canFindDoctors = false;
        this.handlerClick = function () {
            if (_this.symptoms.find(function (n) { return n.active; }) !== undefined) {
                _this._fetchDoctors(_this.bodyPart).then(function (response) { _this.doctors = response; });
            }
            else if (_this.symptoms.length == 0) {
                _this.openBadgeCh();
            }
        };
        this.handlerSearch = function (e) {
            e.persist();
            var searchQuery = e.target.value.toLowerCase();
            var displayedContacts = _this.arrSymps.filter(function (el) {
                var searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searchQuery) !== -1 || el.active === true;
            });
            _this.symptoms = displayedContacts;
        };
        this.choiseSymp = function (e, id) {
            e.persist();
            _this.symptoms = _this.symptoms.map(function (item) {
                if (item.id === id && item.active !== true) {
                    item.active = true;
                }
                else if (item.id === +id && item.active === true) {
                    item.active = false;
                }
                return item;
            });
        };
        this.openTab = function (id) {
            _this.items = _this.items.map(function (item) {
                if (item.id === id) {
                    item.active = true;
                }
                else {
                    item.active = false;
                }
                return item;
            });
        };
        this.clickHandlerSymp = function (bodyPart) {
            if (bodyPart === void 0) { bodyPart = "Голова"; }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.loading = true;
                            return [4 /*yield*/, this._fetchSymptoms(bodyPart).then(mobx_1.action(function (arrSymps) {
                                    if (arrSymps === void 0) { arrSymps = []; }
                                    _this.arrSymps = arrSymps.map(function (item, i) {
                                        item.active = false;
                                        item.id = i;
                                        return item;
                                    });
                                    _this.updateSymps();
                                    return _this.arrSymps;
                                }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this._fetchSymptoms = function (bodyPart) {
            if (bodyPart === void 0) { bodyPart = "Голова"; }
            return __awaiter(_this, void 0, Promise, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios_1["default"]
                                .get(process.env.REACT_APP_SERVER_URL +
                                ("api/symptoms?bodyPart=" + bodyPart))
                                .then(function (data) { return data.data; })["catch"](function (e) {
                                return { success: false };
                            })];
                        case 1:
                            response = _a.sent();
                            if (!response.success) {
                                // todo: error handling
                                this._openBadge();
                                return [2 /*return*/, []];
                            }
                            else {
                                this.loading = false;
                            }
                            this.bodyPart = bodyPart;
                            return [4 /*yield*/, response.symptoms];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.updateSymps = function () {
            // todo: update symp array after fetch request
            _this.symptoms = [];
            _this.symptoms = _this.arrSymps.map(function (item, i) {
                return (item = _this.arrSymps[i]);
            });
        };
        this.highlightBodyPart = function (e) {
            // todo: highlight body part
            e.persist();
            var el = e.target.closest("g.bodyPart"), list = document.querySelectorAll(".bodyPart");
            list.forEach(function (item) {
                item.classList.remove("active");
                if (e.target.id === item.id || el.id === item.id) {
                    item.classList.add("active");
                }
            });
        };
        this._openBadge = function () {
            _this.isErrorBadgeOpen = true;
            setTimeout(function () {
                _this.isErrorBadgeOpen = false;
            }, 5000);
        };
        this.openBadgeCh = function () {
            _this.isErrorBadgeOpenCh = true;
            setTimeout(function () {
                _this.isErrorBadgeOpenCh = false;
            }, 5000);
        };
        this._fetchDoctors = function (bodyPart) { return __awaiter(_this, void 0, Promise, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]
                            .get(process.env.REACT_APP_SERVER_URL + ("api/doctors?symptoms=" + bodyPart))
                            .then(function (data) { _this.canFindDoctors = true; return data.data; })["catch"](function (e) {
                            return { success: false };
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.success) {
                            // todo: error handling
                            this._openBadge();
                            return [2 /*return*/, []];
                        }
                        else {
                            this.loading = false;
                        }
                        return [4 /*yield*/, response.doctors];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "items");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "bodyPart");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "doctors");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "symptoms");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "loading");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "arrSymps");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "isErrorBadgeOpen");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "isErrorBadgeOpenCh");
    __decorate([
        mobx_1.observable
    ], SympController.prototype, "canFindDoctors");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "handlerClick");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "handlerSearch");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "choiseSymp");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "openTab");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "clickHandlerSymp");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "updateSymps");
    __decorate([
        mobx_1.action
    ], SympController.prototype, "highlightBodyPart");
    return SympController;
}());
exports["default"] = new SympController();
