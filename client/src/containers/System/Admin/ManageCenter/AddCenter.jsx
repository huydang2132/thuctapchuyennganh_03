import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageCenter.scss';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../../utils';

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCenter: '',
            imgShow: null,
            listProvince: [],
            selectedProvince: '',
            description: '',
            address: '',
            image: ''
        }
    }

    componentDidMount() {
        let { dataCenter } = this.props;
        let dataSelectProvince = this.dataInputSelect(dataCenter.resProvince);
        this.setState({
            listProvince: dataSelectProvince,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleAddCenter = async () => {
        let { nameCenter, selectedProvince, description, address, image } = this.state;
        if (!nameCenter || !selectedProvince || !description || !address) {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        else {
            let base64 = ''
            if (image) {
                base64 = await CommonUtils.getBase64(image);
            }
            this.props.fetchCreateCenter({
                name: nameCenter,
                provinceId: selectedProvince.value,
                address: address,
                description: description,
                image: base64
            })
            this.props.showAddCenter();
        }
    }
    dataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = item.value;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    viewCenters = () => {
        this.props.showAddCenter();
    }
    handleOnChangeImage = (file) => {
        if (file) {
            this.setState({
                imgShow: URL.createObjectURL(file),
                image: file
            })
        }
    }
    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { nameCenter, imgShow } = this.state;
        return (
            <>
                <div className='add-center-container'>
                    <h2>Thêm mới trung tâm</h2>
                    <div className='account-form'>
                        <div className='form-col'>
                            <label htmlFor='nameCenter'>Tên trung tâm</label>
                            <input className='form-input' id='nameCenter'
                                value={nameCenter}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameCenter')}
                            ></input>
                        </div>
                        <div className='item-col'>

                        </div>
                        <div className='form-row'>
                            <div className='form-col'>
                                <label>Tỉnh/Thành</label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listProvince}
                                    placeholder="Chọn tỉnh/thành"
                                    name="selectedProvince"
                                    className='select-input'
                                />
                            </div>
                            <div className='form-col'>
                                <label htmlFor='address'>Địa chỉ trung tâm</label>
                                <input className='form-input' id='address'
                                    // value={}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                ></input>
                            </div>
                        </div>
                        <div className='form-col'>
                            <label htmlFor='description'>Mô tả chi tiết</label>
                            <textarea className='form-input description' id='description'
                                // value={}
                                onChange={(event) => this.handleOnchangeInput(event, 'description')}
                            ></textarea>
                        </div>
                        <div className='image-center'>
                            <div className='image-item'>
                                <input type="file" accept='image/*' id='image' hidden
                                    onChange={(event) => this.handleOnChangeImage(event.target.files[0])} />
                                <label htmlFor="image" title='Đổi ảnh'></label>
                                <p className='alt-img'>Ảnh minh họa trung tâm</p>
                                <img src={imgShow} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='add-center'>
                        <button className='btn-cancel' onClick={() => this.viewCenters()}>Hủy bỏ</button>
                        <button className='btn-add-center' onClick={() => this.handleAddCenter()}>Thêm mới</button>
                    </div>
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataCenter: state.admin.allCenter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCreateCenter: (data) => dispatch(actions.fetchCreateCenter(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
