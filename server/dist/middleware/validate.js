export function validateBody(schema) {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            next(parsed.error);
            return;
        }
        res.locals.body = parsed.data;
        next();
    };
}
export function validateQuery(schema) {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.query);
        if (!parsed.success) {
            next(parsed.error);
            return;
        }
        res.locals.query = parsed.data;
        next();
    };
}
//# sourceMappingURL=validate.js.map