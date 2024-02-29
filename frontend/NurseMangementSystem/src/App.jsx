import "./App.css";
import HomePage from "./HomePage.jsx";
import CustomTheme from "./utils/CustomTheme.jsx";

function App() {
  return (
    <>
      <CustomTheme>
        <HomePage />
      </CustomTheme>
    </>
  );
}

export default App;
