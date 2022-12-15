import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
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
import {RootStackParamList} from '../../App';
import Section from '../../components/section';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({route, navigation}: Props) {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const postID = route.params?.postID;

    const [status, setStatus] = useState('No API Loading');
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);

    const getData = async () => {
        try {
            setStatus('loading...');
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                });
            await fetch(
                `https://jsonplaceholder.typicode.com/posts/${postID}/comments`,
            )
                .then(response => response.json())
                .then(data => {
                    setComment(data);
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
            <ScrollView>
                <View
                    style={{
                        backgroundColor: isDarkMode
                            ? Colors.black
                            : Colors.white,
                    }}>
                    <Text>Loading Status: {status}</Text>
                    <View style={styles.postContainer}>
                        <Text>Post ID: {postID}</Text>
                        <Text>Title: {data['title']}</Text>
                        <Text>body: {data['body']}</Text>
                    </View>
                    <Text>Comments</Text>
                    <View>
                        {Object.keys(comment).map(key => (
                            <View style={styles.commentContainer}>
                                <Text>{comment[parseInt(key)]['name']}</Text>
                                <Text>{comment[parseInt(key)]['body']}</Text>
                            </View>
                        ))}
                    </View>
                    {/* <FlatList
                    data={comment}
                    renderItem={({item}) => (
                        <View style={styles.commentContainer}>
                            <Text>Name: {item['name']}</Text>
                            <Text>Body: {item['body']}</Text>
                        </View>
                    )}
                /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    postContainer: {
        backgroundColor: 'bisque',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    commentContainer: {
        backgroundColor: 'bisque',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
});
