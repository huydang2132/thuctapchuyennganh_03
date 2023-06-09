import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated, userCheckRoleR3 } from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import HomePage from './HomePage/HomePage.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Teacher from '../routes/Teacher';
import './App.scss';
import Register from './Auth/Register';
import Account from './HomePage/Account/Account';
import ChangePassword from './HomePage/Account/ChangePassword';
import UserPage from './UserPage/UserPage';
import Page404 from './Page404/Page404';
import ConfirmBooking from './UserPage/Teacher/ConfirmBooking';
import ForgotPassword from './HomePage/Account/ForgotPassword';
import ConfirmPassword from './HomePage/Account/ConfirmPassword';

class App extends Component {

  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <Switch>
                <Route path={path.HOME} exact component={(Home)} />
                <Route path={path.ACCOUNT} exact component={userIsAuthenticated(Account)} />
                <Route path={path.CHANGE_PASSWORD} exact component={userIsAuthenticated(ChangePassword)} />
                <Route path={path.FORGOT_PASSWORD} exact component={userIsAuthenticated(ForgotPassword)} />
                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                <Route path={path.RESGISTER} component={Register} />
                <Route path={path.USER_PAGE} component={userIsAuthenticated(UserPage)} />
                <Route path={path.SYSTEM} component={userCheckRoleR3(userIsAuthenticated(System))} />
                <Route path={path.TEACHER} component={userCheckRoleR3(userIsAuthenticated(Teacher))} />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.CONFIRM_BOOKING} component={ConfirmBooking} />
                <Route path={path.CONFIRM_PASSWORD} component={ConfirmPassword} />
                <Route path={path.PAGE_NOT_FOUND} component={Page404} />
              </Switch>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    started: state.app.started,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);