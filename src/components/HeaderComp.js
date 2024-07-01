import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const HeaderComp = ({onPress}) => {
    const navigation = useNavigation();
  return (
    <Pressable style={{margin:10}} onPress={onPress}>
      <Ionicons name='arrow-back' color={'black'} size={26} />
    </Pressable>
  )
}

export default HeaderComp