import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GopQuyScreen from './src/screens/GopQuyScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <GopQuyScreen />
    </SafeAreaProvider>
  );
}
