// components/InputField.jsx

const InputField = ({ label, placeholder , onChange }) => {
  return (
    <div className="mb-4 pl-5 pr-5">
      <label className="block mt-10 text-md  font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input onChange = {onChange}
        type="text"
        placeholder={placeholder}
        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
