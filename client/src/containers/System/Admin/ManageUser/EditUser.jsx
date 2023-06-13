import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditUser.scss';
import _ from 'lodash';
import { CommonUtils } from '../../../../utils';
import * as actions from '../../../../store/actions';
import Avatar from '../../../../assets/images/avatar.png';
import { toast } from 'react-toastify';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            position: '',
            img: Avatar,
            avatar: '',

            arrGenders: [],
            arrPositions: [],
            arrRoles: []
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPosition();
        this.props.getRole();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let user = this.props.currentUser;
        if (prevProps.currentUser !== user) {
            let imageBase64 = '';
            if (user && !_.isEmpty(user)) {
                if (user.image) {
                    imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
                }
                this.setState({
                    id: user.id ? user.id : '',
                    email: user.email ? user.email : '',
                    firstName: user.firstName ? user.firstName : '',
                    lastName: user.lastName ? user.lastName : '',
                    address: user.address ? user.address : '',
                    phoneNumber: user.phoneNumber ? user.phoneNumber : '',
                    gender: user.gender ? user.gender : 'M',
                    roleId: user.roleId ? user.roleId : 'R1',
                    position: user.positionId ? user.positionId : 'P0',
                    img: imageBase64 ? imageBase64 : Avatar,
                })
            }
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                arrGenders: arrGenders,
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                arrPositions: arrPositions,
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                arrRoles: arrRoles,
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
    checkValidateInput = () => {
        let arrInput = ['firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return false;
            }
        }
        return true;
    }
    handleEditUser = () => {
        let { id, firstName, lastName, address, phoneNumber, gender, position, roleId, avatar } = this.state;
        if (this.checkValidateInput() === true) {
            this.props.editUserRedux({
                id: id,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
                gender: gender,
                positionId: position,
                roleId: roleId,
                avatar: avatar
            })
            this.props.hideEditUser();
        }
        else {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }
    }
    changeAvatar = async (files) => {
        let base64 = await CommonUtils.getBase64(files[0]);
        this.setState({
            img: URL.createObjectURL(files[0]),
            avatar: base64
        })
    }
    hideEditUser = () => {
        this.props.hideEditUser();
    }
    render() {
        let { email, firstName, lastName, address, phoneNumber,
            gender, img, arrGenders, arrPositions, arrRoles,
            roleId, position } = this.state;
        let { editUser } = this.props;
        return (
            <div className={`edit-user-container ${editUser === false ? '' : 'show'}`}>
                <div className='edit-user-content'>
                    <header className='edit-user-header'>
                        <div className='edit-user-header-content'>
                            <h2 className='edit-user-header-title'>
                                Cập nhật thông tin
                            </h2>
                            <button className='edit-user-header-close' onClick={() => this.hideEditUser()}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <hr className='line'></hr>
                    </header>
                    <main className='edit-user-main'>
                        <div className='edit-user-main-head'>
                            <div className='edit-user-avatar'>
                                <img src={img} alt='' />
                                <label htmlFor="avatar" className='chane-avatar'>
                                    <i className="fa-solid fa-camera"></i>
                                </label>
                                <input type="file" accept='image/*' id='avatar' hidden
                                    onChange={(e) => this.changeAvatar(e.target.files)} />
                            </div>
                            <div className='edit-user-email'>
                                <p>{email}</p>
                            </div>
                        </div>
                        <div className='edit-user-form'>
                            <div className='account-form'>
                                <div className='form-row'>
                                    <div className='form-col'>
                                        <label htmlFor='firstName'>Họ</label>
                                        <input className='form-input' id='firstName'
                                            value={lastName}
                                            onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                        ></input>
                                    </div>
                                    <div className='form-col'>
                                        <label htmlFor='lastName'>Tên</label>
                                        <input className='form-input' id='lastName'
                                            value={firstName}
                                            onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                        ></input>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-col'>
                                        <label htmlFor='phoneNum'>Số điện thoại</label>
                                        <input className='form-input' id='phoneNum'
                                            value={phoneNumber}
                                            onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                        ></input>
                                    </div>
                                    <div className='form-col'>
                                        <label htmlFor='gender'>Giới tính</label>
                                        <select className='form-select' type='text' id='gender'
                                            value={gender ? gender : ''}
                                            onChange={(event) => this.handleOnchangeInput(event, 'gender')}>
                                            {arrGenders && arrGenders.length > 0 &&
                                                arrGenders.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {item.value}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-col'>
                                        <label htmlFor='role'>Quyền</label>
                                        <select className='form-select' type='text' id='role'
                                            value={roleId ? roleId : ''}
                                            onChange={(event) => this.handleOnchangeInput(event, 'roleId')}>
                                            {arrRoles && arrRoles.length > 0 &&
                                                arrRoles.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {item.value}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-col'>
                                        <label htmlFor='position'>Học hàm/học vị</label>
                                        <select className='form-select' type='text' id='position'
                                            value={position ? position : ''}
                                            disabled={roleId === 'R2' ? false : true}
                                            onChange={(event) => this.handleOnchangeInput(event, 'position')}>
                                            {arrPositions && arrPositions.length > 0 &&
                                                arrPositions.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {item.value}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='form-col'>
                                    <label htmlFor='address'>Địa chỉ</label>
                                    <input className='form-input' id='address'
                                        value={address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className='edit-user-footer'>
                        <div className='edit-user-footer-content'>
                            <button className='btn-cancel' onClick={() => this.hideEditUser()}>Hủy bỏ</button>
                            <button className='btn-add' onClick={() => this.handleEditUser()}>Cập nhật</button>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPosition: () => dispatch(actions.fetchPositionStart()),
        getRole: () => dispatch(actions.fetchRoleStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
