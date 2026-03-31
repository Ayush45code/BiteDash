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
        
        const cartItems = Object.entries(context.items)
            .filter(([_, quantity]) => quantity > 0)
            .map(([foodId, quantity]) => ({
                food: foodId,
                quantity
            }));

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

        try {
            const response = await orderAPI.createOrder(orderData);
            if (response.success) {
                alert("Order placed successfully!");
                context.setItems({});
                navigate("/");
            } else {
                alert("Failed to place order: " + response.message);
            }
        } catch (error) {
            alert("Error placing order!");
        }
    };

    return <div className="flex flex-col lg:flex-row mt-20 px-4 sm:px-6 lg:px-8 xl:px-20 gap-8">
        <form onSubmit={handleSubmit} className="flex-1">
        <div className="max-w-xl">
  <div className="flex flex-col gap-3">

    <div className="text-xl font-bold mb-3">
      Delivery Information
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <input 
        className="flex-1 border-2 p-2 text-sm rounded" 
        type="text" 
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input 
        className="flex-1 border-2 p-2 text-sm rounded" 
        type="text" 
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </div>

    <input 
      className="w-full border-2 p-2 text-sm rounded" 
      type="email" 
      placeholder="Email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input 
      className="w-full border-2 p-2 text-sm rounded" 
      type="text" 
      placeholder="Street"
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      required
    />

    <div className="flex flex-col sm:flex-row gap-3">
      <input 
        className="flex-1 border-2 p-2 text-sm rounded" 
        type="text" 
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input 
        className="flex-1 border-2 p-2 text-sm rounded" 
        type="text" 
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
    </div>
  
    <div className="flex flex-col sm:flex-row gap-3">
      <input 
        className="flex-1 border-2 p-2 text-sm rounded" 
        type="text" 
        placeholder="Zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        required
      />
      <input 
        className="flex-1 border-2 p-2 text-sm rounded" 
        type="text" 
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
    </div>

    <input 
      className="w-full border-2 p-2 text-sm rounded" 
      type="tel" 
      placeholder="Phone no"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
    />

  </div>
  </div>
        </form>
            <div className="w-full lg:w-96 lg:flex-shrink-0">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-lg lg:text-xl font-bold mb-4"> 
                    Cart Totals
                </div>
                <div className="flex justify-between text-sm lg:text-base my-2">
                    <div>Subtotal</div>
                    <div>${total()}</div>
                </div>
                
                <div className="flex border-t justify-between my-2 pt-2">
                    <div>Delivery Fee</div>
                    <div>{total()==0 ? "$0" : "$2"}</div>
                </div>
                <div className="flex border-t font-bold text-sm lg:text-base justify-between my-2 pt-2">
                    <div>Total</div>
                    <div>{total()==0 ? "$0": `$${total()+2}`}</div>
                </div>

                <button type="submit" onClick={handleSubmit} className="w-full rounded-md text-sm py-2 mt-4 bg-orange-500 text-white transition-all duration-200 hover:bg-orange-600">PROCEED TO PAYMENT</button>
            </div>
            </div>
        </div>
}