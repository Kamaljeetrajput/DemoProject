# Demo React Native App

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Demo
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Install iOS/Android dependencies:**
   - For iOS:
     ```sh
     cd ios && pod install && cd ..
     ```
   - For Android: No extra steps required (dependencies are auto-linked).

4. **Run the app:**
   - For iOS:
     ```sh
     npx react-native run-ios
     ```
   - For Android:
     ```sh
     npx react-native run-android
     ```

## Libraries Used

- [`react-native-vision-camera`](https://github.com/mrousavy/react-native-vision-camera): Camera access and photo capture
- [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage): Persistent storage
- [`@react-navigation/native`](https://reactnavigation.org/): Navigation
- [`react-native-haptic-feedback`](https://github.com/mkuczera/react-native-haptic-feedback): Haptic feedback for user interactions
- [`@react-native-community/geolocation`](https://github.com/react-native-geolocation/react-native-geolocation): Geolocation services
- [`react-native-permissions`](https://github.com/zoontek/react-native-permissions): Permission handling

## Known Issues

- **Camera/Location Permissions:**
  - The app requires camera and location permissions. If denied, some features will not work.
- **Haptic Feedback:**
  - Haptic feedback strength and support may vary by device and OS version.
- **Animations:**
  - Entry and transition animations use the built-in Animated API. Performance may vary on low-end devices.
- **Android/iOS Differences:**
  - Some UI or permission behaviors may differ slightly between platforms.

## Notes
- Make sure to test on a real device for camera, haptics, and geolocation features.
- If you encounter issues with native modules, try cleaning the build and reinstalling pods (for iOS).

---

### Why does `pod install` take long?

1. **First-time setup:** The initial run downloads all dependencies and their sources, which can be several hundred MB.
2. **Network speed:** Slow or unstable internet will make downloads much slower.
3. **CocoaPods CDN:** Sometimes the CocoaPods trunk or CDN is slow or under heavy load.
4. **Large/Many dependencies:** More native modules = more pods to fetch and build.
5. **Outdated CocoaPods:** Older versions can be slower or less efficient.

---

### Tips to Speed Up or Troubleshoot

1. **Update CocoaPods:**
   ```sh
   sudo gem install cocoapods
   pod repo update
   ```

2. **Use CDN for Specs (default in recent CocoaPods):**
   - If your `Podfile` uses `source 'https://cdn.cocoapods.org/'`, you’re already using the CDN, which is faster than the old trunk.

3. **Clean and Retry:**
   ```sh
   rm -rf Pods Podfile.lock
   pod cache clean --all
   pod install
   ```

4. **Check Your Internet Connection:**  
   Make sure your connection is stable and fast.

5. **Run with Verbose Output:**  
   This can help you see where it’s slow:
   ```sh
   pod install --verbose
   ```

6. **Use a Ruby Version Manager:**  
   Sometimes system Ruby causes issues. Use [rbenv](https://github.com/rbenv/rbenv) or [rvm](https://rvm.io/).

7. **Try a Mirror (Advanced):**  
   If CDN is slow in your region, you can try a mirror (not officially supported, but sometimes helps in China/India).

---

### Good News

- **Subsequent runs are much faster** because dependencies are cached locally.
- You only need to run `pod install` again if you add/remove native dependencies or after a `git clean`.

---

If you’re stuck for more than 10-15 minutes, try the above steps or check your network. If you see specific errors, let me know and I can help debug!
