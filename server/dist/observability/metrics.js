const counters = {
    requests: 0,
    responses4xx: 0,
    responses5xx: 0,
    adminFailures: 0,
    checkoutFailures: 0,
    paymentFailures: 0,
};
const recentFailures = [];
export function classifyOperation(path) {
    if (path.startsWith("/api/admin"))
        return "admin";
    if (path.startsWith("/api/payments"))
        return "payment";
    if (path.startsWith("/api/orders"))
        return "checkout";
    return "request";
}
export function recordRequest() {
    counters.requests += 1;
}
export function recordFailure(record) {
    if (record.statusCode >= 500)
        counters.responses5xx += 1;
    else
        counters.responses4xx += 1;
    if (record.category === "admin")
        counters.adminFailures += 1;
    if (record.category === "checkout")
        counters.checkoutFailures += 1;
    if (record.category === "payment")
        counters.paymentFailures += 1;
    recentFailures.unshift(record);
    if (recentFailures.length > 50)
        recentFailures.length = 50;
}
export function getMetricsSnapshot() {
    return {
        ...counters,
        lastFailureAt: recentFailures[0]?.timestamp ?? null,
    };
}
export function getDiagnosticsSnapshot() {
    return { counters: getMetricsSnapshot(), recentFailures: [...recentFailures] };
}
//# sourceMappingURL=metrics.js.map