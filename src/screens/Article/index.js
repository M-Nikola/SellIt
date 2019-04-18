import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Article extends Component {
    static navigationOptions = {
      title: 'Article'
    }

    articleImage = (price) => (
        <View style={{position: 'relative'}}>
            <Image 
                resizeMode={'cover'}
                style={styles.image}
                source={{uri: 'https://loremflickr.com/400/400/girl,brazil,dog'}}
            />
            <Text style={styles.priceTag}>
                $ {price}
            </Text>
        </View>
    )

    articleText = (title, description) => (
        <View>
            <Text style={styles.articleTitle}>
                {title}
            </Text>
            <Text style={styles.articleDescription}>
                {description}
            </Text>
        </View>
    )

    ownerInfo = (email, title) => (
        <View style={styles.ownerInfo}>
            <Text>
                Contact the owner of this article to the following mail.
            </Text>
            <Icon.Button
                name='envelope-o'
                color='#00ADA9'
                backgroundColor="#ffffff"
                onPress={() => this.openEmail(email, title)}
            >
                <Text
                    style={{ fontSize: 20 }}
                >
                    {email}
                </Text>
            </Icon.Button>
        </View>
    )

    openEmail = (email, title) => {
        Linking.openURL(`mailto:${email}
        ?subject=Regarding ${title}`);
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'Title');
        return (
            <ScrollView style={styles.container}>
                {this.articleImage(navigation.getParam('price', 0))}
                {this.articleText(title,
                                  navigation.getParam('description', 'Description'))}
                {this.ownerInfo(navigation.getParam('email', 'test@gmail.com'), 
                                title)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    image: {
        width: '100%',
        height: 250
    },
    priceTag: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FF6444',
        padding: 10,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black'
    },
    articleTitle: {
        fontSize: 30,
        color: '#474143',
        fontFamily: 'Roboto-Black',
        marginTop: 20
    },
    articleDescription: {
        marginTop: 20,
        fontSize: 18
    },
    ownerInfo: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey'
    }
})

export default Article;