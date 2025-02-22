import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
const preset = import.meta.env.VITE_PRESET_NAME;
import Lottie from "lottie-react";
const animationData = "/loading.json";
import { register } from "../../api/educatorApi";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  subjectExpertise: string;
  qualification: string;
  profilePicture: File | null;
  governmentId: File | null;
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
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
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
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors({ ...errors, [id]: undefined });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!files || files.length === 0) {
      setErrors({ ...errors, [id]: "No file selected." });
      return;
    }

    if (!allowedTypes.includes(files[0].type)) {
      setErrors({
        ...errors,
        [id]: "Invalid file type. Only JPEG, PNG, and WEBP are allowed.",
      });
      return;
    }

    if (files && files.length > 0) {
      setFormData({ ...formData, [id]: files[0] });
      setErrors({ ...errors, [id]: "" });
    }
  };

  const validateFirstStep = (): boolean => {
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

  const validateSecondStep = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.subjectExpertise)
      newErrors.subjectExpertise = "Subject expertise is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required";
    if (!formData.profilePicture)
      newErrors.profilePicture = "Profile picture is required";
    if (!formData.governmentId)
      newErrors.governmentId = "Government ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadToCloudinary = async (
    formData: unknown
  ): Promise<string | null> => {
    try {
      setLoading(true);
      const { data } = await axios.post(cloudinaryURL, formData);
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFirstStep() && validateSecondStep()) {
      try {
        const idFormData = new FormData();
        const profileFormData = new FormData();

        if (formData.governmentId) {
          idFormData.append("file", formData.governmentId);
          idFormData.append("upload_preset", preset);
        }

        if (formData.profilePicture) {
          profileFormData.append("file", formData.profilePicture);
          profileFormData.append("upload_preset", preset);
        }

        const profileUrl = await uploadToCloudinary(profileFormData);
        const idUrl = await uploadToCloudinary(idFormData);

        const res = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.subjectExpertise,
          formData.qualification,
          profileUrl as string,
          idUrl as string
        );
        if (res?.data) {
          toast.success(res.data.message);
          navigate("/educator/login");
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateFirstStep()) {
      setCurrentStep(2);
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-[55%] h-[70%] rounded-2xl flex">
        <div className="w-[45%] rounded-l-2xl bg-[url('/educater.jpg')] bg-cover bg-red-400"></div>

        <div className="w-[55%] rounded-r-2xl flex flex-col bg-white justify-center items-center">
          {loading ? (
            <div className="flex justify-center items-center">
              {/* <span className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full h-8 w-8"></span> */}
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-[90%] h-[90%]"
              />
            </div>
          ) : (
            <>
              <img className="w-[300px] mb-[3px]" src="/logo.png" alt="logo" />
              <form
                onSubmit={handleSubmit}
                className="w-[70%] max-w-sm space-y-1 flex flex-col"
              >
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

                {currentStep === 2 && (
                  <>
                    <TextField
                      id="subjectExpertise"
                      label="Subject Expertise"
                      variant="standard"
                      value={formData.subjectExpertise}
                      onChange={handleInputChange}
                      error={!!errors.subjectExpertise}
                      helperText={errors.subjectExpertise}
                    />
                    <TextField
                      id="qualification"
                      label="Qualification/Degree"
                      variant="standard"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      error={!!errors.qualification}
                      helperText={errors.qualification}
                    />

                    <div>
                      <label className="text-gray-700 text-xs font-medium">
                        Profile Picture
                      </label>
                      <input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        className="border-b pb-1 text-gray-700 text-left w-full"
                        onChange={handleFileChange}
                      />
                      {errors.profilePicture && (
                        <p className="text-red-500 text-xs">
                          {errors.profilePicture}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-gray-700 text-xs font-medium">
                        Government ID (Aadhar, Passport, etc.)
                      </label>
                      <input
                        id="governmentId"
                        type="file"
                        accept="image/*,application/pdf"
                        className="border-b pb-1 text-gray-700 text-left w-full"
                        onChange={handleFileChange}
                      />
                      {errors.governmentId && (
                        <p className="text-red-500 text-xs">
                          {errors.governmentId}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div
                  className={`flex mt-1 ${
                    currentStep === 1 ? "justify-end" : "justify-between"
                  }`}
                >
                  {currentStep > 1 && (
                    <button
                      type="button"
                      className="bg-gray-400 text-black px-4 py-2 rounded-md flex items-center gap-2"
                      onClick={handleBack}
                    >
                      <FaArrowCircleLeft />
                      Back
                    </button>
                  )}
                  {currentStep < 2 ? (
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                      onClick={handleNext}
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

              <p
                className="text-black mt-2 text-center text-[11px] font-medium hover:underline cursor-pointer"
                onClick={() => navigate("/educator/login")}
              >
                Already have an account?{" "}
                <span className="text-blue-600">Log in here!</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
