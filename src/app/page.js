'use client'
import { currentServerConfiguration } from '../../config/index.constant';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    window.location.replace(currentServerConfiguration.mainApp)
  }, [])
  
  return <h1>Hello, Home page!</h1>;
}
