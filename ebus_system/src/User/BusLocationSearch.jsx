// components/BusLocationSearch.jsx
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const BusLocationSearch = ({ setSource, setDestination, setDate }) => {
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const[isSearch,setIsSearch]=useState(false);

  const handleSearch = () => {
    setSource(src.trim());
    setDestination(dest.trim());
    setDate(pickupDate);
    setIsSearch(true)
  };

  const clearInputs = () => {
    setSrc("");  // Clears input field
    setDest(""); // Clears input field
    setSource(""); // Resets state in parent
    setDestination(""); 
    setDate("");
    setIsSearch(false)
  };

  return (
    <div className="text-center mt-[3rem]">
      <input type="text" placeholder="Source" value={src} onChange={(e) => setSrc(e.target.value)} className="searchSrc_input shadow-md" />
      <input type="text" placeholder="Destination" value={dest} onChange={(e) => setDest(e.target.value)} className="searchDest_input shadow-md"/>
      <input type="date" placeholder="Date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="searchDest_input shadow-md text-gray-400 search_date"/>
      <button onClick={handleSearch} className="btnSearch shadow-md">Search</button>
      {isSearch && (
        <button
          onClick={clearInputs}
          className="bg-[#e60006] text-white font-bold ml-2 px-3 py-1 rounded search_clear uppercase shadow-md"
        >
        <RxCrossCircled/> Clear 
        </button>
      )}
      
      
    </div>
  );
};

export default BusLocationSearch;



