import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/educatorSlice";
import { login } from "../../api/educatorApi";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = (): boolean => {
    let newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password.length < 6) {
      newErrors.password = "6 digit Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      let res = await login(formData.email, formData.password);
      if (res?.data) {
        dispatch(setCredentials(res?.data));
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate("/educator");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-[55%] h-[70%] rounded-2xl flex">
        <div className="w-[45%] rounded-l-2xl bg-[url('/educater.jpg')] bg-cover bg-red-400"></div>

        <div className="w-[55%] rounded-r-2xl flex flex-col bg-white justify-center items-center">
          <img className="w-[300px] mb-[10px]" src="/logo.png" alt="logo" />

          <form
            className="w-[70%] max-w-sm space-y-5 flex flex-col "
            onSubmit={handleSubmit}
          >
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

            {/* Submit Button */}
            <button
              className="bg-[#060050] !mt-[13px] w-full h-[35px] !text-white rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-2 text-gray-500 text-center">or</div>

          {/* Redirect to Register */}
          <p
            className="text-black mt-2 text-center text-[11px] font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/educator/register")}
          >
            Don’t have an account?{" "}
            <span className="text-blue-600">Create one now!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
