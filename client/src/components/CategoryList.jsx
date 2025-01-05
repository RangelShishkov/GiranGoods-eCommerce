import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);
  const fetchProductCategory = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setProductCategory(dataResponse.data);
  };
  useEffect(() => {
    fetchProductCategory();
  }, []);
  return (
    <div className="container  mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"loading" + index}
                ></div>
              );
            })
          : productCategory.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  key={product?.category}
                  className="cursor-pointer group "
                >
                  {/* Category Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 p-2 rounded-full group-hover:shadow-md transition-all overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Category Name */}
                  <p className="text-center text-sm md:text-base font-medium capitalize text-slate-700 group-hover:text-cyan-600 transition-colors">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
