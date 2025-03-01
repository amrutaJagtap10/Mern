import { useRef, useState } from "react";

const Player = (props) => {
  console.log(props);
  let {state,vid,title}=props.data
  console.log(state);

  let videoRef= useRef()
  let [play, setPlay] = useState()

  let playorpause=()=>{
    videoRef.current.autoplay=true;
    setPlay(!play)

    if(play==true){
      videoRef.current.play()
    }
    else{
      videoRef.current.pause()
    }
  }


  return (
    <>
      <h1>Video Player</h1>
      <video src={vid} className="leftVideo" ref={videoRef} onClick={playorpause} ></video>
      <h1 className="videoTitle">{title}</h1>
    </>
  )
}

export default Player