import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import UserList from './screens/usersList';
import UserDetail from './screens/userDetailScreen';
import CreateUserScreen from './screens/createUserScreen';

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{title: 'Users List'}}/>
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{title: 'Users Creates'}}/>
      <Stack.Screen name="UserDetail"component={UserDetail} options={{title: 'Users Details'}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
