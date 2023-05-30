import request from '@/utils/request';

const servicename = 'juslink-4pl-material-visual-service';

// 运输追踪列表
export async function upLoadToOss(params: any) {
    return request(
        `/${servicename}/materials/track/page?page=${params.page}&size=${params.size}`,
        {
            method: 'POST',
            data: {
                materialIdEq: params.materialIdEq,
                transportModeEq: params.transportModeEq,
            },
        },
    );
}
