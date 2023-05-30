import dayjs from 'dayjs';
import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';
// const path = require('path');
// const SentryCliPlugin = require('@sentry/webpack-plugin');
// const release = dayjs().format('YYYY-MM-DD');
const chainWebpack: any = (config: any, { webpack, env }: any) => {
    config.resolve.alias.delete('antd'); // 解除umi的antd别名配置,让组件和项目能使用不同版本的antd(组件采用Rollup打包时)
    // config.merge({
    //     devtool: env !== 'development' ? 'source-map' : 'eval-source-map',
    //     // output: {
    //     //     filename: '[name].js',
    //     //     path: path.resolve(__dirname, '../build'),
    //     //     sourceMapFilename: '[name].js.map',
    //     // },
    // });
    // env !== 'development' &&
    //     config.plugin('sentry').use(SentryCliPlugin, [
    //         {
    //             release: release, //sentry-tools组件release版本号默认为当前时间(YYYY-MM-DD),这儿应该保持一致
    //             include: path.resolve(__dirname, '../build'),
    //             configFile: path.resolve(__dirname, '../.sentryclirc'),
    //             urlPrefix: '~/materialsvisual/', // 线上path路径
    //         },
    //     ]);
};

export default defineConfig({
    hash: true, // fileName  hash
    // favicon: '', // favicon 地址
    history: {
        type: 'memory', // router memory
    },
    base: '/',
    dva: {},
    antd: {},
    model: {},
    theme, // less 变量,配置主题时使用
    locale: {
        default: 'zh-CN',
        antd: true,
        title: false,
        baseNavigator: true,
        baseSeparator: '-',
    },
    outputPath: './build',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    // ref: https://umijs.org/zh/config/#disableredirecthoist 解决路由重定向失效
    // disableRedirectHoist: true,
    chainWebpack,
    qiankun: {
        slave: {},
    },
    mfsu: false,
    ...routes,
});
