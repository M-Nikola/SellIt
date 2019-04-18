import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import { getUserArticles, deleteUserPost } from '../../store/actions/user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserPosts extends Component {
    static navigationOptions = {
      title: 'UserPosts'
    };

    state = {
      modalVisible: false,
      myArticles: []
    }

    componentDidMount() {
      this.props.getUserArticles(this.props.User.userData.uid).then(() => {
        this.setState({
          myArticles: this.props.User.userArticles
        });
      });
    }

    deletePost = (postID) => {
      this.props.deleteUserPost(postID, this.props.User.userData).then(() => {
        this.props.getUserArticles(this.props.User.userData.uid).then(() => {
          this.setState({
            myArticles: this.props.User.userArticles,
            modalVisible: false,
            toDelete: ''
          });
        });
      });
    }

    showPosts = (articles) => (
      articles ?
        articles.map(item => (
          <View style={styles.itemWrapper} key={item.id}>
            <View style={styles.itemTitle}>
              <Text style={{fontFamily: 'Roboto-Black'}}>{item.title}</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text>{item.description}</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.small}>PRICE: $ {item.price}</Text>
                <Text style={styles.small}>CATEGORY: {item.category}</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {this.setState({modalVisible: true, toDelete: item.id})}}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto-Black',
                    color: '#F44336',
                    paddingBottom: 10
                  }}
                >
                  Delete post
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType='slide'
              transparent={false}
              visible={this.state.modalVisible}
            >
              <View style={{padding: 50}}>
                  <Text style={{fontSize: 20}}>
                    Are you sure you want to delete this post?
                  </Text>
                  <View style={{mraginTop: 50}}>
                    <TouchableOpacity
                      onPress={() => {this.deletePost(this.state.toDelete)}}
                    >
                      <Text style={styles.modalDelete}>Yes, delete it</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {this.setState({modalVisible: false, toDelete: ''})}}
                    >
                      <Text style={styles.modalClose}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </Modal>
          </View>
        ))
      : null
    )

    render() {
      console.log(this.state.myArticles)
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={{ marginBottom: 30 }}>
              <Text>You have {this.state.myArticles.length} articles</Text>
            </View>

            {this.showPosts(this.state.myArticles)}

          </View>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 2,
    marginBottom: 20
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  itemDescription: {
    padding: 10
  },
  small: {
    fontSize: 12
  },
  buttons: {
    alignItems: 'center'
  },
  modalDelete: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#f44336'
  },
  modalClose: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#00ADA9'
  }
});

function mapStateToProps(state) {
  return {
      User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getUserArticles, deleteUserPost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);