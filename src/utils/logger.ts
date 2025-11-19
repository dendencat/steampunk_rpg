/**
 * Simple Logger Utility
 * 
 * Provides a consistent way to log messages, warnings, and errors.
 * In a production environment, this could be extended to write to a file or external service.
 */
export class Logger {
    private static instance: Logger;
    private isDebugMode: boolean = true;

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setDebugMode(enabled: boolean): void {
        this.isDebugMode = enabled;
    }

    public log(message: string, context?: string): void {
        if (this.isDebugMode) {
            const timestamp = new Date().toISOString();
            const ctx = context ? `[${context}] ` : '';
            console.log(`[INFO] ${timestamp} ${ctx}${message}`);
        }
    }

    public warn(message: string, context?: string): void {
        const timestamp = new Date().toISOString();
        const ctx = context ? `[${context}] ` : '';
        console.warn(`[WARN] ${timestamp} ${ctx}${message}`);
    }

    public error(message: string, context?: string): void {
        const timestamp = new Date().toISOString();
        const ctx = context ? `[${context}] ` : '';
        console.error(`[ERROR] ${timestamp} ${ctx}${message}`);
    }
}
