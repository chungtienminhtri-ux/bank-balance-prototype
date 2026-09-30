import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GopQuyScreen from './src/screens/GopQuyScreen';
import LauncherScreen, { ScreenId } from './src/screens/LauncherScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Bản web publish có thể mở thẳng một màn qua window.__START_SCREEN.
const START = ((globalThis as { __START_SCREEN?: ScreenId }).__START_SCREEN ?? 'launcher') as ScreenId;

export default function App() {
  const [screen, setScreen] = useState<ScreenId>(START);
  const home = () => setScreen('launcher');
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {screen === 'gop-quy' ? (
        <GopQuyScreen onBack={home} />
      ) : screen === 'profile' || screen === 'profile-qr-corner' || screen === 'profile-qr-pill' ? (
        <ProfileScreen
          key={screen}
          qrEntry={screen === 'profile' ? 'tile' : screen === 'profile-qr-corner' ? 'corner' : 'pill'}
          onNavigate={(t) => t === 'home' && home()}
        />
      ) : (
        <LauncherScreen onOpen={setScreen} />
      )}
    </SafeAreaProvider>
  );
}
