import React, { Suspense, lazy } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native'

const Stack = createStackNavigator()

// Lazy load screens
const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const QuizScreen = lazy(() => import('./screens/QuizScreen'))
const ResultScreen = lazy(() => import('./screens/ResultScreen'))

const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
)

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Suspense fallback={<LoadingIndicator />}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  )
}

export default AppNavigator
