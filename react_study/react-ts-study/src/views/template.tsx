/*
 * @Date: 2023-12-20 15:35:59
 * @LastEditors: zbx
 * @LastEditTime: 2024-03-13 15:19:37
 * @descript: 文件描述
 */
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button, List } from 'antd';


export default function () {
    const navigate = useNavigate();
    function loginClick() {
        console.log('click');
        // 以编程方式导
        navigate('/')
    }

    const [count, setCount] = useState(0);

    function handleClick(params: any) {
        console.log("You clicked me!-params", params);
        setCount(count + 2);
    }


    return (
        <div className='center' style={{ padding: "1rem " }}>
            <Button onClick={loginClick}>返回主页</Button>
            <p> <Link to="/">返回主页</Link>            </p>
            <MyCom></MyCom>
            <MyButton count={count} onClick={handleClick}></MyButton>
            <MyButton count={count} onClick={handleClick}></MyButton>


            <ProductCon></ProductCon>
            <List
                style={{ width: 622 }}
                size='small'
                header='List title'
                dataSource={[
                    'Beijing Bytedance Technology Co., Ltd.',
                    'Bytedance Technology Co., Ltd.',
                    'Beijing Toutiao Technology Co., Ltd.',
                    'Beijing Volcengine Technology Co., Ltd.',
                    'China Beijing Bytedance Technology Co., Ltd.',
                ]}
                renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
            />
        </div>
    );
}

//   React 组件是返回标记的 JavaScript 函数：必须始终以大写字母开头
function MyCom() {
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

    return (
        <div>
            <div>
                {/* 数据绑定 */}
                <button >{user.name}</button>

                {/* 事件绑定 */}
                <button onClick={onClick}>1-直接绑定函数变量</button>
                <button onClick={e => {
                    e.stopPropagation();
                    onClick('自定义参数');
                }}>2-箭头函数绑定按钮</button>

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
            <ul>{ListItems}</ul>; 
        </div> 
    );
}
function MyButton({ count, onClick }:{count:number,onClick:any}) {
    // 状态绑定、修改
    const [number, setNumber] = useState(0);

    return (
        <div>
            <button onClick={onClick}>1-Click 共享 - {count} - 次</button>
            <button onClick={e => { e.stopPropagation(); onClick(123445); }}> 2- 共享{count}</button>
            <button onClick={() => {
                setNumber(42);
                setNumber(number + 5);
                setNumber(number + 5);
                setNumber(n => n + 1);
            }}>3、批量修改状态-{number}</button>


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

export function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange,
}) {
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
                    onChange={(e) => { onInStockOnlyChange(e.target.value); console.log(inStockOnly) }}
                />{" "}
                only show produce in stock
            </label>
        </div>
    );
}
export function ProductTable({ products, filterText, inStockOnly }) {
    const rows = [];
    let lastCategory = null;
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

export function ProductCatory({ category }) {
    return (
        <tr>
            <th colSpan={2}>{category}</th>
        </tr>
    );
}
export function ProductRow({ product }) {
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
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    return (
        <div
            onPointerMove={e => {
                position.x = e.clientX;
                position.y = e.clientY;
            }}
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
            }}>
            <div style={{
                position: 'absolute',
                backgroundColor: 'red',
                borderRadius: '50%',
                transform: `translate(${position.x}px, ${position.y}px)`,
                left: -10,
                top: -10,
                width: 20,
                height: 20,
            }} />
        </div>
    );
}
