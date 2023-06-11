import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

class HandBook extends Component {
    nextPage = (id) => {
        this.props.history.push(`/user/${id}`);
    }
    detailHandBook = () => {
        toast.info('Chức năng đang phát triển!');
    }
    render() {
        return (
            <>
                <div className='section-share section-handbook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Cẩm nang</span>
                            <button className='btn-section' onClick={() => this.nextPage('handbook')}>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize' onClick={() => this.detailHandBook()}>
                                    <div className='bg-image section-handbook' />
                                    <div>Môn toán 1</div>
                                </div>
                                <div className='section-customize' onClick={() => this.detailHandBook()}>
                                    <div className='bg-image section-handbook' />
                                    <div>Môn toán 2</div>
                                </div>
                                <div className='section-customize' onClick={() => this.detailHandBook()}>
                                    <div className='bg-image section-handbook' />
                                    <div>Môn toán 3</div>
                                </div>
                                <div className='section-customize' onClick={() => this.detailHandBook()}>
                                    <div className='bg-image section-handbook' />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
