import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Course.scss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import Img from '../../../assets/images/header-background.jpg';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Anh: Img,
            courses: [],
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
            listCourse: [],
            listImg: [],
        }
    }
    async componentDidMount() {
        this.props.fetchAllCourse('ALL');
    }
    async componentDidUpdate(prevProps, prevState) {
        let { dataCourse } = this.props;
        const pageCount = Math.ceil(dataCourse.length / this.state.perPage);
        if (prevProps.dataCourse !== this.props.dataCourse) {
            this.setState({
                listCourse: dataCourse,
                courses: dataCourse,
                pageCount: pageCount
            })
            this.fetchPlayListImg();
        }
    }
    fetchPlayListImg = async () => {
        const API_KEY = 'AIzaSyB99BnKmYde8VAvfxMDLwXrVop6lxjEk2w';
        let { dataCourse } = this.props;
        let listImg = [];
        try {
            const promises = dataCourse.map(async (item, index) => {
                let PLAYLIST_ID = item.listId;
                let response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${PLAYLIST_ID}&key=${API_KEY}`
                );
                const playlist = response.data.items[0].snippet.thumbnails.medium.url;
                return playlist;
            });

            listImg = await Promise.all(promises);
        } catch (e) {
            console.error('Error fetching playlist: ', e);
        }
        this.setState({
            listImg: listImg
        })
    }
    handlePageClick = (data) => {
        const { selected } = data;
        const offset = selected * this.state.perPage;
        this.setState({ currentPage: selected, offset });
    }
    render() {
        let { Anh, listCourse, listImg, pageCount, perPage, currentPage } = this.state
        return (
            <>
                <div className='course-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='course-section'>
                        <div className="body">
                            <div className="body1">
                                <p>CÁC KHOÁ HỌC - HỆ THỐNG GIÁO DỤC ĐIỆN TỬ</p>
                                <img src={Anh} alt="" />
                            </div>
                            <div className="body2">
                                <h3>Danh sách các khoá học tiêu biểu</h3>
                                <p>Được giảng dạy bởi những giáo viên tận tâm nhất!</p>
                            </div>
                        </div>
                        <hr />
                        <div className="content">
                            {
                                listCourse && listCourse.length > 0 &&
                                listCourse.slice(this.state.offset, this.state.offset + perPage).map((item, index) => {
                                    let teacherName = `${item.User.positionData.value}: ${item.User.lastName} ${item.User.firstName}`;
                                    return (
                                        <Link to={`/user/playlist/${item.id}`} key={item.id} className='course-item'>
                                            <img src={listImg ? listImg[index + (currentPage * perPage)] : null} alt="" />
                                            <h2>{teacherName}</h2>
                                            <p>{item.name}</p>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <hr />
                        <div className='paging page-list-course'>
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
                    </section >
                    <footer>
                        <HomeFooter author={"Phạm Văn Nhất, Đặng Đình Huy"} />
                    </footer>
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        dataUser: state.user.dataUser,
        dataCourse: state.admin.allCourse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        fetchAllCourse: (id) => dispatch(actions.fetchAllCourse(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Course));
