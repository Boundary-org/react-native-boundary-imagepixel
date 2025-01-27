import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import DotImageRenderer from 'react-native-boundary-imagepixel';

export default function App() {
  const imageSource = require('./assets/test.png'); 

  return (
    <View style={styles.container}>
      <DotImageRenderer
        // Use 'uri' for expo web and local image path as 'require' for native environment.
        imageUri={Platform.OS === 'web' ? imageSource.uri : imageSource}
        blockSize={10}
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
