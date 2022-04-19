import { useRouter } from 'next/router';
import React from 'react'

const FloatingButton = () => {
  const router = useRouter()

  const onAddClick = () => {
    router.push('/createProduct')
  }

  return (
    <div className='w-max fixed right-5 bottom-8 bg-black rounded-full cursor-pointer' onClick={onAddClick}>
      <img src='/assets/images/add_icon.svg' alt='' />
    </div>
  )
}

export default FloatingButton;