/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { loadMicroApp } from 'qiankun';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { CustomProps } from 'single-spa';
import { MicroAppStateActions } from 'qiankun';

// // loadMicroApp的实例对象
type MicroAppProps = {
  unmount: any;
  mount?: () => Promise<null>;
  update?: ((customProps: CustomProps) => Promise<any>) | undefined;
  getStatus?: () =>
    | 'NOT_LOADED'
    | 'LOADING_SOURCE_CODE'
    | 'NOT_BOOTSTRAPPED'
    | 'BOOTSTRAPPING'
    | 'NOT_MOUNTED'
    | 'MOUNTING'
    | 'MOUNTED'
    | 'UPDATING'
    | 'UNMOUNTING'
    | 'UNLOADING'
    | 'SKIP_BECAUSE_BROKEN'
    | 'LOAD_ERROR';
  loadPromise?: Promise<null>;
  bootstrapPromise?: Promise<null>;
  mountPromise?: Promise<null>;
  unmountPromise?: Promise<null>;
};

export type LoadChildWidgetAppProps<T> = {
  [K in keyof T]: T[K];
} & {
  name?: string;
  entry?: string;
  actions?: MicroAppStateActions;
};

const LoadChildWidgetApp = (props: LoadChildWidgetAppProps<any>): React.ReactElement => {
  const containerRef = React.createRef();
  const [loading, setLoading] = useState(true);
  const [microApp, setMicroApp] = useState<MicroAppProps | null>(null);

  const { name, entry, actions, ...rest } = props;
  useEffect(() => {
    let newMicroApp = null as any;
    if (name && entry) {

      // setLoading(true);
      microApp?.unmount();
      newMicroApp = loadMicroApp(
        {
          name,
          entry,
          container: '#widgetContainer',
          props: { ...rest, actions },
        },
        {
          // sandbox: { strictStyleIsolation: true },
          singular: false,
          autoStart: true,
        },
        {
          // @ts-ignore
          beforeLoad: () => {
            setLoading(true);
          },
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          afterMount: () => {
            setLoading(false);
          },
        },
      );
      setMicroApp(newMicroApp);
    } else {
      setLoading(false);
    }
    return () => newMicroApp?.unmount();
  }, [entry]);

  return (
    <Spin spinning={loading} size="large">
      <div id="widgetContainer" ref={containerRef} />
    </Spin>
  );
};
export default LoadChildWidgetApp;
