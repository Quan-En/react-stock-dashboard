import React, { useContext } from "react";
import StockContext from "../context/StockContext";
import ThemeContext from "../context/ThemeContext";
import SearchResultContext from "../context/searchResultVisibilityContext";

const SearchResults = ({ results }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);
  const { resultVisibility, setResultVisibility } = useContext(SearchResultContext);

  const setSymbol_ = (item) => {
    setStockSymbol(item.symbol);
    setResultVisibility("invisible");
  };

  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${
        darkMode
          ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
          : "bg-white border-neutral-200 custom-scrollbar"
      } ${resultVisibility}`}
    >
        {results.map((item) => {
        return (
            <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200 "
            } transition duration-300`}
            onClick={() => setSymbol_(item)}
            >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
            </li>
        );
        })}
    </ul>
    
  );
};

export default SearchResults;