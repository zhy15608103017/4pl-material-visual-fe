import React from 'react'
import type {ProColumns} from '@ant-design/pro-components';
import {unifiedDisplay,setThousandsMark} from "@/utils/utils"
export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const getColumns = (formatMessage: Function, Operation: Function): ProColumns<TableListItem>[] => {
  return [
    {
      title: ()=>formatMessage({ id: 'Product No.' }),
      dataIndex: 'materialNo',
      align: 'left',
      width: 200,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.materialNo)
      }
    },
    {
      title: ()=>formatMessage({ id: 'Description' }),
      dataIndex: 'materialName',
      width: 250,
      ellipsis: true,
      render: (item: any,value:any) => {
        return <span title={String(unifiedDisplay(value.materialName))}>{unifiedDisplay(value.materialName)}</span>
      }
    },
    {
      title: ()=>formatMessage({ id: 'Type' }),
      dataIndex: 'materialType',
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return <span title={String(unifiedDisplay(value.materialType))}>{unifiedDisplay(value.materialType)}</span>
      }
    },
    {
      title: ()=>formatMessage({ id: 'Supplier' }),
      dataIndex: 'supplierName',
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.supplierName)
      }
    },
    {
      title: ()=>formatMessage({ id: 'Open Qty' }),
      dataIndex: 'openQuantity',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.openQuantity)
      }
    },
    {
      title: ()=>formatMessage({ id: 'In-Transit Qty' }),
      dataIndex: 'inTransitQuantity',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
      return <span>{setThousandsMark(unifiedDisplay(value.inTransitQuantity))}</span>
      }
    },
    {
      title: ()=>formatMessage({ id: 'On-hand Qty' }),
      dataIndex: 'onHandQuantity',
      // defaultSortOrder: 'ascend',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return<span style={{display:"inline-block",width:"100%"}}>{setThousandsMark( unifiedDisplay(value.onHandQuantity))}</span>
      }
    },

    {
      title: ()=>formatMessage({ id: 'Available Qty' }),
      dataIndex: 'availableQuantity',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return <span>{setThousandsMark(unifiedDisplay(value.availableQuantity))}</span>
      }
    },
    {
      title: ()=>formatMessage({ id: 'Revision No.' }),
      dataIndex: 'revisionNo',
      sorter: true,
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.revisionNo)
      }
    },
    {
      title: ()=>formatMessage({ id: 'Replace Product  No.' }),
      dataIndex: 'substituteMaterialNo',
      sorter: true,
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.substituteMaterialNo)
      }
    },
    {
      title: ()=>formatMessage({ id: 'BU' }),
      dataIndex: 'buName',
      sorter: true,
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.buName)
      }
    },
    {
      title: ()=>formatMessage({ id: 'SupplierPart No.' }),
      dataIndex: 'supplierMaterialNo',
      sorter: true,
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.supplierMaterialNo)
      }
    },
    {
      title: ()=>formatMessage({ id: 'Manufacturer' }),
      dataIndex: 'manufacturer',
      sorter: true,
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.manufacturer)
      }
    },
    {
      title: ()=>formatMessage({ id: 'UOM' }),
      dataIndex: 'unit',
      sorter: true,
      align: 'center',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return unifiedDisplay(value.unit)
      }
    },
    {
      title: ()=>formatMessage({ id: 'Net Volume' }),
      dataIndex: 'netVolume',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return setThousandsMark(unifiedDisplay(value.netVolume))
      }
    },
    {
      title: ()=>formatMessage({ id: 'Net Weight' }),
      dataIndex: 'netWeight',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
      
        return setThousandsMark(unifiedDisplay(value.netWeight)) 
      }
    },
    {
      title: ()=>formatMessage({ id: 'Production' }),
      dataIndex: 'production',
      sorter: true,
      align: 'right',
      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return  setThousandsMark(unifiedDisplay(value.production))
      }
    },
    {
      title: ()=>formatMessage({ id: 'End-To-End' }),
      dataIndex: 'endToEnd',
      sorter: true,
      align: 'right',

      width: 149,
      ellipsis: true,
      render: (item: any,value:any) => {
        return setThousandsMark (unifiedDisplay(value.endToEnd))
      }
    },
    {
      title: ()=>formatMessage({ id: 'Operation' }),
      dataIndex: 'Operation',
      align: 'center',
      ellipsis: true,
      width: 60,
      render: (item: any,value:any) => {
        return  Operation(value?.materialId)
      }
    },

  ];
}

export default getColumns