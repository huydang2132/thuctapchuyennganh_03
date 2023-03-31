import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class TeachingCenter extends Component {

    render() {
        return (
            <>
                <div className='section-share section-teaching-center'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Trung tâm giảng dạy nổi bật</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image bg-center' />
                                    <div>Trung tâm Alpha 1</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image bg-center' />
                                    <div>Trung tâm Alpha 2</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image bg-center' />
                                    <div>Trung tâm Alpha 3</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image bg-center' />
                                    <div>Trung tâm Alpha 4</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image bg-center' />
                                    <div>Trung tâm Alpha 5</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image bg-center' />
                                    <div>Trung tâm Alpha 6</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachingCenter);
