import { createDrawerNavigator } from 'react-navigation';

// grab screens
import Home from '../screens/Home';
import History from '../screens/History';
import CustomDrawerContent from '../components/CustomDrawerContent';

const DrawerStack = createDrawerNavigator(
  {
    Home,
    History
  },
  {
    contentComponent: CustomDrawerContent,
    headerMode: 'none',
    hideStatusBar: true
  }
);

export default DrawerStack;
