import { StyleSheet, View } from 'react-native'
import { type ChatModel } from '../Models/ChatsModel'
import { type ChatDBModel } from '../Models/ChatDBModel'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'

interface HistoryViewProps {
    history: ChatDBModel
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }: { history: ChatDBModel }) => {
    const [message, setMessage] = useState('')
    useEffect(() => {
        const chats: ChatModel[] = history.messages
        let messageText = ''
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].text !== null && chats[i].text !== undefined && chats[i].text !== '') {
                messageText = chats[i].text
                break
            }
        }
        setMessage(messageText)
    }, [history])

    return (
        <View style={styles.container}>
            <Text style={styles.text}> {message} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#99c2ff',
        marginHorizontal: 13,
        marginVertical: 5,
        padding: 10,
        borderRadius: 8
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    }
})
export default HistoryView
