/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react'
import { useIntl, useModel, history } from 'umi';
import { Switch, Modal } from 'antd';
import { ReactComponent as Details } from '@/assets/Details.svg';
import { disabledMatter, enabledMatter } from "@/service/BasicInformationList"
import { History } from '@jusda-tools/jusda-publicmethod';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
type Props = {
  state: boolean,
  id: string,
  materialNo: string
}

export default function Operation({ state, id, materialNo }: Props) {
  const { formatMessage } = useIntl();
  const [chenked, setChenked] = useState(state)
  const { modifyUrl } = useModel('@@qiankunStateFromMaster') || {};
  const { microFrontModifyUrl } = new History({ history, modifyUrl });
  const onchange = (state: boolean, id: string) => {
    if (state) {
      setChenked(state)
      enabledMatter(id)
      return
    }

    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div style={{ position: "relative", top: "-1px", }}>
        <h3 style={{ fontWeight: "bold" }}> {formatMessage({ id: "Deactivate Item" })}:{materialNo}</h3>
        <p style={{ paddingLeft: "37px" }}>{formatMessage({ id: "After deactivation, only the display will be retained on the [Master Data] page." })}</p>

      </div>,
      onOk: function () {
        setChenked(state)
        disabledMatter(id)
      },
      okText: formatMessage({ id: "Ok" }),
      cancelText: formatMessage({ id: "No" })
    })
    // state ?enabledMatter(id):disabledMatter(id)
  }


  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
      <Icon
        component={Details}
        style={{ fontSize: '24px' }}
        onClick={() => {
          microFrontModifyUrl({
            subApplicationPath: `?routePath=/BasicInformationDetails&materialId=${id}`,
          });
        }}
      />
      <Switch checked={chenked} onClick={(e: boolean) => { onchange(e, id) }} checkedChildren={formatMessage({ id: "On" })} unCheckedChildren={formatMessage({ id: "Off" })}></Switch>
    </div>
  )
}