import { Navbar } from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { PlaceOrder } from "./pages/PlaceOrder";
import { MyOrders } from "./pages/MyOrders";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { Sign } from "./Sign_here/Sign";
import { StoreContextProvider } from "./Context/context";

 const App = () => {
  const [open,setopen]=useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setopen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <StoreContextProvider>
      {open? <Sign setopen={setopen} onLogin={handleLogin} initialMode="Signup"/> : <></>}
     
      <Navbar setopen={setopen} user={user} onLogout={handleLogout}/>
      
      <Routes>

        <Route element={<Home/>} path="/" ></Route>
        <Route element={<Cart/>} path="/cart"></Route>
        <Route element={<PlaceOrder/>} path="/order"></Route>
        <Route element={<MyOrders/>} path="/my-orders"></Route>


      </Routes>
      
     
      <Footer/>
    </StoreContextProvider>
  )
}
export default App;