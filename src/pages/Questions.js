import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import ShowResult from "../components/ShowResult";
import Loader from "../img/loader.svg";
import { Button, Card, CardContent } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SuccessMessage from "../components/SuccessMessage";

const Questions = ({ match, history }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [questions, setQuestions] = useState([]);
  const [curQuestionNo, setCurQuestionNo] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult] = useState(false);
  const [success, setSuccess] = useState(false);

  const createMarkup = (text) => {
    return { __html: text };
  };

  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const url = `https://opentdb.com/api.php?amount=${
        match.params.no
      }&category=${
        match.params.cat
      }&difficulty=${match.params.dif.toLowerCase()}&type=multiple`;
      const { data } = await axios.get(url);

      setQuestions(data.results);
      setAllAnswers(
        [
          ...data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line
  }, []);

  const nextQuestion = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert("Please select one answer !");
      return false;
    }

    setAllAnswers(
      [
        ...questions[curQuestionNo + 1].incorrect_answers,
        questions[curQuestionNo + 1].correct_answer,
      ].sort(() => Math.random() - 0.5)
    );

    setCurQuestionNo(curQuestionNo + 1);
    setSuccess(true);
  };
  const showResult = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert("Please select one answer !");
      return false;
    }

    setResult(true);
  };

  const reset = () => {
    history.push("/");
  };

  const getAnswer = (e, ans) => {
    questions[curQuestionNo].userAnswer = ans;
    setSelected(ans);
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "darkred",
          }}
        >
          <img src={Loader} alt="Loading..." />
        </Box>
      ) : !result ? (
        <Box>
          {success && (
            <SuccessMessage>
              Answer is submitted please select the next question!
            </SuccessMessage>
          )}
          {questions.length > 0 && (
            <>
              <Card sx={{ marginTop: "100px" }}>
                <Box
                  sx={{
                    marginTop: "15px",
                    marginLeft: "25px",
                    height: "30px",
                  }}
                >
                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      questions[curQuestionNo].question
                    )}
                    style={{
                      fontSize: matches ? "1.5rem" : "1.1rem",
                      fontWeight: "bold",
                    }}
                  ></p>
                </Box>
                {/* <hr /> */}
                <CardContent>
                  {allAnswers.map((ans, i) => {
                    return (
                      <Box
                        sx={{
                          marginBottom: "30px",
                          borderBottom: "1px solid blue",
                          fontSize: "1.5rem",
                          "&:hover": {
                            cursor: "pointer",
                          },

                          color:
                            selected === ans ? "rgb(33, 121, 194)" : "blue",
                          fontWeight: selected === ans ? "bold" : "normal",
                        }}
                        key={i}
                        onClick={(e) => {
                          getAnswer(e, ans);
                        }}
                      >
                        <p dangerouslySetInnerHTML={createMarkup(ans)}></p>
                      </Box>
                    );
                  })}

                  <Box>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ float: "right" }}
                      onClick={
                        questions.length === curQuestionNo + 1
                          ? showResult
                          : nextQuestion
                      }
                    >
                      {questions.length === curQuestionNo + 1
                        ? "Show Result"
                        : "Next Qustion"}
                    </Button>
                    <Button variant="outlined" onClick={reset}>
                      Reset
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      ) : (
        <ShowResult
          questions={questions}
          createMarkup={createMarkup}
          reset={reset}
        />
      )}
    </>
  );
};

export default Questions;
