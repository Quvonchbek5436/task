// import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import '../styles/globals.css'
import {useEffect} from "react";

const noAuthRequired = ['/', '/login', '/signup']

const MyApp=({ Component, pageProps }: AppProps) =>{
  const router = useRouter()
    console.log(router.pathname)
    useEffect(()=>{
        let isMounted=true;
        if(isMounted){
            router.push('/login')
        }
        return ()=>{
            isMounted=false;
        }
    },[])

  return (
      <AuthContextProvider>
        {/*<Navbar />*/}
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
