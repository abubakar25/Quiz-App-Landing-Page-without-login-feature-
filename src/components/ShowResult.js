import { Button, Card, CardContent, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShowResult = ({ questions, createMarkup, reset }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (questions.length > 0) {
      setScore(
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 1
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Card sx={{ marginTop: "50px", backgroundColor: "rgb(186, 233, 233)" }}>
        <CardHeader
          title="Marksheet"
          titleTypographyProps={{ variant: "h3" }}
          sx={{
            textAlign: "center",
            backgroundColor: "rgb(73, 189, 235)",
            color: "white",
          }}
        ></CardHeader>
        <CardContent>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.59rem",
              fontWeight: "bold",
            }}
          >
            Total Score: {questions.length * 1}
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.59rem",
              fontWeight: "bold",
            }}
          >
            You obtained: {score}/{questions.length * 1}
          </p>
        </CardContent>
      </Card>

      {questions.map((q, i) => {
        return (
          <Card key={i} style={{ marginTop: "15px" }}>
            <Box
              sx={{
                marginTop: "15px",
                marginLeft: "25px",
                height: "30px",
              }}
            >
              <p
                style={{
                  fontSize: matches ? "1.2rem" : "0.7rem",
                  fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={createMarkup(q.question)}
              ></p>
            </Box>
            <hr />
            <CardContent>
              <Box
                style={{ textAlign: "center" }}
                sx={{
                  marginBottom: "30px",
                  borderBottom: "1px solid blue",
                  fontSize: "1.52rem",
                }}
              >
                <b>Your Answer: </b>{" "}
                <p
                  dangerouslySetInnerHTML={createMarkup(q.userAnswer)}
                  style={{
                    color: q.userAnswer === q.correct_answer ? "green" : "red",
                  }}
                ></p>
                <hr />
                <b>Correct Answer : </b>
                <p
                  dangerouslySetInnerHTML={createMarkup(q.correct_answer)}
                  style={{
                    color: "rgb(17, 218, 17)",
                  }}
                ></p>
              </Box>
              <p style={{ float: "right", color: "blue" }}>
                <b>Mark : {q.userAnswer === q.correct_answer ? "1" : "0"} </b>
              </p>
            </CardContent>
          </Card>
        );
      })}
      <Box>
        <Button
          variant="contained"
          onClick={reset}
          sx={{ marginTop: "35px", marginBottom: "15px", width: "100%" }}
          color="primary"
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ShowResult;
