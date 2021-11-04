import React, {useEffect, useState} from "react";
import { View, TextInput,ScrollView, StyleSheet, Button, ActivityIndicator, Alert } from "react-native";
import { firebase, db } from "../database/firebase";


const UserDeatilScreen = (props) => {
    const initialState = {
        id: "",
        name: "",
        email: "",
        password: "",
    }
    const [user, setUser] = React.useState(initialState);
    const [isLoading, setIsLoading] = React.useState(true);

    const getUserById = async (id) => {
        const dbRef = db.collection("users").doc(id);
        const docs = await dbRef.get()
        const user = docs.data();
        setUser({
            ...user,
            id: docs.id
        });
        setIsLoading(false);
    }
    useEffect(() => {

        getUserById(props.route.params.userId)
    },[])

    const handleChange = (name, value) => {
        setUser({...user, [name]:value})
    }
    const deleteUser = async () => {
        const dbRef = db.collection("users").doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.goBack();
    }
    const updateUser = async () => {
        const dbRef = db.collection("users").doc(props.route.params.userId);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setUser(initialState);
        props.navigation.goBack();
    }

    const openConfirmationAlert = () => {
        Alert.alert('Remove The User', 'Are you sure?', [
            {text:'Yes', onPress: () => deleteUser()},
            {text:'No', onPress: () => console.log('False')}
        ])
    }

    if(isLoading){
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.inputGroup}>
                <TextInput value={user.name} placeholder="Name User" onChangeText={(value) =>  handleChange('name', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput value={user.email} placeholder="Email User" onChangeText={(value) =>  handleChange('email', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput value={user.phone} placeholder="Phone User" onChangeText={(value) =>  handleChange('phone', value)}/>
            </View>
            <View style={styles.buttonCreate}>
                <Button title="Update User" onPress={() =>  updateUser() } color="green"/>
                <Button title="Delete User"  color="red" onPress={() => openConfirmationAlert()}/>
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

export default UserDeatilScreen;