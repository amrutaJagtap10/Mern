import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react"
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const UserRegiter = () => {

  let navigate=useNavigate();

  let[userData,setUserData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    dob:"",
    gender:"",
    address:"",
    phone_no:"",
    password:"",
    confirm_pass:""
  })

  let{firstname,lastname,email,dob,gender,address,phone_no,password,confirm_pass}=userData;

  let[isPasswordMatch,setIsPasswordMatch]=useState(false);

  let[error,setError]=useState("");

  let handleChange=(e)=>{
    let{name,value}=e.target;
    setUserData({...userData,[name]:value})

    // Check password match dynamically
    if (name === "confirm_pwd") {
      setIsPasswordMatch(password !== value);
    }
  }

  let handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(userData);
    try {
      if(firstname !== "" && lastname !== "" && email !== "" && gender !== "" && dob !== "" && address !== "" && phone_no !== "" && password !== "" && confirm_pass !== ""){
        if(password !== confirm_pass){
          setIsPasswordMatch(true)
          return;
        }

        // Query Firestore to check if email already exists
        const usersRef = collection(db, "user");
        const emailQuery = query(usersRef, where("email", "==", email));
        const emailSnapshot = await getDocs(emailQuery);

        if (!emailSnapshot.empty) {
          setError("Email already exists. Please use a different email.");
          return;
        }

        // If email does not exist, add new user
        await addDoc(usersRef,{
          firstname,lastname,email,gender,dob,address,phone_no,password,createdAt:new Date(),
        })

        alert("User Registered Successfully!!!");
        navigate("/login");

        setUserData({
          firstname:"",
          lastname:"",
          email:"",
          dob:"",
          gender:"",
          address:"",
          phone_no:"",
          password:"",
          confirm_pass:""
        })
        setIsPasswordMatch(false)
        setError("");
      }
      else{
        setError("Please Fillup All Fields.")
      }
    } catch (error) {
      setError("Something went wrong.",error)
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 primary">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234] dark:text-white mb-6 uppercase">User Registration</h1>
          

          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="firstname" id="floating_first_name" value={firstname} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="lastname" id="floating_last_name" value={lastname} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="floating_email" value={email} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
            </div>

            
            <div className="mb-5">
              <span className="text-sm text-primary dark:text-primary">Gender:</span>
              <div className="flex items-center space-x-4 mt-2" value={gender} onChange={handleChange} >
                <label className="flex items-center">
                  <input type="radio" name="gender" value="male" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-opacity-50" required />
                  <span className="ml-2 text-sm text-primary dark:text-primary">Male</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" value="female" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-opacity-50" />
                  <span className="ml-2 text-sm text-primary dark:text-primary">Female</span>
                </label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group user_dob">
              <input type="date" name="dob" id="floating_dob" value={dob} onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder="" required />
              <label htmlFor="floating_dob" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
            </div>


            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="address" id="floating_address" value={address} onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
              <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            </div>


            {/* <div className="grid md:grid-cols-2 md:gap-6"> */}
              <div className="relative z-0 w-full mb-5 group">
                  <input type="tel" pattern="[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone_no" id="floating_phone" value={phone_no} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number (123-456-7890)</label>
              </div>

              {/* <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
              </div> */}

              <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="floating_password" value={password} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="confirm_pass" id="floating_repeat_password" value={confirm_pass} onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${ isPasswordMatch ? "border-red-500" : "border-gray-300 dark:border-gray-600" } appearance-none dark:text-white  dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer`} placeholder=" " required />
                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
              </div>
              {isPasswordMatch && <p className="text-red-500 text-sm mt-1">Password do not match.</p>}
            
              
            {/* </div> */}
            <div className="text-center">
              <button type="submit" className="uppercase cursor-pointer text-white primary hover:primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:primary dark:hover:primary dark:focus:ring-blue-800">Submit</button>
            </div>

          {error && <div className="text-red-500 text-center mb-4 mt-2">{error}</div>}

          </form>
        </div>
      </div>
    </>
  )
}

export default UserRegiter