const HomepageComp = ({ value, onClick }) => {
  return (
    <div
      className="flex flex-col md:flex-row justify-center items-center m-4 p-6 gap-5 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick} 
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={value.image } 
          alt={value.title}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{value.title}</h1>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          {value.description.length > 150
            ? value.description.substring(0, 150) + "..."
            : value.description}
        </p>
      
      <div className="flex"> 
      {value.category.map((cat,index)=>{
        <span key={index} className="p-2 bg-slate-500 text-white">{cat}</span>
      })}
      </div>
      
      </div>
    </div>
  );
};

export default HomepageComp;
