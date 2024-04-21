import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import { VideoCarousel, Vc, Vc2 } from "./exporter";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {

  useGSAP(()=>{
    gsap.to("#title",{
      opacity: 1,
      y:0,
      // delay:1,
      scrollTrigger: {
        trigger: "#title",
        toggleActions: "play none none none",
        start: "top bottom",
        end: "bottom center",
        scrub: true,
      }
    });

    gsap.to(".link", {
      opacity:1,
      y:0,
      stagger:0.5,
      scrollTrigger: {
        trigger: ".link",
        toggleActions: "play none none none",
        start: "top center",
        end: "bottom center",
        scrub: 3,
      }
    })
  },[])


  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights</h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link ">
              Watch the film
              <img src={watchImg} alt="watch"  className="ml-2"/>
            </p>
            <p className="link" >
              Watch the event
              <img src={rightImg} alt="right"  className="ml-2 mt-1"/>
            </p>
          </div>
        </div>

        <VideoCarousel />
        {/* <Vc /> */}
        {/* <Vc2 /> */}
      </div>
    </section>
  )
}

export default Highlights;