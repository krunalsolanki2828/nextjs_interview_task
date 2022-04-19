import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { deleteProduct, getCategories, getProducts } from "utils/api";
import { Product, Category } from "interfaces";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import ProductCard from "components/ProductCard";
import Swal from "sweetalert2";

const Dashboard = ({ PRODUCTS, CATEGORIES }) => {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      let data = PRODUCTS?.filter((product) => product.category === filter);
      setFilteredProducts(data);
    } else {
      setFilteredProducts(PRODUCTS);
    }
  }, [filter]);

  const deleteProducts = async (id: string, productIndex: number) => {
    const response = await deleteProduct(id);
    console.log(response, "res ==>");
    if (response) {
      const data: [] = JSON.parse(JSON.stringify(filteredProducts));
      data.splice(productIndex, 1);
      setFilteredProducts(data);
      Swal.fire(
        '',
        'Product deleted',
        'success'
      )

    } else {
      Swal.fire(
        '',
        'Something went wrong',
        'error'
      )
    }
  };

  return (
    <div className="min-h-screen container mx-auto relative">
      <Header />
      <div className="flex flex-col justify-between mt-3 px-4 md:flex-row md:gap-2">
        <input
          placeholder="Apple Watch, Samsung S21, Macbook Pro...."
          className="w-full lg:w-[30%] input-base mb-2 md:mb-0"
        />
        <div className="select-base w-full lg:w-[15%]">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full transition ease-in-out focus:outline-none bg-white"
            aria-label="Default select example"
          >
            <option selected value="">
              All Categories
            </option>
            {CATEGORIES?.map((cat: Category, cIndex: number) => {
              return (
                <option key={cIndex} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* list */}
      {!filteredProducts?.length && (
        <div className="text-center font-bold text-2xl text-re-500 mt-20">
          No Products Found for {filter}
        </div>
      )}
      <div className="px-4 my-9 grid grid-cols-2 gap-10 lg:grid-cols-4 md:grid-cols-3 lg:px-[15%]">
        {filteredProducts.map((item: Product, index: number) => {
          return (
            <ProductCard onDelete={deleteProducts} item={item} index={index} />
          );
        })}
      </div>

      <FloatingButton />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const all_products: Product[] = await getProducts();
  const all_categories: Category[] = await getCategories();

  if (all_products) {
    return {
      props: {
        PRODUCTS: all_products,
        CATEGORIES: all_categories,
      },
    };
  }
};

export default Dashboard;
