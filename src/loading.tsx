import React from 'react';
import { Space, Spin } from 'antd';
const Loading = () => {
    return <div style={{width:"100%",height:"100%",display:'flex',justifyContent:"center",alignItems:"center"}}> <div style={{width:"80px",height:"80px",}}><Spin size="large" /></div></div>;
};

export default Loading;
