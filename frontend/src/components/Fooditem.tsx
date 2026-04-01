import { StoreContext } from "../Context/context"
import { Minus } from "../Icons/Minus"
import { Plus } from "../Icons/Plus"
import { Star } from "../Icons/Rating"
import type { FoodItem } from "./FoodDisplay"
import { getImageUrl } from "../services/api.ts"

import { useContext } from "react"

type Fooditemprops={
    item:FoodItem
}

export const Fooditem=({item}:Fooditemprops)=>{
    const context=useContext(StoreContext)


    if (!context){
        throw Error("error from context")
    }


    return <div className="border-2 rounded-xl shadow-lg hover:scale-110 duration-200 transition-all cursor-pointer">
        <div className="flex justify-center relative">
            <img src={getImageUrl(item.image)} alt="" className="md:w-80 w-20 h-20 md:h-60 rounded-full md:rounded-xl"/>
            <div className="absolute bottom-0 right-0 md:bottom-1 md:right-1">
            {(!context.items[item._id] || context.items[item._id]===0 )  && <div  className="bg-white rounded-full cursor-pointer" onClick={()=>{context.addtocard(item._id)}}> <Plus/></div>}
            
            {context.items[item._id]!==0 && context.items[item._id] && <div>
                <div className="flex md:gap-1 bg-white rounded-full md:rounded-xl md:p-1">
                    
                    <div onClick={()=>{context.subtocard(item._id)}} className="bg-red-300 text-red-600 rounded-full cursor-pointer"><Minus/></div>
                    <div className="md:text-base text-sm" >{context.items[item._id]}</div>
                    <div onClick={()=>{context.addtocard(item._id)}} className="bg-green-300 text-green-600 rounded-full cursor-pointer"><Plus/></div>
                </div>
                </div>}
                
            </div>

        </div>
        <div className="flex justify-evenly md:justify-between content-start ">
            <div className="text-sm md:text-lg">{item.name}</div>
            <div className="p-1 md:p-2 "><Star/></div>
        </div>
        <div className="hidden md:text-md"> {item.description}</div>
        <div className="md:text-lg text-sm  text-orange-500">${item.price}</div>
        
    </div>
}