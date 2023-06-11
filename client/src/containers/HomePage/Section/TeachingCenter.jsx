import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';
import { toast } from 'react-toastify';

class TeachingCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers: [],
            image: null
        }
    }
    componentDidMount() {
        let { dataCenter } = this.props;
        this.props.fetchAllCenter('ALL', 0, 8);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataCenter } = this.props;
        if (prevProps.dataCenter !== dataCenter) {
            this.setState({
                centers: dataCenter.resCenter,
            })
        }

    }
    nextPage = (id) => {
        this.props.history.push(`/user/${id}`);
    }
    detailCenter = (data) => {
        toast.info('Chức năng đang phát triển!');
    }
    render() {
        let { centers } = this.state;
        return (
            <>
                <div className='section-share section-teaching-center'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Trung tâm giảng dạy nổi bật</span>
                            <button className='btn-section' onClick={() => this.nextPage('center')}>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {
                                    centers && centers.length > 0 &&
                                    centers.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className='section-customize' key={item.id} onClick={() => this.detailCenter(item)}>
                                                <img src={imageBase64} alt='' className='bg-image' />
                                                <div className='item-name'>{`${item.name} - ${item.provinceData.value}`}</div>
                                            </div>
                                        )
                                    })
                                }
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
        dataCenter: state.admin.allCenter,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCenter: (id, offset, limit) => dispatch(actions.fetchAllCenter(id, offset, limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeachingCenter));
