import React, { useEffect, useState } from 'react';
import { currentLanguage } from '@jusda-tools/language-control-panel';
import style from './index.less';
import { Select } from 'antd';
import TabList from './components/TabList';
import { modeType } from '@/utils/content';
import { upLoadToOss } from '@/service/TransportationTracking';
import { getQueryValue } from '@/utils/utils';
import { useIntl } from 'umi';
// 国际化language
let language = currentLanguage();
type Props = {};

const { Option } = Select;

export default function index({}: Props) {
    const format = useIntl().formatMessage;
    // 是否是第一次加载滚动------滚动的监听一直在进行，请求只是在初始化页面进行滚轮的触发
    const [isSoroll, setisSoroll] = useState(true);
    // 运输追踪列表页数据变量
    const [listData, setlistData] = useState<any>();
    // 存储当前请求的page页码参数
    const [pageNumber, setpageNumber] = useState(0);
    // 存储运输追踪列表页的总条数
    const [totalElements, settotalElements] = useState(Number);
    const [checkedModeTypeCheck, setcheckedModeTypeCheck] = useState<any>(null);

    // 运输模式选项变化时函数
    const modeTransportSelectChange = (value: string) => {
        setisSoroll(true);
        setpageNumber(0);
        setcheckedModeTypeCheck(value);
    };

    // 当数据少于等于三条的时候，滚轮滚动得时候动态初始化加载数据
    const scrollLoadingData = (e: any) => {
        // 滚轮向下滚动的时候加载数据&数据小于等于3条时
        const dataLength = listData.length;
        if (e.deltaY > 0 && dataLength >= 3) {
            setisSoroll(false);
        }
    };

    // 滚动到底部加载数据
    const scrollBarToLoadData = () => {
        const scrollDOM = document.getElementsByClassName(
            'listbodyscrollwapper',
        )[0];
        //滚动条的长度
        const scrollBarAreaHeight =
            Number(scrollDOM.scrollHeight) - Number(scrollDOM.clientHeight);
        const domScrollTopHeight = Number(scrollDOM.scrollTop);
        const isShowAllData = Boolean(totalElements == listData.length);
        if (scrollBarAreaHeight == domScrollTopHeight && !isShowAllData) {
            getTackListData();
        }
    };

    // 获取运输追踪列表数据
    const getTackListData = () => {
        const MateralId = getQueryValue('materialId');
        upLoadToOss({
            page: pageNumber,
            size: 3,
            materialIdEq: MateralId,
            transportModeEq: checkedModeTypeCheck,
        }).then((res: any) => {
            setpageNumber(res.data.number + 1);
            settotalElements(res.data.totalElements);
            setlistData((lastvalue: any) => {
                if (lastvalue && pageNumber != 0) {
                    return [...listData, ...res.data.content];
                } else {
                    return res.data.content;
                }
            });
        });
    };

    useEffect(() => {
        // 初始化获取数据
        getTackListData();
    }, [checkedModeTypeCheck, isSoroll]);

    return (
        <div
            onWheel={e => scrollLoadingData(e)}
            onScroll={scrollBarToLoadData}
            className={`${style.Listbody} listbodyscrollwapper`}
        >
            <div className={style.transModaTypeSelect}>
                <span className={style.transSelectLable}>
                    {format({ id: 'list.body.mode' })}
                </span>
                <Select
                    defaultValue="全部"
                    style={{ width: 120 }}
                    onChange={modeTransportSelectChange}
                >
                    {modeType.map((item: any, index: Number) => {
                        return (
                            <Option value={item.code}>
                                {language == 'zh-CN'
                                    ? item.zh
                                    : item.description}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            <div className={style.transNodeListBody}>
                <TabList listData={listData} totalElements={totalElements} />
            </div>
        </div>
    );
}
