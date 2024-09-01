import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Button } from "react-bootstrap";
import { notification } from "antd";

const Home = () => {
  const getUserId = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="px-6 py-4 bg-[rgb(240,235,248)]">
      <h1 className="text-center font-bold text-lg md:text-3xl">Add Your Questions</h1>

      <Formik
        initialValues={{
          question: "",
          topic: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.question) {
            errors.question = "Question is Required";
          }
          if (!values.topic) {
            errors.topic = "Topic is Required";
          }
          if (!values.option1) {
            errors.option1 = "Option is Required";
          }
          if (!values.option2) {
            errors.option2 = "Option is Required";
          }
          if (!values.option3) {
            errors.option3 = "Option is Required";
          }
          if (!values.option4) {
            errors.option4 = "Option is Required";
          }
          if (!values.answer) {
            errors.answer = " Answer is Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetFrom }) => {
          const addquiz = {
            question: values.question,
            topic: values.topic,
            option1: values.option1,
            option2: values.option2,
            option3: values.option3,
            option4: values.option4,
            answer: values.answer,
            userID: getUserId,
          };
          axios
            .post("https://mcq-q65b.onrender.com/add-quiz", addquiz)
            .then((res) => {
              console.log(res.data);
              setSubmitting(false);
              notification.success({message:"question added successfully"})
              resetFrom()
            })
            .catch((err) => {
              console.log(err);
              setSubmitting(false)
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
          <div className="flex items-center justify-center mx-[0px] md:mx-80 lg:mx-80 my-10">
            <form onSubmit={handleSubmit} className="flex-1">
              <div className="flex items-center justify-center flex-col gap-4 py-10 rounded-lg px-8 bg-white ">
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="question"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.question}
                    placeholder="Write your question here"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.question && touched.question && errors.question}
                  </span>
                </div>
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="topic"
                    name="topic"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.topic}
                    placeholder="Enter your topic"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.topic && touched.topic && errors.topic}
                  </span>
                </div>
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="option1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.option1}
                    placeholder="Enter the option1"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.option1 && touched.option1 && errors.option1}
                  </span>
                </div>
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="option2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.option2}
                    placeholder="Enter the option2"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.option2 && touched.option2 && errors.option2}
                  </span>
                </div>
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="option3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.option3}
                    placeholder="Enter the option3"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.option3 && touched.option3 && errors.option3}
                  </span>
                </div>
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="option4"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.option4}
                    placeholder="Enter the option4"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.option4 && touched.option4 && errors.option4}
                  </span>
                </div>
                <div className="flex items-start flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="answer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.answer}
                    placeholder="Enter the answer"
                    className="border rounded-md border-black p-2 w-full"
                  />
                  <span className="text-red-600 text-xs">
                    {errors.answer && touched.answer && errors.answer}
                  </span>
                </div>
                <button className="bg-purple-500 py-2 px-4 rounded-md text-white font-semibold" type="submit" disabled={isSubmitting}>
                  Add Quiz
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Home;
