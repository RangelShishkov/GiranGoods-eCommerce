import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();

    setData(responseData.data);

  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="lg:container lg:mx-auto lg:p-4">
    {!data[0] && (
      <p className="text-center text-gray-500 text-lg font-medium py-6">
        No Order Found
      </p>
    )}
    <div className="p-4 w-full">
      {data.map((item, index) => {
        return (
          <div
            key={item.userId + index}
            className="space-y-4 mb-6 border rounded-lg bg-white shadow p-4"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg text-gray-800">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="font-semibold text-xl text-gray-900">
                Order Total: {displayCurrency(item.totalAmount)}
              </div>
            </div>
  
            {/* Order Card */}
            <div className="flex flex-col lg:flex-row justify-between">
              {/* Product Details */}
              <div className="grid gap-4 w-full lg:w-3/5">
                {item?.productDetails.map((product, index) => {
                  return (
                    <div
                      key={product.productId + index}
                      className="flex items-start gap-4 bg-gray-50 p-3 rounded-md"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-28 h-28 object-contain rounded mix-blend-multiply"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-lg text-gray-900 border-b border-gray-300 pb-1 inline-block">
                          {product.name}
                        </div>
                        <div className="mt-2">
                          <div className="text-md font-semibold text-cyan-500">
                            {displayCurrency(product.price)}
                          </div>
                          <p className="text-sm text-gray-800">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
  
              {/* Payment and Shipping Details */}
              <div className="flex flex-col text-right  gap-4 lg:w-2/5">
                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 inline-block relative pb-1">
                    Payment Details
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300"></span>
                  </h3>
                  <p className="text-md text-gray-700 mt-1">
                    Payment Method:{" "}
                    <span className="text-gray-900 font-medium">
                      {item.paymentDetails.payment_method_type[0]}
                    </span>
                  </p>
                  <p className="text-md text-gray-700 mt-1">
                    Payment Status:{" "}
                    <span className="text-gray-900 font-medium">
                      {item.paymentDetails.payment_status}
                    </span>
                  </p>
                </div>
  
                {/* Shipping Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 inline-block relative pb-1">
                    Shipping Details
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300"></span>
                  </h3>
                  {item.shipping_options.map((shipping, index) => (
                    <div
                      key={shipping.shipping_rate + index}
                      className="text-md text-gray-700 mt-1"
                    >
                      <p>
                        Shipping Amount:{" "}
                        <span className="text-gray-900 font-medium">
                          {displayCurrency(shipping.shipping_amount)}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  

  );
};

export default OrderPage;
