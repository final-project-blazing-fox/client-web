import { Link } from "react-router-dom";

function RegisterBox() {
  return (
    <div className="w-full lg:w-1/3 bg-custom-gray rounded-md py-5 text-white text-center">
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-300">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default RegisterBox;
