import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../UserPage/Teacher/ConfirmBooking.scss';
import { Link } from 'react-router-dom';
import { resetPasswordService } from '../../../services/userService';

class ConfirmPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifi: '',
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.token &&
            this.props.match.params.id && this.props.match.params.newPass) {
            let token = this.props.match.params.token;
            let id = this.props.match.params.id;
            let newPass = this.props.match.params.newPass
            console.log('token:', token);
            console.log('id', id);
            try {
                let res = await resetPasswordService(token, id, newPass);
                console.log(res);
                if (res && res.errCode === 0) {
                    this.setState({
                        notifi: 'Đặt lại mật khẩu thành công!'
                    })
                }
                else if (res && res.errCode === 3) {
                    this.setState({
                        notifi: 'Mật khẩu đã được đặt lại!'
                    })
                }
            }
            catch (e) {
                if (e && e.response && e.response.status === 401) {
                    this.setState({
                        notifi: 'Email đã hết hạn!'
                    })
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);
