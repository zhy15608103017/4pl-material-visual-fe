// const Mock = require('mockjs');

// let arr = ['a', 'b', 'c', 'd', 'e'];
// //可以使用Mock.extend扩展自定义的随机占位符,方便多次调用
// // Mock.Random.extend({
// //     constellations: arr,
// //     //自定义占位符名字为newArr
// //     'milleston': function (date) {
// //         return this.pick(this.constellations, 2, 4);
// //     }
// // })
// let data = Mock.mock({
//     'data|3': [
//         //生成6条数据 数组
//         {
//             'waybillNo|14': '', //属性 waybillNo 是一个5位的随机码
//             'transportMode|1': [
//                 'TPM_ROAD',
//                 'TPM_SEA',
//                 'TPM_AIR',
//                 'TPM_EXPRESS',
//                 'TPM_COMBO',
//                 'TPM_RAIL',
//             ], //属性 transportMode 是数组当中的一个值
//             'quantity|123.6': 1.123, //属性 quantity 生成一个有六位小数的浮点数
//             quantityUnit: 'PCS',
//             lspName: 'JUSDA',
//             consigneeCompanyName: '亚利科技公司',
//             consignorCompanyName: '貝格工業塗料(廣州)有限公司',
//             requiredTimeOfArrival: '@date("yyyy-MM-dd HH:mm:ss")',
//             requiredTimeOfDeparture: '@date("yyyy-MM-dd HH:mm:ss")',
//             'milestones|8': [
//                 {
//                     'id|1-10': 3,
//                     'name|1': [
//                         '已接单',
//                         '已离开提货地',
//                         '已抵始发港',
//                         '已发运',
//                         '已抵达',
//                         '已离开目的港',
//                         '已送达',
//                         '运输已完成',
//                     ],
//                     act: '@date("yyyy-MM-dd HH:mm:ss")',
//                     est: '@date("yyyy-MM-dd HH:mm:ss")',
//                     cutoff: '@date("yyyy-MM-dd HH:mm:ss")',
//                     'code|1': [
//                         'SST_BIN',
//                         'SST_LPP',
//                         'SST_POL',
//                         'SST_VDP',
//                         'SST_VAR',
//                         'SST_LPD',
//                         'SST_CDL',
//                         'SST_BCL',
//                     ],
//                     milestoneType: 'CUSTOM',
//                     'riskLevel|1': ['WARNING', 'ATTENTON', ''],
//                     sequence: 1,
//                 },
//             ],
//             // "shopId|+1": 1,//生成商品id，自增1
//             // "shopMsg": "@ctitle(10)", //生成商品信息，长度为10个汉字
//             // "shopName": "@cname",//生成商品名 ， 都是中国人的名字
//             // "shopTel": /^1(5|3|7|8)[0-9]{9}$/,//生成随机电话号
//             // "shopAddress": "@county(true)", //随机生成地址
//             // "shopStar|1-5": "★", //随机生成1-5个星星
//             // "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
//             // "shopLogo": "@Image('100x40','#c33', '#ffffff','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
//             // "food|2": [ //每个商品中再随机生成2个food
//             //     {
//             //         "foodName": "@cname", //food的名字
//             //         "foodPic": "@Image('100x40','#c33', '#ffffff','小可爱')",//生成随机图片，大小/背景色/字体颜色/文字信息
//             //         "foodPrice|1-100": 20,//生成1-100的随机数
//             //         "aname|2": [
//             //             {
//             //                 "aname": "@cname",
//             //                 "aprice|30-60": 20
//             //             }
//             //         ]
//             //     }
//             // ]
//         },
//     ],
// });
// Mock.mock('/materials/track/query', 'post', () => {
//     //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
//     return data;
// });
