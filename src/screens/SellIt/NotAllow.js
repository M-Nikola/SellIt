import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NotAllow extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon 
                    name='frown-o'
                    size={60}
                    color='#F44336'
                />
                <Text>
                    You need to log in to sell !!!
                </Text>

                <Button 
                    title='LOGIN / REGISTER'
                    color='#FD9727'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

export default NotAllow;