import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { waybillListModelType } from './materialGlobal';


export { waybillListModelType };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {
  global: waybillListModelType;
  loading: Loading;
  settings: ProSettings;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
