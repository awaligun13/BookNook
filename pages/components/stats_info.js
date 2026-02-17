"use client";

import styles from "../../styles/Stats.module.css"
import { Bar } from 'react-chartjs-2';
import{ Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReadingStats({logs = []}){

    const labels = logs.map((_, index) => "");
    const pagesData = logs.map(() => 0);
    const minutesData = logs.map(() => 0);

    const chartData = {
        labels: labels,
        datasets: [ 
            {
                label: "Pages Read", data: pagesData, backgroundColor: "#2b224c",
            },
            {
                label: "Minutes Read", data: minutesData, backgroundColor: "#56468f",
            },
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Reading Logs" },
            tooltip: { enabled: true },
        },
        scales: {
            x: { ticks: { display: false }, grid: { display: false } },
            y: { beginAtZero: true, title: { display: true, text: "Value" } },
        },
    };



    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
}