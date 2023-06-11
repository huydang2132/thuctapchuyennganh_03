import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

class Specialty extends Component {
    nextPage = (id) => {
        this.props.history.push(`/user/${id}`);
    }
    handleDetailSubject = () => {
        toast.info('Chức năng đang phát triển!');
    }
    render() {
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Môn học phổ biến</span>
                            <button className='btn-section' onClick={() => this.nextPage('subject')}>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize' onClick={() => this.handleDetailSubject()}>
                                    <div className='bg-image bg-specialty' />
                                    <div>Môn toán 1</div>
                                </div>
                                <div className='section-customize' onClick={() => this.handleDetailSubject()}>
                                    <div className='bg-image bg-specialty' />
                                    <div>Môn toán 2</div>
                                </div>
                                <div className='section-customize' onClick={() => this.handleDetailSubject()}>
                                    <div className='bg-image bg-specialty' />
                                    <div>Môn toán 3</div>
                                </div>
                                <div className='section-customize' onClick={() => this.handleDetailSubject()}>
                                    <div className='bg-image bg-specialty' />
                                    <div>Môn toán 4</div>
                                </div>
                            </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
