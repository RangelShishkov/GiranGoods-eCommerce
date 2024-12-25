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
        // Replace the URL with your API endpoint for deletion
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
    <div className="bg-white p-4 rounded">
      <div className="w-36">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            className="mx-auto object-fill h-full"
            src={data?.productImage[0]}
            alt="product"
            width={120}
            height={120}
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">
          {data.brandName} {data.productName}
        </h1>
        <div>
          <div>
            <p className="font-semibold">
              {displayCurrency(data.sellingPrice)}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-2">
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
