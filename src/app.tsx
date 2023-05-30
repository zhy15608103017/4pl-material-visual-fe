//@ts-ignore
import { pageViewAction } from '@jusda-tools/action-decorator';
// import { sentryInit } from '@jusda-tools/sentry-tools';
import {initGlobalPoints,sensors} from "@jusda-tools/buried-point"
import authComponent from '@jusda-tools/auth-component';
import authTools from '@jusda-tools/auth-tools';
// import { getIntl, matchRoutes } from 'umi';
// 引入iconfont
import "@/assets/iconfont/business/iconfont.js";
import "@/assets/iconfont/other/iconfont.js";



const { cfgType } = window?.jusdaBaseConfig || {};
const { AuthLogin, AuthApplication } = authTools;
// sentryInit();
const { getAuthList } = authComponent;
//监听整个页面的 copy 事件
document.addEventListener('copy', function (e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;
    //用户选中文本
    const text = window.getSelection()!.toString();
    if (text) {
        e.preventDefault();
        clipboardData.setData('text/plain', text.trim());
    }
});
export async function render(oldRender: any) {
    // 统一认证鉴权
    await AuthLogin();
    // 跨应用鉴权
    await AuthApplication();
    await getAuthList();
    pageViewAction();
    initGlobalPoints("1111",{open:true,show_log:true,collect_tags:{
        select:true
    }})
    
    oldRender();
}
setTimeout(()=>{
    console.log("guanbi");
    sensors.disableSDK()
  
},10000)
setTimeout(()=>{
    console.log(sensors.getDisabled());
    sensors.enableSDK()
},20000)
export const qiankun = {
    // bootstrap(props: any) {
    //     if (!props && process.env.NODE_ENV !== 'development') {
    //         window.location.href =
    //             `https://${cfgType}.jus-link.com/home/#/?activeKey%3Dmaterials`;
    //     }
    // },
};



// 设置页面路由标签
// export function onRouteChange({ clientRoutes, location }: any) {
//     const { formatMessage } = getIntl();
//     const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
//     if (route) {
//         document.title = formatMessage({ id: 'Product Tracking' });
//     }
// }
