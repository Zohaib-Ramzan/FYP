import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BoundingBox({ prediction }) {
  const { top, left, width, height } = prediction.bbox;
  const { class: className, score } = prediction;

  return (
    <View style={[styles.bbox, { top, left, width, height }]}>
      <Text style={styles.text}>
        {className}: {Math.round(score * 100)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bbox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'red',
    backgroundColor: 'white',
  },
});

export default BoundingBox;