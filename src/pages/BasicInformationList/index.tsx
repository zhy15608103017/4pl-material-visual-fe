import React, { useState } from 'react';
import {
    useIntl,
    useAppData,
    matchRoutes,
    useLocation,
} from 'umi';
import styles from './index.less';
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import SearchForm from '@/components/SearchForm';
import Upload from '@/components/Upload';
import getColumns from './columns';
import { uploadFileRequest, downloadTemplateRequest, getBasicInformationList, uploadedResponse } from "@/service/BasicInformationList"
export default function Index() {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState({})
    const [sorters, setSorters] = useState<any>('audit.lastModifiedTime,desc');
    const [paginations, setPaginations] = useState<any>({
        total: 20,
        pageSize: 10,
        current: 1,
    });
    const { formatMessage } = useIntl();

    const getdataSource = async (value: any) => {
        setLoading(true);
        let res = await getBasicInformationList(value);
        setDataSource(res?.data?.content);
        setPaginations({
            total: res?.data?.totalElements,
            current: value.page,
            pageSize: value.size,
        });
        setLoading(false);
    };
    const columns = getColumns(formatMessage);
    const saveFormData = (value: any) => {
        let valuesArr = Object.values(value);
        setSearchValue(value)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        valuesArr.some((item) => item)
            ? getdataSource({
                sort: sorters,
                ...value,
                page: 1,
                size: 10,
            })
            : getdataSource({
                sort: sorters,
                page: 1,
                size: 10,
            });
    };

    const getFilterOpts = () => {
        const filterOpts = [
            {
                type: 'input',
                label: formatMessage({ id: 'Part No.' }),
                name: 'materialNoLike',

            },
            {
                type: 'input',
                label: formatMessage({ id: 'Part Name' }),
                name: 'materialNameLike',

            },
            {
                type: 'select',
                label: formatMessage({ id: 'Enable Status' }),
                name: 'enableEq',
                options: [{
                    label: formatMessage({ id: "On" }),
                    value: "true"
                }, {
                    label: formatMessage({ id: "Off" }),
                    value: "false"
                }]

            },


        ];
        return filterOpts;
    };
    const onChange = (pagination: any, _: any, sorter: any) => {
        let sorters
        if (sorter.order) {
            sorters = `audit.${(sorter.field)},${sorter.order.replace("end", "")}`
        } else {
            sorters = 'audit.lastModifiedTime,desc'
        }
        getdataSource({
            ...searchValue,
            page: pagination.current,
            size: pagination.pageSize,
            sort: sorters,
        });
        setSorters(sorters)
        setPaginations(pagination)
    }
    const location = useLocation() as any;
    const appData = useAppData();
    const { clientRoutes } = appData;
    const matches = matchRoutes(clientRoutes, location.pathname);
    const locationRouter = (matches || []).filter((item: any) => {
        return item.pathname === location.pathname;
    });
    const pathname =locationRouter.length > 0 ? locationRouter[0].route.path : '';
    // @ts-ignore
    const clientId = window?.jusdaBaseConfig?.clientId;
    // @ts-ignore
    const cfgType = window?.jusdaBaseConfig?.cfgType;
    // const pathname = useRouteMatch().path;
    // 初始化生成表格的唯一key
    const initTablePersistenceKey = () => {
        return `${clientId}-${cfgType}-${pathname}`;
    };
    const propColumnsStateValue = () => {
        const defaultValue = {
            materialNo: {  fixed: 'left', disable: true,show: true },
            description: {  show: true },
            materialType: {  show: true },
            lastModifiedBy: {  show: true },
            lastModifiedTime: {  show: true },
            enable: {  show: true },

        };
        try {
            if (JSON.parse(localStorage.getItem('proTableConfig') || '')) {
                if (
                    JSON.parse(localStorage.getItem('proTableConfig') || '')[
                    initTablePersistenceKey()
                    ]
                ) {
                    return JSON.parse(
                        localStorage.getItem('proTableConfig') || '',
                    )[initTablePersistenceKey()];
                }
            }
        } catch (erorr) {
            return defaultValue;
        }
        return defaultValue;
    };
    const updateTableData = () => {
        getdataSource({
            ...searchValue,
            page: 1,
            size: 10,
            sort: sorters,
        });
    }
    return (
        <>
            <div className={styles.BasicBox}> 
                <div className={styles.top}>
                    <SearchForm
                        filterOpts={getFilterOpts()}
                        saveFormData={saveFormData}
                        height="78px"
                        keyFn={() => "initTablePersistenceKey"}
                        isCacheReset={false}
                    />
                </div>
                <div className={styles.ProTable}>
                    <ProTable
                        resizable={true}
                        onChange={onChange}
                        loading={loading}
                        columns={columns}
                        dataSource={dataSource}
                        search={false}
                        propColumnsStateValue={propColumnsStateValue()}
                        scroll={{ y: window.innerHeight - 380 }}
                        size="small"
                        rowKey='id'
                        pagination={{
                            size: 'small',
                            showSizeChanger: 'showSizeChanger',
                            showQuickJumper: 'showQuickJumper',
                            ...paginations,
                            showTotal() {
                                return `${formatMessage({ id: 'total' })} ${paginations.total
                                    } ${formatMessage({ id: 'strip' })}`;
                            },
                        }}
                        toolBarRender={() => [
                            <Upload uploadModalTitle={formatMessage({ id: "Upload Material Data" })}
                                key="1"
                                // uploadModalIntroduce={formatMessage({ id: "Download the template and fill in the information" })}
                                uploadBtnText={formatMessage({ id: "Upload" })}
                                uploadModalIntroduce={formatMessage({ id: "Import material data(File size＜2MB)" })}
                                uploadFileRequest={uploadFileRequest}
                                updateTableData={updateTableData}
                                // downloadTemplateRequest={downloadTemplateRequest}
                                uploadProcessRequest={uploadedResponse}
                            ></Upload>
                        ]}

                    />
                </div>
            </div>
        </>
    )
}