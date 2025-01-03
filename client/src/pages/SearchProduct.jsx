import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  }, [query.search]); // Memoized to depend on query.search

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // Now fetchProduct is stable
  
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}

      <p className="text-lg font-semibold my-3">Search Result : {data.length} </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No search results </p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};
export default SearchProduct;
