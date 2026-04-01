import { useContext } from "react"
import { StoreContext } from "../Context/context"
import { Cross } from "../Icons/Cross"
import { useNavigate } from "react-router-dom"
import { getImageUrl } from "../services/api.ts"

export const Cart=()=>{
 

    const context=useContext(StoreContext)!
    const food_list=context?.food_list
    const items=context?.items
    const setItems=context.setItems

    const total=context.totalsum

    const navigate=useNavigate();






    return <div>

        <div className="md:ml-40 gap-5 mx-5 md:mx-0 text-xs md:text-sm text-slate-600 grid grid-cols-6 md:gap-10 mt-5 md:mt-10">
            <div className="col-span-2 md:col-span-1">Items</div>
            <div className="hidden md:block">Title</div>
            <div>Price</div>
            <div>Qty</div>
            <div>Total</div>
            <div>Remove</div>

            
        
                    {food_list.map((x)=>{
                       
            if(items?.[x._id] > 0 ){
                return <>
                    <div className="col-span-2 md:col-span-1">
                          <img className=" w-10 h-10 md:w-10 md:h-10" src={getImageUrl(x.image)} alt="" />

                    </div>
                  
                  

                    <div className="hidden md:block text-black">
                        {x.name}

                    </div>

                    <div className="text-black">

                        ${x.price}
                    </div>
                  

                    <div className="text-black">{items?.[x._id]}</div>

                    <div className="text-black">
                        

                       ${
                        //@ts-ignore
                        x.price * parseInt(items?.[x._id]) }
                    </div>


                   <div
  className="text-black cursor-pointer md:mr-40"
  onClick={() => {
    setItems((prev: Record<string, number>) => ({
      ...prev,
      [x._id]:prev[x._id]-1
    }))
  }}
>
  <Cross />
</div>
                    
                

                </>
            }
        })}




        </div>

        <div className="md:flex md:mt-24 mt-10 md:justify-between mx-16 md:mx-40 ">


                        <div className="text-slate-800 text-sm md:text-base mt-10 md:mt-0">
                If you have a promo code, Enter it here 
                <div className="flex ">
                    <div> <input className="border-2 bg-slate-200 text-xs md:text-sm px-7 md:px-28 md:py-1" type="text" placeholder="promo code"/></div>
                    <div className="bg-black text-white rounded-md text-xs px-1 items-center md:text-sm md:px-6 md:py-1">Submit</div>
                </div>

            </div>


            <div className="md:w-96 md:mt-0 mt-10">
                <div className="md:text-xl text-md font-bold mb-2"> 
                    Cart Totals
                </div>
                <div className="flex justify-between  text-sm md:text-base my-1">
                    <div>Subtotal</div>
                    <div> ${total()}</div>

                </div>
                
                <div className="flex border-t-2 text-sm md:text-base justify-between my-1">
                    <div>Delivery Fee</div>
                    <div>{total()==0 ? "$0" : "$2"}</div>
                </div>
                <div className="flex border-t-2 font-bold text-sm md:text-base justify-between">
                    <div>Total</div>
                    <div>{total()==0 ? "$0": `${total()+2}`}</div>
                </div>

                <button onClick={()=>{
                    navigate("/order")
                }} className="w-full md:w-auto rounded-md text-xs px-4 py-2 mt-4 md:mt-3 bg-orange-500 text-white transition-all duration-200 hover:bg-orange-600">PROCEED TO CHECKOUT</button>

            </div>


        </div>







        

        
    </div>
}