import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistic.scss';
import { getTotalService, getTotalUserByMonthService } from '../../../services/userService';
import UserChart from './UserChart';
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countCenter: 0,
            countCourse: 0,
            countUser: 0,
            totalCenter: 0,
            totalCourse: 0,
            totalUser: 0,
            userData: [],
            teacherData: [],
            userMonth: []
        }
    }
    async componentDidMount() {
        const Center = await getTotalService('Center');
        const Course = await getTotalService('Course')
        const User = await getTotalService('User');
        if (Center && Center.errCode === 0 && Course && Course.errCode === 0 && User && User.errCode === 0) {
            this.startAnimation();
        }
        const resUser = await getTotalUserByMonthService('R3');
        const resTeacher = await getTotalUserByMonthService('R2');
        this.setState({
            totalCenter: Center.total,
            totalCourse: Course.total,
            totalUser: User.total,
            userData: resUser.dataUser.map(obj => obj.userCount),
            teacherData: resTeacher.dataUser.map(obj => obj.userCount),
            userMonth: resUser.dataUser.map(obj => obj.month)
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { countCenter, countCourse, countUser,
            totalCenter, totalCourse, totalUser } = this.state;
        if (prevState.totalCenter !== totalCenter || prevState.countCenter !== countCenter) {
            if (countCenter === totalCenter) {
                this.stopAnimation('Center');
            }
        }
        if (prevState.totalCourse !== totalCourse || prevState.countCourse !== countCourse) {
            if (countCourse === totalCourse) {
                this.stopAnimation('Course');
            }
        }
        if (prevState.totalUser !== totalUser || prevState.countUser !== countUser) {
            if (countUser === totalUser) {
                this.stopAnimation('User');
            }
        }
    }
    startAnimation() {
        this.intervalCenter = setInterval(() => {
            this.setState((prevState) => ({
                countCenter: prevState.countCenter + 1,
            }));
        }, 40);
        this.intervalCourse = setInterval(() => {
            this.setState((prevState) => ({
                countCourse: prevState.countCourse + 1,
            }));
        }, 40);
        this.intervalUser = setInterval(() => {
            this.setState((prevState) => ({
                countUser: prevState.countUser + 1
            }));
        }, 40);
    }
    stopAnimation(id) {
        if (id === 'Center') {
            clearInterval(this.intervalCenter);
        }
        if (id === 'Course') {
            clearInterval(this.intervalCourse);
        }
        if (id === 'User') {
            clearInterval(this.intervalUser);
        }
    }
    render() {
        const { countCenter, countCourse, countUser, userData, userMonth, teacherData } = this.state;
        return (
            <>
                <div className='statistic-container'>
                    <div className='staistic-total'>
                        <div className='statistic-centers statistic-item'>
                            <div className='statistic-content-left'>
                                <i className="fa-solid fa-school"></i>
                            </div>
                            <div className='statistic-content-right'>
                                <p className='statistic-number'>{countCenter}</p>
                                <p className='statistic-name'>Tổng số trung tâm</p>
                            </div>
                        </div>
                        <div className='statistic-teachers statistic-item'>
                            <div className='statistic-content-left'>
                                <i className="fa-solid fa-chalkboard-user"></i>
                            </div>
                            <div className='statistic-content-right'>
                                <p className='statistic-number'>{countCourse}</p>
                                <p className='statistic-name'>Tổng số khóa học</p>
                            </div>
                        </div>
                        <div className='statistic-users statistic-item'>
                            <div className='statistic-content-left'>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className='statistic-content-right'>
                                <p className='statistic-number'>{countUser}</p>
                                <p className='statistic-name'>Tổng số người dùng</p>
                            </div>
                        </div>
                    </div>
                    <div className='statistic-chart'>
                        <UserChart userData={userData} userMonth={userMonth} teacherData={teacherData} />
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
