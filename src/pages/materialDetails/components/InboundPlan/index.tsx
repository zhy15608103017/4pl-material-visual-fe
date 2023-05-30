import React, { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'umi';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import { setThousandsMark, UnderScoreCase } from "@/utils/utils"
import { getInBoundPlan } from '@/service/materialDetail';
import style from "./index.less"
import dayjs from 'dayjs';

interface DataType {
    details: any,
}


const InboundPlan: FunctionComponent<DataType> = (props) => {
    const { details } = props;
    const { formatMessage } = useIntl();
    const cfgType = window?.jusdaBaseConfig?.cfgType;
    const [loading, setLoading] = useState(false)
    const [paginations, setPaginations] = useState<any>({
    })
    const [tableListData, setTableListData] = useState<any>();
    const jumpToDetail = (id: any) => {
        window.open(`https://sccp${cfgType}.jus-link.com/mpwc/#/Inbound/detail/${id}`)

    }   

    // 获取表格数据
    const handleGetInboundPlanTableData = (value: any) => {
        setLoading(true)
        if (details.materialNo) {
            getInBoundPlan({
                materialNo: details.materialNo,
                page: value.page - 1,
                size: value.size,
                sort: value.sort,
            }).then((res: any) => {
                setLoading(false);
                if (res.data) {
                    setPaginations({
                        total: res?.data?.totalElements,
                        current: value.page,
                        pageSize: value.size,
                    })
                    setTableListData(res.data.content);
                }
            });
        }
    }


    // 当表格分页排序筛选发生改变的时候
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter: any, extra) => {
        handleGetInboundPlanTableData({
            page: pagination.current,
            size: pagination.pageSize,
            sort: sorter.order ? `${UnderScoreCase(sorter.field)},${sorter.order === "descend" ? "desc" : "asc"}` : '',
        })
    }



    const columns: ColumnsType<DataType> = [
        {
            title: () => formatMessage({ id: "RefrenceNo" }),
            dataIndex: 'referenceNo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span className={style.referenceNo} onClick={() => jumpToDetail(value.inWarehousePlanId)}>{value.referenceNo ? value.referenceNo : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "Warehouse" }),
            dataIndex: 'warehouseName',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.warehouseName ? value.warehouseName : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "WHSENo" }),
            dataIndex: 'warehouseNo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.warehouseNo ? value.warehouseNo : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "InboundType" }),
            dataIndex: 'inWarehouseTypeCode',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.inWarehouseTypeCode ? formatMessage({ id: value.inWarehouseTypeCode }) : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "Invoice" }),
            dataIndex: 'invoiceNo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.invoiceNo ? value.invoiceNo : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "PlannedQty" }),
            dataIndex: 'planInWarehouseQty',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.planInWarehouseQty ? setThousandsMark(value.planInWarehouseQty) : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "Unit" }),
            dataIndex: 'unit',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.unit ? value.unit : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "PlannedInboundTime" }),
            dataIndex: 'planInWarehouseDate',
            align: 'left',
            sorter: true,
            defaultSortOrder: 'ascend',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.planInWarehouseDate ? dayjs(value.planInWarehouseDate).format('YYYY-MM-DD   HH:mm ') : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "InboundETA" }),
            dataIndex: 'expectArrivalDate',
            align: 'left',
            sorter: true,
            defaultSortOrder: 'ascend',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.expectArrivalDate ? dayjs(value.expectArrivalDate).format('YYYY-MM-DD   HH:mm ') : '--'}</span>)
            },
        }
    ];


    useEffect(() => {
        if (details) {
            handleGetInboundPlanTableData({ page: 1, size: 10 })
        }
    }, [details])
    return (
        <div>
            <ProTable
                columns={columns}
                customizeKey="InboundPlan"
                dataSource={tableListData}
                search={false}
                loading={loading}
                propColumnsStateValue={
                    { title: { order: 2, disable: true } }
                }
                scroll={{ y: window.innerHeight - 380 }}
                toolBarRender={false}
                options={{
                    reload: false,
                    density: true,
                }}
                onChange={onChange}
                size="small"
                resizable={true}
                pagination={{
                    size: "small",
                    showSizeChanger: "showSizeChanger",
                    showQuickJumper: "showQuickJumper",
                    ...paginations,
                    showTotal() { return (`${formatMessage({ id: "total" })} ${paginations.total} ${formatMessage({ id: "strip" })}`) }
                }}
            />
        </div>
    )
}

export default InboundPlan;
