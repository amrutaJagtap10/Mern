import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const EditDriver = () => {
  const { id } = useParams(); // Get ID from URL
  let navigate= useNavigate();

  let[editDriverData,setEditDriverData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    mob_no:"",
    travel_agency_name:"",
    password:"",
    confirm_pwd:""
  });

  let{firstname,lastname,email,address,mob_no,travel_agency_name,password,confirm_pwd}=editDriverData;

  let[isPasswordEditing,setIsPasswordEditing]=useState(false);
  let[isPasswordMatch,setIsPasswordMatch]=useState(false);

  let handleChange=(e)=>{
    let{name,value}=e.target;
    setEditDriverData({...editDriverData,[name]:value});

    // Check password match dynamically
    if (name === "confirm_pwd") {
      setIsPasswordMatch(password !== value);
    }

    if(name==="password"){
      setIsPasswordEditing(true)
    }

  }

   // Fetch all drivers from Firestore
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const docSnap = await getDoc(doc(db, "driver", id));

        if (docSnap.exists()) {
          setEditDriverData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      }
    };

    fetchDrivers();
  }, []);

 
  //Handle Update Driver
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !address || !mob_no || !travel_agency_name || !password) {
      alert("All fields are required!");
      return;
    }
    try {

      if(password !== confirm_pwd){
        // alert("Passwords do not match!");
        setIsPasswordMatch(true)
        return;
      }

      const driverRef = doc(db, "driver", id);
      // await updateDoc(driverRef, editDriverData);
      const docSnap = await getDoc(driverRef);

      if (docSnap.exists()) {
        const existingBus = docSnap.data();

        // Update the document while keeping createdAt unchanged
        await updateDoc(driverRef, {
          firstname,
          lastname,
          email,
          address,
          mob_no,
          travel_agency_name,
          password,
          modifiedAt: new Date(), // Updating the modifiedAt timestamp
          createdAt: existingBus.createdAt, // Preserve createdAt
        });
      }
      toast.success("Driver Updated Successfully!", { autoClose: 2000 }); // ✅ Show toast
      setTimeout(() => navigate("/admin/alldrivers"), 2500); // Redirect back to DriverList

    } catch (error) {
      toast.error("Error updating driver: ", error);
    }
  };


  return (
    <>
      {/* <Dashboard/> */}
      <ToastContainer /> 
      <div className="min-h-screen flex item-center justify-center bg-grey-100 dark:bg-grey-900" >
        <div className="bg-white dark:bg-grey-800 shadow-md rounded-lg p-10 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234] dark:text-[#C40234] mb-6 uppercase">Driver Updation</h1>

          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">First Name: </label>
              <input type="text" id="firstname" placeholder="Enter your firstname" name="firstname" value={firstname} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="lastname" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Last Name: </label>
              <input type="text" id="lastname" placeholder="Enter your lastname" name="lastname" value={lastname} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2"  />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Email: </label>
              <input type="email" id="email" placeholder="Enter your email" name="email" value={email} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2"  />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Address: </label>
              <textarea name="address" id="address" cols="30" rows="3" placeholder="Enter your address" value={address} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2" ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="mob_no" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Mobile No.: </label>
              <input type="number" id="mob_no" placeholder="Enter your mobile no." name="mob_no" value={mob_no} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="travel_agency_name" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Travel Agency Name: </label>
              <input type="text" id="travel_agency_name" placeholder="Enter your travel agency name" name="travel_agency_name" value={travel_agency_name} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2"  />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Password: </label>
              <input type="password" id="password" placeholder="Enter your password" name="password" value={password} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>

            {/* Confirm Password */}
            {isPasswordEditing && (
              <div className="mb-4">
                <label htmlFor="confirm_pwd" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Confirm Password: </label>
                <input type="password" id="confirm_pwd" placeholder="Enter your confirm password" name="confirm_pwd" value={confirm_pwd} onChange={handleChange} className={`flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border ${
                  isPasswordMatch ? "border-red-500" : "border-grey-300 dark:border-grey-600"
                } text-grey-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2`}
              />
              {isPasswordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}

              </div>
            )}

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
              <button className="cursor-pointer uppercase bg-[#C40234] hover:bg-white text-white hover:text-[#C40234] border hover:border-[#C40234] font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C40234] focus:ring-opacity-50 ">Update</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default EditDriver

