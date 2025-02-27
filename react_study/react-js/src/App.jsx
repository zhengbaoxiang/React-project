/*
 * @Date: 2023-09-19 10:43:51
 * @LastEditors: zbx
 * @LastEditTime: 2024-03-11 11:26:35
 * @descript: 文件描述
 */
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Router } from '@/routes/index'


import Layout from "@/components/layout";
import Home from "@/views/home";
import User from "@/views/user";
import Login from "@/views/login/login.jsx";
import About from "@/views/about/about.jsx";


function App() {
  return (
    // 喜欢基于 JavaScript 对象的路由配置
    <>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </>

    
    // 使用 JSX 时
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Layout />}>
    //         <Route index element={<Home />} />
    //         <Route path="home" element={<Home />} />
    //         <Route path="user" element={<User />} />
    //       </Route>

    //       <Route path="/login" element={<Login />} />
    //       <Route path="/about" element={<About />} />
    //       <Route
    //         path="*"
    //         element={
    //           <main style={{ padding: "1rem" }}>
    //             <p>404 not found</p>
    //           </main>
    //         }
    //       />
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );
}

export default App;
