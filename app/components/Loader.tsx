import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

interface LoaderProps {
    isLoading: boolean
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    return (
        <Modal visible={isLoading} transparent={true} animationType={'fade'}>
            <View style={styles.modalBackground}>
                <ActivityIndicator animating={true} color="white" size={'large'} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)' // semi-transparent background
    }
})

export default Loader
