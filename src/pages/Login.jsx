import React, { useEffect } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { validateSignupOrLoginData } from "../utils";
import { useState } from "react";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  return { password, email };
};

function Login() {
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isPending } = useSelector((store) => store.user);
  const { loginWithEmailAndPassword } = useLogin();
  const loginActionData = useActionData();

  useEffect(() => {
    if (loginActionData) {
      const { valid, errors } = validateSignupOrLoginData(loginActionData);
      console.log(valid, errors);

      if (valid) {
        const { displayName, email, password } = loginActionData;
        loginWithEmailAndPassword(email, password);
      } else {
        setError(errors);
      }
    }
  }, [loginActionData]);
  return (
    <div className="h-screen grid place-items-center w-full bg-base-100">
      <Form method="post" className="max-w-96 mx-auto w-full ">
        <h2 className="text-4xl font-bold text-center uppercase my-5 text-green-600">
          Login
        </h2>

        <FormInput
          type="email"
          placeholder="Email"
          label="Your  Email"
          name="email"
          error={error.email && "input-error"}
          errorText={error.email}
        />
        <FormInput
          type="password"
          placeholder="Password"
          label="Your Pasword"
          name="password"
          error={error.password && "input-error"}
          errorText={error.password}
        />

        <div className="my-5">
          {!isPending && (
            <button className="btn btn-success text-base-100 btn-block">
              Login
            </button>
          )}
          {isPending && (
            <button
              className="btn btn-success text-base-100 btn-block"
              disabled
            >
              Loading...
            </button>
          )}
        </div>
        <p className="text-center text-x italic opacity-70">
          if you don't have a accaunt ,
          <Link className="link link-primary " to="/register">
            REGISTER
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
