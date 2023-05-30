import React from 'react';
import moment from 'moment';
interface ShowTimeType {
    text: any;
    type?: string;
    mat?: string;
}

const ShowTime: React.FC<ShowTimeType> = ({
    text,
    mat = 'YYYY-MM-DD HH:mm',
    type = '',
}) => {
    if (!text || text == null) {
        return null;
    }
    const textN = typeof text === 'number' ? text : moment(text);
    // const textN = text ? Number(text) : 0;
    if (!textN) {
        return null;
    }
    // 海运类型一般不显示时分
    if (type === 'TPM_SEA') {
        mat = 'YYYY-MM-DD';
    }
    // const hour = moment(moment(textN).format("YYYY-MM-DD HH:mm:ss")).get("hour");
    // const minute = moment(moment(textN).format("YYYY-MM-DD HH:mm:ss")).get(
    //   "minute"
    // );
    // const second = moment(moment(textN).format("YYYY-MM-DD HH:mm:ss")).get(
    //   "second"
    // );
    // if (hour === 0 && minute === 0 && second === 0) {
    //   return (
    //     <React.Fragment>{moment(textN).format("YYYY-MM-DD")}</React.Fragment>
    //   );
    // }
    return <React.Fragment>{moment(textN).format(mat)}</React.Fragment>;
};

export default ShowTime;
