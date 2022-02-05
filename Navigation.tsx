import { useRecoilValue } from 'recoil';
import BottomTabs from './components/BottomTabs';
import LoginScreen from './screens/LoginScreen';
import { userState } from './atoms/userState';

export default function Navigation() {
  const user = useRecoilValue(userState);
  let mainContent: React.ReactNode = null;
  if (!user) {
    mainContent = <LoginScreen />;
  } else if (user) {
    mainContent = <BottomTabs />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{mainContent}</>;
}
