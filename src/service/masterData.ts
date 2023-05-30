import request from '@/utils/request';
const baseUrl = "/juslink-4pl-data-access-service";



// 查看基础资料
async function getmasterData(materialId: string) {
    return request(`${baseUrl}/materials/${materialId}`, {
        method: 'get',
    });
}


export {
    getmasterData
}