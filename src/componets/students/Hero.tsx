import { BsArrowUpRight } from "react-icons/bs";
import { RxGlobe } from "react-icons/rx";
import CountUp from "react-countup";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function Hero() {
  return (
    <div className="flex  mt-[10px] w-full h-[670px] gap-4">
      <div className="w-[55%] flex flex-col justify-end ">
        <div className="h-[60%]">
          <h1 className="text-8xl mt-1 md:text-9xl text-right  font-black  -tracking-normal leading-28 ">
            <TextGenerateEffect
              words={"Learn Better."}
            />
          </h1>
          <p className="text-right text-2xl mt-10">
            Empower your learning journey with
            <br /> interactive courses, personalized
            <br /> assessments, and real-time progress tracking.
          </p>
        </div>

        <div className="h-[40%]">
          <hr className="border-t-2 border-b-black" />
          <div className="flex h-full">
            <div className="w-[50%] flex flex-col items-center justify-center">
              <p className="text-4xl font-black italic">
                +<CountUp delay={1} duration={5} end={250} />K
              </p>
              <p className="font-sans mt-1 text-center text-gray-600 max-w-[350px] break-words">
                skilled educators represent a diverse group of experts,
                committed to providing quality education and fostering student
                success.
              </p>
            </div>
            <div className="w-[50%] flex flex-col items-center justify-center">
              <p className="text-4xl font-black italic">
                +<CountUp delay={1} duration={5} end={800} />K
              </p>
              <p className="font-sans mt-1 text-center text-gray-600 max-w-[350px] break-words">
                courses encompass a wide range of subjects, designed to equip
                learners with valuable skills and knowledge for success.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container w-[45%] ">
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
