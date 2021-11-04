import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { firebase, db } from "../database/firebase";


const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection("users").onSnapshot((querySnapshot) => {
            const users = [];

            querySnapshot.docs.forEach((doc) => {
                const { name, email, phone } = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,
                });
            });
            setUsers(users);
        });
    }, []);
    return (
        <ScrollView>
            <Button title="Create User" onPress={() => props.navigation.navigate('CreateUserScreen')}></Button>
            {users.map((user) => (
                <ListItem key={user.id} bottomDivider onPress={()=> {
                    props.navigation.navigate('UserDetail', {
                        userId: user.id,
                    })
                }}>
                    <ListItem.Chevron />
                    <Avatar source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD6zx3daonLkcGh8TlU01fnx7a2sbOS98pxSN8hmZ3VsBDd9reXEeJiz0zknaO45sW3Is&usqp=CAU' } } rounded/>
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                    </ListItem.Content>

                </ListItem>
            ))}






        </ScrollView>
    );
};

export default UserList;
