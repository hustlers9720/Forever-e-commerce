import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandeler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })

      if (response.data.success) {
        await fetchAllOrder()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)

    }
  }

  useEffect(() => {
    fetchAllOrder();
  }, [token]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Orders</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
            {/* Order Header */}
            <div className="flex items-center gap-3 mb-4">
              <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12" />
              <p className="text-lg font-semibold">{order.address.firstName} {order.address.lastName}</p>
            </div>

            {/* Order Items */}
            <div className="border-b pb-3 mb-3">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm text-gray-700">
                  {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                </p>
              ))}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600">
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
              <p className="font-semibold">📞 {order.address.phone}</p>
            </div>

            {/* Order Details */}
            <div className="mt-3 text-sm">
              <p><span className="font-semibold">Items:</span> {order.items.length}</p>
              <p><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
              <p><span className="font-semibold">Payment:</span> {order.payment ? '✅ Done' : '❌ Pending'}</p>
              <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount & Status */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">{currency}{order.amount}</p>
              <select onChange={(event) => statusHandeler(event, order._id)} value={order.status} className="border px-2 py-1 rounded text-sm">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
