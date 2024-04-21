import "../index.css"
import { useState, useRef, useEffect } from "react";
import {ModelView} from "./exporter"
import { yellowImg } from "../utils";
import { animateWithGsapTimeline } from "../utils/animations";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import * as THREE from "three";
import { models, sizes } from "../constants";
import { color, log } from "three/examples/jsm/nodes/Nodes.js";

const Model = () => {

  const [size, setSize] = useState("small")
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE789", "#6F6C64"],
    img: yellowImg,
  });
  const [backgroundColor, setBackgroundColor] = useState(model?.color[0])

  const viewEventRef = useRef()

  //camera control
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //model size
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  console.log("s->", small.current);
  console.log("L->", large.current);


  //rotation value
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  
  const timeline = gsap.timeline();

  useEffect(()=>{
    if(size === "large"){
      animateWithGsapTimeline(timeline, large, largeRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2
      })
    }

    if(size === "small"){
      animateWithGsapTimeline(timeline, small, smallRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2
      })
    }

  }, [size])

  useGSAP(()=>{
    gsap.to("#heading",{
      y: 0,
      opacity: 1,
      scrollTrigger:{
        trigger: "#heading",
        scrub: true,
        start: "-50% 90%",
        end: "60% 60%",
        // markers: true
      }
    })

  },[])

  return (
    <section className='common-padding canvas' ref={viewEventRef} style={{backgroundColor: `${backgroundColor}`}}>
      <div className='screen-max-width'>
        <h1 
          id="heading" 
          className="section-heading" 
          style={{color: `${backgroundColor === "#8F8A81" ? "#4b544d" : ""}`}}
        >
          Take a closer look
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              id="canvas"
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={viewEventRef}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {
                  models.map((item, i)=>(
                    <li 
                      key={i} 
                      className={`w-6 h-6 rounded-full mx-2 cursor-pointer border-2`}
                      style={{ backgroundColor: item.color[0] }}
                      onClick={()=> {
                        setModel(item)
                        setBackgroundColor(item?.color[0])
                      }}
                    />
                  ))
                }
              </ul>

              <button className="size-btn-container">
                {
                  sizes.map(({label, value})=>(
                    <span 
                      key={label} 
                      className="size-btn"
                      style={{
                        backgroundColor: size === value? "white": "transparent",
                        color: size === value? "black": "white"
                      }}
                      onClick={()=> setSize(value)}
                    > 
                    {label}
                    </span>
                  ))
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model;