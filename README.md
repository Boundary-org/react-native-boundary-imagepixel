## React-Native-imagepixel
이 라이브러리는 이미지를 픽셀 이미지로 바꿔주는 라이브러리입니다. 

## 설치
    npm install react-native-imagepixel

해당 솔루션은 JavaScript로 구현되므로 기본 모듈 링크가 필요하지 않습니다.

## 사용 방법
```
import React from "react";
import { View } from "react-native";
import imagepixel from "react-native-imagepixel"; 

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

