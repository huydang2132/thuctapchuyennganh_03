import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import './Account.scss';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import Avatar from '../../../assets/outstanding-teacher/avatar.jpg';

class Account extends Component {
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
                <div className='account__container'>
                    <header>
                        <HomeHeader isShowBanner={false} />
                    </header>
                    <section className='grid wide'>
                        <div className='account__content'>
                            <div className='account__header'>
                                <div className='title'>
                                    <h3>Cập nhật thông tin tài khoản</h3>
                                </div>
                                <div className='account__header--avatar'>
                                    <img src={Avatar} alt='Ảnh đại diện' />
                                    <label htmlFor="avatar" className='chane-avatar'>
                                        <i className="fa-solid fa-pencil"></i>
                                    </label>
                                    <input type="file" accept='image/*' id='avatar' hidden />
                                </div>
                            </div>
                            <div className='account__body'>
                                <div className='account-form'>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='prevPass'>Họ</label>
                                            <input className='form-input' type='password' id='prevPass' />
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='prevPass'>Tên</label>
                                            <input className='form-input' type='password' id='prevPass' />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='newPass'>Số điện thoại</label>
                                            <input className='form-input' type='password' id='newPass' />
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='newPass'>Giới tính</label>
                                            <select className='form-select' type='password' id='newPass' >
                                                <option className='option'>Nam</option>
                                                <option>Nữ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-col'>
                                        <label htmlFor='confirmPass'>Địa chỉ</label>
                                        <input className='form-input' type='password' id='confirmPass' />
                                    </div>
                                    <div className='btn'>
                                        <button>Cập nhật thông tin</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
