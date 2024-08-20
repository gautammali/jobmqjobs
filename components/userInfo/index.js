'use client'
import { Menu, Transition } from '@headlessui/react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { currentServerConfiguration } from "../../config/index.constant"
import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import { getUsersDetails } from "../../lib/jobsApi"
import { useParams } from 'next/navigation'

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserInfo = () => {
    const [user, setUserDetails] = useState({})
    const [accessToken, setAccessToken] = useState('')
    const params = useParams()

    const getUserInfo = async (token) => {
        const data = await getUsersDetails(token)
        setUserDetails(data?.data)
    }

    useEffect(() => {
        let intervalId

        const checkTokenAndFetchUser = async () => {
            let token = sessionStorage?.getItem('accessToken');
            if (token && token !== 'undefined') {
                token = decodeURIComponent(token)
                setAccessToken(token)
                await getUserInfo(token)
                clearInterval(intervalId)
            }
        }

        if (params.accessToken === 'left_access') {
            sessionStorage?.clear()
        } else {
            intervalId = setInterval(checkTokenAndFetchUser, 1000)
        }

        return () => clearInterval(intervalId)
    }, [params])

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace(`${currentServerConfiguration.mainApp}logout`);
    }

    return (
        <>
            {user?.email ?
                <Menu as="div" className="relative ml-3 text-white">
                    <div className='flex items-center'>
                        <div className="flex flex-col gap-2 items-center">
                            <span className="inline-block h-12 w-12 overflow-hidden rounded-full">
                                {user?.profilePic ?
                                    <Image src={`${currentServerConfiguration.serverFileURL}file/${user?.profilePic}`} width={30} height={30} alt="" />
                                    // <img src={`${currentServerConfiguration.serverFileURL}file/${user?.profilePic}`} alt="" />
                                    : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                }
                            </span>
                        </div>
                        <Menu.Button className="flex flex-col items-start hover:bg-(#082354)rounded-md text-white text-sm font-semibold px-4 py-2">
                            <div className="flex items-center gap-1">
                                <span className='text-lg font-bold text-white'>{user?.firstName}</span>
                                <MdOutlineKeyboardArrowDown className='text-2xl' />
                            </div>
                            <p>{user?.email}</p>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={currentServerConfiguration.mainApp + (user?.userType === 1 ? "individuals" : "businesses") + "/profile"}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700 ')}
                                    >
                                        Profile
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={currentServerConfiguration.mainApp + (user?.userType === 1 ? "individuals" : "businesses") + "/profile/account/details"}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700 border-b')}
                                    >
                                        Account
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleLogout()}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700')}
                                    >
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>

                        </Menu.Items>
                    </Transition>
                </Menu>
                :

                <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="flex items-center gap-1 rounded-full text-blue-600 bg-white text-sm font-semibold hover:underline px-4 py-2">
                            <span className=''>Sign in or register</span>
                            <MdOutlineKeyboardArrowDown className='text-lg' />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={currentServerConfiguration.mainApp + (user?.userType === 1 ? "individuals" : "businesses") + "/login"}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700 border-b')}
                                    >
                                        Individuals <br />
                                        <span className='text-[12px] font-normal'>Job seekers, students, etc</span>
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={currentServerConfiguration.mainApp + (user?.userType === 1 ? "individuals" : "businesses") + "/login"}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700 border-b')}
                                    >
                                        Business users <br />
                                        <span className='text-[12px] font-normal'>Employers, recruiters, etc.</span>
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            }
        </>

    )
}

export default UserInfo