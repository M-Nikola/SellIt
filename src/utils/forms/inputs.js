import React from 'react';
import { StyleSheet, TextInput, Picker } from 'react-native';

const input = (props) => {
    let template = null;
    switch(props.type){
        case 'textinput':
            template = 
                <TextInput 
                    underlineColorAndroid='transparent'
                    {...props}
                    style={[styles.input, props.overrideStyle]}
                />
        break;
        case 'picker':
            template = 
                <Picker
                    selectedValue={props.value}
                    {...props}
                >
                    {
                        props.options.map((item, i) => (
                            <Picker.Item key={i} label={item} value={item}/>
                        ))
                    }
                </Picker>
                
        break;
        default:
            return template;
    }
    return template;
}

const styles = StyleSheet.create({
    input:{
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#eaeaea',
        fontSize: 18,
        padding: 5
    }
})

export default input;
