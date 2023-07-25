import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditCourse.scss';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';

class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nameCourse: '',
            linkCourse: '',
            listId: '',
            src: ''
        }
    }
    componentDidMount() {
        let { currentCourse } = this.props;
        this.setState({
            id: currentCourse.id ? currentCourse.id : '',
            nameCourse: currentCourse.name ? currentCourse.name : '',
            listId: currentCourse.listId ? currentCourse.listId : '',
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { linkCourse, listId } = this.state;
        let { currentCourse } = this.props;
        if (prevProps.currentCourse !== currentCourse) {
            this.setState({
                id: currentCourse.id ? currentCourse.id : '',
                nameCourse: currentCourse.name ? currentCourse.name : '',
                listId: currentCourse.listId ? currentCourse.listId : '',
            })
        }
        if (prevState.linkCourse !== this.state.linkCourse) {
            this.setState({
                listId: linkCourse.substring(34, linkCourse.length),
            })
        }
        if (prevState.listId !== this.state.listId) {
            this.setState({
                src: `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`,
                linkCourse: listId ? `https://youtube.com/playlist?list=${listId}` : ''
            })
        }

    }
    handleOnchangeInput = (event, id) => {
        let copySate = { ...this.state };
        copySate[id] = event.target.value;
        this.setState({
            ...copySate
        })
    }
    handleEditCourse = async () => {
        let { nameCourse, listId, id } = this.state;
        if (!nameCourse || !listId) {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        else {
            let { dataUser, userInfo } = this.props;
            this.props.getRoleId(userInfo);
            await this.props.editCourseRedux({
                dataUser: dataUser,
                id: id,
                name: nameCourse,
                listId: listId
            });
            this.props.showEditCourse();
        }
    }
    hideEditCourse = () => {
        this.props.showEditCourse();
    }
    render() {
        let { editCourse } = this.props;
        let { nameCourse, linkCourse, src } = this.state;
        return (
            <div className={editCourse === false ? 'edit-course-container' : 'edit-course-container show'}>
                <div className='edit-course-content'>
                    <h2>Cập nhật khóa học</h2>
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
                        <button className='btn-cancel' onClick={() => this.hideEditCourse()}>Hủy bỏ</button>
                        <button className='btn-add-course' onClick={() => this.handleEditCourse()}>Cập nhật</button>
                    </div>
                </div>
            </div >
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
        editCourseRedux: (data) => dispatch(actions.fetchEditCourse(data)),
        getRoleId: (email) => dispatch(actions.getRoleId(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
