import Header from 'components/Header';
import { Product } from 'interfaces';
import React from 'react'
import { getProductById } from 'utils/api';

const ProductDetail = ({ PRODUCT }) => {

  return (
    <div className="min-h-screen container mx-auto relative">
      <Header />
      <div className='lg:px-[15%] px-4'>
        <div className='flex flex-col md:flex-row mt-10'>
          <img
            src={PRODUCT.avatar}
            alt=""
            className='max-h-[35vh] md:h-[350px] md:w-[300px] object-contain bg-white rounded-xl'
          />
          <div className='flex flex-col mt-4 md:pl-5 md:mt-0'>
            <span className='text-[40px] font-bold'>{PRODUCT.name}</span>
            <span className='text-[35px] font-extrabold text-green-500'>
              <span className='font-medium text-gray-300 line-through'>${Number(PRODUCT.price) + 10}</span>  ${PRODUCT.price}
            </span>
            <span className='text-lg font-semibold text-gray-400'>Category: {PRODUCT.category}</span>
          </div>
        </div>
        <hr className='mt-7 mb-5 border-gray-400' />
        <div className='flex flex-col'>
        <span className='text-[30px] font-semibold'>Descrption</span>
        <span className='text-gray-500'>
          {PRODUCT.description}
        </span>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;

export async function getServerSideProps({ req, res, params }) {
  const id = params.id;
  const product: Product = await getProductById(id);

  return {
    props: {
      PRODUCT: product
    },
  }
}