import React, {type PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/home';
import Post from './pages/post';
import Detail from './pages/detail';

export type RootStackParamList = {
    Home: undefined;
    Post: {userID: number};
    Detail: {postID: number} | undefined;
};

const App = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{title: 'List of 10 Users'}}
                />
                <Stack.Screen
                    name="Post"
                    component={Post}
                    options={{title: 'List of Posts'}}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={{title: 'Post & Comments'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
