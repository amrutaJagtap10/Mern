import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react"
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

  let navigate=useNavigate();

  let[userData,setUserData]=useState({
    email:"",
    password:""
  })

  let{email,password}=userData;

  let[error,setError]=useState("")

  let handleChange=(e)=>{
    let{name,value}=e.target;
    setUserData({...userData,[name]:value})
  }

  let handleSubmit= async (e)=>{
    e.preventDefault();
    setError("");

    try {
      if (email !== "" && password !== "") {
        console.log(userData);

        const userRef=collection(db,"user");
        const q=query(userRef,where("email", "==", email));
        const querySnapshot=await getDocs(q)

        if (querySnapshot.empty) {
          setError("Not found any brecord of this email");
          return;
        }

        const userDoc = querySnapshot.docs[0].data();
        const storedPassword=userDoc.password;

        if(storedPassword === password){
          localStorage.setItem("TOKEN",email);
          localStorage.setItem("ROLE","user")

          console.log("Login Successfully");
          alert("Login Successfully!!!");
          navigate("/");
          
        }
        else{
          setError("Invalid Password")
        }
        
      }
      else{
        setError("Please fill up all fields.")
      }
    } catch (error) {
      setError("Invalid Username and Password.",error)
    }
  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#c50033] dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234] dark:text-white mb-6 uppercase">User Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="floating_email" value={email} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_email" 
                className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email address</label>
            </div>
            

            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="floating_password" value={password} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            {/* <div className="flex justify-center"> */}
               <button type="submit" className="uppercase w-full text-white bg-[#C40234] hover:bg-[#C40234] focus:ring-4 focus:outline-none focus:ring-[#C40234] font-medium rounded-lg text-md w-full sm:w-full px-4 py-2 dark:bg-[#C40234] dark:hover:bg-[#C40234] dark:focus:ring-[#C40234]">Login</button>
            {/* </div> */}

            {error && <div className="text-red-500 text-center mb-4 mt-2">{error}</div>}
            
          </form>
        </div>
      </div>
      
    </>
  )
}

export default UserLogin