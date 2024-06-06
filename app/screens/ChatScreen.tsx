import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Navigation } from 'react-native-navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import AppbarHeader from '../components/AppbarHeader'
import BottomSearchBar from '../components/BottomSearchBar'
import Loader from '../components/Loader'
import { geminiHelper } from '../geminiHelpers/GeminiHelper'
import { type ChatModel, MessageType } from '../Models/ChatsModel'
import MessageView from '../components/MessageView'
import { type ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import { dataBaseHelper } from '../DatabaseHelpers/DatabaseHelpers'

interface ChatScreenProps {
    chatModelId: string
    componentId: string
}

const ChatScreen: React.FC<ChatScreenProps> = (props) => {
    const [searchText, setText] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isHistoryFetched, setIsHistoryFetched] = useState<boolean>(false)
    const [chatList, setChatList] = useState<ChatModel[]>([])
    const flatListRef = useRef<FlatList<ChatModel>>(null)
    const [imageUri, setImageUri] = useState('')

    useEffect(() => {
        const fetchChatHistory = async (): Promise<void> => {
            const chatHistory = await dataBaseHelper.getAllChatsFromHistory(props.chatModelId)
            if (chatHistory.length >= 0) {
                setChatList(chatHistory)
            }
            setIsHistoryFetched(true)
        }
        fetchChatHistory().catch((error) => {
            console.error('Error fetching chat history:', error)
        })
    }, [])

    useEffect(() => {
        if (isHistoryFetched) {
            dataBaseHelper.saveChats(chatList, props.chatModelId).catch((error) => {
                console.error(error)
            })
        }
    }, [chatList])

    const backButtonTapped: () => void = () => {
        Navigation.pop(props.componentId).catch((error) => {
            console.error('Error pop:', error)
        })
    }

    const menuButtonTapped = (index: number): void => {
        if (index === 0) {
            presentImagePicker(index === 0)
        }
    }

    const sendButtonTapped = (): void => {
        const prompt = searchText
        setText('')
        if (imageUri !== '') {
            const imgURL = imageUri
            setImageUri('')
            sendImage(imgURL, prompt)
        } else {
            sendText(prompt)
        }
    }

    function addNewChatIntoArray(chat: ChatModel): void {
        setChatList((oldMessageList) => {
            return [...oldMessageList, chat]
        })
    }

    const presentImagePicker: (isPresentPhoto: boolean) => void = (isPresentPhoto: boolean) => {
        const imageLibraryOptions: ImageLibraryOptions = {
            mediaType: isPresentPhoto ? 'photo' : 'video',
            includeBase64: true,
            selectionLimit: 1,
            presentationStyle: 'fullScreen'
        }
        launchImageLibrary(imageLibraryOptions, (response) => {
            if (response.assets !== null && response.assets !== undefined) {
                if (response.assets.length > 0) {
                    const imageUri = response.assets[0].uri
                    if (imageUri !== null && imageUri !== undefined) {
                        setImageUri(imageUri)
                    }
                }
            }
        }).catch((error: any) => {
            // Handle errors here
            console.log(error)
        })
    }

    function sendText(prompt: string): void {
        const userChatModel: ChatModel = {
            isUser: true,
            text: prompt,
            image: '',
            type: MessageType.text
        }
        addNewChatIntoArray(userChatModel)
        setIsLoading(true)
        geminiHelper
            .getBotText(prompt)
            .then((botChatModel) => {
                setIsLoading(false)
                addNewChatIntoArray(botChatModel)
            })
            .catch((error) => {
                console.error('Error getting bot text:', error)
                setIsLoading(false)
            })
    }

    function sendImage(uri: string, prompt: string): void {
        RNFS.readFile(uri, 'base64')
            .then(async (base64String) => {
                const userChatModel: ChatModel = {
                    isUser: true,
                    text: prompt,
                    image: base64String,
                    type: prompt === '' ? MessageType.image : MessageType.imageWithText
                }
                addNewChatIntoArray(userChatModel)
                setIsLoading(true)
                const botChatModel = await geminiHelper.getBotTextFromImage(
                    base64String,
                    'image/jpeg',
                    prompt
                )
                setIsLoading(false)
                addNewChatIntoArray(botChatModel)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    return (
        <ImageBackground style={{ flex: 1 }} source={require('../../assets/ic_background.png')}>
            <CustomSafeAreaView>
                <SafeAreaProvider>
                    <View style={styles.container}>
                        <AppbarHeader
                            screenTitle={'Chatbot'}
                            backButtonTapped={backButtonTapped}
                            menuButtonTapped={menuButtonTapped}
                        />
                        <FlatList
                            ref={flatListRef}
                            data={chatList}
                            keyExtractor={(item: ChatModel, index) => index.toString()}
                            renderItem={({ item }) => <MessageView message={item} />}
                            onContentSizeChange={() => {
                                setTimeout(() => flatListRef.current?.scrollToEnd(), 0)
                            }}
                        />
                        <BottomSearchBar
                            searchText={searchText}
                            onChangeText={(text) => {
                                setText(text)
                            }}
                            sendButtonTapped={sendButtonTapped}
                            imageUri={imageUri}
                        />
                    </View>
                    <Loader isLoading={isLoading} />
                </SafeAreaProvider>
            </CustomSafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ChatScreen
