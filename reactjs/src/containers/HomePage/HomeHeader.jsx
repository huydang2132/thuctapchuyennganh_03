import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    returnHome = () => {
        this.props.history.push(`/home`);
    }
    render() {
        let language = this.props.language;

        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='left-content-item'>
                                <div className='header-logo' onClick={() => this.returnHome()}>
                                    <i className="fas fa-graduation-cap"></i>
                                    <div className='logo-title'>Education</div>
                                </div>

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.subject" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-teacher" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.center" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.center-teaching" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.teacher" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-teacher" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.course" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.course-learning" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='language'>
                                <span
                                    className={language && language === LANGUAGES.VI ? 'flag flag-vn active' : 'flag flag-vn'}
                                    onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}></span>
                                <span
                                    className={language && language === LANGUAGES.EN ? 'flag flag-en active' : 'flag flag-en'}
                                    onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}></span>
                            </div>
                            <div className='account'>
                                <i className="fas fa-user"></i><FormattedMessage id="home-header.account" />
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='title2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder={language === LANGUAGES.VI ? 'Tìm kiếm' : 'Search'}></input>
                            </div>
                        </div>
                        <div className='banner-content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-school"></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-user-graduate"></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-book-open"></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-chalkboard-teacher"></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
