import { Header } from "../components/Header"
import { ExploreMenu } from "../components/ExploreMenu"
import { useState } from "react"
import { FoodDisplay } from "../components/FoodDisplay";
import { AppDownload } from "../components/Appdownload";

export const Home=()=>{
    const [category,setcategory]=useState("all");
    return <div className="w-full">
        <Header/>
        <ExploreMenu category={category} setcategory={setcategory}/>
        <FoodDisplay category={category} setcategory={setcategory} />
        <AppDownload/> 
        {/* 
        
        
        */}

        
        

        
    </div>
}