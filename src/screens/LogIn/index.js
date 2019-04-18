import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Logo from './Logo';
import LogInPanel from './LogInPanel';

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  isAndroid,
  getTokens,
  setTokens
} from '../../utils/misc';

import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

class LogInScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isAndroid: isAndroid(),
      orientation: getOrientation(500),
      logoAnimation: false
    }

    setOrientationListener(this.changeOrientation)
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    })
  }

  showLogin = () => {
    this.setState({
      logoAnimation: true
    })
  }

  componentWillUnmount() {
    removeOrientationListener();
  }

  componentDidMount() {
    getTokens((value) => {
      console.log(value);
      console.log(this.state.User);
      if (value[0][1] === null) {
        console.log("2");
        this.setState({ loading: false })
      } else {
        console.log("3");
        this.props.autoSignIn(value[1][1]).then(() => {
          console.log("auto")
          if (!this.props.User.userData.token) {
            this.setState({ loading: false })
          } else {
            setTokens(this.props.User.userData, () => {
              this.props.navigation.navigate('TabsDrawer');
            })
          }
        })
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Logo
              showLogin={this.showLogin}
              orientation={this.state.orientation}
            />
            <LogInPanel
              show={this.state.logoAnimation}
              orientation={this.state.orientation}
              isAndroid={this.state.isAndroid}
              nextScreen={() => {
                console.log("nextScreen")
                this.props.navigation.navigate('TabsDrawer');
              }}
            />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);