// inbound表格列参数
interface columnsProps {
    formatMessage?: Function; // 国际化
    handleDeleteData?: Function; // 点击删除时触发
    setVisible?: Function; // 控制模态框打开关闭
    modalRef?: any; // 添加了模态框里的form方法
    setCurrentIndex?: Function; // 设置当前打开的是哪一条模态框
    rows?: any;
    handleEditData?: Function; // 修改当前列表数据
    dataSource?: any; // 当前表格的所有数据
    setOutboundQty?: Function; // 设置出库数量的方法
}

// inbound表格参数
interface inboundTableProps {
    handleSubmit: Function;
    setTableParams: Function;
    tableParams: any;
    tableInterface: any;
    loading: boolean; // 表格动画状态
    columns: any;
    currentRowKeys?: any; // 当前表格所需的KEY
}

// inbound搜索部分参数
type searchProps = {
    searchItem: any; // 配置文件
    selectConfigure?: any; // select的配置
    isShowOpen?: boolean; // 是否展示继续展开
    currentTableStatus?: string;
    setTableParams: Function; // 修改页签触发提交
    tableParams: any; // 页签数据
};

// inbound搜索item部分参数
interface searchItemProps {
    label: string;
    name: string;
    type: string;
    disabledKeys?: string[]; // 需要禁用的keys
    selectConfigure: any;
}

// outbound表格参数
interface outboundTableProps {
    handleSubmit: Function;
    setTableParams: Function;
    tableParams: any;
    tableInterface: any;
    loading: boolean; // 表格动画状态
    setDrawerData: Function; // 将值传出去
}
interface SearchFormType {
    type: string; //可选类型：input select InputNumber DatePicker
    key?: string; // 参数key
    onFinishs?: Function; //提交表单回调
    maxLength?: number; //输入框最大可输入长度
    allowClear?: true; // 可以点击清除图标删除内容
    placeholder?: string; // 输入框默认内容
    rules?: any; //表单校验
    dateFormat?: string; //格式化日期
    options?: any[]; // type=select 传入
    selectChange?: Function; // 下拉回调
    label: string; //form-item提示label
    name: string;
    initialValues?: any;
    onChange?: any;
}
export {
    columnsProps, // inbound表格列参数
    inboundTableProps, // inbound表格参数
    searchProps, // inbound搜索部分参数
    searchItemProps, // inbound搜索item部分参数
    outboundTableProps, // outbound表格参数
    SearchFormType,
};
