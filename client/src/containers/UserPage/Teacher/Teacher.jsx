import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Teacher.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllTeacherLimitService } from '../../../services/userService';
import ReactPaginate from 'react-paginate';
import LoadingPage from '../../LoadingPage/LoadingPage';

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            totalTeacher: 0
        }
    }
    async componentDidMount() {
        let { offset, perPage } = this.state;
        let res = await getAllTeacherLimitService(offset, perPage);
        const pageCount = Math.ceil(res.data.count / this.state.perPage);
        this.setState({
            teachers: res.data.teacher,
            pageCount: pageCount
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        let { offset, perPage, teachers } = this.state;
        let res = await getAllTeacherLimitService(offset, perPage);
        if (prevState.teachers !== teachers) {
            const pageCount = Math.ceil(res.data.count / this.state.perPage);
            this.setState({
                pageCount: pageCount
            })
        }
        if (prevState.currentPage !== this.state.currentPage) {
            this.setState({
                teachers: res.data.teacher,
            })
        }
    }
    handlePageClick = (data) => {
        const { selected } = data;
        const offset = selected * this.state.perPage;
        this.setState({ currentPage: selected, offset });
    }
    handleGetDetail = (item) => {
        this.props.history.push(`/user/detail-teacher/${item.id}`)
    }
    render() {
        let { teachers, pageCount } = this.state;
        console.log(teachers);
        return (
            <>
                <div className='teacher-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='teacher-section grid wide'>
                        <div className='title'>
                            <h3>Danh sách các giáo viên</h3>
                        </div>
                        {
                            teachers && teachers.length > 0 ?
                                teachers.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='detail-teacher' key={item.id} onClick={() => this.handleGetDetail(item)}>
                                            <img src={imageBase64} alt='' />
                                            <div className='teacher-info'>
                                                <p className='teacher-name'>{`${item.positionData && item.positionData.value}, ${item.lastName} ${item.firstName}`}</p>
                                                <p className='teacher-subject'>Tiếng Anh</p>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='loading-teacher'>
                                    <LoadingPage />
                                </div>
                        }
                        <div className='paging'>
                            <ReactPaginate
                                previousLabel={<i className="fa-solid fa-arrow-left"></i>}
                                nextLabel={<i className="fa-solid fa-arrow-right"></i>}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName={'pageNumer'}
                            />
                        </div>
                    </section>
                    <footer>
                        <HomeFooter author={"Đặng Đình Huy"} />
                    </footer>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Teacher));
