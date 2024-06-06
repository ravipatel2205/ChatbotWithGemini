import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { type ChatModel, MessageType } from '../Models/ChatsModel'

interface MessageComponentProps {
    message: ChatModel
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }: { message: ChatModel }) => {
    const [imageUrl, setImageURI] = useState('')

    useEffect(() => {
        if (
            message.isUser &&
            (message.type === MessageType.image || message.type === MessageType.imageWithText)
        ) {
            const imageURL = `data:image/png;base64,${message.image}`
            setImageURI(imageURL)
        }
    }, [])

    return (
        <View
            style={[
                message.isUser ? styles.userContainer : styles.botContainer,
                message.type === MessageType.text ? styles.container : styles.imageContainer
            ]}
        >
            {message.type === MessageType.text ? (
                <Text style={styles.text}>{message.text}</Text>
            ) : (
                <View>
                    <Image
                        source={{ uri: imageUrl !== '' ? imageUrl : undefined }}
                        style={styles.image}
                    />
                    {message.text !== '' ? (
                        <Text style={[styles.text, styles.imageText]}>{message.text}</Text>
                    ) : (
                        <Text style={{ height: 0 }} />
                    )}
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        maxWidth: '60%',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7
    },
    userContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcf8c6',
        right: 15
    },
    botContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#e6e6e6',
        left: 15
    },
    text: {
        fontSize: 15
    },
    imageContainer: {
        backgroundColor: '#dcf8c6',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    image: {
        width: Dimensions.get('screen').width / 1.65 - 20,
        height: Dimensions.get('screen').width / 2.3,
        borderRadius: 10
    },
    imageText: {
        width: Dimensions.get('screen').width / 1.65 - 40,
        marginHorizontal: 10,
        marginVertical: 5
    }
})

export default MessageComponent
