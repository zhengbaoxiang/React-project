/*
 * @Date: 2023-12-20 15:35:59
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-19 17:52:29
 * @descript: 文件描述
 */
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

import { Button, List } from 'antd';
import "./study.less"

export default function () {
    // 状态管理，任何需要刷新渲染的数据，必须用setCount来改变count的值,否则不会触发重新渲染
    let [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [timer, setTimer] = useState<any>(null);
    
    // console.log('状态刷新就会重新执行 count:', count);
   
    // 有依赖的useEffect，相当于 Vue watch
    useEffect(() => {
        // console.log('渲染触发', 'count变化后触发', count);
        return () => {
        }
    }, [count])

    // 相当于 Vue mounted(){}
    useEffect(() => {
        console.log('只挂载时触发一次');
        tick()
        return () => {
            // 清除定时器
            clearInterval(timer);
        }
    }, [])
    // 类似 Vue updated(){}
    useEffect(() => {
        // console.log('更新时触发');
    });

    // 箭头函数
    const tick = () => {
        const timer = setInterval(() => {
            // 在 React 中，useState 的状态更新是异步的，
            // 在闭包中使用状态时，闭包会捕获初始状态值。在 setInterval 回调中，count 的值一直是初始值 0
            // console.log('Count', count);
            // 多次调用会合并,实际只增加1，因为闭包中的count一直是0
            // setCount(66)
            // setCount(count + 1)
            // setCount(count + 1)

            //  通过函数的方式修改state，会触发重新渲染，每次加2
            setCount(prevCount => prevCount + 1)
            setCount(prevCount => prevCount + 1);
            setDate(new Date())
        }, 1 * 1000)
        setTimer(timer)
    }
    function handleClick(params: any) {
        console.log("You clicked me!-params", params);
        setCount(count + 2);
    }

    // 属性绑定
    const user = {
        name: "Hedy Lamarr",
        imageUrl: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
        imageSize: 90,
    };

    // 事件触发
    function onClick(params: any) {
        console.log("You clicked me!", params);
    }

    // 列表渲染
    const products = [
        { title: "Cabbage", id: 1 },
        { title: "Garlic", id: 2 },
        { title: "Apple", id: 3, isFruit: true },
    ];
    const ListItems = products.map((pro) => {
        return (
            <li key={pro.id} style={{ color: pro.isFruit ? "red" : "green" }}>
                {pro.title}
            </li>
        );
    });

    // 以编程方式导航
    const navigate = useNavigate();
    function loginClick() {
        navigate('/')
    }

    return (
        <div className='center' style={{ padding: "1rem " }}>
            <div>
                <div>
                    {/* 数据绑定 */}
                    <button >{user.name}</button>

                    {/* 事件绑定 */}
                    <button onClick={onClick}>1-直接绑定函数变量</button>
                    <button onClick={e => { e.stopPropagation(); onClick('自定义参数'); }}>2-箭头函数绑定按钮</button>

                    <img
                        alt="样式、属性"
                        className="avatar"
                        src={user.imageUrl}
                        style={{
                            width: user.imageSize,
                            height: user.imageSize,
                        }}
                    />
                </div>
                {/* 列表渲染 */}
                <ul>{ListItems}</ul>
            </div>
            <hr />
            <p style={{ display: 'block', marginLeft: '30px' }}>{count}—_____{date.toLocaleTimeString()} </p>
            <MyButton count={count} onClick={handleClick}></MyButton>
            <MyButton count={count} onClick={handleClick}></MyButton>
            <hr />
            <ProductCon></ProductCon>
            <hr />
            <p>
                {/* <Link to="/"> Link - 返回主页  </Link> */}
                <Button onClick={loginClick}>navigate-返回主页</Button>
            </p>
            <MovingDot></MovingDot>
        </div>
    );
}

//   React 组件是返回标记的 JavaScript 函数：必须始终以大写字母开头
function MyButton({ count, onClick }: { count: number, onClick: any }) {
    return (
        <div>
            <button onClick={onClick}>1-Click 共享 - {count} - 次</button>
            <button onClick={e => { e.stopPropagation(); onClick(123445); }}> 2- 共享{count}</button>
        </div>
    )
}

export function ProductCon() {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    const dataList = [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
    ];
    return (
        <>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            ></SearchBar>
            <ProductTable
                filterText={filterText}
                inStockOnly={inStockOnly}
                products={dataList}
            ></ProductTable>
        </>
    );
}

interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (text: string) => void;
    onInStockOnlyChange: (inStock: boolean) => void;
}
interface Product {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
}
interface ProductTableProps {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
}

export function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange,
}: SearchBarProps) {
    return (
        <div>
            <input
                type="text"
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => { onInStockOnlyChange(e.target.checked); console.log(inStockOnly, e.target.checked) }}
                />{" "}
                only show produce in stock {inStockOnly + ''}
            </label>
        </div>
    );
}


export function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
    const rows: any[] = [];
    let lastCategory: string | null = null;
    products.forEach((item) => {
        if (item.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }
        if (inStockOnly && !item.stocked) {
            return;
        }

        if (item.category != lastCategory) {
            rows.push(
                <ProductCatory
                    category={item.category}
                    key={item.category}
                ></ProductCatory>
            );
        }
        rows.push(<ProductRow product={item} key={item.name}></ProductRow>);
        lastCategory = item.category;
    });

    return (
        <table style={{ width: "500px" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export function ProductCatory({ category }: { category: string }) {
    return (
        <tr>
            <th colSpan={2}>{category}</th>
        </tr>
    );
}


export function ProductRow({ product }: { product: Product }) {
    const name = product.stocked ? (
        product.name
    ) : (
        <span style={{ color: "red" }}>{product.name}</span>
    );
    return (
        <tr>
            <td> {name} </td>
            <td> {product.price} </td>
        </tr>
    );
}

function MovingDot() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    return (
        <div
            onPointerMove={e => {
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                });
            }}
            style={{
                width: '100%',
                height: '300px',
                border: '1px solid black',
            }}>
            <div
                onPointerMove={e => e.stopPropagation()}
                style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    left: -10,
                    top: -10,
                    width: 20,
                    height: 20,
                }}
            />
        </div>
    );
}
