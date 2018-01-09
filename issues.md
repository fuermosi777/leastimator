1. TransformError: https://github.com/goatslacker/alt/issues/558

Cause: react-cursor

Solution: delete `.babelrc` file in react-cursor

2. ListView doesn't show until scroll: https://github.com/facebook/react-native/issues/1831

Cause: unknown

Solution: use `initialListSize`

3. Realm crash:

Cause: unknown

Solution: put all realm instances in "instructor"

4. Unable to resolve module `react/lib/ReactComponentTreeHook` from `/Users/hao/workspace/leastimator/node_modules/react-native/Libraries/Performance/Systrace.js`

Use RN 0.43.3, remove "^" before react and react-native, 

`npm start`

5. Android fail

`adb reverse tcp:8081 tcp:8081`

6. ios No bundle url present

`lsof -i :8081`
`kill -9 <PID>`

# TODO

- Line chart when there is only one odometer reading
- Update line chart when adding new odometer reading
~~- Enable notification in settings~~
- Add popup to ask user to add odometer reading if last reading is more than 7 days ago

# PUBLISH ANDROID [guide](https://facebook.github.io/react-native/docs/signed-apk-android.html)

Change verison code: _android/app/build.gradle_

https://stackoverflow.com/questions/35924721/how-to-update-version-number-of-react-native-app

Generate APK

`cd android && ./gradlew assembleRelease && cd ..`

TEST APK

`react-native run-android --variant=release`

# DON'T UPGRADE

It's unnessary.