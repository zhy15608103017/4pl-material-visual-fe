

import type { ProColumns } from '@ant-design/pro-components';
import { unifiedDisplay } from "@/utils/utils";
import Operation from "./components/Operation"
import dayjs from 'dayjs';
export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};


const GetColumns = (formatMessage: ({ }) => string): ProColumns<TableListItem>[] => {

  const ImgDiv = (url: string): any => {
    return <div style={{
      with: "100px",
      height: "48px",
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",

    }}></div>
  }
  return [
    {
      title: () => formatMessage({ id: 'Product No.' }),
      dataIndex: 'materialNo',
      align: 'left',
      width: 200,
      fixed: 'left',
      ellipsis: true,
      render: (item: any, value: any) => {
        return unifiedDisplay(value.materialNo)
      }
    },
    // {
    //   title: () => formatMessage({ id: 'Photo' }),
    //   dataIndex: 'imageUrl',
    //   align: 'center',
    //   width: 200,
    //   ellipsis: true,
    //   render: (item: any, value: any) => {
    //     return ImgDiv(value.imageUrl)
    //   }
    // },
    {
      title: () => formatMessage({ id: 'Part Name' }),
      dataIndex: 'materialName',
      align: 'left',
      width: 200,
      ellipsis: true,
      render: (item: any, value: any) => {
        return <span >{unifiedDisplay(value.materialName)}</span>
      }
    },
    {
      title: () => formatMessage({ id: 'Part Description' }),
      dataIndex: 'description',
      align: 'left',
      width: 200,
      ellipsis: true,
      render: (item: any, value: any) => {

        return <span>{unifiedDisplay(value.description)}</span>  
      }
    },
    {
      title: () => formatMessage({ id: 'Part Type' }),
      dataIndex: 'materialType',
      align: 'left',
      width: 200,
      ellipsis: true,
      render: (item: any, value: any) => {
        return <span>{unifiedDisplay(value.materialType)}</span>
      }
    },
    {
      title: () => formatMessage({ id: 'Modified By' }),
      dataIndex: 'lastModifiedBy',
      align: 'left',
      width: 200,
      ellipsis: true,
      render: (item: any, value: any) => {
        return <span>{unifiedDisplay(value?.audit?.lastModifiedBy)} </span>
      }
    },
    {
      title: () => formatMessage({ id: 'Modification Time' }),
      dataIndex: 'lastModifiedTime',
      align: 'left',
      width: 200,
      sorter: true,
      ellipsis: true,
      render: (item: any, value: any) => {
        return <span>{value?.audit?.lastModifiedTime ? dayjs(value?.audit?.lastModifiedTime).format('YYYY-MM-DD   HH:mm ') : "--"}</span>
      }
    },
    {
      title: () => formatMessage({ id: 'Operation' }),
      dataIndex: 'enable',
      align: 'center',
      ellipsis: true,
      width: 100,
      render: (item: any, value: any) => {

        return <Operation state={value.enable} id={value.id} materialNo={value.materialNo} ></Operation>
      }
    },

  ];
}

export default GetColumns