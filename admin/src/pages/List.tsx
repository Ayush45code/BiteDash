import { useState, useEffect } from "react"
import { foodAPI, getImageUrl } from "../services/api"
import { toast } from "react-toastify"
import type { FoodItem } from "../data/types"

export const List = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  const categories = ["All", "Salad", "Rolls", "Deserts", "Vegetarian", "Cake", "Sandwich", "Noodles", "Pasta"]

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await foodAPI.listFood();
      if (response.success) {
        const formattedItems = response.data.map((item: any) => ({
          _id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          image: getImageUrl(item.image)
        }));
        setFoodItems(formattedItems);
      } else {
        toast.error("Failed to fetch food items");
      }
    } catch (error) {
      toast.error("Error fetching food items");
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = async (id: string) => {
    try {
      const response = await foodAPI.removeFood(id);
      if (response.success) {
        toast.success("Food item deleted successfully");
        fetchFoodItems();
      } else {
        toast.error(response.message || "Failed to delete food item");
      }
    } catch (error) {
      toast.error("Error deleting food item");
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">List Items</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading food items...</div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-orange-600 hover:text-orange-900 mr-4">Edit</button>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                        <span className="text-sm font-medium text-gray-900">${item.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 pt-3 border-t">
                    <button className="flex-1 text-center text-sm text-orange-600 font-medium">Edit</button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 text-center text-sm text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

