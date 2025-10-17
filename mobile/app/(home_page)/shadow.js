// shadow.js
import { Platform } from "react-native"

const iosShadow = (elevation, color = "#000") => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: elevation * 0.6 },
  shadowOpacity: 0.25,
  shadowRadius: elevation * 0.8,
})

const androidShadow = (elevation, color = "#000000ff") => ({
  elevation,
  shadowColor: color, // funciona melhor no Android 9+
})

export const shadows = {
  none: {},
  sm: Platform.select({
    ios: iosShadow(2),
    android: androidShadow(2),
  }),
  md: Platform.select({
    ios: iosShadow(4),
    android: androidShadow(4),
  }),
  lg: Platform.select({
    ios: iosShadow(8),
    android: androidShadow(8),
  }),
  xl: Platform.select({
    ios: iosShadow(12),
    android: androidShadow(12),
  }),
}
