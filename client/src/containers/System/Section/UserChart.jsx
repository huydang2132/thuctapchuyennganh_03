import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

class UserChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelMonth: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userMonth } = this.props;
        if (prevProps.userMonth !== userMonth) {
            let labels = [];
            userMonth.map((item, index) => {
                labels.push(`Tháng ${item}`);
            })
            this.setState({
                labelMonth: labels
            })
        }
    }
    render() {
        const { userData, teacherData } = this.props;
        const { labelMonth } = this.state;
        const options = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
            },
        };
        const chartData = {
            labels: labelMonth,
            datasets: [
                {
                    label: 'Số lượng học viên',
                    data: userData,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgb(53, 162, 235)',
                    borderWidth: 3,
                },
                {
                    label: 'Số lượng giáo viên',
                    data: teacherData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                }
            ]
        };
        return (
            <Line options={options} data={chartData} />
        );
    }
}

export default UserChart;