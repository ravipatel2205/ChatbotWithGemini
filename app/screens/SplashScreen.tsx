import { ImageBackground, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Navigation, type NavigationProps } from 'react-native-navigation'
import { name } from '../../app.json'
import { ChatlistRoot } from '../navigation'

const SplashScreen: React.FC<NavigationProps> = (props) => {
    useEffect(() => {
        setTimeout(() => {
            Navigation.setRoot(ChatlistRoot).catch((error) => {
                console.error('Error setting root:', error)
            })
        }, 2000)
    }, [])

    return (
        <ImageBackground
            style={styles.screenContainer}
            source={require('../../assets/ic_background.png')}
        >
            <Text style={styles.appName}>{name}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center'
    },
    appName: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: '10%'
    }
})

export default SplashScreen
