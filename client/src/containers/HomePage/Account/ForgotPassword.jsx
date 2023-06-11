import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ForgotPassword.scss';
import LoaddingPage from '../../LoadingPage/LoadingPage';
import { forgotPasswordService } from '../../../services/userService';
import { toast } from 'react-toastify';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
            disabled: false,
            countDown: 60
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChange = (email) => {
        this.setState({
            email
        })
    }
    handleResetPassword = async () => {
        let { email } = this.state;
        if (email && email.trim() !== "") {
            this.setState({
                loading: true,
                disabled: true,
                countDown: 60
            })
            this.countDownTimeOut();
            this.waitReSendEmail();
            let res = await forgotPasswordService(email);
            if (res && res.errCode === 0) {
                this.setState({
                    loading: false
                })
                toast.info('Yêu cầu đặt lại mật khẩu đã được gửi tới email!');
            }
            console.log(res);
        }
        else {
            toast.error('Vui lòng nhập email để đặt lại mật khẩu!');
        }
    }
    waitReSendEmail = () => {
        setTimeout(() => {
            this.setState({
                disabled: false
            })
        }, 60000);
    }
    countDownTimeOut = () => {
        const intervalTimOut = setInterval(() => {
            if (this.state.countDown <= 0) {
                clearInterval(intervalTimOut); // Clear the interval when countDown <= 0
            } else {
                this.setState((prevState) => ({
                    countDown: prevState.countDown - 1
                }));
            }
        }, 1000);
    };

    render() {
        let { loading, disabled, countDown } = this.state;

        return (
            <>
                <div className='forgot-password-container'>

                    {
                        loading === false ?
                            <section>
                                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
                                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
                                <div className="form-gap"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4 col-md-offset-4">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="text-center">
                                                        <h3><i className="fa fa-lock fa-4x"></i></h3>
                                                        <h2 className="text-center">Quên mật khẩu?</h2>
                                                        <p>Nhập email để đặt lại mật khẩu.</p>
                                                        <div className="panel-body">
                                                            <div id="register-form" role="form" autoComplete="off" className="form">

                                                                <div className="form-group">
                                                                    <div className="input-group">
                                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                                        <input id="email" name="email" placeholder="email..." className="form-control" type="email"
                                                                            onChange={(event) => this.handleOnChange(event.target.value)} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input disabled={disabled} name="recover-submit" className="btn btn-lg btn-primary btn-block" value={disabled === false ? 'Đặt lại mật khẩu' : countDown} type="submit"
                                                                        onClick={() => this.handleResetPassword()} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            :
                            <div className='loading-forgot-password'>
                                <LoaddingPage />
                            </div>
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
