import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from './chart.css'
import './apex.css'
import _ from 'lodash';


const keys = [
    'alpha acid',
    'beta acid',
    'co-humulone',
    'myrcene oil',
    'humulene oil',
    'caryophyllene oil',
    'farnesene oil',
];

const options = {
    chart: {
        dropShadow: {
            enabled: true,
            blur: 1,
        },
    },
    style: {
        fontSize: '20px'
    },
    legend: {
        show: true,
        labels: {
            colors: 'rgba(188, 245, 232, 0.9)',
        },
    },
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        radar: {
            polygons: {
                strokeColors: 'rgba(80, 55, 165, 0.3)',
                fill: {
                    colors: ['rgba(88,104,255,0.1)'],
                }
            }
        }
    },
    stroke: {
        width: 2,
    },
    fill: {
        opacity: 0.2,
    },
    markers: {
        size: 4,
    },
    xaxis: {
        categories: keys,
        style: {
            fontSize: '20px',
        },
        labels: {
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
            },
        }
    },
    yaxis: {
        show: false,
        tickAmount: 4,
        min: 0,
        max: 100,
    },
    tooltip: {
        enabled: true,
        custom: ({series, seriesIndex, dataPointIndex}) => `${series[seriesIndex][dataPointIndex]}%`,
    },
};


function hopValues(hop, keys) {
    return keys
        .map(k => hop[k])
        .map(v => Array.isArray(v) ? _.mean(v) : v)
        .map(v => v === '?' ? 0 : v);
}


export default function Chart({hopsList}) {
    const series = hopsList.map(hop => ({name: hop.title, data: hopValues(hop, keys)}));

    return <div id='chart' className={styles.chartContainer}>
        <ReactApexChart options={options} series={series} type="radar" height={'100%'} width={'100%'}/>
    </div>;
}
