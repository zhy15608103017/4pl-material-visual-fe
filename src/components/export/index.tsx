import React, { useState, useRef, useEffect } from 'react';
import UniFileUpload from '@jusda-tools/unified-upload';
import type { UniFiledUploadRef } from '@jusda-tools/unified-upload';
type Props = {}
import { Button } from 'antd';
import { useIntl } from 'umi';
export default function index({
    api,
    successOnchange,
    international = 'domestic',
    msg,
    text = '',
    source = 'goodsInfoDomestic',
    templateUrl
}: {
    api: {
        paramsExcel: Function;
        getParamsExcelResult: Function;
    };
    international: 'domestic' | 'international';
    successOnchange: (props: any) => void;
    msg?: any;
    source: 'goodsInfoDomestic' | 'importDomestic' | 'exportDomestic';
    text?: any;
    templateUrl: string
    // shippingMode:
    //     | "TPM_ROAD"
    //     | "TPM_SEA"
    //     | "TPM_RAIL"
    //     | "TPM_AIR"
    //     | "TPM_EXPRESS";
}) {
    const { formatMessage } = useIntl();
    const [uploadData, setUploadData]: any = useState();
    const [uploadVisible, setUploadVisible] = useState(false);
    const uploadRef = useRef<UniFiledUploadRef>({
        fileData: {
            state: 'default',
            name: '',
        },
        setFileData: () => { },
    });
    const uploadChange = (value: any) => {
        setUploadData(value);
    };
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const downloadCargoListTemplate = () => {

        window.location.href = templateUrl;
    };

    const openUpload = () => {
        setUploadVisible(true);
    };
    const closeUploadModal = () => {
        setUploadVisible(false);
    };
    let timer: any = null;
    const onSubmitUpload = () => {
        setSubmitButtonLoading(true);
        // const integer=uploadData.url
        // api.paramsExcel({ id: uploadData.url, shippingMode })
        api.paramsExcel(uploadData.url)
            // api.paramsExcel('4952925301883089000')
            .then((res: { data: string; success: boolean }) => {
                // 文件上传失败
                if (!res?.success) {
                    uploadRef?.current?.setFileData({
                        ...uploadRef.current.fileData,
                        state: 'customError',
                        errorText: formatMessage({
                            id: 'Upload failed',
                        }),
                    });
                    setSubmitButtonLoading(false);
                    return;
                }
                timer = setInterval(() => {
                    api.getParamsExcelResult(res.data).then(
                        async (result: any) => {
                            const resultData: any = result?.data;
                            const { processStat } = resultData;
                            if (processStat === 'WAITING_FOR_PARSE') return;
                            if (processStat === 'PARSE_SUCCESS') {
                                if (resultData?.data?.length > 200) {
                                    uploadRef?.current?.setFileData({
                                        ...uploadRef.current.fileData,
                                        state: 'customError',
                                        errorText: formatMessage({
                                            id: 'Upload failed, the number cannot exceed 200',
                                        }),
                                    });
                                    return;
                                }
                                uploadRef?.current?.setFileData({
                                    state: 'default',
                                    file: {},
                                });
                                await setUploadVisible(false);
                                // 有数据之后会被切换. 造成内存泄漏.放到任务最后进行执行.
                                successOnchange({
                                    result: resultData,
                                    success: true,
                                });
                            }
                            // 解析失败
                            if (processStat === 'PARSE_FAIL') {
                                const errorMsgList =
                                    resultData?.rowErrors || [];
                                uploadRef.current.setFileData({
                                    ...uploadRef.current.fileData,
                                    state: 'customError',
                                    errorText: formatMessage({
                                        id: 'Parsing failed',
                                    }),
                                    errorMsgList: [...errorMsgList],
                                });
                                successOnchange({
                                    result: { data: [] },
                                    success: true,
                                });
                            }
                            // 校验失败
                            if (processStat === 'VERIFY_FAIL') {
                                const errorMsgList =
                                    resultData?.rowErrors || [];
                                uploadRef.current.setFileData({
                                    ...uploadRef.current.fileData,
                                    state: 'parsingFail',
                                    errorText: formatMessage({
                                        id: 'Verification failed',
                                    }),
                                    errorMsgList: [...errorMsgList],
                                });
                                successOnchange({
                                    result: { data: [] },
                                    success: true,
                                });
                            }
                            //数据导入失败
                            if (processStat === 'DATA_IMPORT_FAIL') {
                                uploadRef.current.setFileData({
                                    ...uploadRef.current.fileData,
                                    state: 'customError',
                                    errorText: formatMessage({
                                        id: 'Data import faileds',
                                    }),
                                });
                                successOnchange({
                                    result: { data: [] },
                                    success: true,
                                });
                            }
                            // 数据导入成功
                            if (processStat === 'DATA_IMPORT_SUCCESS') {
                                uploadRef?.current?.setFileData({
                                    state: 'default',
                                    file: {},
                                });
                                await setUploadVisible(false);
                                // 有数据之后会被切换. 造成内存泄漏.放到任务最后进行执行.
                                successOnchange({
                                    result: resultData,
                                    success: true,
                                    processStat: processStat,
                                });
                            }
                            setSubmitButtonLoading(false);
                            clearInterval(timer);
                        },
                    );
                }, 1000);
            })
            .catch(() => {
                setSubmitButtonLoading(false);
            });
    };
    useEffect(() => {
        if (!uploadVisible) {
            //关闭的的时候清除掉之前的信息
            uploadRef?.current?.setFileData({
                state: 'default',
                file: {},
            });
        }
    }, [uploadVisible]);
    return (
        <div><UniFileUpload
            onChange={uploadChange}
            locale={'zh-CN'}
            visible={uploadVisible}
            onCancel={closeUploadModal}
            uploadDescribe="666"
            title={"777"}
            submitButtonLoading={submitButtonLoading}
            onSubmit={onSubmitUpload}
            ref={uploadRef} // 获取设置组件状态的方法.
            ossParams={{
                systemName: 'shipment-demand-app',
                bucketName:
                    'waybill_order/excelParsing/Domestic/CargoInfoList',
            }}
            templateButtonClick={downloadCargoListTemplate}
        /
        >

            <Button onClick={openUpload}>00000</Button></div>
    )
}