import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

const AdminEditBusDetails = () => {
  const {id} = useParams();
  let navigate=useNavigate();

  const [editBusInfo, setEditBusInfo] =  useState({
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

  const busTypes = ["AC", "Non-AC", "Sleeper", "Seater", "Electric", "Double-Decker"]; // Available bus types

  let{bus_no,bus_type,source,destination,duration,pickup_time,pickup_date,price,rating,drivername,email,phone_no}=editBusInfo;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEditBusInfo((prevData) => ({
        ...prevData,
        bus_type: checked
          ? [...prevData.bus_type, value] // Add type if checked
          : prevData.bus_type.filter((type) => type !== value), // Remove if unchecked
      }));

      console.log(editBusInfo);
      console.log("*0***0*0*");
      
    } else {
      setEditBusInfo({ ...editBusInfo, [name]: value });
      console.log(editBusInfo);
      
    }
  };

   // Fetch all buses from Firestore
    useEffect(() => {
      const fetchBuses = async () => {
        try {
          const docSnap = await getDoc(doc(db, "buses", id));
          console.log(id);
          console.log(docSnap.data());
          
          
          if (docSnap.exists()) {
            setEditBusInfo(docSnap.data());
          } else {
            console.log("No such document!");
          }
          
        } catch (error) {
          console.error("Error fetching buses: ", error);
        }
      };
  
      fetchBuses();
    }, []);
  

  const handleUpdate = async(e) => {
    e.preventDefault();
    console.log(editBusInfo);
    
    
      if(bus_no !== "" && source !== "" && destination !== "" && duration !== "" && pickup_time !== "" && pickup_date !== "" && price !== "" && rating !== "" &&  drivername !== "" && email !== "" && phone_no !== ""){
        try {
          const busRef = doc(db,"buses",id);
          // await updateDoc(busRef,{bus_no,bus_type,drivername,email,phone_no,modifiedAt:new Date()});
          // await updateDoc(busRef,editBusInfo);
          const docSnap = await getDoc(busRef);

          if (docSnap.exists()) {
            const existingBus = docSnap.data();

            const source_lower=source.toLowerCase();
            const destination_lower=destination.toLowerCase();

            // Update the document while keeping createdAt unchanged
            await updateDoc(busRef, {
              bus_no,
              bus_type,
              source,
              destination,
              source_lower,
              destination_lower,
              duration,
              pickup_time,
              pickup_date,
              price,
              rating,
              drivername,
              email,
              phone_no,
              modifiedAt: new Date(), // Updating the modifiedAt timestamp
              createdAt: existingBus.createdAt, // Preserve createdAt
            });

            toast.success("Bus information Updated Successfully!", { autoClose: 2000 }); // ✅ Show toast
            setTimeout(() => navigate("/admin/allbus_details"), 2500); // ✅ Navigate after toast
        
          }

        } catch (error) {
          toast.error("Failed to add bus information: " + error.message);
        }
        
      }
      else{
        toast.warning("Please Fill Up All Details.");
      }
  };

  return (
    <>
      <ToastContainer /> 
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 primary">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234] dark:text-white mb-6 uppercase">Bus Information Form</h1>
          <form className="max-w-md mx-auto" onSubmit={handleUpdate}>
              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="bus_no" id="bus_no" value={bus_no} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="bus_no" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bus No.</label>
              </div>

              {/* Bus Type Checkbox Group */}
              <div className="relative z-0 w-full mb-5 group">
                <p className="text-sm text-primary dark:text-primary">Bus Type:</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {busTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="bus_type"
                        value={type}
                        checked={bus_type.includes(type)}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-primary rounded focus:ring-[#C40234] dark:focus:ring-[#C40234]"
                      />
                      <span className="text-sm text-primary dark:text-primary">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="source" id="source" value={source} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="source" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Source</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="destination" id="destination" value={destination} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="destination" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destination</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="duration" id="duration" value={duration} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="duration" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="time" name="pickup_time" id="pickup_time" value={pickup_time} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="pickup_time" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pickup Time</label>
              </div>
              
              <div className="relative z-0 w-full mb-5 group">
                  <input type="date" name="pickup_date" id="pickup_date" value={pickup_date} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="pickup_date" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pickup Date</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="rating" id="rating" value={rating} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="rating" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rating</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="price" id="price" value={price} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price (Per Person)</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="drivername" id="floating_drivername" value={drivername} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_drivername" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Driver Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="email" name="email" id="floating_email" value={email} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="tel" pattern="[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone_no" id="floating_phone" value={phone_no} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number (123-456-7890)</label>
              </div>
          
            <div className="flex justify-between">
              <button type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to go back? Unsaved changes will be lost!")) {
                    window.history.back();
                  }
                }}
                  className="bg-[#ff5b00] text-white px-4 py-2 rounded-md hover:bg-[#ff5b00] btnback cursor-pointer">
                    <FaArrowLeft /> <span>Back</span>
                </button>
              <button type="submit" className="w-full uppercase cursor-pointer text-white primary hover:primary focus:ring-4 focus:outline-none focus:ring-[#C40234] font-medium rounded-lg  px-5 py-2.5 text-center dark:primary dark:hover:primary dark:focus:ring-[#C40234]">Submit</button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminEditBusDetails;
