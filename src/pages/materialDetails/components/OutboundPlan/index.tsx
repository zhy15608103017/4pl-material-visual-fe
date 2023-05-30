import React, { useState, useEffect, FunctionComponent } from 'react';
import dayjs from 'dayjs';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { getOutboundPlanList } from '@/service/materialDetail';
import { UnderScoreCase } from "@/utils/utils"
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import style from "./index.less"
import { useIntl } from 'umi';
import { setThousandsMark } from "@/utils/utils"
interface DataType {
    details: any,
}


const OutboundPlan: FunctionComponent<DataType> = (props) => {
    const { details } = props;
    const { formatMessage } = useIntl();
    const cfgType = window?.jusdaBaseConfig?.cfgType;
    const [loading, setLoading] = useState(false)
    // 采购订单列表页码
    const [paginations, setPaginations] = useState<any>({
    })
    // 采购订单列表数据
    const [tableListData, setTableListData] = useState<any>();

    const jumpToDetail = (id: any) => {
        window.open(`https://sccp${cfgType}.jus-link.com/mpwc/#/Outbound/detail/${id}`)

    }
    const columns: ColumnsType<DataType> = [
        {
            title: () => formatMessage({ id: "RefrenceNo" }),
            dataIndex: 'referenceNo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span className={style.outboundNo} onClick={() => jumpToDetail(value.outWarehousePlanId)}>{value.referenceNo ? value.referenceNo : '--'}</span>)
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
            // // width:"20%",
            render: (item: any, value: any) => {
                return (<span>{value.warehouseNo ? value.warehouseNo : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "OutboundType" }),
            dataIndex: 'outWarehouseTypeCode',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.outWarehouseTypeCode ? value.outWarehouseTypeCode : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "Invoice" }),
            dataIndex: 'invoiceNo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.invoiceNo ? value.invoiceNo : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "PlannedoutboundQty" }),
            dataIndex: 'planOutWarehouseQty',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.planOutWarehouseQty ? setThousandsMark(value.planOutWarehouseQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "Unit" }),
            dataIndex: 'unit',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.unit ? value.unit : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "Plannedoutboundtime" }),
            dataIndex: 'planOutWarehouseDate',
            align: 'right',
            ellipsis: true,
            sorter: true,
            defaultSortOrder: 'ascend',
            render: (item: any, value: any) => {
                return (<span>{value.planOutWarehouseDate ? dayjs(value.planOutWarehouseDate).format('YYYY-MM-DD   HH:mm ') : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "Expectedarrivaltime" }),
            dataIndex: 'expectArrivalDate',
            align: 'right',
            sorter: true,
            defaultSortOrder: 'ascend',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.expectArrivalDate ? dayjs(value.expectArrivalDate).format('YYYY-MM-DD   HH:mm') : '--'}</span>)
            },
        },
    ];


    // 获取表格数据
    const handleGetOutboundPlanTableData = (value: any) => {
        setLoading(true)
        if (details.materialNo) {
            getOutboundPlanList({
                materialNo: details.materialNo,
                page: value.page - 1,
                size: value.size,
                sort: value.sort,
            }).then((res: any) => {
                setLoading(false)
                if (res.success) {
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
        handleGetOutboundPlanTableData({
            page: pagination.current,
            size: pagination.pageSize,
            sort: sorter.order ? `${UnderScoreCase(sorter.field)},${sorter.order === "descend" ? "desc" : "asc"}` : '',
        })
    }



    useEffect(() => {
        if (details) {
            handleGetOutboundPlanTableData({ page: 1, size: 10 })
        }
    }, [details])



    return (
        <div className={style.PurChaseOrder}>
            <ProTable
                columns={columns}
                customizeKey="OutboundPlan"
                dataSource={tableListData}
                loading={loading}
                search={false}
                scroll={{ y: window.innerHeight - 380 }}
                propColumnsStateValue={
                    { title: { order: 2, disable: true } }
                }
                toolBarRender={false}
                options={{
                    reload: false,
                    density: true,
                }}
                onChange={onChange}
                size="small"
                resizable={true}
                pagination={{
                    // pageSize,
                    size: "small",

                    showSizeChanger: "showSizeChanger",
                    showQuickJumper: "showQuickJumper",
                    // total,
                    ...paginations,
                    // showTotal:{(total) => (`Total ${total} items`)},
                    showTotal() { return (`${formatMessage({ id: "total" })} ${paginations.total} ${formatMessage({ id: "strip" })}`) }
                }}
            />
        </div>
    )
};

export default OutboundPlan;
