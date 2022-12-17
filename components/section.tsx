import React, {type PropsWithChildren} from 'react';
import {
    GestureResponderEvent,
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
import ProfileIcon from '../svgs/profile-icon';
import PostIcon from '../svgs/post-icon';

interface Props {
    icon: string;
    topic: string;
    content: string;
    onPress(params: any): void;
}

const Section: React.FC<Props> = ({icon, topic, content, onPress}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <TouchableOpacity style={styles.sectionContainer} onPress={onPress}>
            <View style={styles.subSectionContainer}>
                {icon === 'profile' ? <ProfileIcon /> : <PostIcon />}
                <Text
                    style={[
                        styles.sectionTitle,
                        {
                            color: isDarkMode ? Colors.white : Colors.black,
                        },
                    ]}>
                    {topic}
                </Text>
            </View>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {content}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        paddingHorizontal: 24,
        backgroundColor: 'bisque',
        borderRadius: 10,
    },
    subSectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginLeft: 5,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Section;
