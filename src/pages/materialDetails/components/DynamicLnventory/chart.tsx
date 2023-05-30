import * as React from 'react'
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import { useIntl} from "umi"

export default (props: any) => {


 const { formatMessage } = useIntl();
 const planInboundQty=formatMessage({id:"planInboundQty"})
 const planOutboundQty=formatMessage({id:"planOutboundQty"})
 const dynamicInventoryQty=formatMessage({id:"dynamicInventoryQty"})
 const SafetyStock=formatMessage({id:"Safety stock"})

 
    const option = {
        backgroundColor:'#f8f8f8',
        xAxis: {
            type: 'category',
            // data: props.data.map((d: any) => dayjs(d['statisticsDate']).format('MM/DD')),
            data: props.data.map((d: any) => d['statisticsDate']),
        },
        yAxis: {
            type: 'value',
        },
        tooltip:{
            show:true,
            trigger:'item',
        },
        legend:{
            data:[{name:planInboundQty, itemStyle:{ borderWidth:1, borderType:'dashed', borderColor:'#333'}},{name:planOutboundQty, itemStyle:{ borderWidth:1, borderType:'dashed', borderColor:'#333'}},dynamicInventoryQty,SafetyStock],
            top: 20,
            right:20,
        },
        grid:{
            top:60,
            right:30,
            bottom:60,
            left:65,
        },
        dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100,
            //   minValueSpan: 10
            },
            {
              show: true,
              type: 'slider',
              right:60,
              left:60,
              height:20,
              
            //   left:20,
              bottom: 12,
              start: 0,
              end: 100,
            //   minValueSpan: 10
            }
          ],
        series: [
            
            {
                name: 'L',
                type: 'line',
                endLabel:{
                    show:true,
                    formatter:()=>'MIN',
                    color:'#36f',
                    offset:[0,4]
                },
                data: props.data.map((d: any) => d['minSafetyStock']),
                lineStyle: {
                    opacity: 0
                },
                stack: 'confidence-band',
                smooth: true,
                symbol: 'none'
            },
            {
                name: SafetyStock,
                type: 'line',
                endLabel:{
                    show:true,
                    formatter:()=>'MAX',
                    color:'#36f',
                    offset:[0,-4]
                },
                data: props.data.map((d: any) => d['maxSafetyStock'] - d['minSafetyStock']),
                lineStyle: {
                    opacity: 0
                },
                itemStyle:{color:'rgb(178,229,255,1)'},
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgb(178,229,255,1)' },
                        { offset: 1, color: 'rgba(68,209,255,0.19)' },
                    ])
                },
                stack: 'confidence-band',
                smooth: true,
                symbol: 'none'
            },
            {
                name:planInboundQty,
                data: props.data.map((d: any) => {
                    if(!d['planInboundQty']){
                         return {
                            value:d['planInboundQty'],itemStyle:{color:'#789abb', borderWidth:0, borderColor:'#666', borderType:'dashed'}
                          }
                    }
                    return d['planInboundQty']
                }),
                type: 'bar',
                stack: 'plan',
                barWidth:20,
                itemStyle:{color:'#789abb', borderWidth:1, borderColor:'#666', borderType:'dashed'},
            }, 
            {
                name:planOutboundQty,
                data: props.data.map((d: any) => {
                    if(!d['planOutboundQty']){
                         return {
                            value:-d['planOutboundQty'],itemStyle:{color:'#789abb', borderWidth:0, borderColor:'#666', borderType:'dashed'}
                          }
                    }
                    return -d['planOutboundQty']
                }),
                type: 'bar',
                stack: 'plan',
                barWidth:20,
                itemStyle:{color:'rgba(168,125,205,0.5)', borderWidth:1, borderColor:'#666', borderType:'dashed'}
            },
            {
                name:dynamicInventoryQty,
                data: props.data.map((d: any) => {
                    var color = d['dynamicInventoryQty']> d['maxSafetyStock'] ||d['dynamicInventoryQty']< d['minSafetyStock']?'#ff0000':'#fff'
                    return {value:d['dynamicInventoryQty'], symbol: 'circle', symbolSize:10, itemStyle:{color:color, borderColor:'#2a68d4', borderWidth:2}}
                }),
                type: 'line',
                itemStyle:{color:'#2a68d4'},
            },
        ]
    };
    
    return <div style={{width:"100%",overflowY:"auto"}}>
        <ReactEcharts option={option} style={{minHeight:'380px',
        // width:(1360/12)*props.data?.length+"px"
    }
        }/>
    </div>
}