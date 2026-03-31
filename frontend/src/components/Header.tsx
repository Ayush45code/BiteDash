

export const Header=()=>{
    return <div className="flex justify-center relative text-center">
      
            <img src="/8736646.jpg" alt="Food Image" className=" px-2  md:w-9/12 h-auto object-cover rounded-xl md:rounded-xl" ></img>
           <div className="absolute left-4 top-10 md:left-52 rounded-md md:top-20 text-2xl md:text-6xl bg-gray-800 bg-opacity-50 text-white font-bold font-serif text-left">
                Order your <br /> favourite food here
               

              
                
            </div>
            <div className="absolute  top-32  left-4 md:top-96 md:left-52 bg-white text-black rounded-md ">
               <a href="#menu"><button className="md:px-2 md:py-2 px-1 text-sm  md:text-xl font-serif">View Menu</button></a> 
            </div>
          

            
     
 
    </div>
}