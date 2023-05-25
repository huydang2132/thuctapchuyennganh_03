import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Account.scss';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { Link } from 'react-router-dom';
import { handleChangePasswordService } from '../../../services/userService';
import _ from 'lodash';
import { toast } from 'react-toastify';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            if (this.props.isLoggedIn === false) {
                this.props.history.push(`/login`);
            }
        }
    }
    handleOnChange = (event, id) => {
        if (id === 'prevPassword') {
            this.setState({
                prevPassword: event.target.value
            })
        }
        if (id === 'newPassword') {
            this.setState({
                newPassword: event.target.value
            })
        }
        if (id === 'confirmPassword') {
            this.setState({
                confirmPassword: event.target.value
            })
        }
    }
    handleChangePassword = async () => {
        let { prevPassword, newPassword, confirmPassword } = this.state;
        if (_.isEmpty(prevPassword) || _.isEmpty(newPassword) || _.isEmpty(confirmPassword)) {
            toast.error('Vui lòng nhập đủ thông tin!');
            return;
        }
        else {
            if (newPassword !== confirmPassword) {
                toast.error('Xác nhận mật khẩu không chính xác!');
                return;
            }
            else {
                let id = this.props.dataUser.id;
                let res = await handleChangePasswordService({
                    id: id,
                    prevPassword: prevPassword,
                    newPassword: newPassword
                })
                if (res && res.errCode === 0) {
                    toast.success('Đổi mật khẩu thành công!');
                }
                else if (res && res.errCode === 2) {
                    toast.error('Mật khẩu cũ không chính xác!');
                }
            }
        }
    }
    render() {
        return (
            <>
                <div className='changePassword__container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='changePassword-section grid wide'>
                        <div className='changePassword__content'>
                            <div className='changePassword__header'>
                                <div className='title'>
                                    <h3>Đổi mật khẩu</h3>
                                </div>
                            </div>
                            <div className='changePassword__body'>
                                <div className='account-form'>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='prevPass'>Mật khẩu cũ</label>
                                            <input className='form-input' type='password' id='prevPass'
                                                onChange={(event) => this.handleOnChange(event, 'prevPassword')} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='newPass'>Mật khẩu mới</label>
                                            <input className='form-input' type='password' id='newPass'
                                                onChange={(event) => this.handleOnChange(event, 'newPassword')} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='confirmPass'>Xác nhận mật khẩu</label>
                                            <input className='form-input' type='password' id='confirmPass'
                                                onChange={(event) => this.handleOnChange(event, 'confirmPassword')} />
                                        </div>
                                    </div>
                                    <div className='forgot-password'>
                                        <Link to='/account/forgot-password'>Quên mật khẩu?</Link>
                                    </div>
                                    <div className='btn'>
                                        <button onClick={() => this.handleChangePassword()}>Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <HomeFooter author={"Đặng Đình Huy"} />
                    </footer>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
