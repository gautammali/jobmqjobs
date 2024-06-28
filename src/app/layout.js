import { Inter } from "next/font/google";
import Headers from "../../components/Headers";
import "./globals.css";
import Footer from "../../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: 'jobmq.com',
    description: 'find you next job on top of your finger'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" style={{ height: '100vh' }}>
            <body className={inter.className}>
                <Headers />
                {children}
                <Footer />
            </body>
        </html>
    );
}
