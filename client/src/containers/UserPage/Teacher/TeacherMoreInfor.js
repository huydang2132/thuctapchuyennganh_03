import React, { Component } from 'react';
import { connect } from "react-redux";
import './TeacherMoreInfo.scss';
import { getExtraInfoTeacherByIdService } from '../../../services/userService';
import { NumericFormat } from 'react-number-format';

class TeacherMoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfo: {},
        }
    }

    componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.teacherIdFromParent !== this.props.teacherIdFromParent) {
            let res = await getExtraInfoTeacherByIdService(this.props.teacherIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }
    showHideDetailInfo = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }
    render() {
        let { isShowDetail, extraInfo } = this.state;
        let { teacherInfor } = this.props;
        let payment = "";
        if (extraInfo && extraInfo.paymentData && extraInfo.paymentId !== "PAY3") {
            payment = extraInfo.paymentData.value;
        }
        else {
            payment = "Tiền mặt hoặc Thẻ ATM";
        }
        let nameCenter = teacherInfor && teacherInfor.Teacher_info ? `${teacherInfor.Teacher_info.Center.name} - ${teacherInfor.Teacher_info.Center.provinceData.value}` : ''
        return (
            <>
                <div className='teacher-more-info-container'>
                    <div className='more-info-content-up'>
                        <div className='text-address'>Địa chỉ dạy</div>
                        <div className='name-center'>
                            Trung tâm {nameCenter}
                        </div>
                        <div className='detail-address'>
                            {extraInfo && extraInfo.addressCenter ? extraInfo.addressCenter : ''}
                        </div>
                    </div>
                    <div className='line-boder'></div>
                    <div className='more-info-content-down'>
                        <div className='detail-info-price'>
                            Học phí: {extraInfo && extraInfo.priceData
                                && < NumericFormat
                                    value={extraInfo.priceData.value}
                                    displayType={'text'} thousandSeparator=","
                                    suffix={' VND'} />}
                        </div>

                        {
                            isShowDetail === false ?
                                <div className='btn-detail-info'>
                                    <span onClick={() => this.showHideDetailInfo()}> Xem chi tiết</span>
                                </div>
                                :
                                <>
                                    <div className='detail-note'>
                                        {extraInfo && extraInfo.note}
                                    </div>
                                    <div className='detail-payment'>
                                        Học viên có thể thanh toán qua hình thức: {
                                            payment
                                        }
                                    </div>
                                    <div className='btn-detail-info'>
                                        <span onClick={() => this.showHideDetailInfo()}>Ẩn bớt</span>
                                    </div>
                                </>
                        }


                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherMoreInfo);
