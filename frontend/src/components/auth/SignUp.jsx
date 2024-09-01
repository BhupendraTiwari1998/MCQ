import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Button } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-blue-400">
      <Formik
        initialValues={{ name: "", email: "", contact: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is Required";
          }
          if (!values.email) {
            errors.email = "Email is Required";
          }
          if (!values.contact) {
            errors.contact = "Contact is Required";
          }
          if (!values.password) {
            errors.password = "Password is Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("https://mcq-q65b.onrender.com/signup", values)
            .then((res) => {
              console.log("sign Up", res);
              notification.success({ message: res.data.message });
              setSubmitting(false);
              navigate("/signin");
            })
            .catch((err) => {
              console.log(err);
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
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter your name"
                />
                <span className="text-red-600 text-xs">
                  {errors.name && touched.name && errors.name}
                </span>
              </div>
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
                  type="text"
                  name="contact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                  placeholder="Enter your contact"
                />
                <span className="text-red-600 text-xs">
                  {errors.contact && touched.contact && errors.contact}
                </span>
              </div>
              <div className="flex w-full items-center gap-2 flex-col">
                <input
                  className="border rounded-md border-black p-2 w-full"
                  type="text"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter your  password"
                />
                <span className="text-red-600 text-xs">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <div>
                <Button type="submit" disabled={isSubmitting}>
                  Register
                </Button>
              </div>
            <Link className="text-black" to={"/signin"}>Already have an account? Login here</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
