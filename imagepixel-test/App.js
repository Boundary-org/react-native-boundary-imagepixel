import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DotImageRenderer from 'react-native-boundary-imagepixel';

export default function App() {
  const imageSource = require('./assets/test.jpg');

  return (
    <View style={styles.container}>
      <DotImageRenderer
        imageUri={Platform.OS === 'web' ? imageSource.uri : imageSource}
        blockSize={20}
        mode="react-native"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
