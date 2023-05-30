import { ReactComponent as MaterialList } from '@/assets/MaterialList.svg';

const routes = ({ formatMessage }: { formatMessage: Function }) => [

    {
        name: formatMessage({ id: 'Product List' }),
        icon: MaterialList, //仅支持svg图标
        path: '/materialList',
    },

];

export { routes };
