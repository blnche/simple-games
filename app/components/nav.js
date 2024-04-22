'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Button } from 'antd';
import { HomeOutlined, BuildOutlined, DashboardOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'





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

    return (
        <nav className='flex-none'>
            <ul role='list' className='menu menu-horizontal px-1'>
                <li>
                    <a href="/"> Homepage </a>
                </li>
                <li>
                    <a href="/dashboard"> Dashboard </a>
                </li>
                <li>
                    <details>
                        <summary> Play now </summary>
                        <ul role='list' className='p-2 bg-base-100 rounded-t-none'>
                            <li><a href='/games/memoryGame'> Memory Game </a></li>
                            <li><a href='/games/sudoku'> Sudoku </a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </nav>
    )

}