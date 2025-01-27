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

<table>
  <tr>
    <td>Before Using Library</td>
    <td>After Using Library</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c9b3b189-5b3b-42a5-ad61-652d222c4eec" width="300" height="300" /></td>
    <td><img src="https://github.com/user-attachments/assets/6cd3c724-5613-470b-8ee9-084f4d2d5d28" width="300" height="300" /></td>
  </tr>
</table>



## [LICENSE]([https://github.com/Boundary-org/react-native-boundary-imagepixel/blob/main/LICENSE)
MIT © siniseong, Inc. 