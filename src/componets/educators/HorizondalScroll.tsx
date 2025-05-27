import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizondalScroll = () => {
  const createdCardsRef = useRef<HTMLDivElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  useGSAP(() => {
    const cardPositions = [
      { top: "30%", left: "55%" },
      { top: "20%", left: "25%" },
      { top: "50%", left: "10%" },
      { top: "60%", left: "40%" },
      { top: "30%", left: "30%" },
      { top: "60%", left: "60%" },
      { top: "20%", left: "50%" },
      { top: "60%", left: "10%" },
      { top: "20%", left: "40%" },
      { top: "44%", left: "58%" },
    ];

    const titlesContainer = document.querySelector(".titlescontainer");
    const moveDistance = window.innerWidth * 3;
    const imageContainer = document.querySelector(".threedimages");

    if (!imageContainer) return;


    const cards: HTMLDivElement[] = [];
    for (let i = 1; i <= 10; i++) {
      const card = document.createElement("div");
      card.className = `threedcard threedcard-${i} absolute w-[250px] h-[250px] rounded-[2em] preserve-3d will-change-transform overflow-hidden`;

      const img = document.createElement("img");
      img.src = `/horizondalScrolling${i}.gif`;
      img.alt = "image";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      card.appendChild(img);

      const position = cardPositions[i - 1];
      card.style.top = position.top;
      card.style.left = position.left;

      imageContainer.appendChild(card);
      cards.push(card);
    }
    
    createdCardsRef.current = cards;

    cards.forEach((card) => {
      gsap.set(card, {
        z: -5000,
        scale: 0,
      });
    });

    const st = ScrollTrigger.create({
      trigger: ".horizondalscrool",
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const xPosition = -moveDistance * self.progress;
        gsap.set(titlesContainer, {
          x: xPosition,
        });

        const velocity = (self.getVelocity() / 1000) || 0;
        const direction = self.direction || 1;
        const maxOffset = 70;
        const currentSpeed = Math.min(Math.abs(velocity), maxOffset);

        document.querySelectorAll(".title, .threetitle").forEach((container) => {
          const title1 = container.querySelector(".firsttitle");
          const title2 = container.querySelector(".secondtitle");
          const title3 = container.querySelector(".thirdtitle");

          gsap.to(title1, {
            x: `-${50 + (currentSpeed * 4 * direction)}%`,
            z: 50,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(title2, {
            x: `-${50 + (currentSpeed * 2 * direction)}%`,
            z: 20,
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.to(title3, {
            x: `-${50 + (currentSpeed * direction)}%`,
            z: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        cards.forEach((card, index) => {
          const staggerOffset = index * 0.075;
          const scaledProgress = (self.progress - staggerOffset) * 3;
          const individualProgress = Math.max(0, Math.min(1, scaledProgress));

          const targetZ = index === cards.length - 1 ? 1500 : 2000;
          const newZ = -50000 + (targetZ + 50000) * individualProgress;
          const scaleProgress = Math.min(1, individualProgress * 10);
          const scale = Math.max(0, Math.min(1, scaleProgress));

          gsap.set(card, {
            z: newZ,
            scale: scale,
          });
        });
      },
    });

    scrollTriggerRef.current = st;


    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
  
      createdCardsRef.current.forEach(card => {
        if (card.parentNode) {
          card.parentNode.removeChild(card);
        }
      });
      createdCardsRef.current = [];
    };
  }, []);

  return (
    <>
      <section className="horizondalscrool relative  w-full h-[100vh] overflow-hidden bg-[#fffef8]">
        <div className="titlescontainer absolute  top-[0%] left-[0%] w-[400vw] h-[100vh] flex will-change-transform ">
          <div className="threetitle relative flex-1 flex justify-center items-center">
            <h1 className="firsttitle  font-kodeMono absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold text-7xl  will-change-transform text-[#dafa6c]">
            Share Your Knowledge
            </h1>
            <h1 className="secondtitle  font-kodeMono absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold  text-7xl  will-change-transform text-[#10d0f4]">
            Share Your Knowledge
            </h1>
            <h1 className="thirdtitle   font-kodeMono absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold text-7xl   will-change-transform text-black">
            Share Your Knowledge 
            </h1>
          </div>
          <div className="title relative flex-1 flex justify-center items-center">
            <h1 className="firsttitle  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold font-poppins  text-7xl will-change-transform text-[#dafa6c]">
            Reach and Inspire Students Worldwide
            </h1>
            <h1 className="secondtitle  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold font-poppins text-7xl will-change-transform text-[#10d0f4]">
            Reach and Inspire Students Worldwide
            </h1>
            <h1 className="thirdtitle absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold font-poppins text-7xl will-change-transform text-black">
            Reach and Inspire Students Worldwide
            </h1>
          </div>
          <div className="title relative flex-1 flex justify-center items-center">
            <h1 className="firsttitle absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold italic  text-7xl will-change-transform text-[#dafa6c]">
            Transform Learning with Engaging Courses
            </h1>
            <h1 className="secondtitle  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold italic text-7xl will-change-transform text-[#10d0f4]">
            Transform Learning with Engaging Courses
            </h1>
            <h1 className="thirdtitle  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold italic text-7xl will-change-transform text-black">
            Transform Learning with Engaging Courses
            </h1>
          </div>
          <div className="title relative flex-1 flex justify-center items-center">
            <h1 className="firsttitle  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold italic text-7xl will-change-transform text-[#dafa6c]">
            Educate with Impact
            </h1>
            <h1 className="secondtitle  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold italic text-7xl will-change-transform text-[#10d0f4]">
            Educate with Impact
            </h1>
            <h1 className="thirdtitle   absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold italic text-7xl will-change-transform text-black">
            Educate with Impact
            </h1>
          </div>
        </div>

        <div className="threedimages absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] h-[250vh] preserve-3d perspective-[2000px] -z-10"></div>
      </section>
    </>
  );
};

export default HorizondalScroll;
