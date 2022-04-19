import React, { useState } from 'react'
import Header from 'components/Header';
import { createProduct, getCategories } from 'utils/api';
import { GetStaticProps } from 'next';
import { Category } from 'interfaces';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

const defaultState = {
  name: '',
  description: '',
  avatar: '',
  category: '',
  price: ''
}

const AddProduct = ({ CATEGORIES }) => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState(defaultState)

  const onSubmit = () => {
    const reqBody = {
      ...productDetails,
      price: parseFloat(productDetails.price),
      developerEmail: 'krunalsolanki855@gmail.com'
    }

    if (!productDetails.category) {
      Swal.fire(
        '',
        'Please select Category',
        'question'
      )
    } else {
      createProduct(reqBody)
        .then(res => {
          setProductDetails(defaultState);
         router.push('/')
        })
        .catch(err => {
          Swal.fire(
            '',
            'Something went Wrong, please try again later !',
            'error'
          )
        })
    }
  }

  return (
    <div className="min-h-screen container mx-auto relative">
      <Header />
      <div className='flex flex-col items-center mt-20'>
        <span className='text-2xl font-bold'>Create Product</span>
        <div className="w-full px-4 md:w-[35%]">
          <input
            value={productDetails.name}
            onChange={e => setProductDetails({ ...productDetails, name: e.target.value })}
            placeholder='Product Name'
            className='input-base w-full mt-10 py-3'
          />
          <textarea
            value={productDetails.description}
            onChange={e => setProductDetails({ ...productDetails, description: e.target.value })}
            placeholder='Description'
            className='input-base w-full mt-5 py-3 min-h-[100px]'
          />
          <input
            value={productDetails.avatar}
            onChange={e => setProductDetails({ ...productDetails, avatar: e.target.value })}
            placeholder='Image URL'
            className='input-base w-full mt-5 py-3'
          />
          <div className='select-base w-full mt-5'>
            <select
              value={productDetails.category}
              onChange={e => setProductDetails({ ...productDetails, category: e.target.value })}
              className="w-full transition ease-in-out focus:outline-none bg-white"
              aria-label="Default select example"
            >
              <option>Categories</option>
              {CATEGORIES?.map((cat: Category, cIndex: number) => {
                return (
                  <option key={cIndex} value={cat.name}>{cat.name}</option>
                )
              })}
            </select>
          </div>
          <input
            value={productDetails.price}
            onChange={e => setProductDetails({ ...productDetails, price: e.target.value })}
            placeholder='Price'
            className='input-base w-full mt-5 py-3'
          />
          <button className='input-base w-full mt-6 text-xl font-bold uppercase' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const all_categories: Category[] = await getCategories();

  if (all_categories) {
    return {
      props: {
        CATEGORIES: all_categories
      }
    }
  }
}

export default AddProduct;