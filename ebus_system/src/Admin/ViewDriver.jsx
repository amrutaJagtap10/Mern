import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {  useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ViewDriver = () => {
  const { id } = useParams(); 

  let[viewDriverData,setViewDriverData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    mob_no:"",
    travel_agency_name:""
  });

  let{firstname,lastname,email,address,mob_no,travel_agency_name}=viewDriverData;

   // Fetch all drivers from Firestore
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const docSnap = await getDoc(doc(db, "driver", id));

        if (docSnap.exists()) {
          setViewDriverData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      }
    };

    fetchDrivers();
  }, []);

 
  return (
    <>
      <div className="min-h-screen flex items-center justify-center  ">
        <div className="bg-gray-100 shadow-2xl rounded-lg p-8 mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-center text-[#C40234]  uppercase">Driver Information</h1>
          <div className="p-6 max-w-4xl mx-auto ">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">{firstname} {lastname} </h2>
  
        {/* Table for Bus Details */}
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold bg-gray-100">Email</td>
              <td className="px-4 py-2">{email}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold bg-gray-100">Travel Agency</td>
              <td className="px-4 py-2">{travel_agency_name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold bg-gray-100">mobile No.</td>
              <td className="px-4 py-2">{mob_no}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold bg-gray-100">Address</td>
              <td className="px-4 py-2">{address}</td>
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

export default ViewDriver

