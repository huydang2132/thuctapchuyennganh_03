import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayList.scss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import axios from 'axios';

class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCourse: '',
            courseData: {},
            videos: [],
            videoId: '',
            title: ''
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.fetchAllCourse(id);
            this.setState({
                currentCourse: id,
            })
        }

    }
    async componentDidUpdate(prevProps, prevState) {
        let { dataCourse } = this.props;
        if (prevProps.dataCourse !== this.props.dataCourse) {
            this.setState({
                courseData: dataCourse,
            })
            this.fetchPlayList();
        }
    }
    fetchPlayList = async () => {
        const API_KEY = 'AIzaSyB99BnKmYde8VAvfxMDLwXrVop6lxjEk2w';
        let { dataCourse } = this.props;
        try {
            let PLAYLIST_ID = dataCourse.listId;
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/playlistItems`, {
                params: {
                    part: 'snippet',
                    playlistId: PLAYLIST_ID,
                    key: API_KEY,
                    maxResults: 200 // Số lượng video tối đa muốn lấy
                }
            }
            );
            this.setState({
                videos: response.data.items,
                videoId: response.data.items[0].snippet.resourceId.videoId,
                title: response.data.items[0].snippet.title
            })
        } catch (e) {
            console.error('Error fetching playlist: ', e);
        }
    }
    videoRedirect = (videoId, title) => {
        this.setState({
            videoId,
            title
        })
    }
    render() {
        let { videos, courseData, videoId, title } = this.state;
        let author = courseData && courseData.User ? `${courseData.User.lastName} ${courseData.User.firstName}` : ''
        return (
            <>
                <div className='playList-container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='playList-section grid wide'>
                        <div className='current-video'>
                            <iframe width="100%" height="500" src={`https://www.youtube.com/embed/${videoId && videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder='0'
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                            <div className='title-current-video'>
                                <h2>{title ? title : ''}</h2>
                            </div>
                        </div>
                        <div className='playlist-video'>
                            <h2 className='playlist-title'>{courseData && courseData.name}</h2>
                            <ul className='list-videos scroll'>
                                {
                                    videos && videos.length > 0 &&
                                    videos.map((item, index) => {
                                        return (
                                            <li className={`list-videos-item ${videoId === item.snippet.resourceId.videoId ? 'active' : ''}`}
                                                key={item.id}
                                                onClick={() => this.videoRedirect(item.snippet.resourceId.videoId, item.snippet.title)}>
                                                <div className='video-index'>
                                                    <p>{item.snippet && item.snippet.position + 1}</p>
                                                </div>
                                                <img src={item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url : null} alt="video" />
                                                <div className='infor-video'>
                                                    <h4>{item.snippet.title}</h4>
                                                    <p>{author}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                {/* <li className='list-videos-item'>
                                    <Link to="">
                                        <img src="" alt="video" />
                                        <div className='infor-video'>
                                            <h4>video</h4>
                                            <p>Tac gia</p>
                                        </div>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </section >
                    <footer>
                        <HomeFooter author={"Đặng Đình Huy"} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayList));
