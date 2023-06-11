import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailTeacher.scss';
import * as actions from '../../../store/actions';
import { getDetailteacherService } from '../../../services/userService';
import TeacherSchedule from './TeacherSchedule';
import TeacherMoreInfo from './TeacherMoreInfor';
import HomeFooter from '../../HomePage/HomeFooter';
import ModalBooking from './ModalBooking';

class DetailTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailTeacher: {},
            currentTeacherId: -1,
            isOpenModal: false,
            time: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentTeacherId: id
            })
            let res = await getDetailteacherService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailTeacher: res.data,
                })
            }
        }
        let { userInfo } = this.props;
        this.props.getRoleId(userInfo);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    openModal = (time) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            time
        })
    }
    render() {
        let { detailTeacher } = this.state;
        let nameTeacher = '';
        if (detailTeacher && detailTeacher.positionData) {
            nameTeacher = `${detailTeacher.positionData.value}, ${detailTeacher.lastName} ${detailTeacher.firstName}`;
        }
        return (
            <>
                <HomeHeader />
                <div className='teacher-detail-container'>
                    <div className='intro-teacher'>
                        <div className='content-left'>
                            <div className='detail-avatar-teacher'
                                style={{ backgroundImage: `url(${detailTeacher && detailTeacher.image ? detailTeacher.image : ''})` }}
                            ></div>
                        </div>
                        <div className='content-right'>
                            <div className='title-teacher'>
                                {nameTeacher}
                            </div>
                            <div className='description-teacher'>
                                {detailTeacher && detailTeacher.Teacher_Info && detailTeacher.Teacher_Info.description &&
                                    <span>
                                        {detailTeacher.Teacher_Info.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-teacher'>
                        <div className='schedule-left'>
                            <TeacherSchedule
                                teacherIdFromParent={this.state.currentTeacherId}
                                teacherInfor={this.state.detailTeacher}
                                openModal={this.openModal}
                            />
                        </div>
                        <div className='schedule-right'>
                            <TeacherMoreInfo
                                teacherIdFromParent={this.state.currentTeacherId}
                                teacherInfor={this.state.detailTeacher}
                            />
                        </div>
                    </div>
                    <div className='line'>
                    </div>
                    <div className='comment-teacher'>

                    </div>
                </div>
                <footer>
                    <HomeFooter author={"Đặng Đình Huy"} />
                </footer>
                <ModalBooking
                    teacherInfor={this.state.detailTeacher}
                    openModal={this.openModal}
                    isOpenModal={this.state.isOpenModal}
                    time={this.state.time}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (userInfo) => dispatch(actions.getRoleId(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);
