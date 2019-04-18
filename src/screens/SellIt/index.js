import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotAllow from './NotAllow';
import AddPost from './AddPost';

class SellIt extends Component {
    static navigationOptions = {
      title: 'SellIt'
    };

    render() {
      return this.props.User && this.props.User.userData && this.props.User.userData.uid ? 
              <AddPost
                navigation={this.props.navigation}
              /> : 
              <NotAllow
                navigation={this.props.navigation}
              />;
    }
}

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

export default connect(mapStateToProps, null)(SellIt);