import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Button } from "react-bootstrap";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-blue-400">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = " Email is Required";
          }
          if (!values.password) {
            errors.password = " Password is Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("https://mcq-q65b.onrender.com/signin", values)
            .then((res) => {
              console.log("signIn", res);
              setSubmitting(false);
              const { token } = res.data;
              localStorage.setItem("user", JSON.stringify(res.data.data._id));
              localStorage.setItem("token", token);
              sessionStorage.setItem("login", "true");

              navigate("/");
              notification.success({ message: res.data.message });
            })
            .catch((err) => {
              console.log(err.data);
              notification.error({message:err.response.data.message})
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center flex-col gap-4 py-10 rounded-lg px-8 bg-neutral-100 md:w-[25vw]">
              <div className="flex w-full items-center gap-2 flex-col">
                <input
                  className="border rounded-md border-black p-2 w-full"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter your email"
                />
                <span className="text-red-600 text-xs">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
              <div className="flex w-full items-center gap-2 flex-col">
                <input
                  className="border rounded-md border-black p-2 w-full"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter your password"
                />
                <span className="text-red-600 text-xs">
                  {" "}
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <div>
                <Button type="submit" disabled={isSubmitting}>
                  Sign In
                </Button>
              </div>
              <Link className="text-black" to={"/signup"}>
                New user? Register here
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
