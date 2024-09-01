import { notification } from "antd";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));
  console.log(userId);

  // Fetch the quiz data
  useEffect(() => {
    axios
      .get("http://localhost:3002/get-quiz")
      .then((res) => {
        console.log(res.data);
        setQuiz(res.data.data);
      })
      .catch((err) => {
        notification.error({ message: err.data.message });
        console.log(err);
      });
  }, []);

  // Initial values for Formik
  const initialValues = {
    responses: quiz.reduce((acc, que) => {
      acc[que._id] = ""; // Initial empty value for each question
      return acc;
    }, {}),
  };

  // Custom validation function
  const validate = (values) => {
    const errors = { responses: {} };
    quiz.forEach((que) => {
      if (!values.responses[que._id]) {
        errors.responses[que._id] = "This question must be answered.";
      }
    });
    return Object.keys(errors.responses).length > 0 ? errors : {};
  };

  // Handle submit
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:3002/create-result", {
        userId,
        responses: values.responses,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/results/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-[rgb(240,235,248)] py-4 px-6">
      <Formik
        initialValues={initialValues}
        validate={validate}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center flex-col gap-4">
              {quiz.map((que) => (
                <div
                  key={que._id}
                  className='bg-white border pl-6 p-4 flex-1 w-full md:max-w-[60vw] relative rounded-md after:content-[""] after:absolute after:top-0 after:left-[0.5px] after:h-full after:w-[3px] after:bg-purple-400 '
                >
                  <div className="text-black text-left text-lg capitalize">
                    {que.question}
                  </div>
                  <div className="flex items-start flex-col gap-2 my-4">
                    {[que.option1, que.option2, que.option3, que.option4].map(
                      (option) => (
                        <div key={option} className="flex items-center gap-2">
                          <label className="capitalize">
                            <input
                              type="radio"
                              name={`responses.${que._id}`}
                              value={option}
                              onChange={handleChange}
                              checked={values.responses[que._id] === option}
                            />
                            {option}
                          </label>
                        </div>
                      )
                    )}
                    {touched.responses && errors.responses?.[que._id] && (
                      <div className="text-red-500">
                        {errors.responses[que._id]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="my-4 text-xs text-black"><span className="font-bold">Note:- </span>if you want to play the quiz again you can kindly delete the results</p>
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-purple-500 my-2 text-white font-semibold"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Quiz;
