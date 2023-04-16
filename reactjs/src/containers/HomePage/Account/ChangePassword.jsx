import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import './Account.scss';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { Link } from 'react-router-dom';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            if (this.props.isLoggedIn === false) {
                this.props.history.push(`/login`);
            }
        }
    }
    render() {
        return (
            <>
                <div className='changePassword__container'>
                    <header>
                        <HomeHeader isShowBanner={false} />
                    </header>
                    <section className='grid wide'>
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
                                            <input className='form-input' type='password' id='prevPass' />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='newPass'>Mật khẩu mới</label>
                                            <input className='form-input' type='password' id='newPass' />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='confirmPass'>Xác nhận mật khẩu</label>
                                            <input className='form-input' type='password' id='confirmPass' />
                                        </div>
                                    </div>
                                    <div className='forgot-password'>
                                        <Link to='/account/forgot-password'>Quên mật khẩu?</Link>
                                    </div>
                                    <div className='btn'>
                                        <button>Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <HomeFooter />
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
