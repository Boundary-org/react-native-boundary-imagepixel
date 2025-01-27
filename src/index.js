import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Platform } from "react-native";

let Skia, SkiaCanvas, useCanvasRef, Paint;
if (Platform.OS !== "web") {
  ({ Skia, Canvas: SkiaCanvas, useCanvasRef, Paint } = require("@shopify/react-native-skia"));
}

const DotImageRenderer = ({ imageUri, blockSize = 10 }) => {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      const loadImage = async () => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUri;
        img.onload = () => {
          setImage(img);
          
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;

          context.drawImage(img, 0, 0);

          for (let y = 0; y < img.height; y += blockSize) {
            for (let x = 0; x < img.width; x += blockSize) {
              const pixel = context.getImageData(x, y, 1, 1).data;
              context.fillStyle = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
              context.fillRect(x, y, blockSize, blockSize);
            }
          }
        };
      };

      loadImage();
    }
  }, [imageUri, blockSize]);

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <canvas ref={canvasRef} style={styles.canvas} />
      </View>
    );
  }

  const skiaCanvasRef = useCanvasRef();
  
  useEffect(() => {
    if (Platform.OS !== "web") {
      const loadSkiaImage = async () => {
        try {
          const skiaImage = await Skia.Image.fromURL(imageUri);
          setImage(skiaImage);
        } catch (error) {
          console.error("Failed to load image:", error);
        }
      };

      loadSkiaImage();
    }
  }, [imageUri]);

  useEffect(() => {
    if (Platform.OS !== "web" && skiaCanvasRef.current && image) {
      const canvas = skiaCanvasRef.current.getContext();
      const { width, height } = image;
      const pixels = image.readPixels();
      
      if (pixels) {
        canvas.clear();  
        
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
  }, [skiaCanvasRef, image, blockSize]);

  return <SkiaCanvas ref={skiaCanvasRef} style={styles.canvas} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    width: 300,
    height: 300,
  },
});

export default DotImageRenderer;