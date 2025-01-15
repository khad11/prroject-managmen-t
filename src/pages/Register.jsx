import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { Link, useActionData, Form } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useSelector } from "react-redux";

import { validateSignupOrLoginData } from "../utils";
import Button from "../components/Button";

import { useAuthWithGoogle } from "../hooks/useAuthWithGoogle";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("repeadPassword");
  return { displayName, password, email, confirmPassword };
};

function Register() {
  const { authWithGoogle } = useAuthWithGoogle();
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isPending } = useSelector((store) => store.user);
  const { registerWithEmailAndPassword } = useRegister();
  const singupActionData = useActionData();

  useEffect(() => {
    if (singupActionData) {
      const { valid, errors } = validateSignupOrLoginData(
        singupActionData,
        true
      );

      if (valid) {
        const { displayName, email, password } = singupActionData;
        registerWithEmailAndPassword(displayName, email, password);
      } else {
        setError(errors);
      }
    }
  }, [singupActionData]);

  return (
    <div className="h-screen grid place-items-center w-full bg-base-100">
      <Form method="post" className="max-w-96 mx-auto w-full ">
        <h2 className="text-4xl font-bold text-center uppercase my-5">
          Register
        </h2>
        <FormInput
          type="text"
          placeholder="Name"
          label="Display Name"
          name="name"
          error={error.displayName && "input-error"}
          errorText={error.displayName}
        />
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
        <FormInput
          type="password"
          placeholder="Password again"
          label="Your Pasword again"
          name="repeadPassword"
          error={error.confirmPassword && "input-error"}
          errorText={error.confirmPassword}
        />
        <div className="my-5 flex flex-col gap-3 ">
          <Button loading={isPending} type="primary">
            Register
          </Button>
          <a
            onClick={authWithGoogle}
            type="button"
            className="btn btn-secondary btn-block"
          >
            Google
          </a>
        </div>
        <p className="text-center text-x italic opacity-70">
          if you have a accaunt ,{" "}
          <Link className="link link-primary " to="/login">
            LOGIN
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
