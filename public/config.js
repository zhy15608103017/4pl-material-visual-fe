window.jusdaBaseConfig = {
    // 部署环境
    cfgType: 'dev',
    // 接口前缀
    baseUrl: `https://mpdev.jus-link.com/api`,
    // clientId: 'juslink_warehouse_ckd',
    clientId: '4pl_material_visual',
    // 接口前缀
    // baseUrl: `https://mpdev.jus-link.com/api`,
    sentry: {
        dsn:
            'https://0f41f171016b4424831339f46285ebd5@sentry-dev.sccpcloud.com/261',
        enable: true,
        ignoreErrors: [
            "ResizeObserver loop limit exceeded"
          ],
    },
    qiankunUrl:"https://sccpdev.jus-link.com/dynamic-inventory-micro-app/",
    trackingUrl:"https://sccpdev.jus-link.com/transport-visual-micro-app/",
};
// window.jusdaBaseConfig = {
//     // 部署环境
//     cfgType: 'sit',
//     // 接口前缀
//     baseUrl: `https://mpsit.jus-link.com/api`,
//     // clientId: 'juslink_warehouse_ckd',
//     clientId: '4pl_material_visual',
//     // 接口前缀`
//     // baseUrl: `https://mpsit.jus-link.com/api`,
//     sentry: {
//         dsn:
//             'https://0f41f171016b4424831339f46285ebd5@sentry-dev.sccpcloud.com/261',
//         enable: true,
//     },
//     qiankunUrl:"https://sccpsit.jus-link.com/pom/basicconfigwidget/?path=shipmentCollaborationConfig",
//     trackingUrl:"https://sccpsit.jus-link.com/transport-visual-micro-app/",

// };

// window.jusdaBaseConfig = {
//     // 部署环境
//     cfgType: 'uat',
//     // 接口前缀
//     baseUrl: `https://mpuat.jus-link.com/api`,
//     // clientId: 'juslink_warehouse_ckd',
//     clientId: '4pl_material_visual',
//     // 接口前缀
//     // baseUrl: `https://mpuat.jus-link.com/api`,
//     sentry: {
//         dsn:
//             'https://0f41f171016b4424831339f46285ebd5@sentry-dev.sccpcloud.com/261',
//         enable: true,
//     },
//     qiankunUrl:"https://sccpuat.jus-link.com/pom/basicconfigwidget/?path=shipmentCollaborationConfig",
//     trackingUrl:"https://sccpsit.jus-link.com/transport-visual-micro-app/",
// };

