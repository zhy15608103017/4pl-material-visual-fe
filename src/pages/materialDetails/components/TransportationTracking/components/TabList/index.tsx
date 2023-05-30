import React from 'react';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';
import IconFont from '@/components/IconFont';
import { Tooltip } from 'antd';
import { useIntl } from 'umi';
import dayjs from 'dayjs';
import Milestones from '../Milestones';
type Props = {
    listData: any;
    totalElements: number;
};

export default function index({ listData = {}, totalElements }: Props) {
    const format = useIntl().formatMessage;

    const orderDetails = [
        {
            name: format({ id: 'list.body.Qty' }),
            code: 'quantity',
        },
        {
            name: format({ id: 'list.body.LSP' }),
            code: 'lspName',
        },
        {
            name: format({ id: 'list.body.Consignee' }),
            code: 'consigneeCompanyName',
        },
        {
            name: format({ id: 'list.body.Shipper' }),
            code: 'consignorCompanyName',
        },
    ];
    // 跳转到4pl详情页
    const jump4plShippingTrackingDetails = (jumpUrl: string) => {
        window.open(jumpUrl);
    };

    return (
        <div className={styles.wayBodyGroup}>
            {listData.length > 0
                ? listData.map((item: any, idx: number) => (
                      <div className={`${styles.wayList} way-list`} key={idx}>
                          <div className={styles.wayLeft}>
                              <div className={styles.l_ref}>
                                  <div
                                      className={styles.l_wayno}
                                      onClick={() =>
                                          jump4plShippingTrackingDetails(
                                              item.url,
                                          )
                                      }
                                  >
                                      <Tooltip
                                          placement="bottom"
                                          title={item.shipmentId}
                                      >
                                          {item.shipmentId}
                                      </Tooltip>
                                  </div>
                                  <IconFont
                                      className={styles.icon}
                                      type={`icon${item.transportMode}`}
                                  />
                              </div>
                              {/* 运单详细信息 */}
                              <div className={styles.l_body}>
                                  {orderDetails.map(
                                      (orderitem: any, index: number) => {
                                          return (
                                              <div
                                                  className={styles.l_item}
                                                  key={index}
                                              >
                                                  <Tooltip
                                                      placement="bottom"
                                                      title={orderitem.name}
                                                  >
                                                      <div
                                                          className={
                                                              styles.l_item_tit
                                                          }
                                                      >
                                                          {orderitem.name}
                                                      </div>
                                                  </Tooltip>
                                                  <div
                                                      className={
                                                          styles.l_item_body
                                                      }
                                                  >
                                                      <Tooltip
                                                          placement="bottom"
                                                          title={
                                                              item[
                                                                  orderitem.code
                                                              ]
                                                          }
                                                      >
                                                          {item[orderitem.code]}
                                                      </Tooltip>
                                                  </div>
                                              </div>
                                          );
                                      },
                                  )}
                              </div>
                              {/* 要求出发时间和要求到达时间 */}
                              <div className={styles.l_footer}>
                                  <div className={styles.l_item}>
                                      <Tooltip
                                          placement="bottom"
                                          title={format({
                                              id: 'list.body.Etd',
                                          })}
                                      >
                                          <div className={styles.l_item_tit}>
                                              {format({ id: 'list.body.Etd' })}
                                          </div>
                                      </Tooltip>
                                      <div className={styles.l_item_body}>
                                          {item.requiredTimeOfDeparture &&
                                              dayjs(
                                                  item.requiredTimeOfDeparture,
                                              ).format('YYYY-MM-DD HH:mm:ss')}
                                      </div>
                                  </div>
                                  <div className={styles.l_item}>
                                      <Tooltip
                                          placement="bottom"
                                          title={format({
                                              id: 'list.body.Eta',
                                          })}
                                      >
                                          <div className={styles.l_item_tit}>
                                              {format({ id: 'list.body.Eta' })}
                                          </div>
                                      </Tooltip>
                                      <div className={styles.l_item_body}>
                                          {item.requiredTimeOfArrival &&
                                              dayjs(
                                                  item.requiredTimeOfArrival,
                                              ).format('YYYY-MM-DD HH:mm:ss')}
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <Milestones data={item} id={idx} />
                      </div>
                  ))
                : ''}
            {/* 避免请求加载和树节点加载的时差 */}
            {listData.length > 0 && listData.length !== totalElements ? (
                <div className={styles.seeMoreBlock}>
                    <div className={styles.more_item}>
                        {format({ id: 'list.Button.more' })} <DownOutlined />
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
