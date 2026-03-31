import { useContext } from "react"
import { StoreContext } from "../Context/context"
import { Fooditem } from "./Fooditem";


export type FoodItem ={
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

type ExploreMenuProps = {
  category: string;
  setcategory: React.Dispatch<React.SetStateAction<string>>;
};

export const FoodDisplay=({category}:ExploreMenuProps)=>{
    const context=useContext(StoreContext)

if(!context){
    throw new Error("context wrong")
}

const {food_list}=context;

let todisplay=food_list;

if(category!="all"){
    todisplay=food_list.filter((x)=>x.category===category)

}




    return <div>
        <div className="md:ml-44 ml-2 mr-2 md:mr-44 md:mt-20 mt-8 border-t-gray-300 border-2 ">

        </div>
        <div className="md:text-2xl mt-5 ml-2 text-md font-serif font-bold md:ml-44 md:mt-10">
            {category==="all" && "Top dishes near you"}
            {category!="all" && category}

        </div>
        <div className="md:ml-44 ml-2 mt-3 mr-2 grid grid-cols-2 md:grid md:grid-cols-3 gap-6 md:gap-32  md:mr-44 md:mt-10">
            {todisplay.map((item:FoodItem)=>(
                <Fooditem key={item._id} item={item}/>

            ))
        }
        </div>
        
    </div>

}