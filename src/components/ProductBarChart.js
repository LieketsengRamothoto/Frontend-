// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
    const data = {
        labels: products.map(product => product.name),  // Product names
        datasets: [
            {
                label: 'Product Quantity',
                data: products.map(product => product.quantity), // Corresponding quantities
                backgroundColor: 'rgba(255, 99, 132, 0.6)',  // Change bar color to red (rgba format)
                borderColor: 'rgba(255, 99, 132, 1)',          // Change bar border color to red
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ProductBarChart;
