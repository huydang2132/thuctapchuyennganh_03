import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConfirmBooking.scss';
import { Link } from 'react-router-dom';
import { deleteScheduleService, verifyScheduleService } from '../../../services/userService';

class ConfirmBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifi: '',
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.token && this.props.match.params.id) {
            let token = this.props.match.params.token;
            let id = this.props.match.params.id;
            console.log('token:', token);
            console.log('id', id);
            try {
                let res = await verifyScheduleService(token, id);
                console.log(res);
                if (res && res.errCode === 0) {
                    this.setState({
                        notifi: 'Xác nhận lịch học thành công!'
                    })
                }
                else if (res && res.errCode === 3) {
                    this.setState({
                        notifi: 'Lịch học đã được xác nhận!'
                    })
                }
            }
            catch (e) {
                if (e && e.response && e.response.status === 401) {
                    this.setState({
                        notifi: 'Email đã hết hạn vui lòng đăng ký lại!'
                    })
                    await deleteScheduleService(id);
                }
                else {
                    console.log('getRoleId error', e);
                }
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        return (
            <>
                <div className='confirm-booking-container'>
                    <h3>{this.state.notifi}</h3>
                    <div className="link-container">
                        <Link to="/home" className='more-link'>Trở lại trang chủ</Link>
                    </div>
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBooking);
