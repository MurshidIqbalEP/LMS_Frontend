import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
// import { register, googleRegistratiion } from "../../api/studentsApi";
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
  subjectExpertise?: string;
  qualification?: string;
  profilePicture?: string;
  governmentId?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    subjectExpertise: "",
    qualification: "",
    profilePicture: null,
    governmentId: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFormData({ ...formData, [id]: e.target.files[0] });
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
      //   let res = await register(
      //     formData.name,
      //     formData.email,
      //     formData.password
      //   );
      //   if (res?.data) {
      //     toast.success(res.data.message);
      //     navigate("/login");
      //   }
    }
  };

  const handleGoogleRegistration = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          `${GOOGLE_USERINFO_URL}?access_token=${tokenResponse.access_token}`
        );

        // let res = await googleRegistratiion(
        //   userInfo.data.name,
        //   userInfo.data.email
        // );
        // if (res?.data) {
        //   toast.success(res.data.message);
        //   navigate("/login");
        // }
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
        <div className="w-[45%] rounded-l-2xl bg-[url('/educater.jpg')] bg-cover  bg-red-400"></div>

        <div className="w-[55%] rounded-r-2xl flex flex-col bg-white justify-center items-center">
          <img className="w-[300px] mb-[3px]" src="/logo.png" alt="logo" />

          {/* Multi-Step Form */}
          <form
            className="w-[70%] max-w-sm space-y-1 flex flex-col"
            onSubmit={handleSubmit}
          >
            {/* Step 1: Initial Details */}
            {currentStep === 1 && (
              <>
                <TextField
                  id="name"
                  label="Name"
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
              </>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <>
                <TextField
                  id="subjectExpertise"
                  label="Subject Expertise"
                  variant="standard"
                  value={formData.subjectExpertise}
                  onChange={handleInputChange}
                />
                <TextField
                  id="qualification"
                  label="Qualification/Degree"
                  variant="standard"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />

                <div>
                  <label className="text-gray-700 text-xs font-medium ">
                    Profile Picture
                  </label>
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    className="border-b pb-1 text-gray-700 text-left "
                    onChange={handleFileChange}
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-xs font-medium ">
                    Government ID (Aadhar, Passport, etc.)
                  </label>
                  <input
                    id="governmentId"
                    type="file"
                    accept="image/*,application/pdf"
                    placeholder="Profile Picture"
                    className="border-b pb-1  text-gray-700 text-left"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div
              className={`flex mt-1 ${
                currentStep === 1 ? "justify-end" : "justify-between"
              }`}
            >
              {currentStep > 1 && (
                <button
                  type="button"
                  className="bg-gray-400 text-black px-4 py-2 rounded-md flex items-center gap-2"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <FaArrowCircleLeft />
                  Back
                </button>
              )}
              {currentStep < 2 ? (
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                  <FaArrowCircleRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  Register
                </button>
              )}
            </div>
          </form>


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
