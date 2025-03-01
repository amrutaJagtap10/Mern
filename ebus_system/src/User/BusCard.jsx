import { FaStar, FaBus } from "react-icons/fa";
import { Link } from "react-router-dom";

const BusCard = ({ bus }) => {

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;  // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-xl transition duration-300">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <FaBus className="text-red-500 mr-2" />
            {bus.bus_no}
          </h2>
          <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-lg">{bus.bus_type.join(", ")}</span>
        </div>

        <div className="text-gray-700 flex justify-between items-center mt-3" >
          <p className="font-semibold">Driver: <span className="text-gray-900">{bus.drivername}</span></p>
        </div>

        <div className="text-gray-700 flex justify-between items-center mt-3" >
          <p>{capitalizeFirstLetter(bus.source)} ➝ {capitalizeFirstLetter(bus.destination)}</p>
          <p className="text-gray-600">Fare: <span className="text-gray-900 font-bold">₹{bus.price}</span></p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-600">Departure Date: <span className="text-gray-900 font-bold">{bus.pickup_date}</span></p>
          <p className="text-gray-600">Departure: <span className="text-gray-900 font-bold">{bus.departure_time}</span></p>
          
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-600">Arrival Date: <span className="text-gray-900 font-bold">{bus.arrival_date}</span></p>
          <p className="text-gray-600">Arrival: <span className="text-gray-900 font-bold">{bus.arrival_time}</span></p>
          
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center text-yellow-500">
            <FaStar className="mr-1" /> {bus.rating}/5
          </span>
          <Link to={`/busdetails/${bus.id}`}>
          <button className="primary text-white px-4 py-1 rounded-lg hover:primary transition cursor-pointer">Book Now</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BusCard;
