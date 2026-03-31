import { useState } from "react"
import { foodAPI } from "../services/api"
import { toast } from "react-toastify"


export const Add = () => {

const [image, setimage] = useState<File | null>(null);

const [data,setdata]=useState({
  name:"",
  description:"",
  price:"",
  category:"Salad"
})

const onChangeHandler =(event:any)=>{
  const name=event.target.name;
  const value=event.target.value;

  setdata(data=>({...data,[name]:value}))

}

const onSubmitHandler = async (event: React.FormEvent) => {
  event.preventDefault();
  
  if (!image) {
    toast.error("Please upload an image");
    return;
  }

  const formData = new FormData();
  formData.append('image', image);
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price);
  formData.append('category', data.category);

  try {
    const response = await foodAPI.addFood(formData);
    if (response.success) {
      toast.success("Food item added successfully");
      setdata({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });
      setimage(null);
    } else {
      toast.error(response.message || "Failed to add food item");
    }
  } catch (error) {
    toast.error("Error adding food item");
    console.error("Error:", error);
  }
}



  return (<div className="flex-1 p-8 max-w-2xl">
      <form onSubmit={onSubmitHandler} className="space-y-6">
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
            {image ? <img src={`${URL.createObjectURL(image)}`} alt="" /> : <div> <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-xs text-gray-500">Upload</span> </div>}
           
            <input onChange={(e)=>{
                setimage(e.target.files?.[0] || null)

              
            }} type="file" accept="image/*" className="hidden" />
          </label> 
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product name</label>
          <input
            type="text"
            placeholder="Type here"
            name='name'
            value={data.name}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product description</label>
          <textarea
           onChange={onChangeHandler}
          name ="description"
          value={data.description}
         
            placeholder="Write content here"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product category</label>
            <select onChange={onChangeHandler} name="category" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white">
              <option>Salad</option>
              <option>Rolls</option>
              <option>Deserts</option>
              <option>Vegetarian</option>
              <option>Cake</option>
              <option>Sandwitch</option>
              <option>Noodles</option>
              <option>Pasta</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product price</label>
            <input
            onChange={onChangeHandler}
            value={data.price}
            name="price"
              type="Number"
              placeholder="$20"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>

     
        <button
          type="submit"
          className="px-8 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          ADD
        </button>
      </form>
    </div>
  )
}

