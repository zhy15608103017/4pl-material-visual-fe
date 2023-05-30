import { setThousandsMark } from '@/utils/utils';
import { useLocation } from '@umijs/max';
import { Carousel, Tooltip } from 'antd';
import css from 'classnames';
import queryString from 'query-string';
import { FunctionComponent } from 'react';
import { useIntl, useModel, history } from 'umi';
import { imgEnum } from './enum';
import style from './index.less';
import { getUrlParams,History } from '@jusda-tools/jusda-publicmethod';
const unifiedDisplay = (
    value: string | null | undefined | number,
): string | number => {
    return value === '' ? '--' : value ?? '--';
};
const unitIsDisplay = (
    value: string | null | undefined | number,
    unit: string,
): string | number => {
    return value ? unit : value === 0 ? unit : '';
};
let img = require('@/assets/NoPictureYet.png');
const matchPicture = (ProductNo: string) => {
    const keyarr = Object.keys(imgEnum);
    const state = keyarr.find((item) => {
        return item === ProductNo;
    });
    return state ? imgEnum[state] : img;
};
const isSize = (ProductNo: string) => {
    const keyarr = Object.keys(imgEnum);
    const state = keyarr.find((item) => {
        return item === ProductNo;
    });
    return state;
};
interface DataType {
    details: any;
}
const MaterialInformation: FunctionComponent<DataType> = (props) => {
    const { urlParams, modifyUrl } = useModel('@@qiankunStateFromMaster') || {};
    const { microFrontModifyUrl } = new History({ history, modifyUrl });
    const { details } = props;
    const { formatMessage } = useIntl();
    const location = useLocation() as any;
    const newUrlParams: {
        individualAccessPath: string;
        [propName: string]: string;
      } = getUrlParams(urlParams);
    const query = queryString.parse(location.search);

    return (
        <div className={style.box}>
            <p className={style.tltie}>
                <Tooltip
                    title={`${unifiedDisplay(details?.materialNo)}`}
                    placement="bottomLeft"
                >
                    {unifiedDisplay(details?.materialNo)}
                </Tooltip>
            </p>
            <div className={style.imgbox}>
                <Carousel autoplay={true}>
                    <div className={style.img}>
                        <div className={style.imgs}>
                            <img
                                src={`${matchPicture(details?.materialNo)}`}
                                style={{
                                    width: isSize(details?.materialNo)
                                        ? '138px'
                                        : '80px',
                                    height: isSize(details?.materialNo)
                                        ? '138px'
                                        : '80px',
                                }}
                            ></img>
                        </div>
                    </div>
                </Carousel>
                <div className={style.buttom}>
                    <Tooltip
                        title={`${unifiedDisplay(details?.materialName)}`}
                        placement="bottomLeft"
                    >
                        {unifiedDisplay(details?.materialName)}
                    </Tooltip>
                </div>
            </div>
            <div className={style.top}>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'On-hand Qty' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'On-hand Qty' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${setThousandsMark(
                                unifiedDisplay(details?.onHandQuantity),
                            )}${unitIsDisplay(details?.onHandQuantity, 'PCS')}`}
                            placement="bottomLeft"
                        >
                            {setThousandsMark(
                                unifiedDisplay(details?.onHandQuantity),
                            )}
                            {unitIsDisplay(details?.onHandQuantity, 'PCS')}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'In-Transit Qty' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'In-Transit Qty' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${setThousandsMark(
                                unifiedDisplay(details?.inTransitQuantity),
                            )}${unitIsDisplay(
                                details?.inTransitQuantity,
                                'PCS',
                            )}`}
                            placement="bottomLeft"
                        >
                            {setThousandsMark(
                                unifiedDisplay(details?.inTransitQuantity),
                            )}
                            {unitIsDisplay(details?.inTransitQuantity, 'PCS')}
                        </Tooltip>
                    </div>
                </div>
                {details?.inTransitShipmentQuantity ? (
                    <div
                        className={style.layoutBbox}
                        style={{ marginTop: '-8px' }}
                    >
                        <div className={style.left}></div>
                        <div className={style.right}>
                            (
                            <span
                                className={style.tabs}
                                onClick={() => {
                                    if (details?.inTransitShipmentQuantity) {
                                        microFrontModifyUrl({
                                            subApplicationPath: `?routePath=/materialDetails&SecondaryMenu=4&materialId=${newUrlParams?.materialId}`,
                                        });
                                        // console.log(
                                        //     '%c Line:152 🧀 query.materialId',
                                        //     'color:#ed9ec7',
                                        //     query.materialId,
                                        // );
                                    }
                                }}
                            >
                                <Tooltip
                                    title={`${setThousandsMark(
                                        unifiedDisplay(
                                            details?.inTransitShipmentQuantity,
                                        ),
                                    )}`}
                                    placement="bottomLeft"
                                >
                                    {setThousandsMark(
                                        unifiedDisplay(
                                            details?.inTransitShipmentQuantity,
                                        ),
                                    )}
                                </Tooltip>
                            </span>
                            )单
                        </div>
                    </div>
                ) : (
                    ''
                )}

                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Available Qty' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Available Qty' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${setThousandsMark(
                                unifiedDisplay(details?.availableQuantity),
                            )}${unitIsDisplay(
                                details?.availableQuantity,
                                'PCS',
                            )}`}
                            placement="bottomLeft"
                        >
                            {setThousandsMark(
                                unifiedDisplay(details?.availableQuantity),
                            )}
                            {unitIsDisplay(details?.availableQuantity, 'PCS')}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Open Qty' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Open Qty' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(
                                details?.openQuantity,
                            )}${unitIsDisplay(details?.openQuantity, 'PCS')}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.openQuantity)}
                            {unitIsDisplay(details?.openQuantity, 'PCS')}
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className={style.top} style={{ borderBottom: '0px' }}>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Revision No.' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Revision No.' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.revisionNo)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.revisionNo)}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left} style={{ width: '139px' }}>
                        <Tooltip
                            title={`${formatMessage({
                                id: 'Replace Product  No.',
                            })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Replace Product  No.' })}
                        </Tooltip>
                    </div>
                    <div
                        className={style.right}
                        title={`${unifiedDisplay(
                            details?.substituteMaterialNo,
                        )}`}
                    >
                        <Tooltip
                            title={`${unifiedDisplay(
                                details?.substituteMaterialNo,
                            )}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.substituteMaterialNo)}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Type' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Type' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.materialType)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.materialType)}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Net Weight' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Net Weight' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${setThousandsMark(
                                unifiedDisplay(details?.netWeight),
                            )}${unitIsDisplay(
                                details?.netWeight,
                                details?.netWeightUnit,
                            )}`}
                            placement="bottomLeft"
                        >
                            {setThousandsMark(
                                unifiedDisplay(details?.netWeight),
                            )}
                            {unitIsDisplay(
                                details?.netWeight,
                                details?.netWeightUnit,
                            )}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Net Volume' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Net Volume' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${setThousandsMark(
                                unifiedDisplay(details?.netVolume),
                            )}${unitIsDisplay(
                                details?.netVolume,
                                details?.netVolumeUnit,
                            )}`}
                            placement="bottomLeft"
                        >
                            {setThousandsMark(
                                unifiedDisplay(details?.netVolume),
                            )}
                            {unitIsDisplay(
                                details?.netVolume,
                                details?.netVolumeUnit,
                            )}
                        </Tooltip>
                    </div>
                </div>

                <div className={css(style.layoutBbox, style.borderBottom)}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'UOM' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'UOM' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.unit)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.unit)}
                        </Tooltip>
                    </div>
                </div>

                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'BU' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'BU' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.buName)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.buName)}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Supplier' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Supplier' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.supplierName)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.supplierName)}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left} style={{ width: '110px' }}>
                        <Tooltip
                            title={`${formatMessage({
                                id: 'SupplierPart No.',
                            })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'SupplierPart No.' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(
                                details?.supplierMaterialNo,
                            )}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.supplierMaterialNo)}
                        </Tooltip>
                    </div>
                </div>
                <div className={style.layoutBbox}>
                    <div className={style.left} style={{ width: '90px' }}>
                        <Tooltip
                            title={`${formatMessage({ id: 'Manufacturer' })}`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Manufacturer' })}
                        </Tooltip>
                    </div>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.manufacturer)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.manufacturer)}
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className={style.bottom}>
                <div className={style.bottomLeft}>
                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({
                                id: 'Production',
                            })}:`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Production' })}:
                        </Tooltip>
                    </div>

                    <div className={style.left}>
                        <Tooltip
                            title={`${formatMessage({
                                id: 'End-To-End',
                            })}:`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'End-To-End' })}:
                        </Tooltip>
                    </div>

                    <div className={style.describeLeft}>
                        <Tooltip
                            title={`${formatMessage({
                                id: 'Long Description',
                            })}:`}
                            placement="bottomLeft"
                        >
                            {formatMessage({ id: 'Long Description' })}:
                        </Tooltip>
                    </div>
                </div>
                <div className={style.bottomRight}>
                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(
                                details?.production,
                            )}${formatMessage({ id: 'Week' })}`}
                            placement="bottomLeft"
                        >
                            {`${unifiedDisplay(
                                details?.production,
                            )}${formatMessage({ id: 'Week' })}`}
                        </Tooltip>
                    </div>

                    <div className={style.right}>
                        <Tooltip
                            title={`${unifiedDisplay(
                                details?.endToEnd,
                            )}${formatMessage({ id: 'Week' })}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.endToEnd)}
                            {formatMessage({ id: 'Week' })}
                        </Tooltip>
                    </div>
                    <p className={style.describeRight}>
                        <Tooltip
                            title={`${unifiedDisplay(details?.description)}`}
                            placement="bottomLeft"
                        >
                            {unifiedDisplay(details?.description)}
                        </Tooltip>
                    </p>
                </div>

                <div className={style.DividingLine}> </div>
            </div>
        </div>
    );
};

export default MaterialInformation;
