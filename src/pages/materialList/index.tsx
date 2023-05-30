/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { ReactComponent as Details } from '@/assets/Details.svg';
import SearchForm from '@/components/SearchForm';
import { getMaterialList, materialExport } from '@/service/materialList';
import { getFileName } from '@/utils/utils';
import { DownloadOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import { History } from '@jusda-tools/jusda-publicmethod';
import exportFn from '@jusda-tools/pollingdownload';
import { Button, message } from 'antd';
import type { TableProps } from 'antd/es/table';
import React, { useState } from 'react';
import {
    history,
    matchRoutes,
    useAppData,
    useDispatch,
    useIntl,
    useLocation,
    useModel,
} from 'umi';
import { UnderScoreCase } from './../../utils/utils';
import getColumns from './columns';
import styles from './index.less';

interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const Index = (_props: Props) => {
    const { modifyUrl } = useModel('@@qiankunStateFromMaster') || {};
    const { microFrontModifyUrl } = new History({ history, modifyUrl });
    const [paginations, setPaginations] = useState<any>({
        total: 50,
        pageSize: 10,
        current: 1,
    });
    const [sorters, setSorters] = useState<any>({
        sort: 'on_hand_quantity,desc',
    });
    const location = useLocation() as any;
    const { formatMessage } = useIntl();
    const getFilterOpts = () => {
        const filterOpts = [
            {
                type: 'input',
                label: formatMessage({ id: 'Product No.' }),
                name: 'materialNoEq',
                placeholder: formatMessage({
                    id: 'Please enter',
                }),
            },
            {
                type: 'input',
                label: formatMessage({ id: 'Description' }),
                name: 'materialNameLike',
                placeholder: formatMessage({
                    id: 'Please enter',
                }),
            },
            {
                type: 'input',

                label: formatMessage({ id: 'Supplier' }),
                name: 'supplierNameLike',
                placeholder: formatMessage({
                    id: 'Please enter',
                }),
            },
            {
                type: 'input',
                label: formatMessage({ id: 'Manufacturer' }),
                name: 'manufacturerLike',
                placeholder: formatMessage({
                    id: 'Please enter',
                }),
            },

            {
                type: 'input',
                label: formatMessage({ id: 'SupplierPart No.' }),
                name: 'supplierMaterialNoEq',
                placeholder: formatMessage({
                    id: 'Please enter',
                }),
            },
            {
                type: 'input',
                label: formatMessage({ id: 'BU' }),
                name: 'buNameLike',
                placeholder: formatMessage({
                    id: 'Please enter',
                }),
            },
        ];
        return filterOpts;
    };
    const Operation = (value: string) => {
        return (
            <Icon
                component={Details}
                style={{ fontSize: '23px' }}
                onClick={() => {
                    microFrontModifyUrl({
                        subApplicationPath: `?routePath=/materialDetails&SecondaryMenu=1&materialId=${value}`,
                    });
                }}
            />
        );
    };
    const columns = getColumns(formatMessage, Operation);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const handleDownloadExcel = async () => {
        if (exportLoading) return;
        let searchCriteria = JSON.parse(
            sessionStorage.getItem(`search form${initTablePersistenceKey()}`) ||
                '{}',
        );
        setExportLoading(true);
        materialExport({
            ...sorters,
            ...searchCriteria,
        })
            .then((res: any) => {
                exportFn(res?.data, {
                    duration: 1000,
                    fileName: getFileName({
                        fileName: formatMessage({
                            id: 'material information export',
                        }),
                    }),
                })
                    .then((result: any) => {
                        setExportLoading(false);
                        const { data: exportData, success } = result;
                        if (!exportData?.address) {
                            message.error(
                                formatMessage({ id: 'Export failed' }),
                            );
                        }
                    })
                    .catch(() => {
                        message.error(formatMessage({ id: 'Export failed' }));
                        setExportLoading(false);
                    });
            })
            .catch(() => setExportLoading(false));
    };
    const onChange: TableProps<DataType>['onChange'] = (
        pagination,
        _filters,
        sorter: any,
    ) => {
        let searchCriteria = JSON.parse(
            sessionStorage.getItem(`search form${initTablePersistenceKey()}`) ||
                '{}',
        );

        if (sorter.field === 'onHandQuantity' && sorter.order === 'ascend') {
            getdataSource({
                ...searchCriteria,
                page: pagination.current,
                size: pagination.pageSize,
                sort: `${UnderScoreCase('onHandQuantity')},asc`,
            });
            setSorters({
                sort: `${UnderScoreCase('onHandQuantity')},asc`,
            });
        } else {
            if (!sorter?.order) {
                getdataSource({
                    ...searchCriteria,
                    page: pagination.current,
                    size: pagination.pageSize,
                    sort: `${UnderScoreCase('onHandQuantity')},desc`,
                });
                setSorters({
                    sort: `${UnderScoreCase('onHandQuantity')},desc`,
                });
                return;
            }
            getdataSource({
                ...searchCriteria,
                page: pagination.current,
                size: pagination.pageSize,
                sort: `${UnderScoreCase(sorter.field)},${sorter?.order?.replace(
                    'end',
                    '',
                )}`,
            });
            setSorters({
                sort: `${UnderScoreCase(sorter.field)},${sorter?.order?.replace(
                    'end',
                    '',
                )}`,
            });
        }
    };
    const getdataSource = async (value: any) => {
        setLoading(true);
        let res = await getMaterialList(value);
        setDataSource(res?.data?.content);

        setPaginations({
            total: res?.data?.totalElements,
            current: value.page,
            pageSize: value.size,
        });
        setLoading(false);
    };

    const saveFormData = (value: any) => {
        let valuesArr = Object.values(value);
        valuesArr.some((item) => item)
            ? getdataSource({
                  ...sorters,
                  ...value,
                  page: 1,
                  size: 10,
              })
            : getdataSource({
                  ...sorters,
                  page: 1,
                  size: 10,
                  ...{},
              });
    };
    // @ts-ignore
    const clientId = window?.jusdaBaseConfig?.clientId;
    // @ts-ignore
    const cfgType = window?.jusdaBaseConfig?.cfgType;

    const appData = useAppData();
    const { clientRoutes } = appData;
    const matches = matchRoutes(clientRoutes, location.pathname);
    const locationRouter = (matches || []).filter((item: any) => {
        return item.pathname === location.pathname;
    });
    const pathname =
        locationRouter.length > 0 ? locationRouter[0].route.path : '';

    // const pathname = useRouteMatch().path;
    // 初始化生成表格的唯一key
    const initTablePersistenceKey = () => {
        return `${clientId}-${cfgType}-${pathname}`;
    };
    const propColumnsStateValue = () => {
        const defaultValue = {
            materialNo: { show: true, fixed: 'left', disable: true },
            materialName: {
                order: 4,
                show: true,
                fixed: 'left',
                disable: true,
            },
            inTransitQuantity: { show: true },
            onHandQuantity: { show: true },
            openQuantity: { show: true },
            supplierName: { show: true },
            materialType: { show: true },
            availableQuantity: { show: true },
            revisionNo: { show: false },
            substituteMaterialNo: { show: false },
            buName: { show: false },
            supplierMaterialNo: { show: false },
            manufacturer: { show: false },
            unit: { show: false },
            netVolume: { show: false },
            netWeight: { show: false },
            production: { show: false },
            endToEnd: { show: false },
            Operation: { show: true },
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

    return (
        <>
            <div>
                <div>
                    <div>
                        {' '}
                        <div>
                            {' '}
                            <div>1</div>
                        </div>
                    </div>
                </div>
                <div className={styles.top}>
                    <SearchForm
                        filterOpts={getFilterOpts()}
                        saveFormData={saveFormData}
                        height="175px"
                        keyFn={initTablePersistenceKey}
                    />
                </div>
                <div className={`${styles.ProTable} jusda-table-container `}>
                    <ProTable
                        resizable={true}
                        onChange={onChange}
                        loading={loading}
                        columns={columns}
                        dataSource={dataSource}
                        search={false}
                        scroll={{ y: window.innerHeight - 380 }}
                        size="small"
                        rowKey={'materialId'}
                        pagination={{
                            size: 'small',
                            className: 'jusda-pagination',
                            showSizeChanger: 'showSizeChanger',
                            showQuickJumper: 'showQuickJumper',
                            ...paginations,
                            showTotal() {
                                return `${formatMessage({ id: 'total' })} ${
                                    paginations.total
                                } ${formatMessage({ id: 'strip' })}`;
                            },
                        }}
                        toolBarRender={() => [
                            <Button
                                key="buttonKey"
                                loading={exportLoading}
                                disabled={exportLoading}
                                onClick={handleDownloadExcel}
                                className={styles.downloadContainer}
                                style={{
                                    height: '24px',
                                    lineHeight: '12px',
                                }}
                                icon={<DownloadOutlined />}
                            >
                                {!exportLoading && (
                                    <i
                                        className={`${styles.iconContainer} operation operation-download`}
                                    />
                                )}
                                <span
                                    style={{
                                        marginLeft: exportLoading ? 0 : 6,
                                    }}
                                >
                                    {formatMessage({ id: 'Export list' })}
                                </span>
                            </Button>,
                        ]}
                        propColumnsStateValue={propColumnsStateValue()}
                    />
                </div>
            </div>
        </>
    );
};
export default Index;
