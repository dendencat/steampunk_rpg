"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
/**
 * Simple Logger Utility
 *
 * Provides a consistent way to log messages, warnings, and errors.
 * In a production environment, this could be extended to write to a file or external service.
 */
class Logger {
    constructor() {
        this.isDebugMode = true;
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    setDebugMode(enabled) {
        this.isDebugMode = enabled;
    }
    log(message, context) {
        if (this.isDebugMode) {
            const timestamp = new Date().toISOString();
            const ctx = context ? `[${context}] ` : '';
            console.log(`[INFO] ${timestamp} ${ctx}${message}`);
        }
    }
    warn(message, context) {
        const timestamp = new Date().toISOString();
        const ctx = context ? `[${context}] ` : '';
        console.warn(`[WARN] ${timestamp} ${ctx}${message}`);
    }
    error(message, context) {
        const timestamp = new Date().toISOString();
        const ctx = context ? `[${context}] ` : '';
        console.error(`[ERROR] ${timestamp} ${ctx}${message}`);
    }
}
exports.Logger = Logger;
