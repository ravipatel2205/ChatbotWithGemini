/**
 * @format
 */
import { Screens } from './app/navigation/Navigation.tsx' // './app/screens'
import { Navigation } from 'react-native-navigation'
import { SplashRoot } from './app/navigation'
import BaseWrapper from './app/components/BaseWrapper'

Screens.forEach((ScreenComponent, key) =>
    Navigation.registerComponent(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        key,
        () => BaseWrapper(ScreenComponent)
    )
)
Navigation.events().registerAppLaunchedListener(() => {
    void Navigation.setRoot(SplashRoot)
})
Navigation.setDefaultOptions({
    animations: {
        setRoot: {
            waitForRender: true
        },
        push: {
            waitForRender: true
        }
    }
})
