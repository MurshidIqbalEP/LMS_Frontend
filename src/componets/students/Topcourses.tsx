import { useEffect } from "react";
import TopcoursesCard from "./TopcoursesCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";


gsap.registerPlugin(ScrollTrigger);


const Topcourses = () => {
  const data = [
    { name: "Node", image: "https://res.cloudinary.com/drsh8bkaf/image/upload/v1743753749/o31elnauxplbwqbyo2dy.webp" },
    { name: "PostgreSQL", image: "https://res.cloudinary.com/drsh8bkaf/image/upload/v1741972816/nmqqk9tiziv0vti1ikvc.jpg" },
    { name: "React", image: "https://res.cloudinary.com/drsh8bkaf/image/upload/v1744382775/xax2p1m3ws2eyhffsbun.webp" },
    { name: "Node", image: "https://res.cloudinary.com/drsh8bkaf/image/upload/v1742453143/i7o14ttyzoq33znl7o72.png" },
  
  ];

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.fromTo(
      ".heading-animate",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 5,
        delay: 10,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stack-cards",
          start: "top center",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    const cards = gsap.utils.toArray(".stack-card") as HTMLElement[];
    const rotation =  [-8, 12, -6, 10];

    cards.forEach((card, index) => {
      gsap.set(card, {
        y: window.innerHeight,
        x: index * 180, 
        rotate: rotation[index],
      });
    });
    
    ScrollTrigger.create({
      trigger: ".stack-cards",
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = cards.length;
        const progressPerCard = 1 / totalCards;
    
        cards.forEach((card, index) => {
          const cardStart = index * progressPerCard;
          let cardProgress = (progress - cardStart) / progressPerCard;
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);
    
          let yPos = window.innerHeight * (1 - cardProgress);
          let xPos = index * 130; 
    
          if (cardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (cardStart + progressPerCard)) /
              (1 - (cardStart + progressPerCard));
    
            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - index * 0.3;
              xPos =
                (-window.innerWidth * 0.5 + card.offsetWidth / 2) *
                  distanceMultiplier *
                  remainingProgress +
                index * 180;
    
              yPos =
                -window.innerHeight * 0.1 * distanceMultiplier * remainingProgress;
            }
          }
    
          gsap.to(card, {
            y: yPos + 30,
            x: xPos,
            duration: 0,
            ease: "none",
          });
        });
      },
    });
    
  }, []);


  return (
    <>
      <section className="stack-cards bg-black relative flex justify-center items-center w-full h-screen overflow-hidden">
        <section className="starting relative bg-black text-white w-full h-[100px] overflow-hidden flex justify-center items-center ">
          <h1 className="!mb-0 heading-animate text-8xl   !font-extrabold kode-mono z-50 text-shadow-lean">
            TOP COURSES
          </h1>
        </section>
        <div>
          {data.map(({ name, image }, index) => (
            <TopcoursesCard key={index} name={name} image={image} />
          ))}
        </div>
        
      </section>
    </>
  );
};

export default Topcourses;
