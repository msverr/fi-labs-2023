"use strict";
exports.__esModule = true;
exports.FileService = void 0;
var fs = require("fs");
var FileService = /** @class */ (function () {
    function FileService(fileUrl) {
        this.fileUrl = fileUrl;
    }
    FileService.prototype.getText = function () {
        return fs.readFileSync(this.fileUrl, {
            encoding: "utf-8",
            flag: "r"
        });
    };
    return FileService;
}());
exports.FileService = FileService;
