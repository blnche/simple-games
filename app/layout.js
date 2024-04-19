import Nav from './components/nav';
import styles from '../styles/globals.css';

export const metadata = {
    title: 'Mini-Games',
}

export default function RootLayout ({ children }) {

    return (
        <html lang="en">
            <body> 
                <header>
                    <h1>Mini-Games</h1>
                    <Nav />
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}