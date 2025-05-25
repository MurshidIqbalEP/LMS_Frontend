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
      gsap.from(".intro h1", {
        scrollTrigger: {
          trigger: ".intro",
          start: "top 50%",
          toggleActions: "play none play reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.from(".intro span", {
        scrollTrigger: {
          trigger: ".intro",
          start: "top 70%",
          toggleActions: "play none play reverse",
        },
        scale: 0.8,
        color: "#ffffff",
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
        delay: 0.5,
      });

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
          <h1 className="text-white font-medium uppercase text-6xl  md:text-9xl   -tracking-normal md:leading-28">
            Learn Today, Lead Tomorrow,{" "}
            <span className="text-[#f8ad40]">Succeed</span> Forever.
          </h1>
        </section>

        <section className="cards">
          {data.map((item, index) => (
            <Cards key={index} {...item} index={index} />
          ))}
        </section>

        <section className="outro"></section>
      </div>
    </ReactLenis>
  );
}

export default StickyCard;
