"use strict";
exports.__esModule = true;
exports.CipherService = void 0;
var constants_1 = require("../constants");
var mod_1 = require("../util/mod");
var numeric_service_1 = require("./numeric.service");
var speech_recognizer_service_1 = require("./speech-recognizer.service");
var text_service_1 = require("./text.service");
var CipherService = /** @class */ (function () {
    function CipherService(text) {
        this.text = text;
        this.numericService = new numeric_service_1.NumericService();
        this.textService = new text_service_1.TextService();
        this.speechRecognizerService = new speech_recognizer_service_1.SpeechRecognizerService();
    }
    CipherService.prototype.affineDecipher = function (a, b) {
        var decipheredText = "";
        var n = constants_1.PIGGY_ALPHABET_LENGTH * constants_1.PIGGY_ALPHABET_LENGTH;
        for (var i = 0; i < this.text.length - 1; i++) {
            var bigram = this.textService.convertBigramToPairsOfNumber(this.text[i] + this.text[i + 1]);
            var bigramNumber = this.textService.convertBigramToNumber(bigram[0], bigram[1]);
            var inverseA = this.numericService.getInverseModulo(a, n);
            var decipheredBigram = (0, mod_1.mod)(inverseA * (bigramNumber - b), n);
            decipheredText +=
                this.textService.convertNumbersToBigram(decipheredBigram);
        }
        return decipheredText;
    };
    CipherService.prototype.findA = function (Y, X) {
        var n = constants_1.PIGGY_ALPHABET_LENGTH * constants_1.PIGGY_ALPHABET_LENGTH;
        var a = (0, mod_1.mod)(X[0] - X[1], n);
        var b = (0, mod_1.mod)(Y[0] - Y[1], n);
        return this.numericService.solveModuloComparison(a, b, n);
    };
    CipherService.prototype.findB = function (Y, a, X) {
        var n = constants_1.PIGGY_ALPHABET_LENGTH * constants_1.PIGGY_ALPHABET_LENGTH;
        return (0, mod_1.mod)(Y - a * X, n);
    };
    CipherService.prototype.getAllPosibleKeys = function () {
        var _this = this;
        var combinationsOfLanguageBigrams = this.textService.findAllCombinations(constants_1.MOST_FREQUENT_BIGRAMS_IN_PIGGY_LANGUAGE);
        var combinationsOfCipherBigrams = this.textService.findAllCombinations(this.textService
            .findMostFrequentBigramsInText(this.text)
            .map(function (el) { return el.bigram; }));
        var allCombinations = this.textService.findAllCombinationsOfTwoArrays(combinationsOfCipherBigrams, combinationsOfLanguageBigrams);
        var keys = allCombinations.map(function (combination) {
            var x1 = _this.textService.convertBigramToPairsOfNumber(combination[1][0]);
            x1 = _this.textService.convertBigramToNumber(x1[0], x1[1]);
            var x2 = _this.textService.convertBigramToPairsOfNumber(combination[1][1]);
            x2 = _this.textService.convertBigramToNumber(x2[0], x2[1]);
            var y1 = _this.textService.convertBigramToPairsOfNumber(combination[0][0]);
            y1 = _this.textService.convertBigramToNumber(y1[0], y1[1]);
            var y2 = _this.textService.convertBigramToPairsOfNumber(combination[0][1]);
            y2 = _this.textService.convertBigramToNumber(y2[0], y2[1]);
            var a = _this.findA([x1, x2], [y1, y2]);
            if (a instanceof (Array)) {
                a = a[0];
            }
            if (!a) {
                return [];
            }
            var b = _this.findB(x1, a, y1);
            return [a, b];
        });
        return keys;
    };
    CipherService.prototype.decipherText = function () {
        var keys = this.getAllPosibleKeys();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].length) {
                var decipheredText = this.affineDecipher(keys[i][1], keys[i][0]);
                if (this.speechRecognizerService.isTextSimilarToPigVoice(decipheredText, 3)) {
                    console.log(decipheredText);
                    break;
                }
            }
        }
    };
    return CipherService;
}());
exports.CipherService = CipherService;
