import { createFromIconfontCN } from '@ant-design/icons';

// 因为在使用antd这个方法引用iconfont图标的时候，如果图标有自己的颜色，就没法通过className 修改颜色
// 所以这里暂时使用了两套iconfont的图标，light主要用于多色图标， dark在引用的时候 先删除iconfont.js里面所有的fill属性，确保改图标颜色可修改
export default (props: any) => {
    const path = props.light ? 'light' : 'dark';
    const IconFont = createFromIconfontCN({
        scriptUrl: require(`@/assets/iconfont/${path}/iconfont.js`),
    });
    return <IconFont {...props} />;
};
