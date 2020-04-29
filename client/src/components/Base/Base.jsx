import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from '../../containers/SideBar';
import constants from '../../utils/constants';
import SuccessToast from '../../components/Toast/SuccessToast';
import ErrorToast from '../../components/Toast/ErrorToast';
import Loading from '../../containers/Loading';
class Base extends Component {
  state = {
    clusterId: '',
    topicId: '',
    selectedTab: constants.CLUSTER, //cluster | node | topic | tail | group | acls | schema | connect
    action: '',
    showSuccessToast: false,
    successToastMessage: '',
    successToastTimeout: 6000, // in ms
    showErrorToast: false,
    errorToastTitle: '',
    errorToastMessage: '',
    errorToastTimeout: 6000, // in ms
    loading: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const clusterId = nextProps.match.params.clusterId;
    const topicId = nextProps.match.params.topicId;
    const selectedTab = nextProps.match.params.tab;
    const action = nextProps.match.params.action;
    const {
      showSuccessToast,
      successToastMessage,
      showErrorToast,
      errorToastTitle,
      errorToastMessage,
      loading,
      tab
    } = nextProps.location;

    return {
      topicId: topicId,
      clusterId: clusterId,
      selectedTab: tab,
      action: action,
      showSuccessToast: showSuccessToast,
      successToastMessage: successToastMessage,
      showErrorToast: showErrorToast,
      errorToastTitle: errorToastTitle,
      errorToastMessage: errorToastMessage,
      loading
    };
  }

  componentDidMount() {
    this.checkToasts();
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  checkToasts() {
    const { clusterId } = this.state;

    if (this.state.showSuccessToast) {
      this.interval = setTimeout(() => {
        this.props.history.replace({
          showSuccessToast: false,
          successToastMessage: ''
        });
      }, this.state.successToastTimeout);
    }

    if (this.state.showErrorToast) {
      this.interval = setTimeout(() => {
        this.props.history.replace({
          showErrorToast: false,
          errorToastTitle: '',
          errorToastMessage: ''
        });
      }, this.state.errorToastTimeout);
    }
  }

  render() {
    const { children } = this.props;
    console.log('base', this.props);
    const {
      showSuccessToast,
      showErrorToast,
      successToastMessage,
      errorToastTitle,
      errorToastMessage,
      loading,
      selectedTab
    } = this.state;
    this.checkToasts();
    return (
      <>
        <Loading show={loading} />
        <SuccessToast show={showSuccessToast} message={successToastMessage} />
        <ErrorToast show={showErrorToast} title={errorToastTitle} message={errorToastMessage} />
        {this.props.location.pathname !== '/login' && <Sidebar selectedTab={selectedTab} />}
        {children}
      </>
    );
  }
}

export default withRouter(Base);
