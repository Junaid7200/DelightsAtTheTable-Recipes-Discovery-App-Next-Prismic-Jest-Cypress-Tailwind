export type AppErrorCode = "VALIDATION_ERROR" | "UPSTREAM_ERROR" | "BUDGET_EXCEEDED" | "INTERNAL_ERROR";
type AppErrorOptions = {
    statusCode: number;
    retryable: boolean;
    details?: Record<string, unknown>;
    cause?: unknown;
};

export class AppError extends Error {
    public readonly code: AppErrorCode;
    public readonly statusCode: number;
    public readonly retryable: boolean;
    public readonly details?: Record<string, unknown>;
    public readonly cause?: unknown;
    constructor(code: AppErrorCode, message: string, opts: AppErrorOptions) {
        super(message);
        this.name = new.target.name;
        this.code = code;
        this.statusCode = opts.statusCode;
        this.retryable = opts.retryable;
        this.details = opts.details;
        this.cause = opts.cause;
    }
}

export class ValidaitonError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super("VALIDATION_ERROR", message, {
            statusCode: 400,
            retryable: false,
            details,
        });
    }
}

export class UpstreamError extends AppError {
    constructor(message: string, details?: Record<string, unknown>, cause?: unknown) {
        super("UPSTREAM_ERROR", message, {
            statusCode: 502,
            retryable: true,
            details,
            cause,
        });
    }
}

export class BudgetExceededError extends AppError {
    constructor(message = "Daily Spoonacular budget exhausted", details?: Record<string, unknown>) {
        super("BUDGET_EXCEEDED", message, {
            statusCode: 429,
            retryable: false,
            details,
        });
    }
}

export function isAppError(err: unknown): err is AppError {
    return err instanceof AppError;
}

export function toAppError(err: unknown): AppError {
    if (isAppError(err)) return err;

    if (err instanceof Error) {
        return new AppError("INTERNAL_ERROR", err.message, {
            statusCode: 500,
            retryable: false,
            cause: err,
        });
    }

    return new AppError("INTERNAL_ERROR", "Unknown error", {
        statusCode: 500,
        retryable: false,
        details: { raw: String(err) },
    });
}
