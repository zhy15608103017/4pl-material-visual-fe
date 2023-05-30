import request from '@/utils/request';
const baseUrl = "/juslink-4pl-data-access-service";

// 导入物料
function uploadFileRequest(data: any) {
    const { ossFileId } = data;
    return request(`${baseUrl}/materials/import/${ossFileId}`, {
        method: 'post',
    });
}
// 下载模板
function downloadTemplateRequest() {
    const { cfgType } = window?.jusdaBaseConfig
    return request(`https://oss${cfgType}.jus-link.com/4pl-visual/material/share-folder/%E7%89%A9%E6%96%99%E4%BF%A1%E6%81%AF%26%E5%BA%93%E5%AD%98%E4%BF%A1%E6%81%AF%E5%AD%97%E6%AE%B520220712.xlsx`, {
        method: 'get',
    });
}
// 查询基础信息列表
function getBasicInformationList(payload: any) {
    const { page, size, sort, ...data } = payload;

    return request(`${baseUrl}/materials/page?page=${page - 1}&size=${size}&sort=${sort}&sort=materialNo,desc`, {
        method: 'post',
        data,
    });
}
// 禁用物料
function disabledMatter(materialId: string) {
    return request(`${baseUrl}/materials/${materialId}/disabled`, {
        method: 'put',
    });
}
// 启用物料
function enabledMatter(materialId: string) {
    return request(`${baseUrl}/materials/${materialId}/enabled`, {
        method: 'put',
    });
}
// 状态
function uploadedResponse(taskId: string):Promise<any> {
    return request(`${baseUrl}/import-tasks/${taskId}`, {
        method: 'get',
    });
}
export {
    uploadFileRequest,
    downloadTemplateRequest,
    getBasicInformationList,
    disabledMatter,
    enabledMatter,
    uploadedResponse
}