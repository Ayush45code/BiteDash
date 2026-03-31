

import { useState, useEffect } from "react"
import { orderAPI } from "../services/api"
import { toast } from "react-toastify"
import type { Order } from "../data/types"

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [loading, setLoading] = useState(true)

  const statuses = ["All", "pending", "processing", "completed", "cancelled"]

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.listOrders();
      if (response.success) {
        const formattedOrders = response.data.map((order: any) => ({
          _id: order._id,
          items: order.items.map((item: any) => ({
            _id: item.food?._id || 'unknown',
            name: item.food?.name || 'Unknown Item',
            price: item.food?.price || 0,
            description: item.food?.description || "",
            category: item.food?.category || "",
            image: item.food?.image || "",
            quantity: item.quantity
          })),
          totalAmount: order.totalAmount,
          status: order.status,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          createdAt: order.createdAt
        }));
        setOrders(formattedOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter(order => 
    selectedStatus === "All" || order.status === selectedStatus
  )

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await orderAPI.updateOrderStatus(orderId, newStatus);
      if (response.success) {
        toast.success("Order status updated successfully");
        fetchOrders();
      } else {
        toast.error(response.message || "Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error:", error);
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Orders</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading orders...</div>
          </div>
        ) : (
          <>
            <div className="mb-6">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)} Orders
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order._id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items.slice(0, 2).map(item => item.name).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value as Order['status'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs text-gray-500">Order #{order._id.slice(-6)}</span>
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-xs text-gray-500">{order.customerEmail}</div>
                </div>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-900 mb-1">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </div>
              <div className="text-xs text-gray-500 mb-3">
                {order.items.slice(0, 2).map(item => item.name).join(', ')}
                {order.items.length > 2 && ` +${order.items.length - 2} more`}
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-gray-900">${order.totalAmount}</span>
                <span className="text-xs text-gray-500">{formatDate(order.createdAt)}</span>
              </div>
              
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value as Order['status'])}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found with status: {selectedStatus}
            </div>
          )}
          </>
        )}
      </div>
    </div>
  )
}

