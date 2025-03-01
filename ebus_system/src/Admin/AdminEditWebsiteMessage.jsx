import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminEditWebsiteMessage = () => {

  let { id } = useParams();

  let navigate=useNavigate();

  let[editContactData,setEditContactData]=useState({
    name:"",
    email:"",
    message:""
  })

  let{name,email,message}=editContactData;

  let[error,setError]=useState("");

  let handleChange=(e)=>{
    let{name,value}=e.target;
    setEditContactData({...editContactData,[name]:value})
  }

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const docSnap = await getDoc(doc(db, "contacts", id));

        if (docSnap.exists()) {
          setEditContactData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }
    };

    fetchContacts();
  }, [id]);
  

  let handleUpdate = async (e) => {
    e.preventDefault();
  
    if (
      name !== "" &&
      email !== "" &&
      message !== "" 
    ) {
      try {
        const contactRef = doc(db, "contacts", id);
        const docSnap = await getDoc(contactRef);
  
        if (docSnap.exists()) {
          const existingContact = docSnap.data();
  
          await updateDoc(contactRef, {
            name,
            email,
            message,
            modifiedAt: new Date(),
            createdAt: existingContact.createdAt,
          });
  
          toast.success("Contact Updated Successfully!", { autoClose: 2000 }); // ✅ Show toast
          setTimeout(() => navigate("/admin/allcontacts"), 2500); // ✅ Navigate after toast
        } else {
          toast.error("Contact not found.");
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
          <h1 className="text-2xl font-bold text-center text-[#C40234] mb-6 uppercase">Contact Details</h1>
          

          <form className="max-w-md mx-auto" onSubmit={handleUpdate}>

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="floating_name" value={name} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="floating_email" value={email} onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
            </div>

            

            <div className="relative z-0 w-full mb-5 group ">
              <input type="text" name="message" id="floating_message" value={message} onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#C40234] focus:outline-none focus:ring-0 focus:border-[#C40234] peer" placeholder="" required />
              <label htmlFor="floating_message" className="peer-focus:font-medium absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
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

export default AdminEditWebsiteMessage