import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {  useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AdminViewBusDetails = () => {
  const {id} = useParams();

  const [viewBusInfo, setviewBusInfo] =  useState({
    bus_no: "",
    bus_type: [],
    source:"",
    destination:"",
    duration:"",
    pickup_time:"",
    pickup_date:"",
    price:"",
    rating:"",
    drivername: "",
    email:"",
    phone_no:""
  });

  let{bus_no,bus_type,source,destination,duration,pickup_time,pickup_date,price,rating,drivername,email,phone_no}=viewBusInfo;

  
   // Fetch all buses from Firestore
    useEffect(() => {
      const fetchBuses = async () => {
        try {
          const docSnap = await getDoc(doc(db, "buses", id));
          console.log(id);
          console.log(docSnap.data());
          
          
          if (docSnap.exists()) {
            setviewBusInfo(docSnap.data());
          } else {
            console.log("No such document!");
          }
          
        } catch (error) {
          console.error("Error fetching buses: ", error);
        }
      };
  
      fetchBuses();
    }, []);
  

  return (
      
    <div className="min-h-screen flex items-center justify-center  ">
    
      <div className="bg-white shadow-2xl rounded-lg p-8 mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-center text-[#C40234]  uppercase">Bus Information</h1>
        <div className="p-6 max-w-4xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">{bus_no} Details</h2>

      {/* Table for Bus Details */}
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Type</td>
            <td className="px-4 py-2">{bus_type.join(", ")}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Source</td>
            <td className="px-4 py-2">{source}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Destination</td>
            <td className="px-4 py-2">{destination}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Duration</td>
            <td className="px-4 py-2">{duration} hrs</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Pickup Date</td>
            <td className="px-4 py-2">{pickup_date}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Pickup Time</td>
            <td className="px-4 py-2">{pickup_time}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Price</td>
            <td className="px-4 py-2">₹{price}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Rating</td>
            <td className="px-4 py-2">{rating} ⭐</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold bg-gray-100">Driver</td>
            <td className="px-4 py-2">{drivername}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold bg-gray-100">Phone</td>
            <td className="px-4 py-2">{phone_no}</td>
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

     

      

  );
};

export default AdminViewBusDetails;
