import request from '@/utils/request';
const baseUrl = "/juslink-4pl-material-visual-service";

// 采购订单物料项次列表
async function getPurchaseOrderList(data: any) {
    const { page, size, sort, materialNo } = data;
    return request(`${baseUrl}/purchase-order-materials/${materialNo}/page`, {
        method: 'get',
        params: { page: page, size, sort },
    });
}


// 交货计划物料项次列表
async function getPoDeiveryPlanList(data: any) {
    const { page, size, materialNo, sort } = data;
    return request(`${baseUrl}/po-delivery-plan-materials/${materialNo}/page`, {
        method: 'get',
        params: { page: page, size, sort },
    });
}




//出库计划
async function getOutboundPlanList(data: any) {
    const { materialNo, page, size, sort, } = data;
    return request(`${baseUrl}/materials/${materialNo}/outbound-plan/page`, {
        method: 'get',
        params: { page: page, size, sort },
    });
}

// 入库计划
async function getInBoundPlan(data: any) {
    const { materialNo, page, size, sort } = data;
    return request(`${baseUrl}/materials/${materialNo}/inbound-plan/page`, {
        method: 'get',
        params: { page: page, size, sort },
    });
}

// 库龄信息
async function getStockAge(data: any) {
    const { materialNo, page, size, sort } = data;
    return request(`${baseUrl}/materials/${materialNo}/stock-age/page?sort=${sort}&sort=receipt_no,desc`, {
        method: 'get',
        params: { page: page, size },
    });
}

export {
    getPurchaseOrderList,
    getPoDeiveryPlanList,
    getOutboundPlanList,
    getInBoundPlan,
    getStockAge
}