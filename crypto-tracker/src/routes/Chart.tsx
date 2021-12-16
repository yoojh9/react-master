import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>
            {isLoading ? "Loading Chart..." : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: 'price',
                            data: data?.map(price => price.close),
                        }
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false
                        },
                        stroke: {
                            curve: "smooth",
                            width: 5,
                        },
                        xaxis: {
                            axisTicks: { show: false },
                            type: 'datetime',
                            labels: {
                                datetimeUTC: true,
                                datetimeFormatter: {
                                    year: 'yyyy',
                                    month: "mm",
                                    day: 'MMM dd',
                                    hour: 'HH:mm'
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                formatter: value => `$ ${Math.floor(value)}`
                            }
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {
                                gradientToColors: ["#0be881"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#74b9ff"],
                        tooltip: {
                            y: {
                                formatter: value => `$ ${value.toFixed(2)}`
                            }
                        },
                        labels: data?.map(v => v.time_close)
                    }} />
            )}
        </div>
    )
}

export default Chart;
