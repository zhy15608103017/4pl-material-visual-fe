import request from '@/utils/request';
const baseUrl = "/juslink-4pl-material-visual-service";
// 物料列表
async function getMaterialList(payload: any) {
    // const baseUrl = "http://127.0.0.1:8000/api";
    const { page, size, sort, ...data } = payload;
    if(sort!=="on_hand_quantity,desc"){
        return request(`${baseUrl}/materials/page?page=${page-1}&size=${size}&sort=${sort}`, {
            method: 'post',
            data,
            // params: { page:page-1, size, sort },
        });
    }else{
        return request(`${baseUrl}/materials/page?page=${page-1}&size=${size}&sort=${sort}&sort=material_no,asc`, {
            method: 'post',
            data,
            // params: { page:page-1, size, sort },
        });
    }
  
}
// 物料导出
async function materialExport(payload: any) {
    const { sort, ...data } = payload;
    // return request(`${baseUrl}/materials/page`, {
    //     method: 'post',
    //     data,
    //     params: { sort },
    // });
    if(sort!=="on_hand_quantity,asc"){
        return request(`${baseUrl}/materials/export?&sort=${sort}`, {
            method: 'post',
            data,
            // params: { page:page-1, size, sort },
        });
    }else{
        return request(`${baseUrl}/materials/export?sort=${sort}&sort=material_no,asc`, {
            method: 'post',
            data,
            // params: { page:page-1, size, sort },
        });
    }
}
// 物料详情
async function getmaterialDetails(materialId: string) {
    return request(`${baseUrl}/materials/${materialId}`, {
        method: 'get',
    });
}
//  物料库存列表

async function getmaterialInventory(payload: any) {
    const {materialNo, page, size, sort, } = payload;
    return request(`${baseUrl}/materials/${materialNo}/inventory/page`, {
     method: 'get',
     params: { page:page-1, size, sort },
    });
}
export {
    getMaterialList, // 物料列表
    materialExport,// 物料导出
    getmaterialDetails,// 物料详情
    getmaterialInventory,//  物料库存列表
}