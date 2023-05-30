import { currentLanguage } from '@jusda-tools/language-control-panel';
import UniFieldUpload from '@jusda-tools/unified-upload';
import {UniFiledUploadRef} from '@jusda-tools/unified-upload/types/UniFieldUpload/types';
import { InitUpload } from '@jusda-tools/jusda-file-upload';
import { Button, Modal,message, } from 'antd';
import { ButtonType } from 'antd/lib/button';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'umi';
import { Errorsvg, Importsvg, Successsvg } from './svgIcon';
import  {useCallback }from "react"
type UploadStatus = 'default' | 'uploading' | 'success' | 'error';

type Data={data:{
    status:'CREATED'|"FAULT"|"EXCEPTION"|'SUCCESS',
    data:string
},success:boolean}
type uploadFileRequestData={data:string,success:boolean}
type upLoadType = {
    uploadFileRequest?:  (parma?:{
        ossFileId:string
    })=>Promise<uploadFileRequestData>;
    uploadProcessRequest?: (taskId:string)=>Promise<Data>;
    downloadTemplateName?: string;
    uploadModalTitle?: string;
    uploadModalIntroduce?: string;
    updateTableData?: ()=>void;
    btnType?: ButtonType;
    uploadBtnText?: string;
    maxSize?:number,
};

const Upload = ({
    uploadBtnText = '上传',
    uploadFileRequest = () => Promise.resolve({
        success:true,
        data:""
    }),
    uploadProcessRequest,
    // downloadTemplateUrlByOss,
    updateTableData,
    downloadTemplateName = 'Template.xlsx',
    uploadModalTitle = '',
    uploadModalIntroduce = '',
    btnType,
    maxSize= 1024 * 1024 * 1
}: upLoadType) => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [downLoading, setDownLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('default');
    const [fileId, setFileId] = useState('');
    const [erroeFileId,serErroeFileId]=useState("")
    const [progressPercent, setProgressPercent] = useState(0);
    const { formatMessage } = useIntl();
    const uploadRef = useRef<UniFiledUploadRef>();
    const intervalRef = useRef<NodeJS.Timeout | null>();
    const language = currentLanguage();
    const [resultState, setResultState] = useState(false);
    // 下载模板
    const getFileBlob = (url:string):Promise<Blob>=> {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
            };
            xhr.send();
        });
    };

    const saveAsFile = (blob:Blob ,resolve:()=>void) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = downloadTemplateName;
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        resolve()
    };

    const loadFileWithName = (url:string) => {
    
    return new Promise<void>((resolve) => {
        getFileBlob(url).then((blob:Blob) => {
            saveAsFile(blob,resolve);
        });
    })
    };
    const downloadTemplate = async () => {
        setDownLoading(true);
        const {cfgType}=window?.jusdaBaseConfig
      await  loadFileWithName(
            `https://oss${cfgType}.jus-link.com/4pl-visual/material/share-folder/%E7%89%A9%E6%96%99%E4%BF%A1%E6%81%AF%26%E5%BA%93%E5%AD%98%E4%BF%A1%E6%81%AF%E5%AD%97%E6%AE%B520220712.xlsx`,);
       setDownLoading(false);

    };
    //
    // 关闭modal
    const onCancel = () => {

        setFileId('');
        setProgressPercent(0);
        setMessageVisible(false);
    };
    // 关闭结果关闭modal
    const onCancelResult = () => {
        setResultState(false);
    };
    // 清除定時器
    const clearTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
    // 异常
    const catchPublic = () => {
        setUploadLoading(false);
        clearTimer();
    };

    const queryUploadProgress = useCallback((parma:string) => {
        // 轮询接口
        uploadProcessRequest?.(parma)
            .then((data: Data) => {
                if (data.data?.status=== 'CREATED') {
                    return
                }
                  // 解析失败
                if (data.data?.status === 'FAULT') {
 
                    serErroeFileId(data?.data?.data)

                    setUploadStatus('error');
                    clearTimer()
                    return
                }
                // 校验失败
                if (data.data?.status === 'EXCEPTION') {
              

                    message.error(data?.data?.data)
                    clearTimer()
                    setUploadLoading(false);
                    return
                }
               // 数据导入成功
                if (data.data.status==='SUCCESS') {
                    // 根据业务需求来,没有要求可以不用
                    if (updateTableData) updateTableData();

                    setUploadLoading(false);
                    setUploadStatus('success');
                    clearTimer();
                    return
                }
 
            })
            .catch((err: any) => {
                console.warn('err: ', err);
                catchPublic();
            });
        },[])

    // 上传文件
    const uploadFile = (id: string) => {
        const obj = {
            ossFileId: id,
        };
        uploadFileRequest(obj)
            .then((data: uploadFileRequestData) => {
            
     
                if (data.success) {
                        setUploadStatus('uploading');
                    if (uploadProcessRequest) {
                        intervalRef.current = setInterval(() => {
                            return queryUploadProgress(data.data);
                        }, 2000);
                        return
                    }
                } 
                setUploadStatus('uploading');
            })
            .catch(() => {
                catchPublic();
            });
    };
    // 文件变动
    const uploadChange = (row: any) => {
        if (row?.state === 'success') {
            setFileId(row?.url);
        } else {
            setFileId('');
        }
    };
// 开始上传
    const onSubmitUpload = () => {
        uploadFile(fileId);
        setUploadLoading(true);
    };
    // 打开上传
    const openModal = () => {
        uploadRef.current?.setFileData({
            state: 'default',
            file: undefined,
            url: undefined,
            name: undefined,
            errorMsgList: [],
            errorText: undefined,
        });
        setMessageVisible(true);
    };
    // 文件上传失败,拿到失败id,下载失败原因
    const downloadErrorFile=()=>{
        const initUpload = new InitUpload();
        initUpload.initFileDownloadFn(erroeFileId,"import_error")

    }
    useEffect(() => {
        if (uploadStatus === 'success' || uploadStatus === 'error') {
            onCancel();
            setResultState(true);
        }
    }, [uploadStatus]);

    return (
        <>
            <Button
                style={{ display: 'flex' }}
                size="small"
                onClick={openModal}
                icon={<Importsvg style={{ marginRight: '4px' }}></Importsvg>}
                type={btnType}
            >
                {uploadBtnText}
            </Button>
            <UniFieldUpload
 
                title={uploadModalTitle}
                locale={language}
                ref={uploadRef}
                onChange={uploadChange}
                visible={messageVisible}
                onCancel={onCancel}
                onSubmit={onSubmitUpload}
                accept=".xls,.xlsx"
                modalProps={{ focusTriggerAfterClose: false }}
                isShowProgress={!!progressPercent}
                submitButtonLoading={uploadLoading}
                uploadDescribe={uploadModalIntroduce}
                templateButtonLoading={downLoading}
                maxSize = {maxSize}
                templateButtonClick={downloadTemplate}
                progressProps={{
                    percent: progressPercent,
                    status: 'active',
                    strokeColor: '#ffc500',
                }}
                ossParams={{
                    // systemName: 'po-manager',
                    // bucketName: 'poList/upload',
                    systemName: '4pl-visual',
                    bucketName: 'material/upload',
                }}
            />
            <Modal
                open={resultState}
                title={uploadModalTitle}
                width={600}
                centered={true}
                footer={null}
                focusTriggerAfterClose={false}
                onCancel={onCancelResult}
            >
                {
                    <div
                        style={{
                            width: '100%',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexFlow: 'column',
                        }}
                    >
                        {uploadStatus === 'success' ? (
                            <>
                                {' '}
                                <Successsvg></Successsvg>
                                <h2>上传成功</h2>{' '}
                            </>
                        ) : (
                            <>
                                {' '}
                                <Errorsvg></Errorsvg>
                                <h2>
                                    {formatMessage({
                                        id: 'Failed to upload some data',
                                    })}
                                </h2>
                                <h3>
                                    <span  style={{ color: 'red',cursor: "pointer"}} onClick={downloadErrorFile}>
                                        {formatMessage({
                                            id: 'Click here to view the failure reason.',
                                        })}
                                    </span>
                                </h3>
                            </>
                        )}
                    </div>
                }
            </Modal>
        </>
    );
};

export default Upload;
