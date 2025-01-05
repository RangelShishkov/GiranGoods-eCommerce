import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  // Function to handle product deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${data.productName}"?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(SummaryApi.deleteProduct.url, {
          method: SummaryApi.deleteProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          alert("Product deleted successfully.");
          fetchData(); // Refresh the product list after deletion
        } else {
          alert("Failed to delete the product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <div className="w-36">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            className="mx-auto object-contain h-full"
            src={data?.productImage[0]}
            alt="product"
            width={120}
            height={120}
          />
        </div>
        {/* Product Brand */}
        <h1 className="text-sm font-medium text-slate-600 text-center overflow-hidden overflow-ellipsis whitespace-nowrap">
          {data.brandName}
        </h1>
        {/* Product Name */}
        <h1 className="text-base font-semibold text-slate-800 text-center mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {data.productName}
        </h1>
        <div>
          {/* Price Section */}
          <div className="mt-2">
            <p className="text-lg font-bold text-cyan-600 text-center">
              {displayCurrency(data.sellingPrice)}
            </p>
          </div>
          {/* BUTTONS */}
          <div className="flex justify-evenly gap-2 mt-2">
            <div
              className="p-2 hover:bg-cyan-500 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdEdit />
            </div>
            <div
              className="p-2 hover:bg-red-500 rounded-full hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
