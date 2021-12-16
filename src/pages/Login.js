import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ErrorMessage from "../components/ErrorMessage";

function Login(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e, data) => {
    e.preventDefault();

    if (
      name === "" ||
      password === "" ||
      name !== "admin" ||
      password !== "12345"
    ) {
      setError(true);
      return;
    } else if (name === "admin" && password === "12345") {
      history.push("/landingPage");
      setError(false);
    }
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Please login to start the quiz</h1>
      </div>
      <div
        style={{
          width: "100vw",
          //   height: "100vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            "& > :not(style)": {
              p: 2,
              m: 1,
              width: 340,
              height: 168,
            },
          }}
        >
          <Paper variant="outlined">
            <form onSubmit={handleSubmit}>
              {error && (
                <ErrorMessage>UserName or password incorrect</ErrorMessage>
              )}
              <div>
                <TextField
                  sx={{ marginTop: "10px", width: "100%" }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  sx={{ marginTop: "20px", width: "100%" }}
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginTop: "20px", float: "right" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
        </Box>
      </div>
    </>
  );
}

export default Login;
