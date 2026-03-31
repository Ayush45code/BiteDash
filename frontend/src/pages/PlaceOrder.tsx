import { useContext, useState } from "react"
import { StoreContext } from "../Context/context"
import { orderAPI } from "../services/api"
import { useNavigate } from "react-router-dom"

export const PlaceOrder=()=>{
    const context=useContext(StoreContext)!;

    const total=context.totalsum;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Get cart items from context
        const cartItems = Object.entries(context.items)
            .filter(([_, quantity]) => quantity > 0)
            .map(([foodId, quantity]) => ({
                food: foodId,
                quantity
            }));

        console.log("Cart items to send:", cartItems);
        console.log("Context items:", context.items);

        if (cartItems.length === 0) {
            alert("Your cart is empty! Please add items to cart first.");
            return;
        }

        const orderData = {
            items: cartItems,
            customerName: `${firstName} ${lastName}`,
            customerEmail: email,
            customerAddress: `${street}, ${city}, ${state} ${zipcode}, ${country}`,
            customerPhone: phone,
            totalAmount: total() + (total() > 0 ? 2 : 0),
            paymentMethod: 'cod'
        };

        console.log("Sending order data:", orderData);

        try {
            const response = await orderAPI.createOrder(orderData);
            console.log("Order response:", response);
            if (response.success) {
                alert("Order placed successfully!");
                // Clear cart after successful order
                context.setItems({});
                navigate("/");
            } else {
                alert("Failed to place order: " + response.message);
            }
        } catch (error) {
            alert("Error placing order!");
            console.error("Order error:", error);
        }
    };

    return <div className="flex mt-20">
        <form onSubmit={handleSubmit}>
        <div className="flex mx-52  justify-between">
  
  <div className="flex flex-col gap-3 w-[400px]">

    <div className="text-xl font-bold mb-3">
      Delivery Information
    </div>

    <div className="flex gap-3">
      <input 
        className="flex-1 border-2 p-2 text-sm" 
        type="text" 
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input 
        className="flex-1 border-2 p-2 text-sm" 
        type="text" 
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </div>

    <input 
      className="w-full border-2 p-2 text-sm" 
      type="email" 
      placeholder="Email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input 
      className="w-full border-2 p-2 text-sm" 
      type="text" 
      placeholder="Street"
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      required
    />

    <div className="flex gap-3">
      <input 
        className="flex-1 border-2 p-2 text-sm" 
        type="text" 
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input 
        className="flex-1 border-2 p-2 text-sm" 
        type="text" 
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
    </div>

  
    <div className="flex gap-3">
      <input 
        className="flex-1 border-2 p-2 text-sm" 
        type="text" 
        placeholder="Zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        required
      />
      <input 
        className="flex-1 border-2 p-2 text-sm" 
        type="text" 
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
    </div>


    <input 
      className="w-full border-2 p-2 text-sm" 
      type="tel" 
      placeholder="Phone no"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
    />

  </div>
  </div>
            <div>
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

                <button type="submit" className="rounded-md text-xs px-2 py-1 mt-1 md:text-sm md:py-1 md:px-3 md:mt-3 bg-orange-500 text-white transition-all duration-200 hover:scale-110">PROCEED TO PAYMENT</button>

            </div>



            </div>
        </form>
        </div>
        
   
}