

import { NavLink } from "react-router-dom"
import { AddIcon } from "../assets/AddIcon"
import { ListIcon } from "../assets/ListIcon"
import { OrderIcon } from "../assets/OrderIcon"

export const Sidebar = () => {
  return (
    <div className="w-20 lg:w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-2 lg:p-4">
        <div className="space-y-2">
          <NavLink to="/add">
            {({ isActive }) => (
              <div className={`flex items-center justify-center lg:justify-start lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-orange-400 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-blue-500'}`}>
                  <AddIcon className="w-5 h-5 text-white" />
                </div>
                <span className="hidden lg:block font-medium">Add Items</span>
              </div>
            )}
          </NavLink>
          
          <NavLink to="/list">
            {({ isActive }) => (
              <div className={`flex items-center justify-center lg:justify-start lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-orange-400 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-green-500'}`}>
                  <ListIcon className="w-5 h-5 text-white" />
                </div>
                <span className="hidden lg:block font-medium">List Items</span>
              </div>
            )}
          </NavLink>
          
          <NavLink to="/orders">
            {({ isActive }) => (
              <div className={`flex items-center justify-center lg:justify-start lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-orange-400 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-green-500'}`}>
                  <OrderIcon className="w-5 h-5 text-white" />
                </div>
                <span className="hidden lg:block font-medium">Orders</span>
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  )
}
