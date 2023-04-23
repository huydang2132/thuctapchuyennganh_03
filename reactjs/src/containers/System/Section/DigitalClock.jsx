import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localication from 'moment/locale/vi';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('dddd'),
            day: moment().format('DD'),
            month: moment().format('MM'),
            year: moment().format('YYYY'),
            hours: moment().format('HH'),
            minutes: moment().format('mm'),
            seconds: moment().format('ss'),
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                date: moment().format('dddd'),
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                hours: moment().format('HH'),
                minutes: moment().format('mm'),
                seconds: moment().format('ss'),
            });
        }, 1000);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { date, day, month, year, hours, minutes, seconds } = this.state;
        return (
            <>
                <div className='clock-content'>
                    <div className='time-clock'>
                        <p className='hours'>{hours}</p>
                        <span>:</span>
                        <p className='minutes'>{minutes}</p>
                        <p className='seconds'>{seconds}</p>
                    </div>
                    <div className='date-clock'>
                        <p>{date}, {day} - {month} - {year}</p>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
