import CommonForm from "@/components/common/form";
import { LoginFormControl } from "@/config"; 
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner"; 

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log("Login response:", data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Login successful ✅");
        // ❌ Yaha navigate() mat kar 
        // ✅ CheckAuth khud hi redirect kar dega role ke hisaab se
      } else {
        toast.error(data?.payload?.message || "Login failed ❌");
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/signup"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formcontrols={LoginFormControl}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Login;
