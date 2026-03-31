import { menu_list } from "../assets/assets";


type ExploreMenuProps = {
  category: string;
  setcategory: React.Dispatch<React.SetStateAction<string>>;
};


export const ExploreMenu = ({category,setcategory}:ExploreMenuProps) => {
  const active="bg-red-500 rounded-full p-1 md:p-2 border-2 md:border-4 "
  return (
    
    <div className="md:px-48 md:mt-8 mt-4 ml-2 ">
      <section id="menu">
      
     
              <h2 className="md:text-2xl font-bold font-serif mb-2 md:mb-4">
        Explore our menu
      </h2>

    


      

    
      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar ">
        <div className="flex space-x-4">
          {menu_list.map((item, index) => (
            <div

            onClick={()=>{
              category===item.menu_name? setcategory("all"): setcategory(item.menu_name)

            }}

              key={index}

              className={`flex-none snap-start text-center cursor-pointer rounded-2xl border-2 hover:bg-slate-200 `}
            ><div className={` ${category==item.menu_name? active : ""}`}>
                <img
                src={item.menu_image}
                alt={item.menu_name}
                className="md:w-40 md:h-36 w-24 h-20 rounded-full object-cover"
              />

            </div>
            
              <div className="mt-1 text-sm md:mt-2 md:text-lg">{item.menu_name}</div>
            </div>
          ))}
        </div>
      </div>
      </section>


    </div>
  );
};
