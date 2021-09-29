import { Link } from "react-router-dom";

function LoginBox() {
  return (
    <div className="w-full lg:w-1/3 bg-custom-gray lg:rounded-md py-5 text-white text-center">
      <p>
        Have an account?{" "}
        <Link to="/login" className="text-blue-300">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default LoginBox;
