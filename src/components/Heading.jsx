// components/Heading.jsx

const Heading = ({ label }) => {
  return (
    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
      {label}
    </h1>
  );
};

export default Heading;
