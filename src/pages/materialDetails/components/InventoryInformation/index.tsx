import { Table, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { useState, useEffect, FunctionComponent } from 'react';
import { useIntl, useLocation } from "umi"
import { getmaterialInventory } from "@/service/materialList"
import { UnderScoreCase, setThousandsMark, unifiedDisplay } from "@/utils/utils"
import { ProTable } from '@jusda-tools/jusda-pro-table-umi4';
// const Mock = require('mockjs');
import style from "./index.less"
interface DataType {
  key?: React.Key;
  Warehouse?: string;
  "On-hand Qty"?: number;
  "Available Qty"?: number;
  'Planned In'?: number;
  "Planned Out"?: number;
}


interface InDataType {
  details: any
}


const App: FunctionComponent<InDataType> = (props) => {
  const { details } = props;
  const { materialNo } = details;
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false)
  const [sorters, setSorters] = useState<any>({
    sort: 'bu_name,supplier_name,supplier_material_no,manufacturer,warehouse_name,on_hand_quantity,asc'

  })
  const location = useLocation() as any;
  const materialId = location?.query?.materialId
  const [paginations, setPaginations] = useState<any>({
    // total: 50,
    // pageSize: 10,
    // current: 1
  })
  type basic = string | null | undefined | number
  const isNullUndefid = (value1: basic, value2: basic) => {
    let transfer1 = value1 ?? ''
    let transfer2 = value2 ?? ''
    if (transfer1 !== "" && transfer2 !== "") {
      return transfer1 + "-" + transfer2
    } else if (transfer1 === "") {
      return transfer2
    } else {
      return transfer1
    }
    // if(){

    // }
    // return  value ?? '';
  }
  const columns: ColumnsType<DataType> = [
    {
      title: formatMessage({ id: "BU" }),
      dataIndex: 'buName',
      align: 'left',
      sorter: true,
      ellipsis: {
        showTitle: false
      },
      width: 149,
      render: (item: any, value: any) => {
        return <Tooltip placement="bottomLeft" title={unifiedDisplay(value?.buName)}>{unifiedDisplay(value?.buName)}</Tooltip>
      }

    }, {
      title: formatMessage({ id: "Supplier" }),
      dataIndex: 'supplierName',
      align: 'left',
      sorter: true,
      ellipsis: {
        showTitle: false
      },
      width: 149,
      render: (item: any, value: any) => {
        return <Tooltip placement="bottomLeft" title={unifiedDisplay(value?.supplierName)}>{unifiedDisplay(value?.supplierName)}</Tooltip>
      }

    }, {
      title: formatMessage({ id: "SupplierPart No." }),
      dataIndex: 'supplierMaterialNo',
      align: 'left',
      sorter: true,
      ellipsis: {
        showTitle: false
      },
      width: 149,
      render: (item: any, value: any) => {
        return <Tooltip placement="bottomLeft" title={unifiedDisplay(value?.supplierMaterialNo)}>{unifiedDisplay(value?.supplierMaterialNo)}</Tooltip>
      }

    },
    {
      title: formatMessage({ id: "Manufacturer" }),
      dataIndex: 'manufacturer',
      align: 'left',
      sorter: true,
      ellipsis: {
        showTitle: false
      },
      width: 149,
      render: (item: any, value: any) => {
        return <Tooltip placement="bottomLeft" title={unifiedDisplay(value?.manufacturer)}>{unifiedDisplay(value?.manufacturer)}</Tooltip>
      }

    },
    {
      title: formatMessage({ id: "Warehouse" }),
      dataIndex: 'warehouseName',
      align: 'left',
      width: 149,
      sorter: true,
      ellipsis: {
        showTitle: false
      },
      render: (item, value: any) => {
        return <Tooltip placement="bottomLeft" title={isNullUndefid(value.warehouseNo, value.warehouseName)} ><span >{isNullUndefid(value.warehouseNo, value.warehouseName)} </span></Tooltip>
      }
    },
    {
      title: formatMessage({ id: "On-hand Qty" }),
      dataIndex: 'onHandQuantity',
      align: 'right',
      sorter: true,
      ellipsis: true,
      width: 149,
      render: (item: any, value: any) => {
        return <span title={setThousandsMark(unifiedDisplay(value?.onHandQuantity))}>{setThousandsMark(unifiedDisplay(value?.onHandQuantity))}</span>
      }
      // defaultSortOrder: 'ascend',
    },
    {
      title: formatMessage({ id: "Available Qty" }),
      dataIndex: 'availableQuantity',
      align: 'right',
      sorter: true,
      ellipsis: true,
      width: 149,
      render: (item: any, value: any) => {
        return <span title={setThousandsMark(unifiedDisplay(value?.availableQuantity))}>{setThousandsMark(unifiedDisplay(value?.availableQuantity))}</span>
      }

    },
    {
      title: formatMessage({ id: "Planned In" }),
      dataIndex: 'plannedInQuantity',
      align: 'right',
      sorter: true,
      ellipsis: true,
      // width:"20%",
      render: () => "--"
    },
    {
      title: formatMessage({ id: "Planned Out" }),
      dataIndex: 'plannedOutQuantity',
      align: 'right',
      width: 149,
      // ellipsis: true,
      sorter: true,
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 1,
      // },
      render: () => "--"

    },
    // {
    //   title: "",
    //   // dataIndex: 'plannedOutQuantity',
    //   width:40
    //   // align: 'right',
    //   // sorter: true,
    //   // sorter: {
    //   //   compare: (a, b) => a.english - b.english,
    //   //   multiple: 1,
    //   // },
    //   // render: () => "-"

    // },
  ];
  const [data, setData] = useState<DataType[]>([])
  const getData = async (value: any) => {
    setLoading(true)
    let res = await getmaterialInventory({ ...value, materialNo })
    setPaginations({
      total: res?.data?.totalElements,
      current: value.page,
      pageSize: value.size,
    })
    setLoading(false)
    setData(res?.data?.content)
  }
  useEffect(() => {
    getData({
      page: 1,
      size: 10,
      sort: 'bu_name,supplier_name,supplier_material_no,manufacturer,warehouse_name,on_hand_quantity,asc'
    })
  }, [])


  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter: any, extra) => {

    if (sorter?.order) {
      getData({
        page: pagination.current,
        size: pagination.pageSize,
        sort: `${UnderScoreCase(sorter.field)},${sorter?.order?.replace("end", "")}`
      })

    } else {
      getData({
        page: pagination.current,
        size: pagination.pageSize,
        sort: 'bu_name,supplier_name,supplier_material_no,manufacturer,warehouse_name,on_hand_quantity,asc'
      })
    }

  };

  return <div className={style.InventoryInformationBox}><ProTable columns={columns} dataSource={data} onChange={onChange}
    // rowKey={"warehouseNo"}
    loading={loading}
    search={false}
    options={{
      reload: false,
      density: true,
    }}
    resizable={true}
    toolBarRender={false}
    size="small"
    customizeKey="InventoryInformation"
    pagination={{
      // pageSize,
      size: "small",

      showSizeChanger: "showSizeChanger",
      showQuickJumper: "showQuickJumper",
      // total,
      ...paginations,
      // showTotal:{(total) => (`Total ${total} items`)},
      showTotal() { return (`${formatMessage({ id: "total" })} ${paginations.total} ${formatMessage({ id: "strip" })}`) }
    }} /></div>
};

export default App;
