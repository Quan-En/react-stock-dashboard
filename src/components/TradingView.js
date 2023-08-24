
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
// import { mockCandleData } from '../constants/mock';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
			labelColor = "white",
			labelBackgroundColor = "black",
			labelBorderColor = "black"
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			
			const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
				// height: 300,
                // height: chartContainerRef.current.clientHeight,
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
                grid: {
                    vertLines: {
                      color: 'rgba(197, 203, 206, 0.5)',
                    },
                    horzLines: {
                      color: 'rgba(197, 203, 206, 0.5)',
                    },
                  },
                  crosshair: {
                    mode: CrosshairMode.Normal,
					vertLine: {
						color: labelColor,
						labelBackgroundColor: labelBackgroundColor,
						borderColor: labelBorderColor,
					},
					horzLine:{
						color: labelColor,
						labelBackgroundColor: labelBackgroundColor,
						borderColor: labelBorderColor,
					}
                  },
                  rightPriceScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                  },
                  timeScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                  },
			});

			const handleResize = () => {
				const newWidth = chartContainerRef.current.clientWidth;
				const newHeight = chartContainerRef.current.clientHeight;

				
				chart.applyOptions({ width: newWidth, height: newHeight });
				console.log(newWidth);
				console.log(newHeight);
			};



            var candleSeries = chart.addCandlestickSeries({
                upColor: 'rgb(8, 153, 129)',
                downColor: 'rgb(242, 54, 69)',
                borderDownColor: 'rgb(242, 54, 69)',
                borderUpColor: 'rgb(8, 153, 129)',
                wickDownColor: 'rgb(242, 54, 69)',
                wickUpColor: 'rgb(8, 153, 129)',
            });
            candleSeries.setData(data);
            
			chart.timeScale().fitContent();

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[
			data, backgroundColor, lineColor, 
			textColor, areaTopColor, areaBottomColor, 
			labelColor, labelBackgroundColor, labelBorderColor
		],
	);
	
	return (
        <div className='w-full h-full' ref={chartContainerRef}/>
	);
};


// export function TradingViewChart(props) {
// 	return (
// 		<ChartComponent {...props} data={mockCandleData}></ChartComponent>
// 	);
// }