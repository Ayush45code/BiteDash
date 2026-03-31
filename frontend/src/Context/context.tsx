import { createContext, useState, useEffect } from "react";
import type {ReactNode} from "react";
import { foodAPI, getImageUrl } from "../services/api";

type FoodItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

type StoreContextProviderProps = {
  children: ReactNode;
};

type StoreContextType = {
  food_list: FoodItem[];
  items: Record<string,number>;
  setItems : React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addtocard:(item_id:string)=> void;
  subtocard:(item_id:string)=> void;
  totalsum:()=>number;
};

export const StoreContext=createContext<StoreContextType| undefined>(undefined)



export   const StoreContextProvider=(props:StoreContextProviderProps)=>{

 const [items, setItems] = useState<Record<string, number>>({})
 const [food_list, setFoodList] = useState<FoodItem[]>([])

 useEffect(() => {
   const fetchFoodList = async () => {
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
         setFoodList(formattedItems);
       }
     } catch (error) {
       console.error("Error fetching food list:", error);
     }
   };

   fetchFoodList();
 }, []);

    const addtocard=(item_id:string)=>{
        if(!items[item_id]){
            setItems((prev)=>({...prev,[item_id]:1}))
        }
        else{
            setItems((prev)=>({...prev,[item_id]:prev[item_id]+1}))
        }
    }


    const subtocard=(item_id:string)=>{
        
        setItems((prev)=>({...prev,[item_id]:prev[item_id]-1}))


    }

    const totalsum=()=>{
        let sum=0;

      food_list.map((x)=>{
        if(items[x._id]>0){
            sum+=x.price*items[x._id]
        }

      })
      return sum;
    }


    const contextValue:StoreContextType={
        food_list,
        items,
        setItems,
        addtocard,
        subtocard,
        totalsum


    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}

        </StoreContext.Provider>
    )
}