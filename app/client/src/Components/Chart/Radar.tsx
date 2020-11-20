import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from './chart.less';
import './apex.global.less';
import {hopCompounds} from "../../../../shared/src/KnowledgeBase/HopComposition";
import {hopToMinMax, hopValues} from "./utils";


const apexOptions = {
    chart: {
        dropShadow: {
            enabled: true,
            blur: 1,
        },
        toolbar: {
            show: false,
        },
        animations: {
            enabled: true,
            easing: 'easeout',
            speed: 200,
            animateGradually: {
                enabled: false,
            },
            dynamicAnimation: {
                enabled: true,
                speed: 200,
                animateGradually: {
                    enabled: false,
                },
            }
        },
    },
    style: {
        fontSize: '20px'
    },
    legend: {
        show: false,
        // showForSingleSeries: false,
        // position: 'left',
        // labels: {
        //     colors: 'rgba(188, 245, 232, 0.9)',
        //     useSeriesColors: true
        // },
        // horizontalAlign: 'left',
        // floating: true,
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
        categories: hopCompounds,
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
        tickAmount: 5,
        min: 0,
        max: 100,
    },
    tooltip: {
        enabled: true,
        custom: ({series, seriesIndex, dataPointIndex}) => `${series[seriesIndex][dataPointIndex]}%`,
    },
};


export default function Radar({hopsList}) {
    if (hopsList.length === 1) {
        hopsList = hopToMinMax(hopsList[0]);
    }

    const series = hopsList.length === 0 ?
        [{name: '', data: hopCompounds.map(() => 0)}] :
        hopsList.map(hop => ({name: hop.title, data: hopValues(hop, hopCompounds)}));

    return <div id='chart' className={styles.chartContainer}>
        <ReactApexChart options={apexOptions} series={series} type="radar" height={'100%'} width={'100%'}/>
    </div>;
}
