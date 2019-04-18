import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { 
  createBottomTabNavigator, 
  createAppContainer, 
  createStackNavigator, 
  createSwitchNavigator, 
  createDrawerNavigator
} from 'react-navigation';
import ConfigureStore from './src/store/config';
import { Provider } from 'react-redux';


import LogInScreen from './src/screens/LogIn';
import SellItScreen from './src/screens/SellIt';
import HomeScreen from './src/screens/Home';
import SidedrawerComponent from './src/screens/SideDrawer';
import UserPosts from './src/screens/UserPosts';
import Article from './src/screens/Article';

const store = ConfigureStore();

const navStyle = (navigation) => ({
    headerStyle: {
      backgroundColor: '#00ADA9',
    },
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Roboto-Light',
      color: 'white',
      textAlign: 'center',
    },
    headerLeft:
      <FontAwesome.Button 
        name= "navicon"
        backgroundColor= '#00ADA9'
        onPress={() => {
          navigation.openDrawer();
        }}
      />
});

const HomeStack = createStackNavigator({
  Home: HomeScreen
},{
  defaultNavigationOptions:  ({ navigation }) => (navStyle(navigation))
});

const SellItStack = createStackNavigator({
  SellIt: SellItScreen
},{
  defaultNavigationOptions:  ({ navigation }) => (navStyle(navigation))
});

const TabStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    SellIt: SellItStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'SellIt') {
          iconName = 'dollar';
        }
        return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
    }
  }
);

const TabsDrawer = createDrawerNavigator({
  Tabs: TabStack
},{
  contentComponent: SidedrawerComponent
});

const TabsPostsStack = createStackNavigator({
  Tabs: {
    screen: TabsDrawer,
    navigationOptions:{
      header: null,
    }
  },
  UserPosts: UserPosts,
  Article: Article
}, {
  defaultNavigationOptions:  {
    gesturesEnabled: true,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#00ADA9',
    },
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Roboto-Light',
      color: 'white',
      textAlign: 'center',
    }
  }
});

const Stack = createSwitchNavigator({
  Login: LogInScreen,
  TabsDrawer: TabsPostsStack,
});

const Navigation = createAppContainer(Stack);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}