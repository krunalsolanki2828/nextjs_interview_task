import React from 'react'
import { Product } from 'interfaces'
import { useRouter } from 'next/router';

interface ProductCardProps {
  item: Product,
  index: number,
  onDelete: (id: String,index:number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({item, index, onDelete}) => {
  const router = useRouter();

  const onProductClick = (item: Product) => {
    router.push(`/${item.name}/${item.id}`)
  }

  return (
    <div  key={index} className='bg-white shadow-sm relative flex flex-col align-center p-3 rounded-xl cursor-pointer' >
     <img onClick={() => onDelete(item.id,index)} className="absolute left-0 top-0 w-6 h-6" src="/assets/images/remove.png"/>
      <img
      onClick={() => onProductClick(item)}
        src={item.avatar}
        alt=''
        className='h-[250px] w-auto object-contain mb-3'
      />
      <span className='text-center font-semibold mt-auto max-h-[48px] overflow-hidden'>{item.name}</span>
      <span className='text-center text-lg font-extrabold text-green-500 mt-auto'>${item.price}</span>
    </div>
  )
}

export default ProductCard