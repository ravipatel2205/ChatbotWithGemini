import { SPLASH_SCREEN, CHATLIST_SCREEN, CHAT_SCREEN } from './Navigation'

export const SplashRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: SPLASH_SCREEN,
                        options: {
                            topBar: { visible: false }
                        }
                    }
                }
            ]
        }
    }
}
export const ChatlistRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: CHATLIST_SCREEN,
                        options: {
                            topBar: { visible: false }
                        }
                    }
                }
            ]
        }
    }
}

interface ChatRootReturnType {
    component: {
        name: string
        passProps: {
            chatModelId: string
        }
        options: {
            topBar: { visible: boolean }
        }
    }
}

export const ChatRoot = (props: { chatModelId: string }): ChatRootReturnType => ({
    component: {
        name: CHAT_SCREEN,
        passProps: {
            chatModelId: props.chatModelId
        },
        options: {
            topBar: { visible: false }
        }
    }
})
