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

