"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function courseProperty(target) {
    Object.defineProperty(target.prototype, 'course', { value: "CSCIE31" });
}
var myClass = /** @class */ (function () {
    function myClass() {
    }
    myClass.prototype.doSomething = function () {
        console.log("i am doing something");
    };
    myClass = __decorate([
        courseProperty
    ], myClass);
    return myClass;
}());
var c = new myClass();
c.doSomething();
console.log(c.course);
