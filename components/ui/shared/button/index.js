

const Sizes = {
  sm: "py-2 px-8",
  md: "py-4 px-8",
};



export default function Button({
  children,
  className, 
  size="md", 
  variant="circleRed",
  visibility,
  ...rest
  }) {

  const variants = {
    circleRed: `text-white bg-circleRed ${  "hover:bg-circleRedHover"}`,
    red: `text-white bg-red-600 ${  "hover:bg-red-700"}`,
    white: `text-black bg-white`,
  };


  
  
  return (
    <>
      
      <button
      
        onClick={visibility}
        className={` bg-circleRed rounded-tl-[30px] rounded-br-[30px] text-white text-sm font-normal font-poppins  ${Sizes[size]} ${className} ${variants[variant]}`}
      >
        {children}
      </button>
    </>
  );
};
