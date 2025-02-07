import TopcoursesCards from "./TopcoursesCard"

const Topcourses = () => {
    const data =[
        {
            name:"Node",
            image:"logo.png"
        },
        {
            name:"Javascript",
            image:"poster.png"
        },
    ]
  return (
    <div className="bg-black w-full h-[500px] text-white flex flex-col gap-12  justify-center relative overflow-hidden">
      <h1 className="text-5xl font-medium -tracking-normal md:leading-28">Master Your Future with Top Courses </h1>
      {data.map(({name,image})=>(
         < TopcoursesCards  name={name} image={image}/>
      ))}
      
    </div>
  )
}

export default Topcourses
