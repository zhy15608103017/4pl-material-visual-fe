import React, { useState, useEffect, FunctionComponent } from 'react';
import { Table, Tooltip } from "antd";
import dayjs from 'dayjs';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { getPurchaseOrderList } from '@/service/materialDetail';
import style from "./index.less"
import { useIntl, useLocation } from 'umi';
import { setThousandsMark } from "@/utils/utils"
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';

interface DataType {
    details: any,
}


const PurChaseOrder: FunctionComponent<DataType> = (props) => {
    const { details } = props;
    const { formatMessage } = useIntl();
    // 采购订单列表页码
    const cfgType = window?.jusdaBaseConfig?.cfgType;
    const [loading, setLoading] = useState(false)
    const [paginations, setPaginations] = useState<any>({
        // total: 50,
        // pageSize: 10,
        // current: 1
    })
    // 采购订单列表数据
    const [tableListData, setTableListData] = useState<any>();
    // 采购订单列表总条数
    const [totalElements, settotalElements] = useState(Number);

    const jumpToDetail = (id: any) => {
        window.open(`https://sccp${cfgType}.jus-link.com/pom/#/poDetails/${id}`)
    }


    const columns: ColumnsType<DataType> = [
        {
            title: () => {
                return formatMessage({ id: "po" })
            },
            // title: formatMessage({ id: "po" }),
            dataIndex: 'poNo',
            align: 'left',
            // width:100,
            ellipsis: true,
            // ellipsis: {
            //     showTitle: true
            // },
            render: (item: any, value: any) => {
                return (<span className={style.poNo} onClick={() => jumpToDetail(value.poId)}>{value.poNo ? value.poNo : "--"}</span>)
            }
        },
        {
            title: () => formatMessage({ id: "VendorPartNo" }),
            dataIndex: 'vendorPartNo',
            align: 'left',
            ellipsis: true,
            // ellipsis: {
            //     showTitle: true
            // },
            render: (item: any, value: any) => {
                return (<span>{value.vendorPartNo ? value.vendorPartNo : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "item" }),
            dataIndex: 'orderLine',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.orderLine ? value.orderLine : '--'}</span>)
            },
        }, {
            title: () => formatMessage({ id: "deliveryDate" }),
            dataIndex: 'deliveryDate',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.deliveryDate ? dayjs(value.deliveryDate).format('YYYY-MM-DD') : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "orderedQTY" }),
            dataIndex: 'orderQty',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.orderQty ? setThousandsMark(value.orderQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "avaShippingQTY" }),
            dataIndex: 'availableShippingQty',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.availableShippingQty ? setThousandsMark(value.availableShippingQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "shipmentQTY" }),
            dataIndex: 'onWayQty',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.onWayQty ? setThousandsMark(value.onWayQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "receivedQTY" }),
            dataIndex: 'receivedQty',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.receivedQty ? setThousandsMark(value.receivedQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "receivedDate" }),
            dataIndex: 'receivedDate',
            align: 'right',
            // ellipsis: {
            //     showTitle: true
            // },
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.receivedDate ? dayjs(value.receivedDate).format('YYYY-MM-DD') : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "openQTY" }),
            dataIndex: 'openQty',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.openQty ? setThousandsMark(value.openQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "retrunQTY" }),
            dataIndex: 'returnQty',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.returnQty ? setThousandsMark(value.returnQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "completionDate" }),
            dataIndex: 'completedDate',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.completedDate ? dayjs(value.completedDate).format('YYYY-MM-DD') : '--'}</span>)
            },
        },
    ];


    // 获取表格数据
    const handleGetPurChaseOrderTableData = (value: any) => {
        setLoading(true)
        if (details.materialNo) {
            getPurchaseOrderList({
                page: value.page - 1,
                size: value.size,
                materialNo: details.materialNo,
            }).then((res: any) => {
                setLoading(false)
                setPaginations({
                    total: res?.data?.totalElements,
                    current: value.page,
                    pageSize: value.size,
                })
                setTableListData(res.data.content);
                settotalElements(res.data.totalElements)
            });
        }
    }


    // 当表格分页排序筛选发生改变的时候
    const onChange: TableProps<DataType>['onChange'] = (pagination) => {
        handleGetPurChaseOrderTableData({
            page: pagination.current,
            size: pagination.pageSize,
        })
    }



    useEffect(() => {
        if (details) {
            handleGetPurChaseOrderTableData({ page: 1, size: 10 })
        }
    }, [details])



    return (
        <div className={style.PurChaseOrder}>
            <ProTable
                columns={columns}
                dataSource={tableListData}
                search={false}
                loading={loading}
                customizeKey="PurChaseOrder"
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
                    // total,
                    ...paginations,
                    // showTotal:{(total) => (`Total ${total} items`)},
                    showTotal() { return (`${formatMessage({ id: "total" })} ${paginations.total} ${formatMessage({ id: "strip" })}`) }
                }}
            />

        </div>
    )
};

export default PurChaseOrder;
