import React from 'react';
import webApiClient from '@jusda-tools/web-api-client';
import authTools from '@jusda-tools/auth-tools';
import { getLanguage } from '@/utils/utils';
import { Button, notification, message } from 'antd';

const JSONbigString = require('json-bigint')({ storeAsString: true });

const { baseUrl } = window.jusdaBaseConfig;

const { JusdaUserInfo } = authTools;

webApiClient.interceptors.request.use((url, options: any) => {
    const { headers } = options;
    return {
        url: /http/.test(url)|| /https/.test(url) ? url : `${baseUrl}${url}`,
        options: {
            ...options,
            headers: { ...headers, 'accept-language': getLanguage() },
        },
    };
});
webApiClient.interceptors.response.use(async response => {
    try {
        const data = await response.clone().json();
        if (
            (data && data.errorCode && data.errorCode === '403') ||
            (data && data.code && data.code === '40012') ||
            response.status === 403
        ) {
            notification.error({
                message: 'User identity expired!',
                key: data.errorCode,
                btn: (
                    <Button
                        size="small"
                        type="primary"
                        style={{ color: '#000000' }}
                        onClick={() => {
                            new JusdaUserInfo().logout();
                        }}
                    >
                        Login
                    </Button>
                ),
            });
            return Promise.reject(data);
        }
        if (!data.success ) {
            message.error(data?.message);
        }
    } catch (error) {
        console.warn('warn: ', error);
    }
    const res = await fixSnowFlake(response);
    return res;
});

export default webApiClient;

// fix 雪花算法小数精度丢失
async function fixSnowFlake(response: Response) {
    const type = response.headers?.get('content-type');
    if (type === 'application/json') {
        const text = await response.clone().text();
        const json = JSONbigString.parse(text);
        return Promise.resolve(json);
    }
    return Promise.resolve(response);
}
