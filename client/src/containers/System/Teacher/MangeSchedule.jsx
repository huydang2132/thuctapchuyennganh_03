import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
// import DatePicker from '../../../';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { postScheduleTeacherService } from '../../../services/userService';
import Header from '../Section/Header';
import Navbar from '../Section/Navbar';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTeacher: [],
            selectedTeacher: {},
            currentDate: '',
            rangeTime: [],
            isTeacher: false
        }
    }
    componentDidMount() {
        this.props.allTeacherRedux();
        this.props.fetchScheduleTeacher();
        let { dataUser } = this.props;
        if (dataUser && dataUser.roleId === 'R2') {
            let selectedTeacher = {};
            selectedTeacher.label = `${dataUser.lastName} ${dataUser.firstName}`;
            selectedTeacher.value = dataUser.id
            this.setState({
                selectedTeacher: selectedTeacher,
                isTeacher: true
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allTeacher !== this.props.allTeacher) {
            let dataSelect = this.dataInputSelect(this.props.allTeacher);
            this.setState({
                listTeacher: dataSelect
            })
        }
        if (prevProps.scheduleTeacher !== this.props.scheduleTeacher) {
            let data = this.props.scheduleTeacher;
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
        let { dataUser } = this.props;
        if (prevProps.dataUser !== dataUser) {
            if (dataUser && dataUser.roleId === 'R2') {
                let selectedTeacher = {};
                selectedTeacher.label = `${dataUser.lastName} ${dataUser.firstName}`;
                selectedTeacher.value = dataUser.id
                this.setState({
                    selectedTeacher: selectedTeacher,
                    isTeacher: true
                })
            }
        }
    }
    dataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let label = `${item.lastName} ${item.firstName}`;
                object.label = label;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedTeacher) => {
        this.setState({ selectedTeacher });
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedTeacher, currentDate } = this.state;
        let result = [];
        if (selectedTeacher && _.isEmpty(selectedTeacher)) {
            toast.error('Chưa chọn giáo viên!');
            return;
        }
        if (!currentDate) {
            toast.error('Chưa chọn ngày!');
            return;
        }
        let formatedDate = new Date(currentDate).getTime() - 25200000;
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item, index) => {
                    let object = {};
                    object.teacherId = selectedTeacher.value;
                    object.date = formatedDate.toString();
                    object.dateType = item.keyMap;
                    result.push(object);
                })
            }
            else {
                toast.error('Chưa chọn thời gian!');
                return;
            }
        }
        let res = await postScheduleTeacherService({
            arrSchedule: result,
            teacherId: selectedTeacher.value,
            date: formatedDate
        });
        if (res.errCode === 0) {
            toast.success('Đặt lịch dạy thành công!')
        }
        else if (res.errCode === 1) {
            toast.error('Hãy chọn đầy đủ các trường!')
        }
        else if (res.errCode === 2) {
            toast.error('Lịch dạy đã tồn tại!')
        }
    }
    render() {
        let { rangeTime } = this.state;
        let minDate = moment(new Date()).format('YYYY-MM-DD');
        return (
            <>
                <div className='manage-schedule-container'>
                    <Header />
                    <main className='manage-schedule-main'>
                        <Navbar />
                        <section className='manage-schedule-section'>
                            <h2 className='manage-schedule-title'>
                                Quản lý lịch dạy
                            </h2>
                            <div className='manage-schedule-content'>
                                <div className='select-teacher'>
                                    <label>Chọn giáo viên</label>
                                    <Select
                                        value={this.state.selectedTeacher}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listTeacher}
                                        className={'input-select'}
                                        isDisabled={this.state.isTeacher}
                                    />
                                </div>
                                <div className='select-date'>
                                    <label>Chọn ngày dạy</label>
                                    <input type="date"
                                        name="" id="" min={minDate}
                                        className='input-date'
                                        onChange={(event) => this.handleOnchangeDatePicker(event.target.value)} />
                                </div>
                                <div className='pick-hour-container'>
                                    {rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button
                                                    className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                    key={index}
                                                    onClick={() => this.handleClickBtnTime(item)}
                                                >
                                                    {item.value}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                                <button className='btn btn-save-schedule'
                                    onClick={() => this.handleSaveSchedule()}
                                >Lưu</button>
                            </div>
                        </section>
                    </main>
                    <footer className='system-footer'>
                        <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                    </footer>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allTeacher: state.admin.allTeacher,
        scheduleTeacher: state.admin.scheduleTeacher,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        allTeacherRedux: () => dispatch(actions.fetchAllTeacher()),
        fetchScheduleTeacher: () => dispatch(actions.fetchScheduleTeacher()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
