import React from "react";
import { Input } from "@heroui/react";
import TextField from "@mui/material/TextField";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-[55%] h-[70%] rounded-2xl bg-amber-300 flex ">
        <div className="w-[45%] rounded-l-2xl bg-[url('/login.jpg')] bg-cover bg-red-400"></div>

        <div className="w-[55%] rounded-r-2xl flex flex-col  bg-white justify-center items-center">
          <img className="w-[300px]" src="logo.png" alt="logo" />
          <form className="w-full max-w-sm space-y-4 flex flex-col">
            <TextField id="email" label="Email" variant="standard" />

            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              variant="standard"
            />

            {/* Submit Button */}
            {/* <Button className="bg-[#EA454C] w-full" type="submit">
              Login
            </Button> */}
          </form>

          {/* Divider */}
          <div className="my-4 text-gray-500 text-center">or</div>

          {/* Google Login Button */}
          {/* <Button
            className="w-full bg-white shadow-md hover:shadow-lg"
            type="button"
          >
            <FcGoogle className="mr-2" size={22} /> Continue with Google
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
