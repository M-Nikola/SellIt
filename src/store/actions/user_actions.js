import {
    REGISTER_USER,
    SIGN_USER,
    AUTO_SIGN_IN,
    GET_USER_ARTICLES,
    DELETE_USER_POST
} from '../types';

import axios from 'axios';
import {SIGNUP, SIGNIN, REFRESH, FIREBASEURL, setTokens} from '../../utils/misc';

export function signIn(data){
    const request = axios({
        method: 'POST',
        url: SIGNIN,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        header: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });

    return {
        type: SIGN_USER,
        payload: request
    }
}

export function signUp(data){
    const request = axios({
        method: 'POST',
        url: SIGNUP,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        header: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const autoSignIn = (refreshToken) => {
    const request = axios({
        method: 'POST',
        url: REFRESH,
        data: 'grant_type=refresh_token&refresh_token=' + refreshToken,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return false;
    })

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
}

export function getUserArticles(uid) {
    const URL = `${FIREBASEURL}/articles.json/?orderBy=\"uid\"&equalTo=\"${uid}\"`;

    const request = axios(URL).then(response => {
        const articles = [];
        for (let key in response.data) {
            articles.push({
                ...response.data[key],
                id: key
            });
        }

        return articles;
    });

    return {
        type: GET_USER_ARTICLES,
        payload: request
    }
}

export const deleteUserPost = (postID, userData) => {
    const promise = new Promise((resolve, reject)=> {
        const URL = `${FIREBASEURL}/articles/${postID}.json`;

        const request = axios({
            method: 'DELETE',
            url: `${URL}?auth=${userData.token}`
        }).then( response => {
            resolve({ deletePost: true })
        }).catch( error => {
            const signIn = autoSignIn(userData.refToken);

            signIn.payload.then( response => {
                let newTokens = {
                    token: response.id_token,
                    refToken: response.refresh_token,
                    uid: response.user_id
                };
                setTokens(newTokens, ()=> {
                    axios({
                        method: 'DELETE',
                        url: `${URL}?auth=${userData.token}`
                    }).then(() => {
                        resolve({ 
                            userData: newTokens,
                            deletePost: true 
                        })
                    })
                })
            })
        });
    })

    return {
        type: DELETE_USER_POST,
        payload: promise
    }
}
