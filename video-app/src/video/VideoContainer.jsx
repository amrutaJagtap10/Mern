import { useState } from "react"
import Player from "./Player"
import VideoItem from "./VideoItem"
import Videodata from './video.json'

const VideoContainer = () => {
  let [state,setState]=useState(Videodata)
    console.log(state);
  
    let [vid,setVid]=useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
  
    let [title,setTitle]=useState("Big Buck Bunny")
  return (
    <section className="videoBlock">
      <aside className="left">
        <Player data={{state,vid,title}}/>
      </aside>
      <aside className="right">
        {
          state.map((video)=>{
            return <VideoItem key={video.id} data={{video,setVid,setTitle}}/>
          })
        }
      </aside>

    </section>
  )
}

export default VideoContainer