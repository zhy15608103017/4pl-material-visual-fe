/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
/* eslint-disable no-sparse-arrays */
import { setLocale, getLocale } from 'umi';
import dayjs from 'dayjs';
// @ts-ignore
import currentLanguage from '@jusda-tools/language-control-panel/src/currentLanguage.js';
import { ColumnsType } from 'antd/lib/table/interface';
import * as ExcelJs from 'exceljs';
// import {generateHeaders, saveWorkbook} from "../utils";
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import _ from 'lodash';
const LANGUAGES = ['zh-CN', 'en-US'];
export function getFileName({ fileName }: { fileName: string }) {
    return `${fileName} ${dayjs().format('YYYYMMDDHHmmss')}.xlsx`;
}
export function setLanguage(local: string) {
    if (LANGUAGES.includes(local)) {
        setLocale(local, true);
    } else {
        setLocale('en-US', true);
    }
}

type LocaleType = 'en-US' | 'zh-CN';

export function getLanguage(): LocaleType {
    const domainLang = currentLanguage();
    if (LANGUAGES.includes(domainLang)) {
        return domainLang;
    }
    return getLocale();
}

export function initLanguage(): void {
    setLanguage(getLanguage());
}

export const passwordReg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[_,./?<>:"|';}\-{\[\]=+~!@#$%^&*()`\\])[0-9a-zA-Z_,./?<>:"|';}\-{\[\]=+~!@#$%^&*()`\\]{8,16}$/;

export function getParameterByName(name: string) {
    // @ts-ignore
    return (
        decodeURIComponent(
            (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(
                location.href,
            ) || [, ''])[1].replace(/\+/g, '%20'),
        ) || null
    );
}

const saveWorkbook = (workbook: Workbook, fileName: string) => {
    // 导出文件
    workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], { type: '' });
        saveAs(blob, fileName);
    });
};
const DEFAULT_COLUMN_WIDTH = 20;
const generateHeaders = (columns: any[]) => {
    return columns?.map(col => {
        const obj: any = {
            // 显示的 name
            header: col.title,
            // 用于数据匹配的 key
            key: col.dataIndex,
            // 列宽
            width: col.width / 5 || DEFAULT_COLUMN_WIDTH,
        };
        return obj;
    });
};

export function onExportBasicExcel(columns: any, list: any[]) {
    // 创建工作簿
    const workbook = new ExcelJs.Workbook();
    // 添加sheet
    const worksheet = workbook.addWorksheet('demo sheet');
    // 设置 sheet 的默认行高
    worksheet.properties.defaultRowHeight = 20;
    // 设置列
    worksheet.columns = generateHeaders(columns);
    // 添加行
    worksheet.addRows(list);
    // 导出excel
    let time = new Date();
    dayjs(time).format('YYYY-MM-DD');
    saveWorkbook(workbook, 'simple-demo.xlsx');
}

export const isNullString = (text: any) => {
    return text === '' || text === null;
};

// 计算公里
export const transformMileage = (text: any) => {
    if (isNullString(text)) return 0;

    let temp = parseInt(text);
    if (isNaN(temp)) {
        return 0;
    }
    return temp >= 10000 ? (temp / 1000).toFixed(0) : (temp / 1000).toFixed(1);
};

export const unifiedDisplay = (
    value: string | null | undefined | number,
): string | number => {
    return value === '' ? '--' : value ?? '--';
};
// 下划线命名
export const UnderScoreCase = (value: string): string => {
    return _.kebabCase(value).replaceAll('-', '_');
};

// 根据具体某个url参数,获取到对应的值
export function getQueryValue(queryName: string) {
    const reg = new RegExp(`(^|&)${queryName}=([^&]*)(&|$)`, 'i');
    const str = window.location.href;
    const search = str.substr(str.indexOf('?'));
    const r = search.substr(1).match(reg);
    if (r != null) {
        if (r[2].indexOf('?') > 0) {
            const result = r[2].substr(0, r[2].indexOf('?'));
            return unescape(result);
        }
        return unescape(r[2]);
    }
    return null;
}
// 千分位标注
export const setThousandsMark = (num: string|number|undefined|null ):string|number|undefined|null  => {
    if (!num) return num;
    let isNegative=false
    if(num<0){
        isNegative=true
        num= Math.abs(Number(num))
    }
    let str = num.toString(); // 数字转字符串
    let str2 = null;
    // 如果带小数点
    if (str.indexOf('.') !== -1) {
        // 带小数点只须要解决小数点右边的
        const strArr = str.split('.'); // 依据小数点切割字符串
        str = strArr[0]; // 小数点右边
        str2 = strArr[1]; // 小数点左边
        //如12345.678  str=12345，str2=678
    }
    let result = ''; // 后果
    while (str.length > 3) {
        // while循环 字符串长度大于3就得增加千分位
        // 切割法 ，从后往前切割字符串 ⬇️
        result = ',' + str.slice(str.length - 3, str.length) + result;
        // 切割str最初三位，用逗号拼接 比方12345 切割为 ,345
        // 用result接管，并拼接上一次循环失去的result
        str = str.slice(0, str.length - 3); // str字符串剥离下面切割的后三位，比方 12345 剥离成 12
    }

    if (str.length <= 3 && str.length > 0) {
        // 长度小于等于3 且长度大于0，间接拼接到result
        // 为什么能够等于3 因为下面result 拼接时候在后面带上了‘,’
        // 相当于123456 上一步解决完之后 result=',456' str='123'
        result = str + result;
    }
    // 最初判断是否带小数点（str2是小数点左边的数字）
    // 如果带了小数点就拼接小数点左边的str2 ⬇️
    str2 ? (result = result + '.' + str2) : '';
    isNegative ?(result="-"+result) : ' ';
    return result;
};

// 比较时间大小
export function compareTime(timeone: any, timeTwo: any) {
    return (
        new Date(
            dayjs(timeone)
                .format('YYYY-MM-DD HH:mm')
                .replace(/-/g, '/'),
        ) >
        new Date(
            dayjs(timeTwo)
                .format('YYYY-MM-DD HH:mm')
                .replace(/-/g, '/'),
        )
    );
}
