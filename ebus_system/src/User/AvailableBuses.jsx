import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import BusCard from "./BusCard";
import { db } from "../../firebase";
import BusLocationSearch from "./BusLocationSearch";


const AvailableBuses = () => {
  const [buses, setBuses] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");


  // Function to Fetch Buses
  const fetchBuses = async () => {
    try {
      const busesRef = collection(db, "buses");

      console.log("Searching for Source:", source);
      console.log("Searching for Destination:", destination);
      console.log("Searching for Date:", date);


       // Convert input to lowercase for case-insensitive search
      const formattedSource = source.trim().toLowerCase();
      const formattedDestination = destination.trim().toLowerCase();

      let q = busesRef; // Default: fetch all buses
      if (formattedSource && formattedDestination && date) {
        q = query(
          busesRef,
          where("source_lower", "==", formattedSource),
          where("destination_lower", "==", formattedDestination),
          where("pickup_date","==",date)
        );
      }

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No matching buses found!");
        setBuses([]); // Clear the state if no results
        return;
      }

      const busData = querySnapshot.docs.map((doc) => {
        let data = doc.data();

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
      });

      setBuses(busData);
      console.log("Fetched Buses:", busData);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // Fetch buses when source & destination change
  useEffect(() => {
    fetchBuses();
  }, [source, destination, date]);

 

  return (

    <>
      <div className="p-6">
        {/* Search Component to Update Source & Destination */}
        <BusLocationSearch setSource={setSource} setDestination={setDestination} setDate={setDate} />
        <div id="available_buses" className="mt-[3rem]"></div>
        <h1 className="text-2xl font-bold mb-4 uppercase">Available Buses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.length > 0 ? (
            buses.map((bus) => <BusCard key={bus.id} bus={bus} />)
          ) : (
            <p>No buses available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableBuses;
