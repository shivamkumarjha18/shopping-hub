import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CommonForm from '../../components/common/form'
import { Toaster } from 'sonner';
import { registerFormControl } from '@/config';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"
import { registerUser } from '@/store/auth-slice';
const initialState = {
    name: '',
    email: '',
    password: ''
};

function Signup() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate=useNavigate();


    function onSubmit(event) {
    event.preventDefault();
   dispatch(registerUser(formData)).then((data) => {
  if (data?.payload?.success) {
    toast.success(data?.payload?.message);
    navigate("/auth/login");
  } else {
    toast.error(data?.payload?.message);
  }
});

  }

  console.log(formData);
  return (
 <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      >  </CommonForm>
    </div>
  )
}

export default Signup