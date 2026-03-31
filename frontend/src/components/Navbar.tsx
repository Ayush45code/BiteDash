import { useContext, useState } from "react"
import { Bag } from "../Icons/Bag"
import {Search} from "../Icons/Search"
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/context";




type ChildProps = {
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  onLogout: () => void;
};

    export const Navbar=({setopen, user, onLogout}:ChildProps)=>{

    const [tab,settab]=useState("home");

    const context=useContext(StoreContext)!;

    const total=context.totalsum();


    const basicStryle="cursor-pointer  hover:bg-slate-200 flex justify-start md:justify-center md:items-center md:rounded-xl  md:px-3 md:py-0"

    const activestyle="border-b-4  border-gray-400"



    return <div>
         <section id="home">
        <div className="md:grid md:grid-cols-3 flex justify-between w-full items-center text-md md:text-lg p-2 md:p-6">
           
           
           <Link to='/'>
           
            <div className="md:col-span-1 font-serif text-2xl  md:text-3xl md:flex md:justify-center cursor-pointer text-orange-500">BiteDash.</div>



           </Link>
                 
            

    
            
          
            <div className={`hidden md:col-span-1 gap-1  md:gap-10 md:flex md:justify-center` } >
                <Link to="/">
                <div className={`${basicStryle} ${tab=="home" ? activestyle : ""}` } onClick={()=>{settab("home")}}>home</div>
                </Link>
                

             <a href="#menu"><div onClick={()=>{settab("menu")}} className={`${basicStryle} ${tab=="menu" ? activestyle : ""}`}>menu</div></a>
            <a href="#mobile app"><div onClick={()=>{settab("mobile-app")}} className={`${basicStryle} ${tab=="mobile-app" ? activestyle : ""}`}>mobile-app</div></a>
            <a href="#contact us"><div onClick={()=>{settab("contact us")}} className={`${basicStryle} ${tab=="contact us" ? activestyle : ""}`}>contact us</div></a>
            
            
            </div>
            <div className=" md:col-span-1 "><div className="text-center flex  md:justify-center items-center cursor-pointer gap-2 md:gap-6" >
                <div><Search/></div>
                
               <Link to='/cart'>
                 <div className="flex items-baseline md:pb-2 cursor-pointer" >{total!=0 && <div className=" text-orange-500 md:text-4xl mt-0 ">.</div>}<Bag/></div>

               
               </Link>
              

                <div  >{user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Hi, {user.name}</span>
                        <button onClick={onLogout} className="cursor-pointer px-3 py-1 rounded-lg bg-red-500 text-white hover:scale-110 transition-transform duration-300">Logout</button>
                    </div>
                ) : (
                    <button onClick={() => setopen(true)} className="cursor-pointer px-3 py-1 rounded-lg bg-orange-500 text-white hover:scale-110 transition-transform duration-300">Sign in</button>
                )}</div> </div> </div>
        </div>
        </section>

    </div>
}

