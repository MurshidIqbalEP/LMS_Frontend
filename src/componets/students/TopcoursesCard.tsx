interface TopcoursesProps {
  image: string;
  name: string;
}

const Topcourses: React.FC<TopcoursesProps> = ({ image, name }) => {
  return (
    <section className="sticky-cards ">
      <div className=" bg-amber-300 w-[400px]  h-auto flex flex-col justify-center  absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 will-change-transform">
        <div className=" ">
          <img className="w-full h-full object-cover" src={image} alt={name} />
        </div>
        <div className="">
          <p>{name}</p>
        </div>
      </div>
    </section>
  );
};

export default Topcourses;
