import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

interface BottomSearchBarProps {
    searchText: string
    onChangeText: (text: string) => void
    sendButtonTapped: () => void
    imageUri: string
}

const BottomSearchBar: React.FC<BottomSearchBarProps> = ({
    searchText,
    onChangeText,
    sendButtonTapped,
    imageUri
}) => {
    const [isImageSelected, setIsImageSelected] = useState<boolean>(false)
    useEffect(() => {
        if (imageUri.trim() !== '') {
            setIsImageSelected(true)
        } else {
            setIsImageSelected(false)
        }
    })

    return (
        <View style={styles.textInputContainer}>
            <TextInput
                placeholder="Enter Pompt"
                value={searchText}
                mode="outlined"
                textColor="white"
                placeholderTextColor="white"
                outlineColor="white"
                activeOutlineColor="white"
                onChangeText={onChangeText}
                style={styles.textFiled}
            />
            {isImageSelected && (
                <Image
                    source={{ uri: imageUri !== '' ? imageUri : undefined }}
                    style={styles.image}
                />
            )}
            <Button
                mode="contained"
                onPress={sendButtonTapped}
                buttonColor="white"
                textColor="blue"
                style={styles.sendButton}
            >
                Send
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        height: 50,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 30
    },
    textFiled: {
        flex: 1,
        marginRight: 10,
        height: 40,
        backgroundColor: 'transparent'
    },
    sendButton: {
        width: 85,
        height: 40
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        marginRight: 10
    }
})

export default BottomSearchBar
