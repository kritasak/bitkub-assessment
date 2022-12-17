import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
    FlatList,
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
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Section from '../../components/section';
import {RootStackParamList} from '../../App';

// type RootStackParamList = {
//     Post: {userID: number} | undefined;
// };

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({route, navigation}: Props) {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // const navigation =
    //     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function navigateToPost(id: number) {
        navigation.navigate('Post', {userID: id});
    }

    const [status, setStatus] = useState('No API Loading');
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            setStatus('loading...');
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(data => {
                    setData(data);
                });
            setStatus('No API Loading');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Text>Loading Status: {status}</Text>
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <Section
                            icon="profile"
                            topic={item['username']}
                            content={'Name: ' + item['name']}
                            onPress={() => navigateToPost(item['id'])}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}
