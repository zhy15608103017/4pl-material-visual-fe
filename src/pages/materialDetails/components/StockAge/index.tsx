import { useIntl } from "umi";
import { useState, FunctionComponent, useEffect } from "react";
//@ts-ignore
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
import type { TableProps } from 'antd/es/table';
import { getStockAge } from '@/service/materialDetail';
import style from "./index.less";
import { setThousandsMark, UnderScoreCase } from "@/utils/utils"
import dayjs from "dayjs";
interface DataType {
    details: any,
}


const StockAge: FunctionComponent<DataType> = (props) => {
    const { details } = props;
    const { formatMessage } = useIntl();
    const [loading, setLoading] = useState(false)
    const [paginations, setPaginations] = useState<any>({
    })
    const [tableListData, setTableListData] = useState<any>();
    // 获取表格数据
    const handleGetStockAgeTableData = (value: any) => {
        setLoading(true)
        if (details.materialNo) {
            getStockAge({
                materialNo: details.materialNo,
                // materialNo: "materialNo-000001",
                page: value.page - 1,
                size: value.size,
                sort: value.sort ? value.sort : 'stock_age,desc',
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

    const columns = [
        {
            title: () => formatMessage({ id: "Warehouse" }),
            dataIndex: 'warehouseName',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.warehouseName ? value.warehouseName : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "WHSENo" }),
            dataIndex: 'WHSENo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.warehouseNo ? value.warehouseNo : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "inStockQty" }),
            dataIndex: 'onHandQuantity',
            align: 'left',
            ellipsis: true,
            sorter: true,
            render: (item: any, value: any) => {
                return (<span>{value.onHandQuantity ? setThousandsMark(value.onHandQuantity) : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "receiptNo" }),
            dataIndex: 'receiptNo',
            align: 'left',
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.receiptNo ? value.receiptNo : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "receivingTime" }),
            dataIndex: 'receivingDateTime',
            align: 'left',
            sorter: true,
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.receivingDateTime ? dayjs(value?.receivingDateTime).format('YYYY-MM-DD   HH:mm ') : '--'}</span>)
            },
        },
        {
            title: () => formatMessage({ id: "stockAge" }),
            dataIndex: 'stockAge',
            align: 'left',
            sorter: true,
            ellipsis: true,
            render: (item: any, value: any) => {
                return (<span>{value.stockAge ? setThousandsMark(value.stockAge) : '--'}</span>)
            },
        },
    ];


    // 当表格分页排序筛选发生改变的时候
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter: any, extra) => {
        handleGetStockAgeTableData({
            page: pagination.current,
            size: pagination.pageSize,
            sort: sorter.order ? `${UnderScoreCase(sorter.field)},${sorter.order === "descend" ? "desc" : "asc"}` : '',
        })
    }


    useEffect(() => {
        if (details) {
            handleGetStockAgeTableData({ page: 1, size: 10 })
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

export default StockAge;