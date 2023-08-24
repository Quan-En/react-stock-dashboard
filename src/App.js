import { useState } from "react";
import './App.css';
import Dashboard from './components/Dashboard';
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";
import SearchResultContext from "./context/searchResultVisibilityContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("MSFT");
  const [resultVisibility, setResultVisibility] = useState("visible");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <SearchResultContext.Provider value={{ resultVisibility, setResultVisibility }}>
          <Dashboard />
        </SearchResultContext.Provider>
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
