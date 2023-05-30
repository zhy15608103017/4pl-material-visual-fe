import React, { useState, useEffect, FunctionComponent } from 'react';
import { Table } from "antd";
import type { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { getPoDeiveryPlanList } from '@/service/materialDetail';
import style from "./index.less"
import { useIntl } from 'umi';
import { setThousandsMark } from "@/utils/utils"
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';

interface DataType {
    details: any,
}


const DeliveryPlan: FunctionComponent<DataType> = (props) => {
    const { details } = props;
    const { formatMessage } = useIntl();
    const [loading, setLoading] = useState(false)
    const [paginations, setPaginations] = useState<any>({
        // total: 50,
        // pageSize: 10,
        // current: 1
    })
    // 交货计划列表数据
    const [tableListData, setTableListData] = useState<any>();
    // 交货计划列表总条数
    const [totalElements, settotalElements] = useState(Number);
    const cfgType = window?.jusdaBaseConfig?.cfgType;
    const jumpToDetail = (id: any) => {
        window.open(`https://sccp${cfgType}.jus-link.com/pom/#/poDetails/${id}`)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: () => formatMessage({ id: "po" }),
            dataIndex: 'poNo',
            // width:40,
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span className={style.poNo} onClick={() => jumpToDetail(value.poId)}>{value.poNo ? value.poNo : "--"}</span>)
            }
        },
        {
            title: () => formatMessage({ id: "VendorPartNo" }),
            dataIndex: 'vendorPartNo',
            align: 'left',
            ellipsis: true,
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
            title: () => formatMessage({ id: "cfmDeliveryDate" }),
            dataIndex: 'confirmDeliveryDate',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.confirmDeliveryDate ? dayjs(value.confirmDeliveryDate).format('YYYY-MM-DD') : '--'}</span>)
            }
        },
        {
            title: () => formatMessage({ id: "cfmDeliveryQTY" }),
            dataIndex: 'confirmDeliveryQty',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.confirmDeliveryQty ? setThousandsMark(value.confirmDeliveryQty) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "cfmStatus" }),
            dataIndex: 'confirmStatus',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.confirmStatus ? formatMessage({ id: `${value.confirmStatus}` }) : formatMessage({ id: "ASSIGNED" })}</span>)
            }
        },
        {
            title: () => formatMessage({ id: "estBookingDate" }),
            dataIndex: 'planBookingDate',
            align: 'right',
            ellipsis: true,
            render: (item: any, value: any) => {
                return <span>{value.planBookingDate ? dayjs(value.planBookingDate).format('YYYY-MM-DD') : "--"}</span>
            }
        }
    ];


    const handleGetDeliberyPlanTableData = (value: any) => {
        setLoading(true)
        if (details.materialNo) {
            getPoDeiveryPlanList({
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
            })
        }
    };


    // 当表格分页排序筛选发生改变的时候
    const onChange: TableProps<DataType>['onChange'] = (pagination) => {
        handleGetDeliberyPlanTableData({
            page: pagination.current,
            size: pagination.pageSize,
        })
    }


    useEffect(() => {
        if (details) {
            handleGetDeliberyPlanTableData({ page: 1, size: 10 })
        }
    }, [details])


    return (
        <div className={style.DeliveryPlan}>
            <ProTable
                columns={columns}
                customizeKey="DeliveryPlan"
                dataSource={tableListData}
                search={false}
                options={{
                    reload: false,
                    density: true,
                }}
                scroll={{ y: window.innerHeight - 380 }}
                loading={loading}
                toolBarRender={false}
                onChange={onChange}
                pagination={{
                    // size: "small",
                    ...paginations,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal() { return (`${formatMessage({ id: "total" })} ${totalElements} ${formatMessage({ id: "strip" })}`) }
                }}
                size="small"
                resizable={true}
            />
        </div>
    )

};

export default DeliveryPlan;
