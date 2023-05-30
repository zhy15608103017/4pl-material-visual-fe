/* eslint-disable react/button-has-type */
import NoDataPng from '@/assets/nodata.png';
import Breadcrumbs from '@/components/Breadcrumb';
import { ConfigProvider, Empty } from 'antd';
import React, { useEffect } from 'react';
import { history, Outlet, useLocation, useModel } from 'umi';
import { History } from '@jusda-tools/jusda-publicmethod';
import styles from './AppLayout.less';
import {initGlobalPoints,sensors} from "@jusda-tools/buried-point"

export const AppLayout: React.FC = (props: any) => {
    const { subAppPageJump } = new History({ history });
    const { urlParams } = useModel('@@qiankunStateFromMaster') || {};
    const { subApplicationPath } = urlParams || {};

    const location = useLocation() as any;

    useEffect(() => {
        subAppPageJump({ urlParams });
    }, [subApplicationPath]);

    return (
        <ConfigProvider
            renderEmpty={() => (
                <Empty description="" image={<img src={NoDataPng} />}></Empty>
            )}
        >
            <div className={styles.app}>
                <div className={styles.body}>
                    <div className={styles.bodyLayout}>
                        <div className={styles.main}>
                            <div className={styles.breadcrumbs}>
                                <Breadcrumbs
                                    history={history}
                                    location={location}
                                ></Breadcrumbs>
                            </div>
                            <Outlet />
                            <select name="" id="">

                                <option value="1">1</option>
                                <option value="1">1</option>
                                <option value="1">1</option>
                                <option value="1">1</option>
                            </select>
                            <button onClick={()=>{
                             console.log(1111)
                                  sensors.track('custom',{extraProperties:{

                                }})
                            }}>11</button>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default AppLayout;
