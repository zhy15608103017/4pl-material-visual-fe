import React, { useRef, FunctionComponent, useState, useEffect } from 'react';
import Chart from './chart'
import { Table, Select, DatePicker, Empty, Spin } from 'antd'
import { setThousandsMark, unifiedDisplay } from "@/utils/utils"
import fetchData, { getWarehouse } from '@/service/DynamicLnventory'
import { cloneDeep } from 'lodash';
import { useIntl } from "umi"
import styles from './index.less';
// antd4只能使用moment等后面升级后替换成day
import moment from 'moment'
import NoDataPng from '@/assets/nodata.png';
interface DataType {
    details: any,
}
const { RangePicker } = DatePicker;
const Index: FunctionComponent<DataType> = ({ details }) => {
    const { formatMessage } = useIntl();
    const minDate = new Date()
    const defaultDate = new Date().setDate(minDate.getDate() + 14)
    const maxDate = new Date().setDate(minDate.getDate() + 59)
    const [loading, setLading] = useState(false)
    const [datePicker, setDatePicker] = useState({
        endTime: defaultDate,
        stareTime: minDate.getTime()
    })
    const [data, setData] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([{
        label: formatMessage({ id: "全部" }), value: "全部"
    }]);
    const [onHandQty, setOnHandQty] = useState<number>()
    const [date, setDate] = useState<Date>()
    const [warehouse, setWarehouse] = useState<string>("全部");
    const getData = async (parms: {
        materialNo: string,
        startTime: number,
        endTime: number,
        warehouseNoEq?: string
    }) => {
        setLading(true)
        let ress = await fetchData({
            materialNo: parms.materialNo,
            startTime: moment(new Date(parms.startTime).toLocaleDateString()).valueOf(),
            endTime: moment(new Date(new Date(parms.endTime).setDate(new Date(parms.endTime).getDate() + 1)).toLocaleDateString()).valueOf(),
            warehouseNoEq: parms.warehouseNoEq
        })
        if (ress.success) {
            let datas = ress?.data?.dynamicInventories.map((i: any, index: number) => {
                return {
                    // statisticsDate: moment(i["日期"]).format('MM/DD'),
                    statisticsDate: i["statisticsDate"],
                    dynamicInventoryQty: i["dynamicInventoryQty"],
                    planInboundQty: i["planInWarehouseQty"],
                    planOutboundQty: i["planOutWarehouseQty"],
                    maxSafetyStock: i["maxSafetyStock"],
                    minSafetyStock: i["minSafetyStock"]
                }
            })

            setData(datas)
            setOnHandQty(ress?.data?.onHandQty)
            setDate(ress?.data?.dataRefreshedDate)
        }
        setLading(false)
        return
    }
    const load = async () => {
        await getData({
            materialNo: details.materialNo,
            startTime: datePicker.stareTime,
            endTime: datePicker.endTime,
        })
        const res = await getWarehouse(details.materialNo)
        if (res.success) {
            const Warehouses = res?.data.map((i) => {
                return {
                    label: i.warehouseName,
                    value: i.warehouseNo,
                }

            })

            setOptions([{
                label: formatMessage({ id: "全部" }),
                value: "全部"
            },
            ...Warehouses])
        }

    }

    const onChange = (val: any) => {
        getData({
            materialNo: details.materialNo,
            startTime: datePicker.stareTime,
            endTime: datePicker.endTime,
            warehouseNoEq: val
        })
        setWarehouse(val)
    }
    const QueryForm = (props: any) => {
        return <>
            <div className={styles.form}>

                <div >

                    <label htmlFor="wh">{formatMessage({ id: "Warehouse" })}</label>

                    <Select
                        id='wh'
                        style={{ width: 120, marginRight: "16px" }}
                        defaultValue={warehouse}
                        onChange={onChange}
                        options={options}
                        className={styles.select}
                    />
                </div>
                <div>
                    <label >{formatMessage({ id: "statisticsDate" })}</label>
                    <RangePicker allowClear={false} disabledDate={(currentDate: any) => {


                        return moment(currentDate).add(1, "days") < moment(minDate) || moment(currentDate) > moment(maxDate)
                    }} onChange={(i) => {
                        getData({
                            materialNo: details.materialNo,
                            startTime: Array.isArray(i) ? i[0]?.valueOf() as number : maxDate,
                            endTime: Array.isArray(i) ? i[1]?.valueOf() as number : maxDate,
                            warehouseNoEq: warehouse
                        })
                        setDatePicker({
                            endTime: Array.isArray(i) ? i[1]?.valueOf() as number : maxDate,
                            stareTime: Array.isArray(i) ? i[0]?.valueOf() as number : maxDate
                        })


                    }} defaultValue={[moment(moment(datePicker.stareTime).format("YYYY/MM/DD"), "YYYY-MM-DD"), moment(moment(datePicker.endTime).format("YYYY/MM/DD"), "YYYY-MM-DD")]} />
                </div>


                {/* <Button htmlType="button" href={`https://${window.location.host}/dynamic-inventory-micro-app/juslink动态库存.xlsx`} icon={<DownloadOutlined />}> 导出(天) </Button> */}
            </div>
        </>
    }

    const transform = () => {
        if (data.length === 0) return []
        var result = data.reduce((t: any, d: any) => {
            
            const day = d['statisticsDate']
            Object.keys(t).forEach((key) => {
                if(key==="shortageQty")  return
                t[key][day] = d[key]
                // t.shortageQty[day]? "": t.shortageQty[day]=null
                if(key==="dynamicInventoryQty"&&d[key]<0){
                    t[key][day]=0
             
                    t.shortageQty[day]=d[key]
  
       
                  }
             
                  
            })

            
            return t
        }, {
            'planInboundQty': { 'statisticsDate': 'planInboundQty' },
            'planOutboundQty': { 'statisticsDate': 'planOutboundQty' },
            'dynamicInventoryQty': { 'statisticsDate': 'dynamicInventoryQty' },
            "shortageQty":{'statisticsDate': "shortageQty"},
            'minSafetyStock': { 'statisticsDate': 'minSafetyStock' },
            'maxSafetyStock': { 'statisticsDate': 'maxSafetyStock' },
        
            
        })
        result = Object.values(result)
        return result
    }

    useEffect(() => {
        if (details.materialNo) {
            load()
        }

    }, [details]);
    const datasource = transform()
    const fiex = (idnex: number, k: string) => {
        if (idnex === 0) {
            return {
                fixed: 'left',
                width: 140,
                align: 'left',
                title: <span title={String(formatMessage({ id: k }))}>{formatMessage({ id: k })}</span>,
                render: (text: any, record: any, index: any) => {
                    return <span title={String(formatMessage({ id: text }))}>{formatMessage({ id: text })}</span>
                },

            }
        }
        return {}
    }
    const titles = Object.keys(datasource[0] || {})?.map((k, idx) => ({
        title: () => <span title={formatMessage({ id: moment(Number(k)).format('ddd') })}>{moment(Number(k)).format('MM/DD')}</span>, dataIndex: k, key: k, width: 82, align: 'right', ellipsis: { showTitle: false, },
        // fixed: 'left',
        render: (text: any, record: any, index: any) => {
            if (index===3) {
                return <span style={{ color: "red" }} title={String(unifiedDisplay(setThousandsMark(text)))}>{unifiedDisplay(setThousandsMark(text))}</span>
            }
            return <span title={String(unifiedDisplay(setThousandsMark(text)))}>{unifiedDisplay(setThousandsMark(text))}</span>
        },
        ...fiex(idx, k),
    }))

    const chartData = () => {
        return cloneDeep(data).map((i) => {
            return {
                ...i,
                statisticsDate: moment(i["statisticsDate"]).format('MM/DD'),
            }

    })
}
    return <>
    <Spin spinning={loading} >
        <QueryForm />
        {data.length===0?<Empty  description=""  style={{minHeight:'380px',
        boxSizing:"border-box",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
        // width:(1360/12)*props.data?.length+"px"
    }}  image={NoDataPng}/>:<><Chart data={chartData()} />
     
       </>}
           <div className={styles.summary}>
            <div>{formatMessage({ id: "onHandQty" })} ：{unifiedDisplay(setThousandsMark(onHandQty) )}</div>
            <div>{formatMessage({ id: "Data refreshed at" })} ：{date ? moment(date).format("YYYY/MM/DD HH:mm:ss") : "--"}</div>
        </div>
        <Table
            dataSource={datasource}
            columns={titles}
            size={'small'}
            // rowKey='statisticsDate'
            pagination={false}
            scroll={{ x: 200 }}
        />
        </Spin>
    </>;
};

export default Index;
