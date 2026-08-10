import { getAdminOrder, listAdminOrders, setAdminOrderStatus, setAdminPaymentStatus, } from "../services/adminOrderService.js";
export async function listAdminOrdersController(_req, res) {
    const query = res.locals.query;
    const result = await listAdminOrders(query);
    res.status(200).json(result);
}
export async function updateAdminOrderStatusController(req, res) {
    const input = res.locals.body;
    const result = await setAdminOrderStatus(String(req.params.orderNumber ?? ""), input);
    res.status(200).json(result);
}
export async function updateAdminPaymentStatusController(req, res) {
    const input = res.locals.body;
    const result = await setAdminPaymentStatus(String(req.params.orderNumber ?? ""), input);
    res.status(200).json(result);
}
export async function adminOrderDetailController(req, res) {
    const result = await getAdminOrder(String(req.params.orderNumber ?? ""));
    res.status(200).json(result);
}
//# sourceMappingURL=adminOrderController.js.map