import { IoEyeSharp } from "react-icons/io5";

const VideoItem = (props) => {

  // console.log(props);
  // console.log(props.data);
  let {video,setVid,setTitle}=props.data
  console.log(video);

  let {title, thumbnailUrl, videoUrl, views}=video
   
  let changeVideo = ()=>{
    setVid(videoUrl)
    setTitle(title)
  }

  return (
    <div className="videoItem">
      <img src={thumbnailUrl} alt={title} className="rightImage" onClick={changeVideo}/>
      <p><IoEyeSharp /> {views}</p>
    </div>
  )
}

export default VideoItem