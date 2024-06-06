import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
export default function CustomSafeAreaView(props: any): React.JSX.Element {
    const [insets, setInsets] = useState({
        bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
        top: StaticSafeAreaInsets.safeAreaInsetsTop
    })
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            StaticSafeAreaInsets.getSafeAreaInsets((values) => {
                setInsets({
                    bottom: values.safeAreaInsetsBottom,
                    top: values.safeAreaInsetsTop
                })
            })
        })
        return () => {
            subscription.remove()
        }
    })
    return (
        <View
            {...props}
            style={{
                ...props.style,
                flex: 1,
                marginBottom: insets.bottom,
                marginTop: insets.top
            }}
        >
            {props.children}
        </View>
    )
}
