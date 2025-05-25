import { BsArrowUpRight } from "react-icons/bs";
import { RxGlobe } from "react-icons/rx";
import CountUp from "react-countup";
import Typewriter from "../ui/text-generate-effect";

export default function Hero() {
  return (
    <div className="md:flex  mt-[10px] w-full h-[670px] gap-4">
      <div className="w-full md:w-[55%] flex flex-col md:justify-end">
        <div className="h-[60%]">
          <Typewriter text="Teach" speed={200} />
          <Typewriter text="Better." speed={200} />

          <p className="text-right md:text-2xl mt-7 md:mt-10">
            Share your expertise with engaging courses,
            <br /> reach students worldwide, and
            <br /> grow your online teaching career.
          </p>
        </div>

        <div className="h-[40%]">
          <hr className="border-t-2 border-b-black" />
          <div className="flex h-full">
            <div className="w-[50%] flex flex-col items-center justify-center">
              <p className="text-4xl font-black italic">
                +<CountUp delay={1} duration={5} end={250} />K
              </p>
              <p className="font-sans mt-1 text-center text-gray-600 max-w-[300px] md:max-w-[350px] break-words">
                Passionate instructors dedicated to delivering high-quality
                courses and empowering learners worldwide.
              </p>
            </div>
            <div className="w-[50%] flex flex-col items-center justify-center">
              <p className="text-4xl font-black italic">
                +<CountUp delay={1} duration={5} end={800} />K
              </p>
              <p className="font-sans mt-1 text-center text-gray-600 max-w-[300px] md:max-w-[350px] break-words">
                Our courses cover diverse subjects, equipping learners with the
                skills and knowledge needed to thrive.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="container w-full md:w-[45%] ">
        <div className="card_Wrapper">
          <div className="card">
            <div className="card_image"></div>
            <button className="absolute bg-black  rounded-[15rem] p-0.5 flex justify-center items-center w-[76px] h-[76px] top-4 right-3 transform hover:scale-105 transition-transform duration-300 ">
              <RxGlobe className="text-white size-12" />
            </button>

            <div className="absolute flex flex-col gap-2 bottom-0 left-[15px] ">
              <button
                className="   rounded-[15rem] p-0.5 flex justify-center items-center w-[80px] h-[80px] bg-cover transform hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: "url('/smallposter1.png')" }}
              ></button>
              <button
                className=" bg-[#fbad41]  rounded-[15rem] p-0.5 flex justify-center items-center w-[80px] h-[80px] bg-cover  transform hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: "url('/smallposter2.png')" }}
              ></button>
              <button className=" bg-black  rounded-[15rem] p-0.5 flex justify-center items-center w-[80px] h-[80px]  transform hover:scale-105 transition-transform duration-300">
                <BsArrowUpRight className="text-white size-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
