import JobsConfiguration from '../../../../../components/JobsConfiguration';
import { currentServerConfiguration } from '../../../../../config/index.constant';
import { getJobs, getSingleJob } from '../../../../../lib/jobsApi';

export const generateMetadata = async ({ params,searchParams }) => {
    const product = params && await getSingleJob(params?.jobId, searchParams?.q)
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


const JobsDetailsWhileAcc = ({ params }) => {
    return (
    <>
        <JobsConfiguration jobId={params.jobId} />
    </>
    )
}

export default JobsDetailsWhileAcc