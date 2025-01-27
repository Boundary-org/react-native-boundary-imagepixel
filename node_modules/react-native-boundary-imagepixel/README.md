## react-native-boundary-imagepixel
This library is an npm library that converts images from native to pixel images.

## Installation
    npm install react-native-imagepixel

The solution is implemented in JavaScript and does not require a default module link.

## Usage
```
import React from "react";
import { View } from "react-native";
import imagepixel from "react-native-boundary-imagepixel"; 

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <imagepixel 
        imageUri="./assets/test.png" 
        blockSize={20} 
      />
    </View>
  );
};

export default App;
```

