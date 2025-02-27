/*
 * @Date: 2023-09-19 10:52:21
 * @LastEditors: zbx
 * @LastEditTime: 2023-10-08 16:52:40
 * @descript: 文件描述
 */
import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@arco-design/web-react";

import "./home.css";
import { useState } from "react";

export default function Home() {
    return (
        <>
            <h4>主页</h4>
            <Button type="primary" status='success'>arco_btn</Button>
            <div>
                <MyApp data={{ id: 213, name: '的撒' }} />
                <MyInput>sda</MyInput>
            </div>
        </>
    );
}

class MyApp extends React.Component {
    // class创建的组件，有自己的私有数据和生命周期函数    
    constructor(props) {
        super(props)    // 调用super之后，才能使用this.
        // class创建的组件中，使用外部传入的参数，无需接受，直接访问
        console.log('props:', this.props)
        // 相当于vue组件中的 data (){ return {} } 可读可写
        this.state = {
            msg: '这是一条msg',
            date: new Date(),
            list: [1, 2, 3, 4, 5],
            clickCount: 0

        }
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.tick()
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.timer)
    }
    tick() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
            console.log('1s 执行一次', this.state.date)
        }, 10000)
    }
    handleClick(params) {
        console.log('this is:', this);
        console.log(params);
    }
    handleClick2 = (params) => {
        console.log('this is:', this);
        console.log(params);
    }
    handleClick3() {
        this.setState({ clickCount: this.state.clickCount + 1 })
        this.setState({ clickCount: this.state.clickCount + 1 })
        this.setState({ clickCount: this.state.clickCount + 1 })

        this.setState((state) => {
            return { clickCount: state.clickCount + 1 };
        });
    }
    // 渲染函数必须
    render() {
        const listItems = this.state.list.map((item) =>
            <li key={item}>{item}</li>
        );
        return <div>
            <h2>这是class创建的组件</h2>
            <h2> {this.state.date.toLocaleTimeString()} </h2>

            <ul>{listItems}</ul>

            <button onClick={this.handleClick}>
                1这种写法没法绑定处理函数内部的this
            </button>
            <button onClick={(e) => this.handleClick(e.target)}>
                2箭头函数指定上下文
            </button>
            <button onClick={this.handleClick2}>
                3定义时就用箭头函数
            </button>
            <button onClick={(e) => this.handleClick3(e.target)}>
                点我！点击次数为: {this.state.clickCount}
            </button>
        </div>
    }
}

class MyInput extends React.Component {
        constructor(props) {
            super(props);
            this.myRef = React.createRef();  
        }
      handleClick() {
        // 使用原生的 DOM API 获取焦点
        this.myRef.current.focus();
      }
      render() {
        //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
        return (
          <div>
            <input type="text" ref={this.myRef} />
            <input
              type="button"
              value="点我输入框获取焦点"
              onClick={this.handleClick.bind(this)}
            />
          </div>
        );
      }
    }
