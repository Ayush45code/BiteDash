import { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import { getImageUrl } from "../services/api";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  email: string;
};

type OrderItem = {
  food: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  paymentMethod: string;
  createdAt: string;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Order Placed';
    case 'processing':
      return 'Preparing';
    case 'completed':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

export const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await orderAPI.listOrders();
        if (response.success) {
          // Filter orders for current user only
          const userOrders = response.data.filter((order: Order) => 
            order.customerEmail === user.email
          );
          setOrders(userOrders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (error) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Please login to view your orders</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 xl:px-20 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-12">
            No orders yet. Start ordering your favorite food!
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md border overflow-hidden">
                <div className="p-4 md:p-6 border-b bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold text-lg">${order.totalAmount}</p>
                    </div>
                    <div>
                      <span className={`${getStatusColor(order.status)} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-700">Order Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          item.food && (
                          <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                            <img
                              src={getImageUrl(item.food.image)}
                              alt={item.food.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.food.name}</p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity} × ${item.food.price}
                              </p>
                            </div>
                            <p className="font-medium text-sm">
                              ${item.food.price * item.quantity}
                            </p>
                          </div>
                          )
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-700">Delivery Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Name:</span> {order.customerName}</p>
                        <p><span className="text-gray-500">Phone:</span> {order.customerPhone}</p>
                        <p><span className="text-gray-500">Email:</span> {order.customerEmail}</p>
                        <p><span className="text-gray-500">Address:</span> {order.customerAddress}</p>
                        <p><span className="text-gray-500">Payment:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
