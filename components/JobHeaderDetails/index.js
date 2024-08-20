import Image from 'next/image';
import { AiOutlineRight } from 'react-icons/ai';
import { currentServerConfiguration } from '../../config/index.constant';
import moment from 'moment';

export const generateMetadata = async ({ params,searchParams }) => {
    const product = params.jobId && await getSingleJob(params?.jobId, searchParams?.q)
    return {
        title: `${product?.seoTitle || 'JOBMQ'} - ${product?.companyName || ''}| JOBMQ.COM(Job Message Queue`,
        description: product?.seoDescription || 'JOBMQ',
        openGraph: {
            title: `${product?.seoTitle} - ${product?.companyName} | JOBMQ.COM(Job Message Queue)`,
            description: product?.seoDescription || 'JOBMQ',
            url: `${currentServerConfiguration.mainApp}jobs/${product?.id}/${product?.seoDetail?.slugUrl}`,
            locale: product?.seoDetail?.currency,
            site_name: 'Job Message Queue',
        },
    }
}


export const generateStaticParams = async () => {
    const jobs = await getJobs();
    return jobs?.jobsListingResponses?.map((job) => ({
        params: {
            jobId: job.id,
        },
    }))
}


const JobHeaderDetails = (
    { desingnation,
        id,
        doc,
        minSalary,
        maxSalary,
        expirationDate,
        companyName,
        companyLogo,
        address,
        totalApplications,
        isJobApplied,
        handlePostedByJob }) => {

    return (
        <div className="bg-[#f4f4f4] pt-8 pb-4" style={{padding: '0 130px'}}>
            <div className="pt-8 pb-4">
                <div className="container flex justify-between flex-wrap sm:flex-nowrap">
                    <div>
                        <div className="flex items-center gap-1 text-sky-600 font-medium cursor-pointer">
                            <a href={currentServerConfiguration.mainApp} className="hover:underline">
                                Home
                            </a>
                            <AiOutlineRight />
                            <a to={`${currentServerConfiguration.mainApp}jobs`} className="hover:underline">
                                Jobs
                            </a>
                        </div>
                        <h1 className="text-2xl md:text-[52px] text-[#051532] pt-5 pb-4">
                            {desingnation}
                        </h1>
                        <p className="text-black font-extrabold">
                            Job Id:{" "}
                            <span className="font-semibold text-black">{id}</span>
                        </p>
                        <p className="text-black font-extrabold">
                            Posted on:{" "}
                            <span className="font-semibold text-black">
                                {moment(new Date(doc))?.format("DD MMM YYYY")}
                            </span>
                        </p>
                        <p className="text-black font-extrabold">
                            Salary:{" "}
                            <span className="font-semibold text-black">
                                {minSalary + " - " + maxSalary} {" AED"}
                            </span>
                        </p>
                        <p className="text-black font-extrabold">
                            Expiring on:{" "}
                            <span className="font-semibold text-black">
                                {moment(new Date(expirationDate))?.format("DD MMM YYYY")}
                            </span>
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex items-center gap-3">
                                {isJobApplied ? (<button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-full border border-transparent px-6 py-2 text-base font-semibold text-white shadow-sm bg-[#0076bd] hover:bg-primary-800 sm:w-auto sm:text-lg transition_1 cursor-not-allowed"
                                >
                                    Applied
                                </button>) : <a
                                    href={`${currentServerConfiguration.mainApp}jobs/apply/${id}`}
                                    className="inline-flex w-full justify-center rounded-full border border-transparent px-6 py-2 text-base font-semibold text-white shadow-sm bg-[#0076bd] hover:bg-primary-800 sm:w-auto sm:text-lg transition_1"
                                >
                                    Apply
                                </a>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4 justify-between flex-1">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-bold capitalize">
                                    {companyName}
                                </h2>
                                <h3 className="font-medium">{address}</h3>
                                <h3
                                    className="font-medium capitalize cursor-pointer"
                                    onClick={handlePostedByJob}
                                >
                                    {"posted job by"}
                                </h3>
                            </div>
                            <div className=""> 
                                <Image src={`${currentServerConfiguration.serverFileURL}file/${companyLogo || ''}`} className={"max-h-14 "} width={30} height={30} alt="" />
                            </div>
                        </div>
                        <div className="">
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-full border border-transparent px-6 py-2 text-base font-semibold text-white shadow-sm bg-[#0076bd] hover:bg-primary-800 sm:w-auto sm:text-lg transition_1 capitalize"
                            >
                                job applicants ({totalApplications})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobHeaderDetails