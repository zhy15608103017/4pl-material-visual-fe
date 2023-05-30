import { History } from '@jusda-tools/jusda-publicmethod';
import { useLocation } from '@umijs/max';
import { Breadcrumb } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
// import queryString from 'query-string';
import { history, useIntl, useModel, useSelectedRoutes } from 'umi';
import style from './index.less';

export default function Breadcrumbs(): ReactElement {
    const location = useLocation() as any;
    const { modifyUrl } = useModel('@@qiankunStateFromMaster') || {};

    const { microFrontModifyUrl } = new History({ history, modifyUrl });
    const { formatMessage } = useIntl();
    const routes = useSelectedRoutes();
    const [breadcrumbList, setBreadcrumbList] = useState<any[]>([]);
    const getBreadcrumbListfn = () => {
        let res = routes.find((i) => {
            return i.pathname === location.pathname;
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.isArray(res?.route?.BreadcrumbList) &&
            setBreadcrumbList(res?.route?.BreadcrumbList);
    };

    useEffect(() => {
        getBreadcrumbListfn();
    }, [location.pathname]);
    return (
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <span
                    style={{ color: '#666666' }}
                    className={style.hove}
                    onClick={() => {
                        microFrontModifyUrl({
                            activeKey: 'materials',
                            subApplicationPath: 'routePath=/',
                        });
                    }}
                >
                    {' '}
                    {formatMessage({ id: 'Home' })}{' '}
                </span>
            </Breadcrumb.Item>

            {breadcrumbList.map((i, index) => {
                return (
                    <Breadcrumb.Item key={index}>
                        <span
                            style={{ color: '#666666' }}
                            className={`${i?.clickPath ? style.hove : ''}`}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                i?.clickPath&&microFrontModifyUrl({
                                    activeKey: 'materials',
                                    subApplicationPath: `routePath=${i?.clickPath}`,
                                });

                            }}
                        >
                            {' '}
                            {formatMessage({ id: i?.id })}{' '}
                        </span>
                    </Breadcrumb.Item>
                );
            })}
   
        </Breadcrumb>
    );
}
