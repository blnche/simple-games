import Nav from './components/nav';
import styles from '../styles/globals.css';

export const metadata = {
    title: 'Mini-Games',
}

export default function RootLayout ({ children }) {

    return (
        <html lang="en" data-theme='retro'>
            <body className='h-screen flex flex-col justify-between'> 
                <header className='h-20 navbar bg-base-100'>
                    <h1 className='flex-1'><a href='/' className='btn btn-ghost text-xl'>Mini-Games</a></h1>
                    <Nav />
                </header>
                <main className='h-full mx-3 my-5'>
                    {children}
                </main>
                <footer className='h-30 footer items-center p-10 bg-neutral text-neutral-content'>
                    <aside className='items-center grid-flow-col'>
                        <img className='size-9 mask mask-squircle' src='https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg'/>
                        <p> Designed and created by Blanche Peltier © 2024 </p>
                    </aside>
                    <nav>
                        <h3 className='footer-title'> Social </h3>
                        <div className='grid grid-flow-col gap-4'>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" className="h-7 w-7 fill-white">    
                                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z"/>
                            </svg>
                            </a>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" className="h-7 w-7 fill-white">    
                                    <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"/>
                                </svg>
                            </a>
                        </div>
                    </nav>
                    <p className='flex'>Icons by<a className='linl link-hover' href="https://icons8.com">Icons8.</a></p>
                </footer>
            </body>
        </html>
    )
}