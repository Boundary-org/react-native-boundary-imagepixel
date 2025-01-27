import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Skia, Canvas, useCanvasRef } from "@shopify/react-native-skia";

const extractPixels = (imageUri, callback) => {
  const canvasRef = useCanvasRef();

  useEffect(() => {
    if (canvasRef.current && imageUri) {
      const image = Skia.Image.MakeFromEncoded(require(imageUri));
      if (image) {
        const pixels = image.readPixels(); 
        callback(pixels);
      } else {
        console.error("Failed to load image.");
      }
    }
  }, [canvasRef, imageUri]);

  return (
    <Canvas ref={canvasRef} style={styles.canvas}>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: 300,
    height: 300,
  },
});

export default extractPixels;
