import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../store/actions/articles_actions'; 
import { gridTwoColumns } from '../../utils/misc';
import Icon from 'react-native-vector-icons/FontAwesome';

import HorizontalScroll from './HorizontalScroll'
import BlockItem from './BlockItem';

class HomeScreen extends Component {  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      articles: [],
      categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
      categorySelected: 'All'
    }
  }

  static navigationOptions = {
    title: 'Home'
  };

  navigateToScreen = (route, props) => {
    this.props.navigation.navigate(route, props);
  }

  updateCategoryHandler = (value) => {
    this.setState({
      isLoading: true,
      categorySelected: value,
      articles: []
    });
    
    this.getArticles(value);
  }

  getArticles = (category) => {
    this.props.getArticles(category).then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list);
      this.setState({
        isLoading: false,
        articles: newArticles
      });
    });
  }

  componentDidMount() {
    this.props.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.getArticles('All');
        console.log('willFocus', payload);
      }
    );
  }

  goToArticle = (article) => {
    this.navigateToScreen('Article', article);
  }

  showArticles = () => (
    this.state.articles.map((item, i) => {
      return (
        <BlockItem
          key={`columnHome-${i}`}
          item={item}
          goto={this.goToArticle}
        />
      )
    })
  )

  render() {
    return (
      <ScrollView>
        <View style={styles.container}> 
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
          {
            this.state.isLoading ?
            <View style={styles.isLoading}>
              <Icon name='gears' size={30} color='lightgrey'/>
              <Text style={{color: 'lightgrey'}}>Loading ...</Text>
            </View>
            : null
          }
          <View style={styles.articleContainer}>
            <View style={{flex: 1}}>
              {this.showArticles()}
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  isLoading: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  articleContainer: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

function mapStateToProps(state) {
  return {
    Articles: state.Articles
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getArticles}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);