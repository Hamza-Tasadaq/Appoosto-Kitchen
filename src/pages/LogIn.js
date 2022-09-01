import { Link } from "react-router-dom";
import { Input } from "../components";
import Container from "../components/Container";

const LogIn = () => {
  return (
    <Container
      classes={
        " flex flex-col-reverse md:flex-row  px-3 py-2 md:p-0 min-h-screen"
      }
    >
      <div className="self-center md:max-w-md w-full 	">
        <div className="py-2 md:py-0 px-3 sm:px-6 md:px-10">
          <img src="./assets/icons/logo.svg" alt="logo" />
          <h1 className="font-semibold my-3 md:my-5 text-2xl text-[#0A111F]">
            Sign in to your Account
          </h1>
          <div className="flex items-center space-x-3">
            <button className="bg-[#4065B4] rounded-md flex items-center h-9 md:h-11 justify-center flex-1 space-x-2">
              <img
                className="mt-0.5"
                src="./assets/icons/facebook.svg"
                alt="facebook"
              />
              <span className="font-semibold text-xs text-[#ffffff]">
                Login with Facebook
              </span>
            </button>

            <button className="bg-[#F5F6F7] rounded-md p-2 h-9 md:h-11 w-9 md:w-11 flex items-center justify-center">
              <img src="./assets/icons/gmail.svg" alt="gmail" />
            </button>
            <button className="bg-[#F5F6F7] rounded-md p-2 h-9 md:h-11 w-9 md:w-11 flex items-center justify-center">
              <img src="./assets/icons/twitter.svg" alt="twitter" />
            </button>
          </div>
          <div className="flex items-center">
            <div className="bg-[#C0C4CA] h-px flex-1" />
            <h3 className="text-[#C0C4CA] mb-1.5 mx-1">Or</h3>
            <div className="bg-[#C0C4CA] h-px flex-1" />
          </div>
          <form className="space-y-2.5">
            <div className="flex flex-col space-y-2">
              <label className="text-[#0A111F] font-medium text-base">
                Email address
              </label>
              <Input
                placeholder="example@gmail.com"
                name="email"
                type="email"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[#0A111F] font-medium text-base">
                Password
              </label>
              <Input placeholder="........." name="email" type="password" />
            </div>
            <div className="flex items-center justify-between font-normal text-xs text-[#0A111F]">
              <div className="flex items-center space-x-2">
                <input type={"checkbox"} />
                <label>Remember me?</label>
              </div>
              <h5 className="underline">forgot password</h5>
            </div>

            <Link
              to="/home"
              className="rounded-md block text-center text-[#ffffff] text-base font-semibold bg-[#D85C27] w-full py-2"
            >
              Log In
            </Link>
          </form>

          <div className="mt-4 font-medium">
            <h4 className="text-[#627193] text-sm">Don't have an account?</h4>
            <h6 className="underline text-xs text-[#D85C27]">
              Create new account
            </h6>
          </div>
        </div>
      </div>
      <div className="bg-[#0C234C] rounded-t-md md:rounded-none p-10 md:h-screen flex items-center justify-center flex-1">
        <div className="px-10 max-w-[576px] w-full">
          <img
            className="  w-full"
            src="./assets/images/login-banner.png"
            alt="login-banner"
          />
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
