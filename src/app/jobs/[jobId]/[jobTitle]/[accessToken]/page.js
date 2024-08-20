'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/app/Loading';

const AccessTokenSetter = ({ params, searchParams }) => {

    useEffect(() => {
        if (params.accessToken === 'left_access') {
            sessionStorage.clear();
            localStorage.clear();
        }
        sessionStorage.setItem('accessToken', searchParams?.q);
        (async () => {
            await new Promise((res, rej) => {
                try {
                    setTimeout(() => {
                        res(true)
                    }, 1000)
                } catch (error) {
                    rej('error')
                }
            })
        })()
        redirect(`/jobs/${params.jobId}/${params.jobTitle}`)
    }, []);

    return (
        <>
            <Loading />
        </>
    )
}

export default AccessTokenSetter;