"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TextService = void 0;
var constants_1 = require("../constants");
var TextService = /** @class */ (function () {
    function TextService() {
    }
    TextService.prototype.findMostFrequentBigramsInText = function (text) {
        var _this = this;
        return this.getBigrams(text)
            .map(function (bigram) {
            return {
                frequency: _this.findBigramFrequency(text, bigram),
                bigram: bigram
            };
        })
            .sort(function (a, b) { return b.frequency - a.frequency; })
            .slice(0, 5);
    };
    TextService.prototype.getBigrams = function (text) {
        var bigrams = text.split("").map(function (x, index) { return x + text[index + 1]; });
        bigrams.pop();
        return __spreadArray([], __read(new Set(bigrams)), false);
    };
    TextService.prototype.findBigramsAmount = function (text) {
        return text.length - 1;
    };
    TextService.prototype.findBigramFrequency = function (text, bigram) {
        var bigramMatchesAmount = Array.from(text.matchAll(new RegExp(bigram, "g"))).length;
        return bigramMatchesAmount / this.findBigramsAmount(text);
    };
    TextService.prototype.findLettersFrequencyInText = function (text) {
        var _this = this;
        return this.getLettersUsedInText(text)
            .map(function (letter) {
            return {
                frequency: _this.findLetterFrequency(text, letter),
                letter: letter
            };
        })
            .sort(function (a, b) { return b.frequency - a.frequency; });
    };
    TextService.prototype.getLettersUsedInText = function (text) {
        return __spreadArray([], __read(new Set(text.split(""))), false);
    };
    TextService.prototype.findLetterFrequency = function (text, letter) {
        var letterMatchesAmount = Array.from(text.matchAll(new RegExp(letter, "g"))).length;
        return letterMatchesAmount / text.length;
    };
    TextService.prototype.findLetterPosition = function (letter) {
        return constants_1.PIGGY_ALPHABET.indexOf(letter);
    };
    TextService.prototype.findLetterByPosition = function (position) {
        return constants_1.PIGGY_ALPHABET[position];
    };
    TextService.prototype.convertBigramToNumber = function (x, y) {
        return x * constants_1.PIGGY_ALPHABET_LENGTH + y;
    };
    TextService.prototype.convertBigramToPairsOfNumber = function (bigram) {
        return [
            this.findLetterPosition(bigram[0]),
            this.findLetterPosition(bigram[1]),
        ];
    };
    TextService.prototype.convertNumbersToBigram = function (bigramNumber) {
        var a = Math.floor(bigramNumber / constants_1.PIGGY_ALPHABET_LENGTH);
        var b = bigramNumber % constants_1.PIGGY_ALPHABET_LENGTH;
        return this.findLetterByPosition(a) + this.findLetterByPosition(b);
    };
    TextService.prototype.findAllCombinations = function (arr) {
        var result = [];
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (!result.find(function (el) { return el[0] === arr[j] && el[1] === arr[i]; }) &&
                    arr[i] !== arr[j]) {
                    result.push([arr[i], arr[j]]);
                }
            };
            for (var j = 0; j < arr.length; j++) {
                _loop_2(j);
            }
        };
        for (var i = 0; i < arr.length; i++) {
            _loop_1(i);
        }
        return result;
    };
    TextService.prototype.findAllCombinationsOfTwoArrays = function (arr1, arr2) {
        var cartesian = function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            return a.reduce(function (a, b) {
                return a.flatMap(function (d) { return b.map(function (e) { return [d, e]; }); });
            });
        };
        return cartesian(arr1, arr2);
    };
    return TextService;
}());
exports.TextService = TextService;
