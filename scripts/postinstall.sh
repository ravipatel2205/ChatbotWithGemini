# sed -i 's/kotlinVersion = .*/kotlinVersion = '\''1.7.20'\''/' node_modules/react-native-background-upload/android/build.gradle
if [ "$(uname)" = "Darwin" ]; then
    # npx react-native setup-ios-permissions
    cd ios
    pod install
fi