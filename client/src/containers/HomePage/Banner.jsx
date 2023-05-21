import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    nextPage = (id) => {
        this.props.history.push(`/user/${id}`);
    }
    render() {
        return (
            <>
                <div className='home-header-banner'>
                    <div className='banner-content-up'>
                        <div className='title1'>NỀN TẢNG GIÁO DỤC</div>
                        <div className='title2'>HỌC HÔM NAY ĐỂ NGÀY MAI TỐT HƠN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm kiếm'></input>
                        </div>
                    </div>
                    <div className='banner-content-down'>
                        <div className='options'>
                            <div className='option-child' onClick={() => this.nextPage('subject')}>
                                <div className='icon-option-child'>
                                    <i className="fas fa-school"></i>
                                </div>
                                <div className='text-option-child'>Học chuyên môn</div>
                            </div>
                            <div className='option-child' onClick={() => this.nextPage('combo-subject')}>
                                <div className='icon-option-child'>
                                    <i className="fas fa-user-graduate"></i>
                                </div>
                                <div className='text-option-child'>Học tổ hợp</div>
                            </div>
                            <div className='option-child' onClick={() => this.nextPage('exam')}>
                                <div className='icon-option-child'>
                                    <i className="fas fa-book-open"></i>
                                </div>
                                <div className='text-option-child'>Luyện đề</div>
                            </div>
                            <div className='option-child' onClick={() => this.nextPage('course')}>
                                <div className='icon-option-child'>
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </div>
                                <div className='text-option-child'>Khóa học</div>
                            </div>
                        </div>
                    </div>

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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
