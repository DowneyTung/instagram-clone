import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Button } from 'react-native'
import { View, Text } from 'react-native'

export default function Landing({ navigation }) {
 return (
  <View style={{ flex: 1, justifyContent: 'center' }}>
   <Button
    title="Register"
    onPress={() => navigation.navigate("Register")}
   />
   <Button
    title="Login"
    onPress={() => navigation.navigate("Login")}
   />
   <Text></Text>
  </View>
 )
}
