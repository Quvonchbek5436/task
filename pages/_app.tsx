import type {AppProps} from 'next/app'
import {AuthContextProvider} from '../context/AuthContext'
import {useRouter} from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import {useEffect} from "react";
import '../styles/globals.css'

const noAuthRequired = ['/', '/login', '/signup']

const MyApp = ({Component, pageProps}: AppProps) => {
    const router = useRouter()
    // useEffect(() => {
    //     let isMounted = true;
    //     if (isMounted && router.pathname === '/') {
    //         router.push('/login')
    //     }
    //     return () => {
    //         isMounted = false;
    //     }
    // }, [])

    return (
        <AuthContextProvider>
            {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
            ) : (
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
            )}
        </AuthContextProvider>
    )
}

export default MyApp
