'use client'
import React, { useEffect, useState } from 'react'
import { getFilesAttachedToJob, getSingleJob } from '../../lib/jobsApi'
import Crawler from '../JobHeaderDetails/serversideCrowler'
import Loading from '@/app/Loading'

const JobsConfiguration = ({ jobId }) => {

    const [ data,setData ] = useState({})
    const [ fileData,setFileData] = useState([])
    const [isLoading,setIsLoading] = useState(true);

    const getJobDetails = async (accessToken)=>{
        const datat = await getSingleJob(jobId,accessToken);
        const files = accessToken ? await getFilesAttachedToJob(jobId,accessToken) : [];
        setData(datat)
        setFileData(files)
        setIsLoading(false)

    }

    useEffect(()=>{
        (async ()=>{
            const accessToken = sessionStorage?.getItem('accessToken')
            await getJobDetails(accessToken)
        })()
    },[])

    
  return (
    <>
    { isLoading ? <Loading /> :  <Crawler data={data} fileData={fileData}/>}
    </>
  )
}

export default JobsConfiguration