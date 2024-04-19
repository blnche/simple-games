'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { HomeOutlined, BuildOutlined, DashboardOutlined } from '@ant-design/icons'

const items = [
    {
        label: (<Link href="/">Homepage</Link>),
        key: 'homepage',
        icon: <HomeOutlined />
    },
    {
        label: (<Link href="/dashboard">Dashboard</Link>),
        key: 'dashboard',
        icon: <DashboardOutlined />
    },
    {
        label: (<Link href="/games">Games</Link>),
        key: 'games',
        icon: <BuildOutlined />,
        children: [
            {
                label: (<Link href="/games/memoryGame">Memory Game</Link>),
                key: 'memoryGame',
                icon: <BuildOutlined />
            },
            {
                label: (<Link href="/games/sudoku">Sudoku</Link>),
                key: 'sudoku',
                icon: <BuildOutlined />
            },
        ],
    },
];

export default function Nav() {
    const [current, setCurrent] = useState('homepage');
    const onClick = (e) => {
        setCurrent(e.key);
    }

    return (
        <Menu 
         onClick={onClick}
         selectedKeys={[current]}
         mode="horizontal"
         items={items}
        />
    )

}