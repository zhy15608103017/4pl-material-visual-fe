import React, { ReactElement, useEffect, useState, useMemo } from 'react'
type Props = { namespaceSearchSer: Function, num: number, containerRef: any }
import { debounce } from 'lodash';
/**
 * 需传入一个获取数据的函数，
 * 初始的个数
 * 容器
 */
export default function useSlideRefresh({ namespaceSearchSer, num, containerRef }: Props) {
    const useScroll = (namespaceSearchSe: any, num: number): any => {
        const [listArr, setListArr] = React.useState([]) as any[]
        // const [config, setConfig] = React.useState<ScrollItem>({
        //     pageTotal: 0,
        //     size: num,
        //     data: [],
        //     list: [],
        //     page: 0,
        // })
        let size = num
        let page = 0
        const [loading, setLoading] = React.useState(true)

        useMemo(async () => {
            let arr = await namespaceSearchSe({ page, size })
            size += 3
            setListArr(arr)
        }, [])

        const onChange = () => {
            namespaceSearchSe({ page, size }).then((arr: any) => {
                size += 3
                setListArr(arr)
                // setConfig({
                //     ...config,
                //     // pageTotal: Math.ceil(data?.length / num),
                //     size:config.size + 3,
                // })
            })

        }
        const refresh = async (obj: any) => {
            size = 3
            await onChange()
        }
        // onChange()
        return {
            // ...config,
            loadMore: true,
            loading,
            onChange,
            refresh,
            listArr
        }
    }

    const useOnmousewheel = (scrollDown: { (): void; (): void; (this: Window, ev: Event): any; }, ref: any, loadMore: any, setConfig: any) => {
        const [searchLoading, setSearchLoading] = React.useState(false);
        const runFunc = debounce(() => {
            scrollDown();
            setSearchLoading(false)
        }, 100)

        useEffect(() => {
            let scrollFunc = async function (e: any) {
                e = e || window.event;
                if (e.wheelDelta > 0 && ref.current?.getBoundingClientRect().top === 175) {

                    return
                }
                if (e.wheelDelta) {
                    if (e.wheelDelta < -50) {
                        let windowHeight = document.documentElement.clientHeight;
                        let refScroll = ref.current?.getBoundingClientRect()
                        if (refScroll?.bottom < windowHeight && loadMore) {
                            setSearchLoading(true)
                            runFunc();
                        }
                    }
                }
                else if (e.detail) {
                    if (e.detail < 0) {
                        let windowHeight = document.documentElement.clientHeight;
                        let refScroll = ref.current?.getBoundingClientRect();
                        if (refScroll?.bottom < windowHeight && loadMore) {
                            setSearchLoading(true)
                            runFunc();
                        }
                    }
                }
            }
            //给页面绑定滑轮滚动事件
            if (document.addEventListener) {//firefox
                window.addEventListener('DOMMouseScroll', scrollFunc);
            }
            //滚动滑轮触发scrollFunc方法  //ie 谷歌  
            window.addEventListener('mousewheel', scrollFunc)
            return () => {
                window.removeEventListener('mousewheel', scrollFunc)
                window.removeEventListener('DOMMouseScroll', scrollFunc);
            }
        }, [])

        return [
            searchLoading,
        ]
    }
    const { listArr, loadMore, onChange, refresh } = useScroll(namespaceSearchSer, num)
    const [searchLoading] = useOnmousewheel(onChange, containerRef, loadMore, refresh)
    return[
        listArr,
        searchLoading,
        loadMore
    ]
}