import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import image11 from "../images/image11.png";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TheCtechIcon from "../components/TheCtechIcon";

import QuestionCategory from "../pages/QuestionCategory";
import { Link, animateScroll as scroll } from "react-scroll";

export default function LandingPage() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matches1 = useMediaQuery("(min-width:320px) and (max-width:360px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",

        "& > :not(style)": {
          m: 1,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#FEF4E9",
        },
      }}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            padding: "20px",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Box>
            <TheCtechIcon />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "flex-end",
              alignItems: "center",
              alignContent: "center",
              gap: "5px",
            }}
          >
            <Box>Contact</Box>
            <Box sx={{ display: matches1 ? "none" : "block" }}>Help </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F49824",
                }}
              >
                Login
              </Button>
            </Box>
            <Box>
              <FormControl
                sx={{
                  m: 1,
                  backgroundColor: "white",
                  maxWidth: matches ? "100px" : "58px",
                }}
                size="small"
              >
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <Box>
            <Box>
              <h1
                style={{
                  textAlign: "left",
                  fontSize: matches ? "70px" : "32px",
                }}
              >
                Easy and intuitive
                <br />
                online testing
              </h1>
            </Box>
            <Box>
              <p
                style={{
                  maxWidth: "360px",
                  textAlign: "left",
                  fontSize: matches ? "24px" : "14px",
                }}
              >
                C-Tech is cloud-testing plateform that supports online creation
                and delivery of feature-rich tests
              </p>
            </Box>
            <Link
              to="secondInsideContainer"
              spy={true}
              smooth={true}
              duration={250}
              containerId="containerElement"
            >
              <Box
                sx={{
                  marginBottom: "10px",
                  textAlign: "left",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => scroll.scrollToBottom()}
                  sx={{
                    width: matches ? "150px" : "154px",
                    backgroundColor: "#F49824",
                  }}
                >
                  Get started
                </Button>
              </Box>
            </Link>
          </Box>
          <Box>
            <Box>
              <img
                src={image11}
                alt=""
                style={{
                  width: matches ? "600px" : "200px",
                  height: matches ? "600px" : "200px",
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* This below code is for scroll library to move to bottom on click */}
        <Box
          sx={{
            backgroundColor: "#FEF4E9",
          }}
        >
          <Box
            name="test7"
            className="element"
            id="containerElement"
            sx={{
              position: "relative",
              overflow: "scroll",
            }}
          >
            <Box name="secondInsideContainer">
              <QuestionCategory />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
