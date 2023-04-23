import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils';
import './Account.scss';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { getAllUserService, editUserService } from '../../../services/userService';
import Avatar from '../../../assets/images/avatar.png';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: Avatar,
            avatar: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            address: '',

            arrGenders: []
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        let { userInfo, dataUser } = this.props;
        let imageBase64 = '';
        if (userInfo) {
            let res = await getAllUserService(dataUser.id);
            if (res && res.users) {
                if (res.users.image) {
                    imageBase64 = new Buffer(res.users.image, 'base64').toString('binary');
                }
                this.setState({
                    img: imageBase64 ? imageBase64 : Avatar,
                    email: res.users.email,
                    firstName: res.users.firstName,
                    lastName: res.users.lastName,
                    phoneNumber: res.users.phoneNumber,
                    gender: res.users.gender ? res.users.gender : 'M',
                    address: res.users.address
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            if (this.props.isLoggedIn === false) {
                this.props.history.push(`/login`);
            }
        }
        if (prevProps.dataUser !== this.props.dataUser) {
            let { userInfo, dataUser } = this.props;
            let imageBase64 = '';
            if (userInfo) {
                let res = await getAllUserService(dataUser.id);
                if (res && res.users) {
                    if (res.users.image) {
                        imageBase64 = new Buffer(res.users.image, 'base64').toString('binary');
                    }
                    this.setState({
                        img: imageBase64 ? imageBase64 : Avatar,
                        email: res.users.email,
                        firstName: res.users.firstName,
                        lastName: res.users.lastName,
                        phoneNumber: res.users.phoneNumber,
                        gender: res.users.gender ? res.users.gender : 'M',
                        address: res.users.address
                    })
                }
            }
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                arrGenders: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            })
        }
    }
    changeAvatar = async (files) => {
        let base64 = await CommonUtils.getBase64(files[0]);
        this.setState({
            img: URL.createObjectURL(files[0]),
            avatar: base64
        })
    }
    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUser = async () => {
        let { avatar, firstName, lastName, phoneNumber, gender, address } = this.state;
        let id = this.props.dataUser.id;
        if (!firstName || !lastName ||
            !phoneNumber || !gender || !address) {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        else {
            let res = await editUserService({
                id: id,
                avatar: avatar,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                gender: gender,
                address: address
            })
            if (res && res.errCode === 0) {
                toast.success('Cập nhật thông tin thành công!');
            }
        }
    }
    render() {
        let { img, email, firstName, lastName, phoneNumber, gender, address, arrGenders } = this.state;
        return (
            <>
                <div className='account__container'>
                    <header>
                        <HomeHeader />
                    </header>
                    <section className='account-section grid wide'>
                        <div className='account__content'>
                            <div className='account__header'>
                                <div className='title'>
                                    <h3>Cập nhật thông tin tài khoản</h3>
                                </div>
                                <div className='account__header--avatar'>
                                    <img src={img} alt='' />
                                    <label htmlFor="avatar" className='chane-avatar'>
                                        <i className="fa-solid fa-pencil"></i>
                                    </label>
                                    <input type="file" accept='image/*' id='avatar' hidden
                                        onChange={(e) => this.changeAvatar(e.target.files)} />

                                </div>
                                <div className='account__header--email'>
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className='account__body'>
                                <div className='account-form'>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='lastName'>Họ</label>
                                            <input className='form-input' type='text' id='lastName'
                                                value={lastName ? lastName : ''}
                                                onChange={(event) => this.handleOnChange(event, 'lastName')} />
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='firstName'>Tên</label>
                                            <input className='form-input' type='text' id='firstName'
                                                value={firstName ? firstName : ''}
                                                onChange={(event) => this.handleOnChange(event, 'firstName')} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-col'>
                                            <label htmlFor='phoneNum'>Số điện thoại</label>
                                            <input className='form-input' type='text' id='phoneNum'
                                                value={phoneNumber ? phoneNumber : ''}
                                                onChange={(event) => this.handleOnChange(event, 'phoneNumber')} />
                                        </div>
                                        <div className='form-col'>
                                            <label htmlFor='gender'>Giới tính</label>
                                            <select className='form-select' type='text' id='gender'
                                                value={gender ? gender : ''}
                                                onChange={(event) => this.handleOnChange(event, 'gender')}>
                                                {arrGenders && arrGenders.length > 0 &&
                                                    arrGenders.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>
                                                                {item.valueVi}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-col'>
                                        <label htmlFor='address'>Địa chỉ</label>
                                        <input className='form-input' type='text' id='address'
                                            value={address ? address : ''}
                                            onChange={(event) => this.handleOnChange(event, 'address')} />
                                    </div>
                                    <div className='btn'>
                                        <button onClick={() => this.handleEditUser()}>Cập nhật thông tin</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <HomeFooter />
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
        genderRedux: state.admin.genders,
        dataUser: state.user.dataUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
