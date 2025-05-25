import React, { useState } from "react";
import { Button, Flex, Input, Typography, message } from "antd";
import type { GetProps } from "antd";
import { verifyOtp } from "../../api/studentsApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { otpVerify } from "../../api/educatorApi";

type OTPProps = GetProps<typeof Input.OTP>;
const { Title, Text } = Typography;

function Otp() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange: OTPProps["onChange"] = (value) => {
    setOtp(value);
    console.log("OTP changed:", value);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("Individual input:", value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {

      if (otp.length === 6) {
        let res = await otpVerify(otp, email);
        if (res?.data.success) {
          toast.message(res?.data.message);
          navigate("/educator/login");
        }
      } else {
        message.warning("Enter 6 Digit OTP");
      }
    } catch (err) {
      message.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <Flex gap="middle" align="center" vertical>
          <Title level={4}>Verify Your Email</Title>
          <Text type="secondary">
            Enter the 6-digit code sent to your email
          </Text>

          <Input.OTP
            length={6}
            size="large"
            status={otp.length === 6 ? "" : "error"}
            onChange={onChange}
            onInput={onInput}
          />

          <Button
            type="primary"
            size="large"
            className="w-full mt-4"
            onClick={handleSubmit}
            disabled={otp.length !== 6}
            loading={loading}
          >
            Verify OTP
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default Otp;
