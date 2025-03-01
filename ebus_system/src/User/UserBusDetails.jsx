import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { FaBus, FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const UserBusDetails = () => {
  const { id } = useParams(); // Get the bus ID from the URL
  const [busDetails, setBusDetails] = useState(null);
  let navigate=useNavigate();
  console.log(id);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const docRef = doc(db, "buses", id);
        console.log(id);
        
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let busData=()=>{
            let data = docSnap.data()
            // Extract departure date, time, and duration from Firestore
            const departureDate = data.pickup_date; // Example: "2025-02-07"
            const departureTime = data.pickup_time; // Example: "20:00" (24-hour format)
            const duration = Number(data.duration) || 0; // Convert duration to number
  
            // Create JavaScript Date object for departure
            const departureDateTime = new Date(`${departureDate}T${departureTime}:00`);
            const formattedDepartureTime = departureDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
  
            // Calculate Arrival Date & Time
            const arrivalDateTime = new Date(departureDateTime.getTime() + duration * 60 * 60 * 1000);
            const formattedArrivalTime = arrivalDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            const formattedArrivalDate = arrivalDateTime.toISOString().split("T")[0]; // YYYY-MM-DD format
  
            return {
              id: doc.id,
              ...data,
              departure_time: formattedDepartureTime,
              arrival_time: formattedArrivalTime,
              arrival_date: formattedArrivalDate,
            };
  
          }
          setBusDetails(busData);
        } else {
          console.log("No such bus!");
        }
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [id]);

  if (!busDetails) {
    return <p>Loading bus details...</p>;
  }

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;  // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let handleBack=()=>{
    navigate(-1);
  }

  return (
   
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-xl transition duration-300 w-[573px] m-auto mt-10 mb-10">
        <button onClick={handleBack} className="cursor-pointer"><FaArrowLeft/></button>
        <div className="flex justify-between items-center mb-3 mt-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <FaBus className="text-red-500 mr-2" />
            {busDetails.bus_no}
          </h2>
          <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-lg">{busDetails.bus_type.join(", ")}</span>
        </div>

        <div className="text-gray-700 flex justify-between items-center mt-3" >
          <p className="font-semibold">Driver: <span className="text-gray-900">{busDetails.drivername}</span></p>
        </div>

        <div className="text-gray-700 flex justify-between items-center mt-3" >
          <p>{capitalizeFirstLetter(busDetails.source)} ➝ {capitalizeFirstLetter(busDetails.destination)}</p>
          <p className="text-gray-600">Fare: <span className="text-gray-900 font-bold">₹{busDetails.price}</span></p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-600">Departure Date: <span className="text-gray-900 font-bold">{busDetails.pickup_date}</span></p>
          <p className="text-gray-600">Departure: <span className="text-gray-900 font-bold">{busDetails.departure_time}</span></p>
          
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-600">Arrival Date: <span className="text-gray-900 font-bold">{busDetails.arrival_date}</span></p>
          <p className="text-gray-600">Arrival: <span className="text-gray-900 font-bold">{busDetails.arrival_time}</span></p>
          
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center text-yellow-500">
            <FaStar className="mr-1" /> {busDetails.rating}/5
          </span>
          
        </div>

        <div className="grid md:grid-cols-2">
          {/* Boarding Points Section */}
          {busDetails.boarding_points && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Boarding Points-</h2>
                {busDetails.boarding_points.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {busDetails.boarding_points.map((point, index) => (
                      <li key={index}>
                        {point} 
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No boarding points available.</p>
                )}
            </div>
          )}
          

          {/* Dropping Points Section */}
          {busDetails.dropping_points && (
            <div>
              <h2 className="text-lg font-bold mb-2">Dropping Points-</h2>
              {busDetails.dropping_points.length > 0 ? (
                <ul className="list-disc pl-6">
                  {busDetails.dropping_points.map((point, index) => (
                    <li key={index}>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No dropping points available.</p>
              )}
            </div>
          )}
          
        </div>
      </div>
  );
};

export default UserBusDetails;
