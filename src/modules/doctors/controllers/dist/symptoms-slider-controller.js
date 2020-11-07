"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var mobx_1 = require("mobx");
var SliderController = /** @class */ (function () {
    function SliderController() {
        var _this = this;
        this.currentSlide = 1;
        this.slideShift = 0;
        this.highlightSlideId = '';
        this.prevNextButsController = function (act, amoutSlides) {
            var sliderWrap = document.querySelector(".slider-wrapper");
            if (act === "next" && _this.currentSlide !== amoutSlides) {
                _this.currentSlide++;
                _this.slideShift = _this.slideShift + sliderWrap.offsetWidth + 40;
                _this.highlightSlideId = "";
            }
            else if (act === "prev" && _this.currentSlide !== 1) {
                _this.currentSlide--;
                _this.slideShift = _this.slideShift - sliderWrap.offsetWidth - 40;
                _this.highlightSlideId = "";
            }
        };
        this.slideHandlerClick = function (id) {
            _this.highlightSlideId = id;
        };
    }
    __decorate([
        mobx_1.observable
    ], SliderController.prototype, "currentSlide");
    __decorate([
        mobx_1.observable
    ], SliderController.prototype, "slideShift");
    __decorate([
        mobx_1.observable
    ], SliderController.prototype, "highlightSlideId");
    __decorate([
        mobx_1.action
    ], SliderController.prototype, "prevNextButsController");
    __decorate([
        mobx_1.action
    ], SliderController.prototype, "slideHandlerClick");
    return SliderController;
}());
exports["default"] = new SliderController();
