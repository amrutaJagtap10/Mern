import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminEditUser = () => {

  let { id } = useParams();

  let navigate=useNavigate();

  let[userData,setUserData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    dob:"",
    gender:"",
    address:"",
    phone_no:""
  })

  let{firstname,lastname,email,dob,gender,address,phone_no}=userData;

  let[error,setError]=useState("");

  let handleChange=(e)=>{
    let{name,value}=e.target;
    setUserData({...userData,[name]:value})
  }

    // Fetch all drivers from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const docSnap = await getDoc(doc(db, "user", id));

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [id]);
  

  let handleUpdate = async (e) => {
    e.preventDefault();
  
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      gender !== "" &&
      dob !== "" &&
      address !== "" &&
      phone_no !== ""
    ) {
      try {
        const userRef = doc(db, "user", id);
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          const existingUser = docSnap.data();
  
          await updateDoc(userRef, {
            firstname,
            lastname,
            email,
            gender,
            dob,
            address,
            phone_no,
            modifiedAt: new Date(),
            createdAt: existingUser.createdAt,
          });
  
          toast.success("User Updated Successfully!", { autoClose: 2000 }); // ✅ Show toast
          setTimeout(() => navigate("/admin/allusers"), 2500); // ✅ Navigate after toast
        } else {
          toast.error("User not found.");
        }
      } catch (error) {
        toast.error("Something went wrong.",error);
      }
    } else {
      toast.warning("Please fill up all fields.");
    }
  };
  

  return (
    <>
    <ToastContainer /> 

      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 primary">
        <div className="bg-white dark:bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234] mb-6 uppercase">User Registration</h1>
          

          <form className="max-w-md mx-auto" onSubmit={handleUpdate}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="firstname" id="floating_first_name" value={firstname} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="lastname" id="floating_last_name" value={lastname} onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#C40234] peer-focus:dark:text-[#C40234] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="floating_email" value={email} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
            </div>

            
            <div className="mb-5">
              <span className="text-sm text-primary dark:text-primary">Gender:</span>
              <div className="flex items-center space-x-4 mt-2" value={gender}  >
                <label className="flex items-center">
                  <input type="radio" name="gender" value="male" checked={gender == "male"} onChange={handleChange} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-opacity-50" required />
                  <span className="ml-2 text-sm text-primary dark:text-primary">Male</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" value="female" checked={gender == "female"} onChange={handleChange} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-opacity-50" />
                  <span className="ml-2 text-sm text-primary dark:text-primary">Female</span>
                </label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group user_dob">
              <input type="date" name="dob" id="floating_dob" value={dob} onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder="" required />
              <label htmlFor="floating_dob" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
            </div>


            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="address" id="floating_address" value={address} onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
              <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            </div>


            <div className="relative z-0 w-full mb-5 group">
                <input type="tel" pattern="[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone_no" id="floating_phone" value={phone_no} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
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
              <button type="submit" className="uppercase cursor-pointer font-extrabold text-white primary hover:primary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:primary dark:hover:primary dark:focus:ring-blue-800">Submit</button>

              
            </div>

          {error && <div className="text-red-500 text-center mb-4 mt-2">{error}</div>}

          </form>
        </div>
      </div>
    </>
  )
}

export default AdminEditUser