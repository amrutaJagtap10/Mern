
import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const BusDetails = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem("TOKEN");

  // console.log( token);
  

  useEffect(() => {
    const fetchBusData = async () => {
      try {

        const busRef= collection(db,"buses");
        let q = query(
          busRef,
          where("travel_id", "==", token)
        );
        // const querySnapshot = await getDocs(collection(db, "buses"));
        const querySnapshot = await getDocs(q);

        const busList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBusData(busList);
      } catch (error) {
        console.error("Error fetching buses: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, []);

   // Handle Delete Driver
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bus info?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "buses", id));
      setBusData(busData.filter((busDoc) => busDoc.id !== id));
      alert("Bus data deleted successfully!");
    } catch (error) {
      console.error("Error deleting buses: ", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-[#C40234] mb-4 uppercase">
        All Buses List
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : busData.length === 0 ? (
        <p className="text-center text-gray-600">No Bus Data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#C40234] text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-3 text-left">Sr.no</th>
                <th className="py-3 px-3 text-left">Bus Number</th>
                <th className="py-3 px-6 text-left">Bus Type</th>
                <th className="py-3 px-6 text-left">Source</th>
                <th className="py-3 px-6 text-left">Destination</th>
                <th className="py-3 px-6 text-left">Pickup Date & Time</th>
                <th className="py-3 px-6 text-left">Driver Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Mobile No.</th>
                <th className="py-3 px-6 text-left" colSpan={2}>Action</th>

              </tr>
            </thead>
            <tbody>
              
              {busData.map((busRecord, index) => (

                <tr
                  key={busRecord.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6">{index+1}</td>
                  <td className="py-3 px-6">{busRecord.bus_no}</td>
                  <td className="py-3 px-6">{busRecord.bus_type.join(", ")}</td>
                  <td className="py-3 px-6">{busRecord.source}</td>
                  <td className="py-3 px-6">{busRecord.destination}</td>
                  <td className="py-3 px-6">{busRecord.pickup_date} {busRecord.pickup_time}</td>
                  <td className="py-3 px-6">{busRecord.drivername}</td>
                  <td className="py-3 px-6">{busRecord.email}</td>
                  <td className="py-3 px-6">{busRecord.phone_no}</td>
                  <td className="text-primary "><button className="cursor-pointer" ><Link to={`/driver/editbus/${busRecord.id}`}>Update</Link></button></td>
                  <td className="text-primary"><button className=" cursor-pointer" onClick={()=>handleDelete(busRecord.id)}>Delete</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusDetails;
