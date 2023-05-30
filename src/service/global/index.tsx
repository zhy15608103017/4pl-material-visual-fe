import request from '@/utils/request';

// 上传文件服务
async function upLoadToOss(params: any) {
    return request('/objects', {
        data: params,
        prefix: '/oss',
    });
}
// 文件下载
async function downloadOssFile({ id }: { id?: string }) {
    return request(`/objects/${id}`, {
        prefix: '/oss',
        method: 'GET',
    });
}
// 权限管控
export async function getApplication(): Promise<any> {
    return request('/usercenter-service/user-identity/application', {
        method: 'GET',
        prefix: undefined,
    });
}
// 下拉模糊搜索
export async function getDict(params: any): Promise<any> {
    return request(`/dict/warehouse`, {
        method: 'GET',
        params: { keyword: params },
    });
}
// 商品导出
async function getGoodsInfoExport(props: any) {
    return request('/goods-info/export/async', {
        method: 'POST',
        data: props,
    });
}
// 定义tag查询
// export const searchTags = (payload: any) => {
//     const nameCode = getNamespace('namespaceCode')
//     const { page, size, ...data } = payload;
//     return request(`${bffPath}/${nameCode}/definition/tags/search`, {
//         method: 'post',
//         data,
//         params: { page, size },
//     });
// };
export {
    upLoadToOss, // 上传文件服务
    downloadOssFile, // 文件下载
    getGoodsInfoExport
};
