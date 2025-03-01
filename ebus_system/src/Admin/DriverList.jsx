import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "driver"));
        const driverList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrivers(driverList);
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

   // Handle Delete Driver
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this driver?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "driver", id));
      setDrivers(drivers.filter((driver) => driver.id !== id));
      alert("Driver deleted successfully!");
    } catch (error) {
      console.error("Error deleting driver: ", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-[#C40234] mb-4 uppercase">
        Driver List
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : drivers.length === 0 ? (
        <p className="text-center text-gray-600">No drivers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#C40234] text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-3 text-left">Sr.no</th>
                <th className="py-3 px-3 text-left">Travel Agency</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Mobile No.</th>
                <th className="py-3 px-6 text-left" colSpan={2}>Action</th>

              </tr>
            </thead>
            <tbody>
              
              {drivers.map((driver, index) => (

                <tr
                  key={driver.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6">{index+1}</td>
                  <td className="py-3 px-6">{driver.travel_agency_name}</td>
                  <td className="py-3 px-6">{driver.firstname}</td>
                  <td className="py-3 px-6">{driver.lastname}</td>
                  <td className="py-3 px-6">{driver.address}</td>
                  <td className="py-3 px-6">{driver.mob_no}</td>
                  <td className="py-3 px-6"> 
                    <div className="flex-col border rounded-lg overflow-hidden w-[100px]">
                      {/* View Button */}
                      <Link
                        to={`/admin/viewdriver/${driver.id}`}
                        className="px-4 py-2 bg-blue-500 text-white flex items-center space-x-1 hover:bg-blue-600 transition"
                      >
                        <FaEye /> <span>View</span>
                      </Link>

                      {/* Edit Button */}
                      <Link
                        to={`/admin/editdriver/${driver.id}`}
                        className="px-4 py-2 bg-yellow-500 text-white flex items-center space-x-1 hover:bg-yellow-600 transition"
                      >
                        <FaEdit /> <span>Edit</span>
                      </Link>

                      {/* Delete Button */}
                      <button
                        className="px-4 py-2 bg-red-500 text-white flex items-center space-x-1 hover:bg-red-600 transition cursor-pointer"
                        onClick={()=>handleDelete(driver.id)}
                      >
                        <FaTrash /> <span>Delete</span>
                      </button>
                    </div>
                  </td>
                  {/* <td className="text-primary "><button className="cursor-pointer" ><Link to={`/admin/editdriver/${driver.id}`}>Update</Link></button></td>
                  <td className="text-primary"><button className=" cursor-pointer" onClick={()=>handleDelete(driver.id)}>Delete</button> </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DriverList;
