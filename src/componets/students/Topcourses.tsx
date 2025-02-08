import { useEffect } from "react";
import TopcoursesCard from "./TopcoursesCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Topcourses = () => {
  const data = [
    { name: "Node", image: "logo.png" },
    { name: "JavaScript", image: "poster.png" },
    { name: "JavaScript", image: "poster.png" },
    { name: "JavaScript", image: "poster.png" },
  ];

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(".stack-card") as HTMLElement[];
    const rotation = [-12, 10, -5, 5];

    cards.forEach((card, index) => {
      gsap.set(card, {
        y: window.innerHeight,
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
          let xPos = 0;

          if (cardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (cardStart + progressPerCard)) /
              (1 - (cardStart + progressPerCard));

            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - index * 0.3;
              xPos =
                -window.innerWidth *
                0.5 *
                distanceMultiplier *
                remainingProgress;
              yPos =
                -window.innerHeight *
                0.1 *
                distanceMultiplier *
                remainingProgress;
            }
          }

          gsap.to(card, {
            y: yPos,
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
      <section className="stack-cards bg-black relative w-full h-[900px] overflow-hidden">
        <section className="starting relative bg-black text-white w-full h-[100px] overflow-hidden flex justify-center items-center text-6xl font-bold">
          <h1>TOP COURSES</h1>
        </section>

        {data.map(({ name, image }, index) => (
          <TopcoursesCard key={index} name={name} image={image} />
        ))}
      </section>

    </>
  );
};

export default Topcourses;
