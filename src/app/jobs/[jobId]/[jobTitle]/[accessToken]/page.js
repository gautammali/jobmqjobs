'use client'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/app/Loading';

const JobsDetailsWhileAcc = ({ params,searchParams }) => {

    useEffect(() => {
        if(params.accessToken === 'left_access'){
            sessionStorage.clear();
            localStorage.clear();
        }
        sessionStorage.setItem('accessToken', searchParams?.q);
        redirect(`/jobs/${params.jobId}/${params.jobTitle}}`)
    }, [])

    return (
        <>
            <Loading />
        </>
    )
}

export default JobsDetailsWhileAcc