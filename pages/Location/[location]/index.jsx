import React from 'react'
import { useRouter } from 'next/router'

const Location = () => {

    const router = useRouter();
    const {location} = router.query;

  return (
    <>
    <div>Location {location}</div>
    <button onClick={()=>{router.replace('/')}}>abc</button>
    </>
  )
}

export default Location