export type dataDictionaryType = {
    code: string;
    description: string;
}[];

export type applicationList = {
    applicationCode: string;
    applicationName: string;
}[];

export type localeType = 'en-US' | 'zh-CN' | 'zh';

export interface waybillListModelType {
    namespace: 'materialGlobal';
    state: any;
    effects: {};
    reducers: {
        // save: any;
        setIsSecondLevel: any;
        setActiveKey: any;
        updataState: any;
    };
}

const materialGlobal: waybillListModelType = {
    namespace: 'materialGlobal',
    state: {
        isSecondLevel: sessionStorage.getItem('setIsSecondLevel'),
        activeKey: sessionStorage.getItem('activeKey') || '1',
    },

    effects: {},
    reducers: {
        setIsSecondLevel(state: any, { payload }: any) {
            return {
                ...state,
                isSecondLevel: payload,
            };
        },
        setActiveKey(state: any, { payload }: any) {
            return {
                ...state,
                activeKey: payload,
            };
        },
        updataState(state: any, { payload }: any) {
            return {
                ...state,
                activeKey: payload.activeKey,
                isSecondLevel: payload.isSecondLevel,
            };
        },
    },
};

export default materialGlobal;
