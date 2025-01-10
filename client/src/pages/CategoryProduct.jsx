import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
import { debounce } from "lodash"

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};

  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const selectCategoryHandler = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    const fetchData = debounce(async () => {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    }, 50); // 50ms debounce delay

    fetchData();

    // Cleanup the debounce function
    return () => fetchData.cancel();
  }, [filterCategoryList]);


  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    //format url - when checkbox is true
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory,navigate]);

  const onChangeSortHandler = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);
  return (
    <div className='container mx-auto p-4'>

    {/***desktop version */}
    <div className='lg:grid grid-cols-[200px,1fr]'>
        {/***left side */}
        <div className='bg-white p-4 shadow rounded-lg max-h-[490px]'>
             {/**sort by */}
             <div className=''>
                 <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                 <form className='text-sm flex flex-col gap-2 py-2'>
                     <div className='flex items-center gap-3'>
                       <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={onChangeSortHandler} value={"asc"}/>
                       <label>Price - Low to High</label>
                     </div>

                     <div className='flex items-center gap-3'>
                       <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={onChangeSortHandler} value={"dsc"}/>
                       <label>Price - High to Low</label>
                     </div>
                 </form>
             </div>


          {/* filter by */}
          <div className="">
            <h3 className="text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category{" "}
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={selectCategoryHandler}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* right side (product) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg">
            Search Results: {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] mt-4 overflow-y-auto ">
            {data.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
