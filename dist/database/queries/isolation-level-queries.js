"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isolationLevelQueries = void 0;
exports.isolationLevelQueries = {
    readUncommitted: 'SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;',
    readCommitted: 'SET TRANSACTION ISOLATION LEVEL READ COMMITTED;',
    repeatableRead: 'SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;',
    serializable: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;'
};
