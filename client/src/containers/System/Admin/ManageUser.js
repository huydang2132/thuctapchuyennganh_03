import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageUser.scss';
import Header from '../Section/Header';
import Navbar from '../Section/Navbar';
import TableUser from './ManageUser/TableUser';
import EditUser from './ManageUser/EditUser';
import AddUser from './ManageUser/AddUser';

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,
            createUser: false,
            users: [],
            dataUser: {}
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { dataUser } = this.props;
        if (prevProps.dataUser !== dataUser) {
            this.setState({
                dataUser: dataUser,
            })
        }
    }
    showEditUser = () => {
        this.setState({
            editUser: true
        })
    }
    hideEditUser = () => {
        this.setState({
            editUser: false
        })
    }
    currentUser = (data) => {
        this.props.fetchUserReduxById(data.id);
    }
    addNewUser = () => {
        this.setState({
            createUser: true,
        })
    }
    viewUsers = () => {
        this.setState({
            createUser: false
        })
    }
    render() {
        let { editUser, createUser, dataUser } = this.state;
        return (
            <>
                <div className='manage-user-container'>
                    <Header />
                    <main className='manage-user-main'>
                        <Navbar />
                        <section className='manage-user-section'>
                            <div className='manage-user-list'>
                                {createUser === false ?
                                    <TableUser
                                        showEditUser={this.showEditUser}
                                        currentUser={this.currentUser}
                                        addNewUser={this.addNewUser}
                                    />
                                    :
                                    <AddUser
                                        viewUsers={this.viewUsers}
                                    />
                                }
                            </div>
                        </section>
                    </main>
                    <footer className='system-footer'>
                        <p>&#169; 2023 Copyright: Đặng Đình Huy</p>
                    </footer>
                    {
                        editUser === false ?
                            undefined
                            :
                            <EditUser
                                editUser={editUser}
                                hideEditUser={this.hideEditUser}
                                currentUser={dataUser}
                            />
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataUser: state.admin.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserReduxById: (id) => dispatch(actions.fetchUserById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
