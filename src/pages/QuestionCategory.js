import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

import {
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const QuestionCategory = () => {
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [error, setError] = useState(false);
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [qNo, setQNo] = useState(0);

  const fetchQuestionCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);

    setCats(data.trivia_categories);
  };
  useEffect(() => {
    fetchQuestionCategories();
  }, []);

  const submitHandler = () => {
    if (
      parseInt(qNo) > 15 ||
      parseInt(qNo) < 1 ||
      cat === "" ||
      difficulty === ""
    ) {
      // alert(" Please give proper input !");
      setError(true);
      return;
    } else {
      const url = `/q/${cat}/${difficulty}/${qNo}`;
      history.push(url);
      setError(false);
    }
  };

  return (
    <Box>
      <Card
        sx={{
          width: matches ? "35%" : "100%",
          margin: "60px auto",
        }}
      >
        <CardHeader
          title="Quiz  Application"
          titleTypographyProps={{ variant: "h3" }}
          sx={{
            textAlign: "center",
            backgroundColor: "blue",
            color: "white",
          }}
        ></CardHeader>
        <CardContent>
          {error && <ErrorMessage>Please give proper input !</ErrorMessage>}
          <TextField
            sx={{
              width: "100%",
            }}
            select
            label="Select"
            defaultValue=""
            onChange={(e) => setCat(e.target.value)}
            helperText="Please select category"
            variant="outlined"
            size="small"
          >
            {cats.map((c) => {
              return (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            select
            label="Select"
            defaultValue=""
            sx={{
              width: "100%",
            }}
            onChange={(e) => setDifficulty(e.target.value)}
            helperText="Please select defficulty"
            variant="outlined"
            size="small"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>

          <TextField
            id="outlined-basic"
            label="Number Of Questions ( 1 - 15 )"
            variant="outlined"
            type="number"
            name="number"
            size="small"
            sx={{
              width: "100%",
            }}
            onChange={(e) => setQNo(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              fontSize: "25px",
              marginTop: "20px",
              width: "100%",
              height: "50px",
              "&:hover": {
                fontSize: "27px",
              },
            }}
            color="primary"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionCategory;
