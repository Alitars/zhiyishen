// setTimeout clear
"use strict";

function setTime(e) {
  return new Promise(function (t, r) {
    var i = setTimeout(function (e) {
      t("res"), r("err"), clearTimeout(i)
    }, e || 1500)
  })
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = setTime;