import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const categoriesIcons = (value) => {
    let name = 'home';
    switch (value){
        case 'All':
            name = 'circle-o-notch';
        break;
        case 'Sports':
            name = 'soccer-ball-o';
        break;
        case 'Music':
            name = 'music';
        break;
        case 'Clothing':
            name = 'shopping-bag';
        break;
        case 'Electronics':
            name = 'tv';
        break;
        default: 
            name = 'home';
            break;
    }
    return name;
}

class HorizontalScroll extends Component{
    generateItems = (categories) => (
        categories ?
            categories.map( category => (
                <View style={{marginRight: 15}} key={category}>
                     <Icon.Button
                        name={categoriesIcons(category)}
                        backgroundColor={ this.props.categorySelected !== category ? '#c1c1c1' : '#FF6444'}
                        size={20}
                        borderRadius={100}
                        onPress={() => this.props.updateCategoryHandler(category)}
                    >
                        <Text style={styles.buttonText}>
                            {category}
                        </Text>
                    </Icon.Button>
                </View>
            ))
        : null
    )

    render() {
        return (
            <ScrollView
                horizontal= {true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {this.generateItems(this.props.categories)}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%'
    }, 
    buttonText: {
        color: 'white',
        marginRight: 5
    }
})

export default HorizontalScroll;