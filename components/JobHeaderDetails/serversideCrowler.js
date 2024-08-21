import React from 'react'
import JobHeaderDetails from '.';
import JobDetails from '../JobDetails';

const Crawler = ({data,fileData}) => {
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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonOne) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonTwo) }}
			/>
			<JobHeaderDetails {...data} />
			<JobDetails data={data} fileData={fileData} />
		</>
	)
}

export default Crawler