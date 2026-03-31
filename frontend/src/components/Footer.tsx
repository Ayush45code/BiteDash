import { Facebook } from "../Icons/Facebook"
import { LinkedIn } from "../Icons/Linkedin"
import { Twitter } from "../Icons/Twitter"


const Footer = () => {
  return (
    <div className="bg-slate-900 ">
         <section id="contact us">
    <div className="md:grid  md:grid-cols-3 flex flex-col justify-start mt-20 md:mt-40  ">
        <div className="md:ml-28">
           
                 <div className="font-serif  md:text-3xl  text-orange-500 text-xl">BiteDash.</div>

           
            
            <div className="text-white md:pr-10 text-sm">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2026 © BiteDash™ Ltd. All rights reserved.</div>
            <div className="flex ">
                <div ><Facebook/></div>
                <div><Twitter/></div>
                <div><LinkedIn/></div>
            </div>
        </div>
        <div  >
            <div className="md:text-xl text-white flex justify-start md:justify-center md:font-bold mt-5 mb-1  md:mt-0 md:mb-0">COMPANY</div>
            <div className="text-white text-sm md:text-base flex flex-col md:mt-2 items-start md:mx-auto md:w-fit">
            <div >Home</div>
            <div>About us</div>
            <div>Delivery</div>
            <div>Privacy policy</div>
            </div>

        </div>
        <div>
            <div className="md:text-xl text-white flex justify-start md:justify-center md:font-bold mt-5   md:mt-0 md:mb-0">GET IN TOUCH</div>
            <div className="text-white flex flex-col md:mt-2 items-start md:mx-auto md:w-fit">
            <div className="text-sm md:text-base">+1-212-456-2006</div>
            <div className="text-sm md:text-base">contact@dashbite.com</div>

            </div>
            </div>

        </div>
        <div className="border-t-2 border-white md:ml-28 md:mr-28 mt-5 md:mt-10 md:mb-10 ">

        </div>
        <div className="text-white flex justify-center md:text-base text-sm">
            Copyright 2024 © dashbite.com - All Right Reserved.


        </div>
        </section>

    </div>
  )
}

export default Footer