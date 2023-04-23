import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import _ from 'lodash';
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { path } from '../../utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false
        }
    }
    showPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleOnchange = (event, id) => {
        if (id === 'email') {
            this.setState({
                userName: event.target.value
            })
        }
        if (id === 'password') {
            this.setState({
                password: event.target.value
            })
        }
    }
    handleLogin = async () => {
        let { userName, password } = this.state;
        try {
            if (_.isEmpty(userName) || _.isEmpty(password)) {
                toast.error('Vui lòng nhập đầy đủ thông tin!');
            }
            else {
                let res = await handleLoginApi(this.state.userName, this.state.password);
                if (res && res.errCode === 0) {
                    this.props.userLoginSuccess(res.userInfo);
                }
                else if (res && res.errCode === 2) {
                    toast.error('Tài khoản không tồn tại!');
                }
                else if (res && res.errCode === 3) {
                    toast.error('Mật khẩu không chính xác!');
                }
            }
        }
        catch (e) {
            console.log('Error login: ', e);
        }
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {
        let { isShowPassword, userName, password } = this.state;
        return (
            <>
                <section className='login-container'>
                    <div className="form-box">
                        <div className="form-content">
                            <h2>Đăng nhập</h2>
                            <div className="inputbox">
                                <i className="fa-solid fa-envelope"></i>
                                <input type="email" className={_.isEmpty(userName) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'email')} />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="inputbox">
                                <i className={isShowPassword === false ? 'fa-solid fa-lock pass' : 'fa-solid fa-lock-open pass'}
                                    onClick={() => this.showPassword()}
                                    title='Hiển thị mật khẩu'
                                ></i>
                                <input type={isShowPassword === false ? 'password' : 'text'}
                                    className={_.isEmpty(password) ? '' : 'top'}
                                    onChange={(event) => this.handleOnchange(event, 'password')}
                                    onKeyPress={(event) => this.handleKeyPress(event)} />
                                <label htmlFor="">Mật khẩu</label>
                            </div>
                            <div className="forget">

                            </div>
                            <button type='submit'
                                onClick={() => this.handleLogin()}
                            >Đăng nhập</button>
                            <div className="register">
                                <p>Chưa có tài khoản? <Link to={path.RESGISTER}>Đăng ký</Link></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
