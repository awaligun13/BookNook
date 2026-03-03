"use client";

import styles from "../../styles/Stats.module.css"
import { Bar } from 'react-chartjs-2';
import{ Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { getDocument } from "../../library/UserDoc";
import {useEffect, useState} from "react";
import { auth } from "../../library/firebaseConfig";

export default function ReadingStats(){

    const [userData, setUserData] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect (() => {
        const getUser = async () => {
            const user = auth.currentUser;
            const data = await getDocument("users", user.uid);
            setUserData(data);
        }
        getUser();
    }, []);

    useEffect (() => {
        if (!userData) {
            return;
        }

        const labels = userData.readingLog.map((_, index) => `Log ${index + 1}`);        
        const pagesData = userData.readingLog.map(pages => pages.pages || 0);
        const minutesData = userData.readingLog.map(time => (time.timeSpent || 0) % 60);

    
        setChartData({
            labels,
            datasets: [
                {label: "Pages Read", data: pagesData, backgroundColor:"#2b224c"},
                {label: "Minutes Read", data: minutesData, backgroundColor:"#56468f"}
            ]
        });
    }, [userData]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Reading Logs" },
        },
        scales: {
            x: {  grid: { display: false } },
            y: { beginAtZero: true },
        },
    };

    return (
        <div className = {styles.chartBox}>
            {chartData && <Bar data={chartData} options={options} />}
        </div>
    );
}