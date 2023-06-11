import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ModalBooking.scss';
import * as actions from '../../../store/actions';
import { toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { createScheduleService } from '../../../services/userService';
import LoadingPage from '../../LoadingPage/LoadingPage';

class ModalBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            address: '',
            teacherId: '',
            teacherName: '',
            studentId: '',
            studentName: '',
            date: '',
            dateType: '',
            schedule: '',
            price: '',
            token: '',
            loading: false
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { teacherInfor, time, dataUser } = this.props;
        if (prevProps.dataUser !== this.props.dataUser) {
            this.props.fetchUserById(dataUser.id);
            this.setState({
                studentId: dataUser.id,
                email: dataUser.email,
                studentName: `${dataUser.lastName} ${dataUser.firstName}`
            })
        }
        if (prevProps.userId !== this.props.userId) {
            this.setState({
                address: this.props.userId.address,
                phoneNumber: this.props.userId.phoneNumber,
            })
        }
        if (prevProps.teacherInfor !== teacherInfor) {
            this.setState({
                teacherId: teacherInfor.id,
                teacherName: teacherInfor.positionData && `${teacherInfor.positionData.value}, ${teacherInfor.lastName} ${teacherInfor.firstName}`,
                price: teacherInfor.Teacher_Info && teacherInfor.Teacher_Info && teacherInfor.Teacher_Info.priceData && teacherInfor.Teacher_Info.priceData.value
            })
        }
        if (time) {
            if (prevProps.time !== this.props.time) {
                const timestamp = time && parseInt(time.date, 10);
                const date = moment(timestamp).format('dddd - DD/MM/YYYY');
                const timeType = time && time.dateTypeData ? time.dateTypeData.value : '';
                this.setState({
                    date: time.date && time.date,
                    dateType: time.dateType && time.dateType,
                    schedule: `${timeType} | ${date}`
                })
            }
        }
    }
    handleOnchangeInput = (event, id) => {
        let copySate = { ...this.state };
        copySate[id] = event.target.value;
        this.setState({
            ...copySate
        })
    }
    closeModal = () => {
        this.props.openModal();
    }
    confirmRegister = async () => {
        let { teacherId, studentId, date, dateType,
            email, phoneNumber, studentName, teacherName, address,
            price, schedule } = this.state;
        this.setState({
            loading: true
        })
        let res = await createScheduleService({
            teacherId,
            studentId,
            date,
            dateType,
            email, phoneNumber, studentName, teacherName, address,
            price, schedule
        });
        if (res && res.errCode === 0) {
            this.setState({
                loading: false
            })
            toast.success('Đăng ký học thành công!');
            this.props.openModal();
        }
        else if (res && res.errCode === 1) {
            this.setState({
                loading: false
            })
            toast.error('Bạn đã đăng ký học rồi!');
        }
    }
    render() {
        let { teacherInfor, isOpenModal, userId, time } = this.props;
        let nameTeacher = teacherInfor && teacherInfor.positionData ? `${teacherInfor.positionData.value}, ${teacherInfor.lastName} ${teacherInfor.firstName}` : '';
        let nameCenter = teacherInfor && teacherInfor.Teacher_Info && teacherInfor.Teacher_Info.Center ?
            `${teacherInfor.Teacher_Info.Center.name} - ${teacherInfor.Teacher_Info.Center.provinceData.value}` : '';
        let price = teacherInfor && teacherInfor.Teacher_Info && teacherInfor.Teacher_Info.priceData ?
            teacherInfor.Teacher_Info.priceData.value : 0;
        const timestamp = time && parseInt(time.date, 10);
        const date = moment(timestamp).format('dddd - DD/MM/YYYY');
        const timeType = time && time.dateTypeData ? time.dateTypeData.value : '';
        let { loading } = this.state;
        return (
            <>
                <div className={`modal-booking-container scroll ${isOpenModal === true ? 'show' : ''}`}>
                    {
                        loading === false ?
                            <div className='modal-booking-section' >
                                <header>
                                    <h2 className='title'>Đăng ký học cùng gia sư</h2>
                                    <div className='btn-close' onClick={() => this.closeModal()}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </div>
                                </header>
                                <section className='modal-booking-content'>
                                    <div className='content-teacher-infor'>
                                        <p>Giáo viên: {nameTeacher}</p>
                                        <p>Lịch giảng dạy: {`${timeType ? timeType : ''} | ${date ? date : ''}`}</p>
                                        <p>Trung tâm: {nameCenter}</p>
                                        <p>Học phí: {price
                                            && < NumericFormat
                                                value={price}
                                                displayType={'text'} thousandSeparator=","
                                                suffix={' VND'} />}
                                        </p>
                                    </div>
                                    <div className='account-form'>
                                        <div className='form-row'>
                                            <div className='form-col'>
                                                <label htmlFor='fullname'>Họ tên</label>
                                                <input className='form-input' type='text' id='fullname'
                                                    disabled value={userId ? `${userId.lastName} ${userId.firstName}` : ''} />
                                            </div>
                                            <div className='form-col'>
                                                <label htmlFor='phoneNum'>Số điện thoại</label>
                                                <input className='form-input' type='text' id='phoneNum'
                                                    disabled value={userId ? `${userId.phoneNumber}` : ''} />
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='form-col'>
                                                <label htmlFor='email'>Email</label>
                                                <input className='form-input' type='text' id='email'
                                                    disabled value={userId ? `${userId.email}` : ''} />
                                            </div>
                                            <div className='form-col'>
                                                <label htmlFor='address'>Địa chỉ</label>
                                                <input className='form-input' type='text' id='address'
                                                    disabled value={userId ? `${userId.address}` : ''} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <footer>
                                    <button className='btn-cancel' onClick={() => this.closeModal()}>Hủy</button>
                                    <button className='btn-add' onClick={() => this.confirmRegister()}>Xác nhận đăng ký</button>
                                </footer>
                            </div>
                            :
                            <LoadingPage />
                    }

                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        userId: state.admin.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserById: (id) => dispatch(actions.fetchUserById(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
