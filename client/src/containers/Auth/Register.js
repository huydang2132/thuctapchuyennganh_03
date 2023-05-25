import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import _ from 'lodash';
import * as actions from "../../store/actions";
import './Register.scss';
import { handleRegisterApi } from '../../services/userService';
import { Link } from 'react-router-dom';
import { path } from '../../utils';
import { toast } from 'react-toastify';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            password1: '',
            password2: '',
            isShowPassword1: false,
            isShowPassword2: false
        }
    }
    showPassword = (id) => {
        if (id === 'password1') {
            this.setState({
                isShowPassword1: !this.state.isShowPassword1
            })
        }
        if (id === 'password2') {
            this.setState({
                isShowPassword2: !this.state.isShowPassword2
            })
        }
    }
    handleOnchange = (event, id) => {
        if (id === 'firstName') {
            this.setState({
                firstName: event.target.value
            })
        }
        if (id === 'lastName') {
            this.setState({
                lastName: event.target.value
            })
        }
        if (id === 'email') {
            this.setState({
                userName: event.target.value
            })
        }
        if (id === 'password1') {
            this.setState({
                password1: event.target.value
            })
        }
        if (id === 'password2') {
            this.setState({
                password2: event.target.value
            })
        }
    }
    handleRegister = async () => {
        let { userName, password1, password2, firstName, lastName } = this.state;
        try {
            if (_.isEmpty(userName) || _.isEmpty(password1) || _.isEmpty(password2) ||
                _.isEmpty(firstName) || _.isEmpty(lastName)) {
                toast.error('Vui lòng nhập đầy đủ thông tin!');
                return;
            }
            else {
                if (password1 !== password2) {
                    toast.error('Nhập lại mật khẩu không đúng!');
                    return;
                }
                else {
                    let data = await handleRegisterApi({
                        email: userName,
                        password: password1,
                        firstName: firstName,
                        lastName: lastName
                    })
                    if (data.errCode === 0) {
                        toast.success('Đăng ký thành công');
                    }
                    else if (data.errCode === 1) {
                        toast.error('Email đã tồn tại!');
                        return;
                    }
                }
            }
        }
        catch (e) {
            console.log('Error register: ', e);
        }
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleRegister();
        }
    }
    render() {
        let { isShowPassword1, isShowPassword2, userName, password1, password2,
            firstName, lastName } = this.state;
        return (
            <>
                <section className='register-container'>
                    <div className="form-box">
                        <div className="form-content">
                            <h2>Đăng ký</h2>

                            <div className="inputbox">
                                <i className="fa-solid fa-user"></i>
                                <input type="email" className={_.isEmpty(lastName) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'lastName')} />
                                <label htmlFor="">Họ</label>
                            </div>
                            <div className="inputbox">
                                <i className="fa-solid fa-user"></i>
                                <input type="email" className={_.isEmpty(firstName) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'firstName')} />
                                <label htmlFor="">Tên</label>
                            </div>
                            <div className="inputbox">
                                <i className="fa-solid fa-envelope"></i>
                                <input type="email" className={_.isEmpty(userName) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'email')} />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="inputbox">
                                <i className={isShowPassword1 === false ? 'fa-solid fa-lock pass' : 'fa-solid fa-lock-open pass'}
                                    onClick={() => this.showPassword('password1')}
                                    title='Hiển thị mật khẩu'
                                ></i>
                                <input type={isShowPassword1 === false ? 'password' : 'text'}
                                    className={_.isEmpty(password1) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'password1')} />
                                <label htmlFor="">Mật khẩu</label>
                            </div>
                            <div className="inputbox">
                                <i className={isShowPassword2 === false ? 'fa-solid fa-lock pass' : 'fa-solid fa-lock-open pass'}
                                    onClick={() => this.showPassword('password2')}
                                    title='Hiển thị mật khẩu'
                                ></i>
                                <input type={isShowPassword2 === false ? 'password' : 'text'}
                                    className={_.isEmpty(password2) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'password2')}
                                    onKeyPress={(event) => this.handleKeyPress(event)} />
                                <label htmlFor="">Xác nhận mật khẩu</label>
                            </div>
                            <div className="forget">

                            </div>
                            <button type='submit'
                                onClick={() => this.handleRegister()}
                            >Đăng ký</button>
                            <div className="login">
                                <p>Đã có tài khoản? <Link to={path.LOGIN}>Đăng nhập</Link></p>
                            </div>
                        </div>
                    </div>
                </section>
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
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
