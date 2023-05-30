import React from 'react'
import LoadChildWidgetApp from '@/components/LoadChildWidgetApp';
import ErrorBoundaries from '@/components/ErrorBoundaries';
import { useEffect, useState } from 'react';
import WujieReact from "wujie-react";

// const { bus, setupApp, preloadApp, destroyApp } = WujieReact;

import actions from './actions';

const { cfgType } = window.jusdaBaseConfig || {};

export default function MicroFrontEnd() {
  const [config, setConfig] = useState({});
  useEffect(() => {
    setConfig({
      name: 'app2',
      entry: window.jusdaBaseConfig.qiankunUrl,
    });
  }, []);
  return (
    <div >
      {/* <WujieReact
        width="100%"
        height="100%"
        name="xxx"
        url= {window.jusdaBaseConfig.qiankunUrl}
        sync={true}
  
      ></WujieReact> */}
      <ErrorBoundaries>
        <LoadChildWidgetApp actions={actions}  {...config} baseBreadCrumb={[{name:'系统配置'}]}/>
      </ErrorBoundaries>
    </div>
  );
}


