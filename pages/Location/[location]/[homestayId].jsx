import React from 'react'
import { useRouter } from 'next/router'

const HomestayId = () => {


  const router = useRouter();
  const {homestayId} = router.query;

  return (
    <div>{homestayId}</div>
  )
}

export default HomestayId