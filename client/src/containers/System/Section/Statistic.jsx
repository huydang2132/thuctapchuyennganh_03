import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistic.scss';
import { getTotalService, getTotalUserByMonthService } from '../../../services/userService';
import UserChart from './UserChart';
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const resUser = await getTotalUserByMonthService('R3');
        const resTeacher = await getTotalUserByMonthService('R2');
        console.log(resUser.dataUser);
        this.setState({
            totalCenter: Center.total,
            totalCourse: Course.total,
            totalUser: User.total,
            userData: resUser.dataUser && resUser.dataUser.length > 0 ? resUser.dataUser.map(obj => obj.userCount) : [],
            teacherData: resTeacher.dataUser && resTeacher.dataUser.length > 0 ? resTeacher.dataUser.map(obj => obj.userCount) : [],
            userMonth: resUser.dataUser && resUser.dataUser.length > 0 ? resUser.dataUser.map(obj => obj.month) : []
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        const { totalCenter, totalCourse, totalUser, userData, userMonth, teacherData } = this.state;
        return (
            <>
                <div className='statistic-container'>
                    <div className='staistic-total'>
                        <div className='statistic-centers statistic-item'>
                            <div className='statistic-content-left'>
                                <i className="fa-solid fa-school"></i>
                            </div>
                            <div className='statistic-content-right'>
                                <p className='statistic-number'>{totalCenter}</p>
                                <p className='statistic-name'>Tổng số trung tâm</p>
                            </div>
                        </div>
                        <div className='statistic-teachers statistic-item'>
                            <div className='statistic-content-left'>
                                <i className="fa-solid fa-chalkboard-user"></i>
                            </div>
                            <div className='statistic-content-right'>
                                <p className='statistic-number'>{totalCourse}</p>
                                <p className='statistic-name'>Tổng số khóa học</p>
                            </div>
                        </div>
                        <div className='statistic-users statistic-item'>
                            <div className='statistic-content-left'>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className='statistic-content-right'>
                                <p className='statistic-number'>{totalUser}</p>
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
