import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import {
    Button,
    Input,
    Form,
    Select,
    InputNumber,
    DatePicker,
    AutoComplete,
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import { UpOutlined, DownOutlined } from '@/assets/svgIcon';
import css from 'classnames';
import { getDict } from '@/service/global/index';
const { Option } = Select;
const { RangePicker } = DatePicker;
interface SearchFormTypeProp {
    filterOpts: any; //配置form表单
    height?: string; //表单高度
    saveFormData?: any; //提交回调
    onChange?: any;
    option?: any;
    keyFn?:()=>string,
    isCacheReset?:boolean
}
const SearchForm = (prop: SearchFormTypeProp) => {
    const { filterOpts, height = '244px', saveFormData = () => {},keyFn=()=>"" ,isCacheReset=true} = prop;
    const [form] = Form.useForm();
    const { formatMessage } = useIntl();
    const [showAll, setShowAll] = useState(false);
    const showAllBtnsCls = css(styles.more);
    const [optionsDropdown, setOptionsDropdown] = useState<any>([]);
    // const [dropdownData, setDropdownData] = useState<any>();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const onFinish = (values: any) => {
        // eslint-disable-next-line guard-for-in
        for (let i in values) {
            values[i] =  typeof(values[i])=='string'? values[i].trim():values[i];
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isCacheReset&&sessionStorage.setItem(`search form${keyFn()}`, JSON.stringify(values));
        saveFormData(values);
    };

    const getDictList = async (changesV: any) => {
        return await getDict(changesV);
    };
    const onChange = (changesV: any) => {
        // setDropdownData(name);
        if (!changesV) {
            let setOptionsDropdownNew: any = [];
            setOptionsDropdown([...setOptionsDropdownNew]);
            return;
        }
        if (!changesV) return;
        const dictRes = getDictList(changesV);
        dictRes.then(res => {
            let data = res.data.map((item: any) => ({
                value: item.code,
                label: item.code,
                code: item.code,
            }));

            setOptionsDropdown([...data]);
        });
    };
    // 重置
    const onReset = () => {
        form.resetFields();
        // form.setFieldsValue({ createdTimeRange: null });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isCacheReset&&sessionStorage.removeItem(`search form${keyFn()}`);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isCacheReset&&form.submit();
    };
    useEffect(() => {
        form.setFieldsValue(
            JSON.parse(sessionStorage.getItem(`search form${keyFn()}`) || '{}'),
        );
        form.submit();
    }, []);
    return (
        <div className={styles.CollapseContainer}>
            <div
                className={styles.content}
                style={{ height: showAll ? height : '78px' }}
            >
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    className={styles.jusdaSearchConten}
                >
                    <div className={styles.jusdaSearchWrapper}>
                        {filterOpts.map((c: any,index:number) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.jusdaSearchItem}
                                >
                                    {/* input 输入框*/}
                                    {c.type === 'input' && (
                                        <Form.Item
                                            key={c.name}
                                            label={c.label}
                                            name={c.name}
                                            rules={c.rules}
                                        >
                                            <Input
                                                placeholder={
                                                    c.placeholder || ''
                                                }
                                                allowClear
                                            />
                                        </Form.Item>
                                    )}

                                    {/* select 下拉选择框*/}
                                    {c.type === 'select' && (
                                        <Form.Item
                                            key={c.name}
                                            label={c.label}
                                            name={c.name}
                                            rules={c.rules}
                                        >
                                            <Select
                                                allowClear={true}
                                                placeholder={
                                                    c.placeholder || ''
                                                }
                                            >
                                                {c.options?.map((item: any) => {
                                                    return (
                                                        <Option
                                                            key={item.label}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    )}
                                    {/* 模糊搜索 */}
                                    {c.type === 'dropdown' && (
                                        <Form.Item
                                            key={c.name}
                                            label={c.label}
                                            name={c.name}
                                            rules={c.rules}
                                        >
                                            <AutoComplete
                                                key={c.name}
                                                onChange={v => onChange(v)}
                                                options={optionsDropdown}
                                            />
                                        </Form.Item>
                                    )}
                                    {/* InputNumber 数字输入框*/}
                                    {c.type === 'InputNumber' && (
                                        <InputNumber
                                            min={1}
                                            max={10}
                                            defaultValue={3}
                                            key={c.name}
                                        />
                                    )}
                                    {/* DatePicker 日期选择*/}
                                    {c.type === 'DatePicker' && (
                                        <DatePicker key={c.name} />
                                    )}
                                    {/* DatePicker 日期范围选择*/}
                                    {c.type === 'RangePicker' && (
                                        <Form.Item
                                            key={c.name}
                                            label={c.label}
                                            name={c.name}
                                            rules={c.rules}
                                            initialValue={
                                                c.initialValues && [
                                                    moment(
                                                        c.initialValues[0],
                                                        'YYYY-MM-DD',
                                                    ),
                                                    moment(
                                                        c.initialValues[1],
                                                        'YYYY-MM-DD',
                                                    ),
                                                ]
                                            }
                                        >
                                            <RangePicker
                                                allowClear={true}
                                                format="YYYY-MM-DD "
                                                picker={formatMessage({
                                                    id: 'Start data',
                                                })}
                                            />
                                        </Form.Item>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.jusdaSearchButtonsWrapper}>
                        <Button
                            htmlType="button"
                            onClick={onReset}
                            className={styles.jusdaSearchBtn}
                        >
                            {formatMessage({
                                id: 'Clear',
                            })}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={css(
                                styles.jusdaSearchBtn,
                                styles.jusdaSearchBtnNormal,
                            )}
                        >
                            {formatMessage({
                                id: 'Search',
                            })}
                            {/* Submit */}
                        </Button>
                    </div>
                </Form>
            </div>
            <div
                className={`
                ${showAllBtnsCls}
                `}
                onClick={() => {
                    setShowAll(!showAll);
                }}
            >
                {showAll === false ? <DownOutlined /> : <UpOutlined />}
            </div>
        </div>
    );
};
export default SearchForm;
