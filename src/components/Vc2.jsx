import { hightlightsSlides } from "../constants";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);


const Vc = () => {

  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);


  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  // console.log("n->", video);

  const [loadedData, setLoadedData] = useState([]);


  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
        start: "bottom bottom"
      },
      onComplete: () => {
        setVideo((pre) => ({...pre, startPlay: true, isPlaying: true}));
      },
    });
  }, [isEnd, videoId]);



  useEffect(()=>{
    if(loadedData.length > 3){
      if(!isPlaying){
        videoRef.current[videoId].pause();
      }else{
        startPlay && videoRef.current[videoId].play()
        // console.log("vr->",videoRef.current[videoId])
      }
    }

  },[startPlay, videoId, isPlaying, loadedData])

  const handleLoadedMetadata = (i, e) =>{
    setLoadedData((prev)=> [...prev, e]);
  }
  
  useEffect(()=>{
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if(span[videoId]){
      //animate progress
      let anim = gsap.to(span[videoId],{
        onUpdate: ()=>{

        },

        onComplete: ()=>{

        }
      })
    }

  },[videoId, startPlay])

  const handleProcess = (type, i) =>{
    switch(type) {
      case "video-end":
        setVideo((prev) => ({...prev, isEnd: true, videoId : i + 1}))
        break;
      
      case "video-last": 
        setVideo((prev)=> ({...prev, isLastVideo: true}))
        break;

      case "video-reset":
        setVideo((prev)=> ({...prev, isLastVideo: false, videoId: 0}))
        break;
      
      case "play":
        setVideo((prev)=> ({...prev, isPlaying: !prev.isPlaying}))
        break;

      default:
        return video;
    }
  }

  return (
    <>
      <div className="flex items-center">
        {
          hightlightsSlides.map((list, i)=>(
            <div key={list.id} id="slider" className="sm:pr-20 pr-10 bg-white">
             <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={()=>{
                    // console.log("b->",video)
                    setVideo((prev) => ({...prev, isPlaying: true}))
                    // console.log("a->",video)

                  }}
                  onLoadedMetadata={(e) => {
                    handleLoadedMetadata(i, e)
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {
                  list.textLists.map((text)=>(
                    <p key={text} className="md:text-xl text-xl font-media">{text}</p>
                  ))
                }
              </div>
             </div>
            </div>
          ))
        }
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {
            videoRef.current.map((_, i)=>(
              <span
                key={i}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                ref={(el) => (videoDivRef.current[i] = el)}
              >
                <span
                  className="absolute h-full w-full rounded-full"
                  ref={(el) => (videoSpanRef.current[i] = el)}
                />
              </span>
            ))
          }
        </div>

        <button className="control-btn">
          <img 
            src={isLastVideo? replayImg : !isPlaying? playImg : pauseImg}
            alt={isLastVideo? "replay" : !isPlaying? "play" : "pause"}
            onClick={
              isLastVideo? ()=> handleProcess("video-reset")
              : !isPlaying? ()=> handleProcess("play")
              : ()=> handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  )
}

export default Vc;