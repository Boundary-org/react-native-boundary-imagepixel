import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ImagePixel } from 'react-native-boundary-imagepixel'; // 라이브러리 import

export default function App() {
  return (
    <View style={styles.container}>
      <ImagePixel
        imageUri={require('./assets/test.png')}  // 이미지 파일 경로
        blockSize={10}  // 도트 블록 크기
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 1200,  // 이미지 너비
    height: 1200, // 이미지 높이
    resizeMode: 'contain', // 이미지 크기 조정 방식 (contain, cover 등)
  },
});
