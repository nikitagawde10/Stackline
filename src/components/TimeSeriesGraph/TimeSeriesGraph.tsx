import { FC } from "react";
import "./TimeSeriesGraph.css";
import { selectProductDetails } from "../../redux/productSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sales Overview",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

export const TimeSeriesGraph: FC = () => {
  const productDetails = useAppSelector(selectProductDetails);
  // Prepare data for the graph
  const data = {
    labels: productDetails?.sales.map((sale) => {
      const date = new Date(sale.weekEnding);
      return `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    }),
    datasets: [
      {
        label: "Retail Sales",
        data: productDetails?.sales.map((sale) => sale.retailSales),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 0,
        tension: 0.5,
      },
      {
        label: "Wholesale Sales",
        data: productDetails?.sales.map((sale) => sale.wholesaleSales),
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };
  return (
    <div className="graph-container">
      <Line className="graph-image" options={options} data={data} />
    </div>
  );
};
