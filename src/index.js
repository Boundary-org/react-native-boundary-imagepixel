import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Skia, Canvas, useCanvasRef, Paint } from "@shopify/react-native-skia";

const DotImageRenderer = ({ imageUri, blockSize = 10 }) => {
  const canvasRef = useCanvasRef();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (imageUri) {
      const loadedImage = Skia.Image.MakeFromEncoded(require(imageUri));
      if (loadedImage) {
        setImage(loadedImage);
      } else {
        console.error("Failed to load image.");
      }
    }
  }, [imageUri]);

  useEffect(() => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current.getContext();
      const { width, height } = image;

      const pixels = image.readPixels();
      if (pixels) {
        for (let y = 0; y < height; y += blockSize) {
          for (let x = 0; x < width; x += blockSize) {
            const pixelIndex = (y * width + x) * 4;
            const r = pixels[pixelIndex];
            const g = pixels[pixelIndex + 1];
            const b = pixels[pixelIndex + 2];
            const a = pixels[pixelIndex + 3] / 255;

            const paint = new Paint();
            paint.setColor(Skia.Color(r, g, b, a));
            canvas.drawRect(
              Skia.Rect.MakeXYWH(x, y, blockSize, blockSize),
              paint
            );
          }
        }
      }
    }
  }, [canvasRef, image, blockSize]);

  return <Canvas ref={canvasRef} style={styles.canvas} />;
};

const styles = StyleSheet.create({
  canvas: {
    width: 300,
    height: 300,
  },
});

export default DotImageRenderer;