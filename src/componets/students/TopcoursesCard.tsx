interface TopcoursesProps {
  image: string;
  name: string;
}

const TopcoursesCard: React.FC<TopcoursesProps> = ({ image, name }) => {
  return (
    <div className="stack-card bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col gap-4 justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform w-80 h-[300px] p-4 transition-all hover:scale-x-95">
    <div className="h-[70%] bg-gray-100 rounded-md overflow-hidden">
      <img className="w-full h-full object-cover" src={image} alt={name} />
    </div>
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-700">{name}</p>
    </div>
  </div>
   
  );
};

export default TopcoursesCard;
