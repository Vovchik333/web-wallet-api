"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusHTTP = void 0;
var StatusHTTP;
(function (StatusHTTP) {
    StatusHTTP[StatusHTTP["OK"] = 200] = "OK";
    StatusHTTP[StatusHTTP["CREATED"] = 201] = "CREATED";
    StatusHTTP[StatusHTTP["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusHTTP[StatusHTTP["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusHTTP[StatusHTTP["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusHTTP[StatusHTTP["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusHTTP[StatusHTTP["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusHTTP[StatusHTTP["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusHTTP || (exports.StatusHTTP = StatusHTTP = {}));
