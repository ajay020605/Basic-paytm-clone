// components/TextLink.jsx

import { Link } from "react-router-dom";

const TextLink = ({ text, linkText, to }) => {
  return (
    <p className="text-sm text-center text-gray-600 mt-4">
      {text}{" "}
      <Link
        to={to}
        className="text-blue-600 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default TextLink;
