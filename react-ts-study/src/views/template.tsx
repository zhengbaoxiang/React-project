import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, } from 'antd';
import * as echarts from 'echarts'

export default function () {
    let myChart: any = null
    let timer: any

    useEffect(() => {
        console.log('只挂载时触发一次');
        initChart()
        return () => {
            console.log('❌ 清除定时器');
        }
    }, [])
    const btnClick = () => {
        clearInterval(timer)
        myChart.clear()
        getData()
    }

    const initChart = () => {
        myChart = echarts.init(document.getElementById('chartId'))
        getData()
    }

    function getData() {
        let data: any[] = []
        timer = setInterval(() => {
            let value = Math.ceil(Math.random() * 1000)
            data.push(value)
            setTimeout(() => {
                draw(data)
            }, 500);
        }, 2000)

    }
    function draw(data: any[]) {
        const option = {
            grid: [
                {
                    bottom: '60%'
                },
                {
                    top: '60%'
                }
            ],
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 30,
                    end: 100,
                    xAxisIndex: [0, 1]
                },
                {
                    type: 'inside',
                    xAxisIndex: [0, 1]
                },
            ],
            xAxis: [
                {
                    type: 'category'
                },
                {
                    type: 'category',
                    gridIndex: 1
                }
            ],
            yAxis: [
                {},
                {
                    gridIndex: 1
                }
            ],
            series: [
                {
                    type: 'line',
                    data: data
                },
                {
                    type: 'bar',
                    data: data,
                    xAxisIndex: 1,
                    yAxisIndex: 1
                },
            ]

        }
        myChart && myChart.setOption(option)

    }

 


    return (
        <>
            <Button type="primary" onClick={btnClick} >restart</Button>
            <div id='chartId' style={{ height: '600px', width: '800px' }}></div>
        </>
    )
}


