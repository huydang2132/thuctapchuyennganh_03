import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageCourse.scss';
import { postNewCourseService } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCourse: '',
            linkCourse: '',
            listId: '',
            src: ''
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        if (userInfo) {
            this.props.getRoleId(userInfo);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { linkCourse, listId } = this.state;
        let { userInfo } = this.props;
        if (prevProps.userInfo !== userInfo) {
            if (userInfo) {
                this.props.getRoleId(userInfo);
            }
        }
        if (prevState.linkCourse !== this.state.linkCourse) {
            this.setState({
                listId: linkCourse.substring(34, linkCourse.length),
            })
        }
        if (prevState.listId !== this.state.listId) {
            this.setState({
                src: `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`
            })
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleAddCourse = async () => {
        let { nameCourse, listId, linkCourse } = this.state;
        let { dataUser } = this.props;
        if (!nameCourse || !linkCourse) {
            toast.error('Vui lòng nhập đủ thông tin!');
            return;
        }
        else {
            let res = await postNewCourseService({
                name: nameCourse,
                listId: listId,
                teacherId: dataUser.id
            })
            if (res && res.errCode === 0) {
                toast.success('Thêm khóa học thành công!');
                this.props.showAddCourse();
            }
            else if (res && res.errCode === 2) {
                toast.error('Khóa học đã tồn tại!');
            }
        }
    }
    viewCourses = () => {
        this.props.showAddCourse();
    }
    render() {
        let { nameCourse, linkCourse, src } = this.state;
        return (
            <>
                <div className='add-course-container'>
                    <h2>Thêm mới khóa học</h2>
                    <div className='account-form'>
                        <div className='form-col'>
                            <label htmlFor='nameCourse'>Tên khóa học</label>
                            <input className='form-input' id='nameCourse'
                                value={nameCourse}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameCourse')}
                            ></input>
                        </div>
                        <div className='form-col'>
                            <label htmlFor='linkCourse'>Đường dẫn khóa học</label>
                            <input className='form-input' id='linkCourse'
                                value={linkCourse}
                                onChange={(event) => this.handleOnchangeInput(event, 'linkCourse')}
                            ></input>
                        </div>
                    </div>
                    <div className='demo-playlist'>
                        <iframe width="450" height="253.125" src={src}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                        <p className='demo-title'>Bản xem trước khóa học (Nếu không hiển thị hãy kiểm tra lại đường dẫn)</p>
                    </div>
                    <div className='add-course'>
                        <button className='btn-cancel' onClick={() => this.viewCourses()}>Hủy bỏ</button>
                        <button className='btn-add-course' onClick={() => this.handleAddCourse()}>Thêm mới</button>
                    </div>
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
