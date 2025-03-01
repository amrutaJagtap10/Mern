import { useState } from "react"
import Dashboard from "./Dashboard"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DriverRegistration = () => {

  let navigate=useNavigate();

  let[driverData,setDriverData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    mob_no:"",
    travel_agency_name:"",
    password:"",
    confirm_pwd:""
  });

  


  let{firstname,lastname,email,address,mob_no,travel_agency_name,password,confirm_pwd}=driverData;

  

  let[isPasswordMatch,setIsPasswordMatch]=useState(false)

  let handleChange=(e)=>{
    let{name,value}=e.target;
    setDriverData({...driverData,[name]:value});

    // Check password match dynamically
    if (name === "confirm_pwd") {
      setIsPasswordMatch(password !== value);
    }

  }

  let handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(driverData);
    try {

      if(firstname !== "" && lastname !== "" && email !== "" && address !== "" && mob_no !== "" && travel_agency_name !== "" && password !== "" && confirm_pwd !== ""){
        
        if(password !== confirm_pwd){
          // alert("Passwords do not match!");
          setIsPasswordMatch(true)
          return;
        }

        await addDoc(collection(db,'driver'),{
          firstname,
          lastname,
          email,
          address,
          mob_no,
          travel_agency_name,
          password, // ⚠️ Ideally, you should hash the password before storing
          createdAt: new Date(),
        })

          toast.success("Driver Updated Successfully!", { autoClose: 2000 }); // ✅ Show toast

        await axios.post("http://localhost:5000/send-email", {
          name:"EbusSystem",
          email: driverData.email, // Correct format without unnecessary brackets
          message: `Hello ${driverData.firstname} ${driverData.lastname}, 
          your account has been created successfully by Admin. Here are your credentials:
          Username: ${driverData.email}
          Password: ${driverData.password}

          Please ensure you keep this information secure. 

          If you face any issues logging in, feel free to reach out to the admin for assistance.
          
          Welcome EbusSystem Driver Panel!
          
          Best regards,
          EbusSystem`
          
        });
        
        setTimeout(() => navigate("/admin/alldrivers"), 2500); // ✅ Navigate after toast

        // alert("Driver Registered Successfully!!!")
  
        setDriverData({
          firstname:"",
          lastname:"",
          email:"",
          address:"",
          mob_no:"",
          travel_agency_name:"",
          password:"",
          confirm_pwd:""
        })
      }else{
        toast.error("Please Fill up all fields.")
      }
      

    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error saving driver data");
    }
    
    
  }

  return (
    <>
      {/* <Dashboard/> */}
    <ToastContainer /> 

      <div className="min-h-screen flex item-center justify-center bg-grey-100 dark:bg-grey-900" >
        <div className="bg-white dark:bg-grey-800 shadow-md rounded-lg p-10 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234]  mb-6 uppercase">Driver Registtration</h1>

          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Password: </label>
              <input type="password" id="password" placeholder="Enter your password" name="password" value={password} onChange={handleChange} className="flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border border-grey-300 dark:border-grey-600 text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="confirm_pwd" className="block text-sm font-medium text-grey-700 dark:text-grey-300 mb-1 uppercase">Confirm Password: </label>
              <input type="password" id="confirm_pwd" placeholder="Enter your confirm password" name="confirm_pwd" value={confirm_pwd} onChange={handleChange} className={`flex-1 rounded-md bg-grey-50 dark:bg-grey-700 border ${
                isPasswordMatch ? "border-red-500" : "border-grey-300 dark:border-grey-600"
              } text-grey-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2`}
            />
            {isPasswordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}

            </div>

            <button className="cursor-pointer w-full uppercase font-bold bg-[#C40234] hover:bg-white text-white hover:text-[#C40234] border hover:border-[#C40234] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C40234] focus:ring-opacity-50 ">Register</button>

          </form>
        </div>
      </div>
    </>
  )
}

export default DriverRegistration

