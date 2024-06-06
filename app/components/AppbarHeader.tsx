import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Appbar, Text, Menu } from 'react-native-paper'

interface AppbarHeaderProps {
    screenTitle: string
    backButtonTapped: () => void
    menuButtonTapped: (index: number) => void
}

const AppbarHeader: React.FC<AppbarHeaderProps> = ({
    screenTitle,
    backButtonTapped,
    menuButtonTapped
}) => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
    function menuTapped(index: number): void {
        setMenuOpen(false)
        menuButtonTapped(index)
    }

    return (
        <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={backButtonTapped} color="white" />
            <Appbar.Content title={<Text style={styles.titleStyle}>{screenTitle}</Text>} />
            <Menu
                visible={isMenuOpen}
                onDismiss={() => {
                    setMenuOpen(false)
                }}
                anchorPosition="bottom"
                anchor={
                    <Appbar.Action
                        icon={({ size, color }) => (
                            <Image
                                source={require('../../assets/ic_menu.png')}
                                style={{ width: size, height: size, tintColor: color }}
                            />
                        )}
                        color="white"
                        animated={false}
                        onPress={() => {
                            setMenuOpen(true)
                        }}
                    />
                }
            >
                <Menu.Item
                    onPress={() => {
                        menuTapped(0)
                    }}
                    title="Describe Image"
                />
            </Menu>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        height: 40
    },
    titleStyle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 23,
        fontWeight: '700',
        color: 'white'
    }
})

export default AppbarHeader
