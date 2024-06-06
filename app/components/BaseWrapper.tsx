import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native'

const BaseWrapper = (Component: any): any => {
    // eslint-disable-next-line react/display-name
    return (props: any): React.JSX.Element => {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <PaperProvider>
                    <StatusBar barStyle={'light-content'} />
                    <Component {...props} />
                </PaperProvider>
            </KeyboardAvoidingView>
        )
    }
}

export default BaseWrapper
