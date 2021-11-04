import React, {useState} from "react";
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { State } from "react-native-gesture-handler";
import {firebase, db} from "../database/firebase";

const CreateUserScreen = () => {

    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const handleChange = (name, value) => {
        setState({...state, [name]:value})
    }

    const saveNewUser = async () => {
        if(state.name === '' || state.email === '' || state.phone === ''){
            alert('Please enter a name, email and phone')
        }
        else{   
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone,
            })
            .then(() => {
                alert('User added')
            })
            .catch(() => {
                alert('Error adding user')
            })
        }

    }

    return (
        <ScrollView>
            <View style={styles.inputGroup}>
                <TextInput  placeholder="Name User" onChangeText={(value) =>  handleChange('name', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput  placeholder="Email User" onChangeText={(value) =>  handleChange('email', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput  placeholder="Phone User" onChangeText={(value) =>  handleChange('phone', value)}/>
            </View>
            <View style={styles.buttonCreate}>
                <Button title="Create User" onPress={() =>  saveNewUser() }/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        flex: 1,
        padding:0,
        margin: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonCreate: {
        margin: 15,
    },
});

export default CreateUserScreen;