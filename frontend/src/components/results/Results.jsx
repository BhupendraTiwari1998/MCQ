import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Results = () => {
  const { userId } = useParams();
  const [result, setResult] = useState(null);  // Set initial state to null

  useEffect(() => {
    getResult();
  }, [userId]);

  const getResult = () => {
    axios
      .get(`https://mcq-q65b.onrender.com/get-results/${userId}`)
      .then((res) => {
        console.log(res.data.data);
        setResult(res.data.data);  // Set result data
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    axios
      .delete(`https://mcq-q65b.onrender.com/delete-results/${userId}`)
      .then((res) => {
        console.log(res.data.message);
        setResult(null);  // Clear the result state after deletion
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const responses = result?.responses;

  return (
    <div className="bg-[rgb(240,235,248)] py-4 px-6">
      {result ? (
        <>
          <div>
            <h1 className="text-xl text-black font-semibold">
              Result for {result?.userId?.name}
            </h1>

            <h3 className="text-lg">
              Score: {result?.score}/{result?.responses?.length}
            </h3>
          </div>
          <button
            onClick={handleDelete}
            className="border-b border-red-400 my-2 px-1 bg-transparent text-red-400"
          >
            Delete Result
          </button>
          <div className="flex items-center justify-center flex-col gap-3">
            {responses?.map((res) => {
              return (
                <div
                  key={res?._id}
                  className={`${
                    res.isCorrect === true ? "bg-green-100" : "bg-red-200"
                  } border pl-6 p-4 flex-1 w-full md:max-w-[60vw]  text-left  relative rounded-md`}
                >
                  <span className="capitalize text-left text-lg font-semibold">
                    {res?.questionId?.question}
                  </span>

                  <div className="flex flex-col gap-1 mt-3">
                    <h3 className="text-black text-[16px] flex gap-1 items-center">
                      Your Answer: <span>{res?.selectedAnswer} </span>
                      {res.isCorrect === true ? (
                        <span className="text-green-500">
                          <FaCheck />
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <IoClose />
                        </span>
                      )}
                    </h3>
                    <h3 className="text-black text-[16px]">
                      Correct Answer: <span>{res?.questionId?.answer}</span>
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        // Display this message when result is null
        <div className="flex items-center justify-center h-[79vh] py-10">
          <h1 className="text-xl text-gray-500">No data here</h1>
        </div>
      )}
    </div>
  );
};

export default Results;
