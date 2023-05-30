import React from 'react'
import LoadChildWidgetApp from '@/components/LoadChildWidgetApp';
import ErrorBoundaries from '@/components/ErrorBoundaries';
import { useEffect, useState } from 'react';


import actions from './actions';

export default function Tracking(props: any) {
  const [config, setConfig] = useState({});
  useEffect(() => {
    if (props.materialNo) {
      setConfig({
        name: 'app3',
        entry: window.jusdaBaseConfig.trackingUrl,
        materialIdEq: props.materialNo,
      });
    }
  }, [props.materialNo]);


  return (
    <div >
      <ErrorBoundaries>
        <LoadChildWidgetApp actions={actions}  {...config} baseBreadCrumb={[{ name: '系统配置' }]} />
      </ErrorBoundaries>
    </div>
  );
}


