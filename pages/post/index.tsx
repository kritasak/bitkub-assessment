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
import {useRoute} from '@react-navigation/native';
import Section from '../../components/section';
import {RootStackParamList} from '../../App';

// type RootStackParamList = {
//     Detail: undefined;
// };

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

export default function Post({route, navigation}: Props) {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // const navigation =
    //     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function navigateToDetail(id: number) {
        navigation.navigate('Detail', {postID: id});
    }

    const userID = route.params?.userID;

    const [status, setStatus] = useState('No API Loading');
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            setStatus('loading...');
            await fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(data => {
                    const result = data.filter((obj: {userId: number}) => {
                        return obj.userId === userID;
                    });
                    setData(result);
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
                            icon="post"
                            topic={'Post ID: ' + item['id']}
                            content={'Title: ' + item['title']}
                            onPress={() => navigateToDetail(item['id'])}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}
