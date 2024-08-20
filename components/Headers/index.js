import Image from 'next/image'
import { currentServerConfiguration } from '../../config/index.constant'
import UserInfo from '../userInfo'

const Headers = () => {
  return (
    <div className='bg-[#091732]' style={{display:'flex',justifyContent:'center',alignItems:'center',padding: '0 120px'}}>
            <div className="container flex justify-between items-center p-3 ">
                <a href={currentServerConfiguration.mainApp} className='max-w-[200px]'>
                    <Image width={200} height={200} src={'/assets/logo.png'} alt="product logo" />
                </a>
                <UserInfo />
            </div>
    </div>
  )
}

export default Headers