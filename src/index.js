const DotImageRenderer = ({ imageUri, blockSize = 10 }) => {
  const [image, setImage] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      const loadImage = async () => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUri;
        img.onload = () => {
          setImage(img);
          
          setCanvasSize({ width: img.width, height: img.height });

          const canvas = canvasRef.current;
          if (!canvas) return;

          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;

          context.drawImage(img, 0, 0);

          const adjustedBlockSize = Math.floor(img.width / Math.ceil(img.width / blockSize));

          for (let y = 0; y < img.height; y += blockSize) {
            for (let x = 0; x < img.width; x += adjustedBlockSize) {
              const pixel = context.getImageData(x, y, 1, 1).data;
              context.fillStyle = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
              context.fillRect(x, y, adjustedBlockSize, blockSize);
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
        <canvas ref={canvasRef} style={{ ...styles.canvas, width: canvasSize.width, height: canvasSize.height }} />
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
          
          setCanvasSize({ width: skiaImage.width, height: skiaImage.height });
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

      const adjustedBlockSize = Math.floor(width / Math.ceil(width / blockSize));

      if (pixels) {
        canvas.clear();  
        for (let y = 0; y < height; y += blockSize) {
          for (let x = 0; x < width; x += adjustedBlockSize) {
            const pixelIndex = (y * width + x) * 4;
            const r = pixels[pixelIndex];
            const g = pixels[pixelIndex + 1];
            const b = pixels[pixelIndex + 2];
            const a = pixels[pixelIndex + 3] / 255;

            const paint = new Paint();
            paint.setColor(Skia.Color(r, g, b, a));
            canvas.drawRect(
              Skia.Rect.MakeXYWH(x, y, adjustedBlockSize, blockSize),
              paint
            );
          }
        }
      }
    }
  }, [skiaCanvasRef, image, blockSize]);

  return (
    <SkiaCanvas
      ref={skiaCanvasRef}
      style={{ width: canvasSize.width, height: canvasSize.height }}
    />
  );
};
