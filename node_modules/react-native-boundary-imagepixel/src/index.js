import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

const DotImageRenderer = ({ imageUri, blockSize = 10 }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (imageUri) {
      const img = new Image();
      img.src = imageUri;
      img.onload = () => setImage(img);
      img.onerror = (err) => console.error('Image loading failed:', err);
    }
  }, [imageUri]);

  const renderDots = (ctx, img, blockSize) => {
    const width = img.width;
    const height = img.height;

    ctx.clearRect(0, 0, width, height);
    for (let y = 0; y < height; y += blockSize) {
      for (let x = 0; x < width; x += blockSize) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];
        const a = pixel[3] / 255;

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fillRect(x, y, blockSize, blockSize);
      }
    }
  };

  return (
    <View style={styles.container}>
      {image && (
        <canvas
          ref={(canvas) => {
            if (canvas && image) {
              const ctx = canvas.getContext('2d');
              canvas.width = image.width;
              canvas.height = image.height;

              ctx.drawImage(image, 0, 0);
              renderDots(ctx, image, blockSize);
            }
          }}
          style={styles.canvas}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  canvas: {
    width: 300,
    height: 300,
  },
});

export default DotImageRenderer;
