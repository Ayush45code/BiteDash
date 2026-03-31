import { Apple } from "../Icons/Apple"
import { PlayStore } from "../Icons/Playstore"
import { Button } from "./Button"

export const AppDownload=()=>{
    return <div className="flex flex-col justify-center mt-12 md:mx-80 md:mt-20">
        <section id="mobile app">
                  <h2 className="md:text-2xl text-lg text-center md:font-bold font-serif mb-2 md:mb-4 flex justify-center">For a better experience, download the DashBite app.
      </h2>

        
        
        
        <div className="flex justify-center gap-8 mt-6 md:gap-20 md:mt-10">
            <div className="bg-black text-white rounded-lg transition-transform duration-300 hover:scale-110"><Button size="lg" tittle="Google Play" StartIcon={<PlayStore/>}/></div>
            <div className="bg-black text-white rounded-lg transition-transform duration-300 hover:scale-110"><Button size="lg" tittle="App Store" StartIcon={<Apple/>}/></div>
        </div>
        </section>

    </div>
}