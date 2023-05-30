export default {
    routes: [
        {
            path: '/',
            component: '@/layouts/AppLayout.tsx',
            routes: [
                {
                    path: '/',
                    redirect: '/materialList',
                },
                {
                    path: '/materialList',
                    component: '@/pages/materialList',
                    BreadcrumbList: [{
                        id: "Product List",

                    },]
                },
                {
                    path: '/materialDetails',
                    component: '@/pages/materialDetails',
                    BreadcrumbList: [{
                        id: "Product List",
                        clickPath: "/materialList"
                    }, {

                        id: "Products  Detail"

                    }]

                },
                {
                    path: '/BasicInformationList',
                    component: '@/pages/BasicInformationList',
                    BreadcrumbList: [{
                        id: "masterData",
                    },]
                },
                {
                    path: '/BasicInformationDetails',
                    component: '@/pages/masterDataDetails',

                    BreadcrumbList: [{
                        id: "masterData",
                        clickPath: "/BasicInformationList"
                    }, {
                        id: "viewMaterialData",
                    },]
                },
            ],
        },
    ],
};
