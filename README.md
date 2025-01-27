## [react-native-boundary-imagepixel](https://www.npmjs.com/package/react-native-boundary-imagepixel)
This library is an npm library that converts images from native to pixel images.

## Installation
    npm install react-native-imagepixel

The solution is implemented in JavaScript and does not require a default module link.

## Usage
In addition to developing expo with Android and iOS, this library also requires additional platform settings to run expo on the web.

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

## Test Image

| Before Using Library | After Using Library |
|:--------------------:|:-------------------:|
| ![Before Using Library](https://github.com/user-attachments/assets/45088720-24d8-4ae0-931e-66cfcf60c86d =300x300) | ![After Using Library](https://github.com/user-attachments/assets/dd096c19-c684-4f4c-9f67-312a903cf331 =300x300) |


## [LICENSE]([https://github.com/Boundary-org/react-native-boundary-imagepixel/blob/main/LICENSE)
MIT © siniseong, Inc. 