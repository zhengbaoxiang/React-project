/*
 * @Date: 2023-09-19 13:09:49
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-18 16:00:27
 * @descript: 文件描述
 */
import { useState, useRef, useEffect,useImperativeHandle } from 'react';
import * as echarts from 'echarts'

import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@arco-design/web-react";

export default function () {
    let [count, setCount] = useState(0);
    let [isPlaying, setIsPlaying] = useState(false);
    let src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    let myChart = null
    let timer
    const videoRef = useRef(null);

    useEffect(() => {
        console.log('effect', isPlaying)
        myChart = echarts.init(document.getElementById('chartId'))

        console.log('渲染触发','count变化后触发',count);
        getData()
        return () => {
            console.log('❌ 清除定时器');
            clearInterval(timer)
        }
    }, [count])
    useEffect(()=>{
        console.log('只挂载时触发一次');
    },[])
    useEffect(() => {  
        console.log('更新时触发');
        // 这里的代码会在每次渲染后执行，类似updated(){}
    });

    function getData() {
        let data = []
        timer = setInterval(() => {
            let value = Math.ceil(Math.random() * 1000)
            data.push(value)
            setTimeout(() => {
                draw(data)
            }, 500);
        }, 2000)

    }
    function draw(data) {
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
    function f1() {
        console.log('count123', this)
        console.log('count123', count)
    }

    const btnClick = () => {
        console.log('btnClick', count)
        // setCount(count+1)
        setIsPlaying(!isPlaying)

        console.log('videoRef',videoRef)

    }

    return (
        <>
            <h1>用户列表页{count}</h1>
            <Button type="primary" status='success' onClick={btnClick} >arco_btn</Button>
            <VideoPlayer src={src} isPlaying={isPlaying} onRef={videoRef} ></VideoPlayer>
            <Link to="/">返回主页</Link>
            <div id='chartId' style={{ height: '600px', width: '800px' }}></div>
        </>
    )
}

function VideoPlayer({ src, isPlaying, onRef }) {
    const ref = useRef(null);

    console.log('VideoPlayer - 每次渲染都会运行一遍，因此函数不能写在这里调用isPlaying', isPlaying)
    useEffect(() => {
        console.log('VideoPlayer - effect', 222)

        //setData会触发重新渲染，渲染后都会执行此处的代码
        //  换句话说，useEffect 会把这段代码放到屏幕更新渲染之后执行。
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }, [isPlaying]);

    useImperativeHandle(onRef, () => {
        return {
          func: someMethods,
          video:ref
        };
      });

    function someMethods(){
        console.log('video组件内部的方法')
    }
    return <video ref={ref} src={src} loop playsInline style={{ height: '400px', width: '600px' }} />;
}
