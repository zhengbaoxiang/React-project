/*
 * @Date: 2023-12-20 15:39:36
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-21 17:28:04
 * @descript: 文件描述
 */
import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";
import "./about.css"


function App() {
    const [count, setCount] = useState(0)

    return (
        <> 
        <div style={{textAlign:'center'}}>

            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    <Link to="/">返回主页</Link>
                </p>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>

        </>
    )
}

export default App
