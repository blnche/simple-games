import Nav from './components/nav';
import styles from '../styles/globals.css';

export const metadata = {
    title: 'Mini-Games',
}

export default function RootLayout ({ children }) {

    return (
        <html lang="en" data-theme='animalCrossing'>
            <body className='h-screen flex flex-col justify-between'> 
                <header className='h-20 navbar bg-base-100'>
                    <h1 className='flex-1 text-xl'>Mini-Games</h1>
                    <Nav />
                </header>
                <main className='h-full mx-3 my-5'>
                    {children}
                </main>
                <footer className='h-30 footer items-center p-4 bg-neutral text-neutral-content'>
                    <aside className='items-center grid-flow-col'>
                        <img className='mask mask-squircle' src='https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg'/>
                        <p> Designed and created by Blanche Peltier © 2024 </p>
                    </aside>
                    <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
                        <a>Github</a>
                        <a>LinkedIn</a>
                    </nav>
                </footer>
            </body>
        </html>
    )
}