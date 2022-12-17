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
import ProfileIcon from '../../svgs/profile-icon';
import PostIcon from '../../svgs/post-icon';

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
                        <View style={styles.postHeader}>
                            <PostIcon />
                            <Text style={styles.postID}>Post ID: {postID}</Text>
                        </View>
                        <Text style={styles.postContent}>
                            Title: {data['title']}
                        </Text>
                        <Text style={styles.postContent}>
                            body: {data['body']}
                        </Text>
                    </View>
                    <Text style={{marginLeft: 5}}>Comments</Text>
                    <View>
                        {Object.keys(comment).map(key => (
                            <View style={styles.listCommentContainer}>
                                <ProfileIcon />
                                <View style={styles.commentContainer}>
                                    <Text style={styles.highlight}>
                                        Name: {comment[parseInt(key)]['name']}
                                    </Text>
                                    <Text>
                                        Body: {comment[parseInt(key)]['body']}
                                    </Text>
                                </View>
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
    postContainer: {
        backgroundColor: 'bisque',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    postID: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginLeft: 5,
    },
    postHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postContent: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    highlight: {
        fontWeight: '700',
    },
    listCommentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 10,
    },
    commentContainer: {
        flex: 1,
        backgroundColor: 'antiquewhite',
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
    },
});
