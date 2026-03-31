import { AvatarIcon } from "../assets/AvatarIcon"

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-red-500 font-bold text-2xl">DashBite.</div>
          <div className="text-gray-700 font-medium text-lg">Admin Panel</div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <AvatarIcon className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  )
}
