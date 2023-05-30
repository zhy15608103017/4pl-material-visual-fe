import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import style from "./index.less"
import MaterialInformation from "./components/MaterialInformation"
import InventoryInformation from "./components/InventoryInformation"
import Tracking from "./components/Tracking"
import MicroFrontEnd from "./components/MicroFrontEnd"
import DynamicLnventory from "./components/DynamicLnventory"
import DeliveryPlan from "./components/DeliveryPlan"
import InboundPlan from "./components/InboundPlan";
import PurChaseOrder from "./components/PurChaseOrder"
import { getUrlParams, History } from '@jusda-tools/jusda-publicmethod';
import OutboundPlan from "./components/OutboundPlan"
import StockAge from "./components/StockAge"
import { useIntl, useDispatch, history, useLocation, useModel } from 'umi';
import queryString from 'query-string';
import authComponent from '@jusda-tools/auth-component';
import { getmaterialDetails } from '@/service/materialList';
const { authorized } = authComponent;

const { TabPane } = Tabs;



export default function Index({ }: any) {
  const location = useLocation() as any;
  const { formatMessage } = useIntl();
  const dispatch = useDispatch()
  const [details, setDetails] = useState<any>({});
  const { urlParams, modifyUrl } = useModel('@@qiankunStateFromMaster') || {};
  const { microFrontModifyUrl } = new History({ history, modifyUrl });
  const newUrlParams: {
    individualAccessPath: string;
    [propName: string]: string;
  } = getUrlParams(urlParams);

  const getdetails = async (materialId: any) => {
    let res = await getmaterialDetails(materialId);
    setDetails(res.data);
  };


  const activeKey = newUrlParams?.SecondaryMenu;
  const onChange = (key: string) => {
    microFrontModifyUrl({
      subApplicationPath: `?routePath=/materialDetails&SecondaryMenu=${key}&materialId=${newUrlParams?.materialId}`,
    });
  };


  useEffect(() => {
    getdetails(newUrlParams?.materialId)
  }, [])


  return (
    <div className={style.box}>
      <div className={style.box1} >
        <div className={style.left} ><MaterialInformation details={details} /></div>
        <div className={style.right} >
          <div >
            <Tabs onChange={onChange} destroyInactiveTabPane={true} type="card" activeKey={activeKey} >
              {/* 采购订单 */}
              {authorized("material_visual_purchase_order") ? <TabPane tab={formatMessage({ id: "Purchase" })} key="1">
                <PurChaseOrder details={details} />
              </TabPane> : ""}
              {/* 交货计划 */}
              {authorized("material_visual_delivery_plan") ? <TabPane tab={formatMessage({ id: "Delivery" })} key="2">
                <DeliveryPlan details={details} />
              </TabPane> : ""}
              {/* 入库计划 */}
              {authorized("material_visual_inbound_plan") ? <TabPane tab={formatMessage({ id: "InboundPlan" })} key="8">
                <InboundPlan details={details} />
              </TabPane> : ""}
              {/* 出库计划 */}
              {authorized("material_visual_outbound_plan") ? <TabPane tab={formatMessage({ id: "OutboundPlan" })} key="3">
                <OutboundPlan details={details} />
              </TabPane> : ""}
              {/* 运输追踪 */}
              {authorized("material_visual_shipping") ? <TabPane tab={formatMessage({ id: "Shipping" })} key="4">
                <Tracking materialNo={details?.materialNo} />
              </TabPane> : ''}
              {/* 库存信息 */}
              {authorized("material_visual_inventory") ? <TabPane tab={formatMessage({ id: "Inventory" })} key="5">
                <InventoryInformation details={details}></InventoryInformation>
              </TabPane> : ""}
              {/* 库龄信息 */}
              {authorized("material_visual_stockage") ? <TabPane tab={formatMessage({ id: "stockAgetab" })} key="9">
                <StockAge details={details}></StockAge>
              </TabPane> : ""}
      
              {/* 动态库存*/}
              {authorized("material_visual_dynamic_inventory") ? <TabPane tab={`${formatMessage({ id: "Dynamic inventory" })}`} key="7" >
                <DynamicLnventory details={details} />
              </TabPane> : ""}
                      {/* 动态库存dom */}
                      {authorized("material_visual_dynamic_inventory_dom") ? <TabPane tab={formatMessage({ id: "Dynamic Inventory（Demo）" })} key="6" >
                <MicroFrontEnd />
              </TabPane> : ""}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
