import { getQueryValue } from "@/utils/utils";
import { initGlobalState, MicroAppStateActions } from "qiankun";
 
const MateralId = getQueryValue('materialId');
const initialState = {
    shipmentIn:MateralId,
};
const actions: MicroAppStateActions = initGlobalState(initialState);
 
export default actions;