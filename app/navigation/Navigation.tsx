import SplashScreen from '../screens/SplashScreen'
import ChatlistScreen from '../screens/ChatlistScreen'
import ChatScreen from '../screens/ChatScreen'

export const SPLASH_SCREEN = 'Splash'
export const CHATLIST_SCREEN = 'Chatlist'
export const CHAT_SCREEN = 'Chat'

export const Screens = new Map()

Screens.set(SPLASH_SCREEN, SplashScreen)
Screens.set(CHATLIST_SCREEN, ChatlistScreen)
Screens.set(CHAT_SCREEN, ChatScreen)
