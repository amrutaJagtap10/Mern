import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { db } from "../firebase";

const Contact = () => {

 let [contactData,setContactData]=useState({
  name:"",
  email:"",
  message:""
 })

 let{name,email,message}=contactData;

 let handleChange=(e)=>{
  let{name,value}=e.target;
  setContactData({...contactData,[name]:value})
 }

 let handleSubmit=async (e)=>{
  e.preventDefault();
  if(name!=="" || email!=="" || message!==""){
    await addDoc(collection(db,'contacts'),{
      name,
      email,
      message,
      createdAt: new Date(),
    })
    console.log(contactData);
    toast.success("Message Submitted Successfully!!!");

    setContactData({
      name:"",
      email:"",
      message:""
    })
    
  }else{
    toast.warning("Please fillup all details.")
  }
 }

 
  return (
    <>
    <ToastContainer /> 
    
      <div className='w-full h-16 primary my-10'>
        <h1 className='text-center text-3xl font-bold uppercase leading-14 text-white'>Contact Us</h1>
      </div>
      <div>
        <p className="text-lg mb-6 text-gray-600 text-center">
          We'd love to hear from you! Please feel free to reach out to us using
          the contact information or the form below.
        </p>
      </div>
      <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-3 mb-10 mx-10">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0 shadow-2xl rounded-lg border-2 border-[#c40234] ">
          <img
            src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
            alt="Contact Us Illustration"
            className="w-3/4 md:w-full rounded-lg shadow-md"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center">


          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-2xl p-6 mb-6 w-full max-w-lg border-2 border-[#c40234]">
            <h2 className="text-2xl font-semibold mb-4">Our Contact Information</h2>
            <ul className="text-gray-700">
              <li className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@ebussystem.com"
                  className="text-blue-600 hover:underline"
                >
                  support@ebussystem.com
                </a>
              </li>
              <li className="mb-2">
                <strong>Phone:</strong> +1 (123) 456-7890
              </li>
              <li>
                <strong>Address:</strong> 123 Ebus Lane, Transit City, TS 45678
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg border-2 border-[#c40234]">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full bg-[#c40234] text-white font-medium py-2 rounded-lg hover:bg-[#c40234] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Contact

