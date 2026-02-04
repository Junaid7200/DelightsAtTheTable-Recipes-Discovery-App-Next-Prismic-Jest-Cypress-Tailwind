type LogLevel = "info" | "warn" | "error";
type LogMeta = Record<string, unknown>;

function serializeError(err: unknown) {
    if (err instanceof Error) {
        return {
            name: err.name, message: err.message
        };
    }
    return {message: String(err)};
}

function emit(level: LogLevel, event: string, meta: LogMeta = {}) {
    const record = {
        ts: new Date().toISOString(),
        level,
        event,
        service: "recipe_app",
        env: process.env.NODE_ENV ?? "development",
        ...meta
    };
    const line = JSON.stringify(record);
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
}

export const logger = {
    info: (event: string, meta?: LogMeta) => emit("info", event, meta),
    warn: (event: string, meta?: LogMeta) => emit("warn", event, meta),
    error: (event: string, meta?: LogMeta & { error?: unknown }) => emit("error", event, {
        ...meta, ...(meta?.error ? {error: serializeError(meta.error)} : {})
    })
}