import "./App.css";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import QuestionCategory from "./pages/QuestionCategory";
import Questions from "./pages/Questions";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <div>
        <Router>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Container>
            <Route
              path="/questionCategory"
              component={QuestionCategory}
              exact
            ></Route>
            <Route path="/q/:cat/:dif/:no" component={Questions} exact></Route>
          </Container>
        </Router>
      </div>
    </>
  );
}

export default App;
