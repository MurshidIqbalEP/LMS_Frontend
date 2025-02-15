import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { register, googleRegistratiion } from "../../api/studentsApi";
const GOOGLE_USERINFO_URL = import.meta.env.VITE_GOOGLE_USERINFO_URL;
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      let res = await register(
        formData.name,
        formData.email,
        formData.password
      );
      if (res?.data) {
        toast.success(res.data.message);
        navigate("/login");
      }
    }
  };

  const handleGoogleRegistration = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          `${GOOGLE_USERINFO_URL}?access_token=${tokenResponse.access_token}`
        );

        let res = await googleRegistratiion(
          userInfo.data.name,
          userInfo.data.email
        );
        if (res?.data) {
          toast.success(res.data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-[55%] h-[70%] rounded-2xl flex">
        <div className="w-[45%] rounded-l-2xl bg-[url('/login.jpg')] bg-cover bg-red-400"></div>

        <div className="w-[55%] rounded-r-2xl flex flex-col bg-white justify-center items-center">
          <img className="w-[300px] mb-[3px]" src="logo.png" alt="logo" />

          <form
            className="w-[70%] max-w-sm space-y-5 flex flex-col "
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              label="Name"
              type="text"
              variant="standard"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="standard"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="standard"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            {/* Submit Button */}
            <button
              className="bg-[#060050] mt-[13px] w-full h-[35px] text-white rounded-lg"
              type="submit"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="my-1 text-gray-500 text-center">or</div>

          {/* Google Login Button */}
          <button
            className="w-[70%] bg-white text-gray-700 border border-gray-300 flex items-center justify-center space-x-2 py-2 rounded-md shadow-md hover:bg-gray-100"
            type="button"
            onClick={() => handleGoogleRegistration()}
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          {/* Redirect to Login */}
          <p
            className="text-black mt-2 text-center text-[11px] font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-blue-600">Log in here!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
