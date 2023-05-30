import { Form, Input, Upload, Button } from 'antd'
import { useEffect, useState } from "react"
// @ts-ignore
import { useIntl, useModel, history } from "umi"
import styles from "./index.less"
import IconFont from '@/components/IconFont';
import { PlusOutlined } from '@ant-design/icons';
import { mastermesage, ordermesage, othermeage } from "./content"
import { getUrlParams, History } from '@jusda-tools/jusda-publicmethod';
import { getmasterData } from "@/service/masterData"
import type { UploadFile } from 'antd/es/upload/interface';

export default function Index({ }: any) {
    const [form] = Form.useForm();
    const { formatMessage } = useIntl();
    const [data, setData] = useState<any>('')
    const { urlParams, modifyUrl } = useModel('@@qiankunStateFromMaster') || {};
    const newUrlParams: {
        individualAccessPath: string;
        [propName: string]: string;
    } = getUrlParams(urlParams);
    const { microFrontModifyUrl } = new History({ history, modifyUrl });
    const [fileList, setFileList] = useState<UploadFile[]>([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);
    let img = require('@/assets/NoPictureYet.png');

    // 获取基础资料
    const handleGetMaterData = () => {
        form.resetFields([])
        getmasterData(newUrlParams.materialId).then(res => {
            if (res.success) {
                const { data } = res
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: data.imageUrl,
                }])
                setData(data)
                form.setFieldsValue({
                    ...data,
                    lengthUnit: `${data.length ? data.length : "--"}   /     ${data.width ? data.width : "--"}   /    ${data.height ? data.height : "--"}`,
                })
            }
        })
    }




    useEffect(() => {
        handleGetMaterData()
    }, [])


    return (
        <div className={styles.content_wapper}>
            <Form
                layout="vertical"
                form={form}
            >
                {/* 基础信息 */}
                <div className={styles.card_wapper} >
                    <div className={styles.title}>
                        <IconFont
                            className={styles.icon}
                            type={`business-export-information`}
                        />
                        {formatMessage({ id: "basicData" })}
                    </div>
                    <div className={styles.mastermesage_card}>
                        <div className={styles.left}>
                            {
                                mastermesage.map((item, index: number) => {
                                    return (
                                        <Form.Item label={`${formatMessage({ id: item.lable })}`} name={item.name}
                                            rules={[{ required: item?.required, message: item?.message }]}
                                            className={`${item.lable == "partDescription" ? styles.descriptionItem : ""}`}
                                        >
                                            <Input readOnly />
                                        </Form.Item>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.right}>
                            <Form.Item name="imageUrl" className={styles.imgbox} >
                                {data?.imageUrl ?
                                    <Upload
                                        disabled
                                        listType="picture-card"
                                        fileList={fileList}
                                    >
                                        {fileList.length >= 1 ? null :
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        }
                                    </Upload>
                                    :
                                    <div className={styles.imgboxWapper}>
                                        <IconFont
                                            className={styles.defaultImg}
                                            type={`other-picture`}
                                        />
                                    </div>
                                }

                            </Form.Item>
                        </div>
                    </div>

                </div>
                {/* 采购信息 */}
                <div className={styles.card_wapper}>
                    <div className={styles.title}>
                        <IconFont
                            className={styles.icon}
                            type={`business-PurchaseOrder`}
                        />
                        {formatMessage({ id: "procurementData" })}
                    </div>
                    <div className={styles.ordermesage_card}>
                        {
                            ordermesage.map((item, index: number) => {
                                return (
                                    <Form.Item label={`${formatMessage({ id: item.lable })}`} name={item.name}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                )
                            })
                        }
                    </div>
                </div>
                {/* 其他信息 */}
                <div className={styles.card_wapper}>
                    <div className={styles.title}>
                        <IconFont
                            className={styles.icon}
                            type={`business-other`}
                        />
                        {formatMessage({ id: "others" })}
                    </div>
                    <div className={styles.othermesage_card}>
                        {
                            othermeage.map((item, index: number) => {
                                return (
                                    <Form.Item label={`${formatMessage({ id: item.lable })}`} name={item.name}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                )
                            })
                        }
                    </div>
                </div>
            </Form >
            <footer className={styles.footer}>
                <Button className={styles.back_button} onClick={() => {
                    microFrontModifyUrl({
                        subApplicationPath: `?routePath=/BasicInformationList`,
                    });
                }}>
                    {formatMessage({ id: "back" })}
                </Button>
            </footer>
        </div >
    )

}

