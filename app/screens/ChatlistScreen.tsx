import {
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Navigation, type NavigationProps } from 'react-native-navigation'
import { Button } from 'react-native-paper'
import { ChatRoot } from '../navigation'
import { dataBaseHelper } from '../DatabaseHelpers/DatabaseHelpers'
import { CHATLIST_SCREEN } from '../navigation/Navigation'
import { type ChatDBModel } from '../Models/ChatDBModel'
import HistoryView from '../components/HistoryView'
import CustomSafeAreaView from '../components/CustomSafeAreaView'

const ChatlistScreen: React.FC<NavigationProps> = (props) => {
    const [historyList, setHistoryList] = useState<ChatDBModel[]>([])

    useEffect(() => {
        const willFocusHandler = Navigation.events().registerComponentWillAppearListener(
            (component) => {
                if (component.componentName === CHATLIST_SCREEN) {
                    dataBaseHelper
                        .getAllHistory()
                        .then((historyList) => {
                            setHistoryList(historyList)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }
            }
        )
        return () => {
            willFocusHandler.remove()
        }
    }, [props.componentId])

    const addNewPromptPress = (): void => {
        const id = dataBaseHelper.generateRandomString()
        navigateToChatBot(id)
    }

    function navigateToChatBot(chatModelId: string): void {
        Navigation.push(props.componentId, ChatRoot({ chatModelId })).catch((error) => {
            console.error('Error pushing chat screen:', error)
        })
    }

    function historyTapped(history: ChatDBModel): void {
        navigateToChatBot(history.id)
    }

    return (
        <ImageBackground
            style={styles.screenContainer}
            source={require('../../assets/ic_background.png')}
        >
            <CustomSafeAreaView>
                <View style={styles.componantsContainer}>
                    <View style={styles.historyTextContainer}>
                        <Text style={styles.historyText}> History</Text>
                    </View>
                    <FlatList
                        data={historyList}
                        keyExtractor={(item: ChatDBModel, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    historyTapped(item)
                                }}
                            >
                                <HistoryView history={item} />
                            </TouchableOpacity>
                        )}
                    />
                    <Button mode="elevated" onPress={addNewPromptPress} style={styles.addNewPrompt}>
                        Add New Prompt
                    </Button>
                </View>
            </CustomSafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    addNewPrompt: {
        width: 200,
        height: 40,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: Dimensions.get('screen').width / 2 - 100
    },
    componantsContainer: {
        flex: 1
    },
    historyTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 40
    },
    historyText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    }
})

export default ChatlistScreen
