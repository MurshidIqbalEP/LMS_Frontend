import Cards from "../students/Cards";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ReactLenis } from "@studio-freight/react-lenis";



gsap.registerPlugin(ScrollTrigger);

function StickyCard() {
  const data = [
    {
      title: "Trending Courses",
      description:
        "Stay ahead with the latest and most in-demand courses carefully curated to fit your learning needs.From web development to business strategies, access a wide range of updated courses designed to keep you relevant in today’s dynamic market.",
    },
    {
      title: "Professional Educators",
      description:
        "Learn from the best in the industry with experts who bring practical insights and years of experience.Our educators go beyond theory, offering real-world applications to empower your learning journey.",
    },
    {
      title: "Progress TrackingS",
      description:
      "Monitor your journey and achievements with detailed insights into your growth.Track completed courses, test scores, and milestones to stay motivated and focused on your goals.",
    },
    {
      title: "One-on-One Interaction with Educators",
      description:
        "Get personalized guidance and mentorship from dedicated educators.Engage in meaningful one-on-one sessions tailored to your learning pace and goals.",
    },
   
  ];

  const container = useRef();

  useGSAP(
    () => {

      gsap.fromTo(
        ".intro h1",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
  
      // Animation for the span emphasis
      gsap.fromTo(
        ".intro span",
        {
          scale: 0.8,
          color: "#ffffff",
        },
        {
          scale: 1.2,
          color: "#f8ad40",
          duration: 1,
          delay: 1.2,
          ease: "elastic.out(1, 0.5)",
        }
      );

      const cards = gsap.utils.toArray(".card");

      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: ".intro",
        pinSpacing: false,
      });

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = card.querySelector(".card-inner");

        if (!isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 35%",
            endTrigger: ".outro",
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(cardInner, {
            y: `-${(cards.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 35%",
              endTrigger: ".outro",
              end: "top 65%",
              scrub: true,
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis root>
      <div className="con" ref={container}>

        <section className="intro">
        <h1 className="text-white font-medium uppercase text-6xl  md:text-9xl   -tracking-normal md:leading-28">Learn Today, Lead Tomorrow, <span className="text-[#f8ad40]">Succeed</span> Forever.</h1>
        </section>

        <section className="cards">
          {data.map((item, index) => (
            <Cards key={index} {...item} index={index} />
          ))}
        </section>

        <section className="outro">
          
        </section>
      </div>
    </ReactLenis>
  );
}

export default StickyCard;
