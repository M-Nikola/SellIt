import { 
    Dimensions,
    Platform,
    AsyncStorage
 } from 'react-native';

export const FIREBASEURL = 'https://sellitapp-45a91.firebaseio.com';
export const APIKEY = 'AIzaSyAIDb50YAEjHyJa8AD0RfFsD5OGRNzfgVs'; 
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getOrientation = (value) => {
    return Dimensions.get('window').height > value ? 'portrait' : 'landscape' ;
}

export const setOrientationListener = (callback) => {
    return Dimensions.addEventListener('change', callback);
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener('change');
}

export const isAndroid = () => {
    return Platform.OS === 'android';
}

export const getTokens = (callback) => {
    AsyncStorage.multiGet([
        '@sellitApp@token',
        '@sellitApp@refreshToken',
        '@sellitApp@expireToken',
        '@sellitApp@uid',
    ]).then(value => {
        callback(value);
    })
}

export const setTokens = (values, callback) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@sellitApp@token', values.token],
        ['@sellitApp@refreshToken', values.refToken],
        ['@sellitApp@expireToken', expiration.toString()],
        ['@sellitApp@uid', values.uid],
    ]).then(response => {
        callback();
    })
}

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {};

    if(articles) {
        articles.forEach((element, index) => {
            if (count == 1) {
                vessel["blockOne"] = element;
                count++;
                if (index == articles.length - 1) {
                    newArticles.push(vessel);
                }
            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);
                vessel = {};
                count = 1;
            }
        });
    }

    return newArticles;
}
