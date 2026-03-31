import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { Add } from "./pages/Add"
import { List } from "./pages/List"
import { Orders } from "./pages/Orders"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/orders" element={<Orders/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App