# CryptoLiveScreen (React Native)

A simple React Native screen that connects to the Binance WebSocket API to display live BTC/USDT price updates, with a real-time chart and color-coded price changes.

---

## Features
- **Live price updates** from Binance WebSocket API (`wss://stream.binance.com:9443/ws/btcusdt@trade`)
- **FlatList** of recent trades with timestamps
- **Color coding**: green for price increases, red for decreases
- **Live line chart** of recent price changes (using `react-native-chart-kit`)

---

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Install chart dependencies**
   ```sh
   npm install react-native-chart-kit react-native-svg
   # or
   yarn add react-native-chart-kit react-native-svg
   ```

4. **Run the app**
   - For iOS:
     ```sh
     npx react-native run-ios
     ```
   - For Android:
     ```sh
     npx react-native run-android
     ```

---

## Usage

- The `CryptoLiveScreen` component connects to Binance and displays live BTC/USDT trades.
- The top shows the latest price, followed by a live-updating line chart and a list of recent trades.
- Price increases are shown in green, decreases in red.

**To use in your app:**
1. Copy `CryptoLiveScreen.tsx` and its `styles.ts` to your project (e.g., `src/Screens/CryptoLiveScreen/`).
2. Add it to your navigation (if using React Navigation):
   ```js
   import CryptoLiveScreen from './Screens/CryptoLiveScreen/CryptoLiveScreen';
   // ...
   <Stack.Screen name="CryptoLive" component={CryptoLiveScreen} />
   ```

---

## Troubleshooting & Known Issues

- **Chart error: invalid number formatting character**
  - This happens if the chart receives `NaN`, `Infinity`, or empty data. The code now filters out invalid values and only renders the chart if there are enough valid points.
- **WebSocket not connecting**
  - Make sure your device/emulator has internet access.
- **react-native-svg not linked**
  - If you see errors about `react-native-svg`, try running `npx pod-install` (iOS) or rebuilding the app.
- **App not updating in real time**
  - Ensure you are on a real device or a properly configured emulator with network access.

---

## License
MIT
