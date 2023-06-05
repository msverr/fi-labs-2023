"use strict";
exports.__esModule = true;
exports.SpeechRecognizerService = void 0;
var constants_1 = require("../constants");
var text_service_1 = require("./text.service");
var SpeechRecognizerService = /** @class */ (function () {
    function SpeechRecognizerService() {
        this.textService = new text_service_1.TextService();
    }
    SpeechRecognizerService.prototype.isTextSimilarToPigVoice = function (text, error) {
        var lettersFrequency = this.textService.findLettersFrequencyInText(text);
        var fiveMostFrequentInText = lettersFrequency
            .slice(0, 5)
            .map(function (x) { return x.letter; });
        var fiveMostFrequentInLanguage = [];
        var i = 0;
        for (var letter in constants_1.LETTERS_FREQUENCY_IN_PIG_LANGUAGE) {
            fiveMostFrequentInLanguage.push(letter);
            i++;
            if (i === 5) {
                break;
            }
        }
        var recognitionCount = 0;
        fiveMostFrequentInText.forEach(function (letter) {
            if (fiveMostFrequentInLanguage.includes(letter)) {
                recognitionCount++;
            }
        });
        return recognitionCount >= error;
    };
    return SpeechRecognizerService;
}());
exports.SpeechRecognizerService = SpeechRecognizerService;
