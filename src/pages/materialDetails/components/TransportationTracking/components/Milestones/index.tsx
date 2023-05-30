import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import AwesomeSwiper from 'react-awesome-swiper';
import { Empty } from 'antd';
import IconFont from '@/components/IconFont';
import { IconCode } from '@/utils/content';
import dayjs from 'dayjs';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { compareTime } from '@/utils/utils';
import styles from './style.less';

export default ({ data, id }: any) => {
    const format = useIntl().formatMessage;
    const { milestones = [], mode } = data;
    const [lastindex, setlastindex] = useState(0);
    const riskLevelArr = ["REMINDER", "WARNING", "PRE_WARNING"]
    let initSilde = 0;
    milestones &&
        milestones.length &&
        milestones.some((item: any, index: number) => {
            if (item.now) {
                initSilde = index;
                return true;
            }
            return false;
        });

    const config = {
        slidesPerView: 'auto',
        initialSlide: initSilde - 3 || 0,
        normalizeSlideIndex: 4,
        navigation: {
            nextEl: '.next' + id,
            prevEl: '.prev' + id,
        },
    };
    const handleSwiper = (e: any) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };



    const handleGetColor = () => {
        let actindex = 0;
        milestones.map((item: any, index: number) => {
            if (item.act) {
                actindex = index+1;
            }
        })
       if(actindex>0){
           setlastindex(actindex)
       }else{
        setlastindex(-1)
       }
    }


    useEffect(() => {
        handleGetColor();
    }, [milestones])




    return (
        <div className={styles.listMiles} id={id}>
            {milestones ? (
                <>
                    <AwesomeSwiper config={config} className={styles.swiperDom}>
                        <div className="swiper-wrapper">
                            {milestones && milestones.length
                                ? milestones.map((item: any, index: number) => (
                                    <div
                                        className={`swiper-slide ${styles.wayBodyItem
                                            }
                                            ${riskLevelArr.includes(item.riskLevel)
                                                ? styles.WARNING
                                                : ""
                                            } 
                                            ${(index+1) <= lastindex  ? styles.Normal : ""
                                            }
                                            `}
                                        key={index}
                                    >
                                        <div className={styles.itemTitle}>
                                            <div className={styles.itemIcon}>
                                                <IconFont
                                                    className={styles.icon}
                                                    type={`${IconCode[
                                                        'SST_BCL'
                                                    ] || 'iconWrong'}`}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.itemBody}>
                                            <div className={styles.status}>
                                                {item.name}
                                            </div>
                                            {data.modeCode !==
                                                'TPM_EXPRESS' ? (
                                                <div
                                                    className={
                                                        item.est
                                                            ? null
                                                            : styles.est
                                                    }
                                                >
                                                    {/* 陆运的时候 Est 改为Req */}
                                                    {item.est
                                                        ? `${format({
                                                            id:
                                                                data.modeCode ===
                                                                    'TPM_ROAD'
                                                                    ? 'list.body.Req'
                                                                    : 'list.body.Est',
                                                        })}: ${dayjs(
                                                            item.est,
                                                        ).format(
                                                            'YYYY-MM-DD HH:mm',
                                                        )}`
                                                        : ''}
                                                </div>
                                            ) : null}
                                            {data.modeCode ===
                                                'TPM_EXPRESS' ? (
                                                item.act
                                            ) : (
                                                <div
                                                    className={`
                                                ${styles.act} ${compareTime(
                                                        item.act,
                                                        item.est,
                                                    ) &&
                                                        styles.itemactWarning}`}
                                                >
                                                    {item.act
                                                        ? `${format({
                                                            id:
                                                                'list.body.Act',
                                                        })}: ${dayjs(
                                                            item.act,
                                                        ).format(
                                                            'YYYY-MM-DD HH:mm',
                                                        )}`
                                                        : ''}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                                : null}
                        </div>
                    </AwesomeSwiper>
                    <LeftCircleFilled
                        className={`${styles.swiperPrev} ${'prev' + id}`}
                        onClick={handleSwiper}
                    />
                    <RightCircleFilled
                        className={`${styles.swiperNext} ${'next' + id}`}
                        onClick={handleSwiper}
                    />
                </>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>
    );
};
