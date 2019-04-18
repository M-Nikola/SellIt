import React, { Component } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

import LogInForm from './LogInForm';

class LogInPanel extends Component {

    state = {
        animFinished: false,
        backgroundImage: new Animated.Value(0),
        inputForm: new Animated.Value(0)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.show && !this.state.animFinished) {
            Animated.parallel([
                Animated.timing(this.state.backgroundImage,{
                    toValue: 1,
                    duration: 1000
                }),
                Animated.timing(this.state.inputForm,{
                    toValue: 1,
                    duration: 1500
                })
            ]).start(
                this.setState({animFinished: true})
            )
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.backgroundImage
                    }}
                >
                    <Image
                        style={
                            this.props.orientation === 'portrait'
                            ? styles.imageStylePortrait
                            : styles.imageStyleLandscape 
                        }
                        source={require('../../assets/loginPanel.jpg')}
                        resizeMode={'contain'}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        opacity: this.state.inputForm,
                        top: this.state.inputForm.interpolate({
                            inputRange:[0,1],
                            outputRange:[100,0]
                        })
                    }}
                >
                    <LogInForm
                        isAndroid={this.props.isAndroid}
                        nextScreen={this.props.nextScreen}
                    />
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        maxWidth: '80%',
    },
    imageStylePortrait: {
        width: 250,
        height: 150
    },
    imageStyleLandscape: {
        width: 205,
        height: 0
    }
})

export default LogInPanel;