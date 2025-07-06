// components/Button.jsx

const Button = ({ label ,  onClick}) => {
  return (
    <div className="flex justify-center mt-8">
      <button  onClick={onClick}
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
        
        {label}
      </button>
    </div>
  );
};

export default Button;
