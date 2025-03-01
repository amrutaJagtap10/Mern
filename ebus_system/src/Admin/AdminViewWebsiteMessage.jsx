import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {  useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AdminViewWebsiteMessage = () => {
  const { id } = useParams(); 

  let[viewContactData,setViewContactData]=useState({
    name:"",
    email:"",
    message:""
  })

  let{name,email,message}=viewContactData;

   // Fetch all drivers from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const docSnap = await getDoc(doc(db, "contacts", id));

        if (docSnap.exists()) {
          setViewContactData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }
    };

    fetchContacts();
  }, []);

 
  return (
    <>
      <div className="min-h-screen flex items-center justify-center  ">
        <div className="bg-gray-100 shadow-2xl rounded-lg p-8 mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-center text-[#C40234]  uppercase">Contact Information</h1>
          <div className="p-6 max-w-4xl mx-auto ">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">{name} </h2>
  
        {/* Table for Bus Details */}
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold bg-gray-100">Email</td>
              <td className="px-4 py-2">{email}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold bg-gray-100">Message</td>
              <td className="px-4 py-2">{message}</td>
            </tr>
         
          </tbody>
        </table>
  
        {/* Back Button */}
        <div className="text-center mt-4 flex-row">
          <button
            onClick={() => window.history.back()}
            className="bg-[#ff5b00] text-white px-4 py-2 rounded-md hover:bg-[#ff5b00] btnback cursor-pointer"
          >
            <FaArrowLeft /> <span>Back</span>
          </button>
        </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminViewWebsiteMessage

