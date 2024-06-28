'use client'
import React, { useEffect, useState } from 'react'
import JobHeaderDetails from '../JobHeaderDetails'
import { getFilesAttachedToJob, getSingleJob } from '../../lib/jobsApi'
import JobDetails from '../JobDetails'

const JobsConfiguration = ({ jobId }) => {

    const [ data,setData ] = useState({})
    const [ fileData,setFileData] = useState([])

    const getJobDetails = async (accessToken)=>{
        const datat = await getSingleJob(jobId,accessToken);
        const files = accessToken ? await getFilesAttachedToJob(jobId,accessToken) : [];
        setData(datat)
        setFileData(files)
    }

    useEffect(()=>{
        (async ()=>{
            const accessToken = sessionStorage?.getItem('accessToken')
            await getJobDetails(accessToken)
        })()
    },[])

    const { breadCurmbList, jobPostingSchema } = data || {}
    const itemListElement = breadCurmbList?.itemListElement?.map((item) => {
        return {
            "@type": item.type,
            position: item.position,
            item: { "@id": item?.item, name: item?.name, },
        }
    });
    const jsonOne = {
        '@context': breadCurmbList?.context, "@type": "BreadcrumbList", itemListElement
    }
    const jsonTwo = {
        "@context": jobPostingSchema?.context,
        "@type": jobPostingSchema?.type,
        applicantLocationRequirements: { '@type': jobPostingSchema?.applicantLocationRequirements?.type, name: jobPostingSchema?.applicantLocationRequirements?.name },
        baseSalary: {
            '@type': jobPostingSchema?.baseSalary?.type,
            currency: jobPostingSchema?.baseSalary?.currency,
            value: {
                '@type': jobPostingSchema?.baseSalary?.value?.type,
                minValue: jobPostingSchema?.baseSalary?.value?.minValue,
                maxValue: jobPostingSchema?.baseSalary?.value?.maxValue,
                unitText: jobPostingSchema?.baseSalary?.value?.unitText
            }
        },
        datePosted: jobPostingSchema?.datePosted,
        description: jobPostingSchema?.description,
        educationRequirements: {
            '@type': jobPostingSchema?.educationRequirements?.type,
            credentialCategory: jobPostingSchema?.educationRequirements?.credentialCategory,
        },
        email: jobPostingSchema?.email,
        employmentType: jobPostingSchema?.employmentType,
        experienceRequirements: {
            '@type': jobPostingSchema?.experienceRequirements?.type,
            monthsOfExperience: jobPostingSchema?.experienceRequirements?.monthsOfExperience,
        },
        hiringOrganization: {
            '@type': jobPostingSchema?.hiringOrganization?.type,
            name: jobPostingSchema?.hiringOrganization?.name,
            sameAs: jobPostingSchema?.hiringOrganization?.sameAs,
            logo: jobPostingSchema?.hiringOrganization?.logo,
            url: jobPostingSchema?.hiringOrganization?.url,
        },
        incentiveCompensation: jobPostingSchema?.incentiveCompensation,
        industry: jobPostingSchema?.industry,
        jobBenefits: jobPostingSchema?.jobBenefits,
        jobLocation: {
            '@type': jobPostingSchema?.jobLocation?.type,
            address: {
                '@type': jobPostingSchema?.jobLocation?.address?.type,
                addressCountry: jobPostingSchema?.jobLocation?.address?.addressCountry,
                addressLocality: jobPostingSchema?.jobLocation?.address?.addressLocality,
                addressRegion: jobPostingSchema?.jobLocation?.address?.addressRegion,
            }
        },
        jobLocationType: jobPostingSchema?.jobLocationType,
        occupationalCategory: jobPostingSchema?.occupationalCategory,
        qualifications: jobPostingSchema?.qualifications,
        responsibilities: jobPostingSchema?.responsibilities,
        salaryCurrency: jobPostingSchema?.salaryCurrency,
        skills: jobPostingSchema?.skills,
        specialCommitments: jobPostingSchema?.specialCommitments,
        title: jobPostingSchema?.title,
        validThrough: jobPostingSchema?.validThrough,
        workHours: jobPostingSchema?.workHours,
    }
  return (
    <>
        <JobHeaderDetails {...data} /> 
        <JobDetails data={data} fileData={fileData} />
    </>
  )
}

export default JobsConfiguration