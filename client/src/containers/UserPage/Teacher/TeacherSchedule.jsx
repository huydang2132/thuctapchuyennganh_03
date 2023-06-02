import React, { Component } from 'react';
import { connect } from "react-redux";
import './TeacherSchedule.scss';
import moment from 'moment';
import localication from 'moment/locale/vi';
import { getScheduleTeacherByDateService } from '../../../services/userService';

class TeacherSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allVailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            }
            else {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    async componentDidMount() {
        let allDays = this.getArrDays();
        this.setState({
            allDays: allDays
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.teacherIdFromParent !== this.props.teacherIdFromParent) {
            let allDays = this.getArrDays();
            let teacherId = this.props.teacherIdFromParent;
            let date = allDays[0].value;
            let res = await getScheduleTeacherByDateService(teacherId, date);
            this.setState({
                allVailableTime: res.data ? res.data : []
            })
            console.log(allDays);
        }
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.teacherIdFromParent && this.props.teacherIdFromParent !== -1) {
            let teacherId = this.props.teacherIdFromParent;
            let date = event.target.value;
            let res = await getScheduleTeacherByDateService(teacherId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allVailableTime: res.data ? res.data : []
                })
            }
        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allVailableTime } = this.state;
        console.log('teacherIdFromParent', this.props.teacherIdFromParent);
        return (
            <>
                <div className='teacher-schedule-container'>
                    <div className='all-schedule'>
                        <select className='schedule-select'
                            onChange={(event) => this.handleOnchangeSelect(event)}
                        >
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-time'>
                        <div className='text-calender'>
                            <span>
                                <i className="fas fa-calendar-alt"></i>
                                Lịch dạy
                            </span>
                        </div>
                        <div className='time-content'>
                            {allVailableTime && allVailableTime.length > 0 ?
                                <>
                                    <div className='time-btn'>
                                        {allVailableTime.map((item, index) => {
                                            let timeDisplay = item.dateTypeData.value
                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >{timeDisplay}</button>
                                            )
                                        })}
                                    </div>
                                    <div className='time-book-free'>
                                        <span className='time-book-left'>Chọn</span>
                                        <i className="far fa-hand-point-up"></i>
                                        <span className='time-book-right'>và đặt (phí đặt 0đ)</span>
                                    </div>
                                </>
                                :
                                <span>Không có lịch dạy trong thời gian này. Vui lòng chọn thời gian khác!</span>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);
