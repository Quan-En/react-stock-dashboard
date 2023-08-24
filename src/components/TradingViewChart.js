import React, { useContext, useEffect, useState } from "react";
// import ChartFilter from "./ChartFilter";
import Card from "./Card";

import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../utils/api/stock-api";
import {
  createDate,
  convertDateToUnixTimestamp,
  // convertUnixTimestampToDate,
  convertUnixTimestampToFormatDate,
} from "../utils/helpers/date-helper";
import { chartConfig } from "../constants/config";
import { ChartComponent } from "./TradingView";

const TradingViewChart = () => {
  const candleFilter = "1Y";
  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const [trading_data, setTradingData] = useState([]);

  const formatCandleData = (data) => {
    return data.c.map((item, index) => {
      return {
        time: convertUnixTimestampToFormatDate(data.t[index]),
        open: Math.round(data.o[index] * 100) / 100,
        high: Math.round(data.h[index] * 100) / 100,
        low: Math.round(data.l[index] * 100) / 100,
        close: Math.round(item * 100) / 100,
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[candleFilter];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[candleFilter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setTradingData(formatCandleData(result));
      } catch (error) {
        setTradingData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol]);

  return (
    <Card>
      <ChartComponent 
      colors={
        darkMode ? 
        { backgroundColor: 'rgb(17, 24, 39)', textColor: 'white', labelColor: "white", labelBackgroundColor:"#9B7DFF", labelBorderColor:"white" } : 
        { backgroundColor: 'white', textColor: 'block' }
      } 
      data={trading_data} 
      />
    </Card>
  );
};

export default TradingViewChart;