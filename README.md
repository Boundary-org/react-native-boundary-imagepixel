## [react-native-boundary-imagepixel](https://www.npmjs.com/package/react-native-boundary-imagepixel)
This library is an npm library that converts images from native to pixel images.

## Installation
    npm install react-native-imagepixel

The solution is implemented in JavaScript and does not require a default module link.

## Usage
This library is currently available when you run it from expo web to web. The code below is an example code.

``` javascript
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

```
## You try this library

If you want to test it in this repository
    git clone https://github.com/Boundary-org/react-native-boundary-imagepixel.git
    cd imagepixel-test
    npm install
    npx expo start

## [LICENSE]([https://github.com/Boundary-org/react-native-boundary-imagepixel/blob/main/LICENSE)
MIT © siniseong, Inc. 