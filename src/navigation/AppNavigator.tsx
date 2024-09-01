import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/screens/HomeScreen';
import LoginScreen from '../views/screens/LoginScreen';
import SignUpScreen from '../views/screens/SignUpScreen';
import CreateWorkSpace from '../views/screens/CreateWorkSpace';
import JoinWorkSpace from '../views/screens/JoinWorkSpace';
import WorkspaceDetail from '../views/screens/WorkSpaceDetail';
import AddTaskScreen from '../views/screens/AddTaskScreen';
import EditTaskScreen from '../views/screens/EditTaskScreen';
import AssignTaskScreen from '../views/screens/AssignTaskScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'gray'},
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateWorkspace" component={CreateWorkSpace} />
        <Stack.Screen name="JoinWorkspace" component={JoinWorkSpace} />
        <Stack.Screen name="WorkspaceDetail" component={WorkspaceDetail} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        <Stack.Screen name="AssignTask" component={AssignTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
