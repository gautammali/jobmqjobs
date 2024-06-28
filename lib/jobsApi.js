import { currentServerConfiguration } from '../config/index.constant';
import axios from 'axios';

export async function getJobs() {
    try {

        const res = await axios.post(`${currentServerConfiguration.serverURL}/JobListing`, {
            keyword: "",
            location: "",
            minSalary: 0,
            maxSalary: 0,
            jobSearchKeyWords: [],
            pageSize: 10,
            pageNo: 1,
            companyId: 0,
            sortOrder: "",
            sortBy: ""
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            next: { revalidate: 300 }
        });
        return res.data

    } catch (error) {
        console.log("Error :", error, error?.message)
    }
}


export async function getSingleJob(id, accessToken) {
    try {
        const response = await axios.get(
            `${currentServerConfiguration.serverURL}/JobListing/jobdetail/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Cache-Control': 'no-cache' // Optionally, you can still include cache-control header
                }
            }
        );

        return response.data
    } catch (error) {
        console.log("Error :", error, error?.message)
    }
}

export async function getFilesAttachedToJob(id, accessToken) {
    const serverUrl = currentServerConfiguration.serverURL || 'https://api.jobmq.com/api';

    try {
        const res = await axios.get(`${serverUrl}/document/getall/2/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return res.data;
    } catch (error) {
        console.log('Error:', error);
    }
}


export async function getUsersDetails(token) {
    try {
        const response = await axios.get(`${currentServerConfiguration.serverURL}/candidate/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            console.log("No data available for user");
            return {}
        }

        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}
