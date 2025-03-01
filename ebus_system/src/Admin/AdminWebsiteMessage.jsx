
import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const AdminWebsiteMessage = () => {
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {

        // 1️⃣ Fetch all buses
        const contactSnapshot = await getDocs(collection(db, "contacts"));
        let contact_data = contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // // 4️⃣ Merge travel agency name into bus data
        // userData = userData.map(bus => ({
        //   ...bus,
        //   travel_agency_name: driverData[bus.travel_id] || "Unknown"
        // }));
      // }

      // 5️⃣ Update state
      setContactData(contact_data);
      console.log(contact_data);
      
        
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

   // Handle Delete Driver
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact info?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "contacts", id));
      setContactData(contactData.filter((contactDoc) => contactDoc.id !== id));
      alert("Contact Data Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting contacts: ", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-[#C40234] mb-4 uppercase">
        All Contacts Messages List
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : contactData.length === 0 ? (
        <p className="text-center text-gray-600">No Contact Data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#C40234] text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-3 text-center">Sr.no</th>
                <th className="py-3 px-3 text-center">Name</th>
                <th className="py-3 px-3 text-center">Email</th>
                <th className="py-3 px-6 text-center">Message</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              
              {contactData.map((contactRecord, index) => (

                <tr
                  key={contactRecord.id}
                  className={`border-b  ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } `}
                >
                  <td className="py-3 px-6">{index+1}</td>
                  <td className="py-3 px-6">{contactRecord.name}</td>
                  <td className="py-3 px-6">{contactRecord.email}</td>
                  <td className="py-3 px-6">{contactRecord.message}</td>
                  <td className="py-3 px-6 admin_table_action"> 
                    <div className="flex-col border rounded-lg overflow-hidden w-[56%] ">
                      {/* View Button */}
                      <Link
                        to={`/admin/viewcontact/${contactRecord.id}`}
                        className="px-4 py-2 bg-blue-500 text-white flex items-center space-x-1 hover:bg-blue-600 transition"
                      >
                        <FaEye /> <span>View</span>
                      </Link>

                      {/* Edit Button */}
                      <Link
                        to={`/admin/editcontact/${contactRecord.id}`}
                        className="px-4 py-2 bg-yellow-500 text-white flex items-center space-x-1 hover:bg-yellow-600 transition"
                      >
                        <FaEdit /> <span>Edit</span>
                      </Link>

                      {/* Delete Button */}
                      <button
                        className="px-4 py-2 bg-red-500 text-white flex items-center space-x-1 hover:bg-red-600 transition cursor-pointer"
                        onClick={()=>handleDelete(contactRecord.id)}
                      >
                        <FaTrash /> <span>Delete</span>
                      </button>
                    </div>
                  </td>
                  {/* <td className="text-primary "><button className="cursor-pointer" ><Link to={`/driver/editbus/${busRecord.id}`}>Update</Link></button></td>
                  <td className="text-primary"><button className=" cursor-pointer" onClick={()=>handleDelete(busRecord.id)}>Delete</button> </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminWebsiteMessage;
