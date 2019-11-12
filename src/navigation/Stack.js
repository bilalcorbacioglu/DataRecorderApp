import { createAppContainer, createStackNavigator } from 'react-navigation';

// grab navigation
import DrawerStack from './DrawerStack';

// grab screens
import ModalData from '../screens/ModalData';
import ModalSettings from '../screens/ModalSettings';

// grab modal routes (dynamic transitions)
import ModalRoutes from './ModalRoutes';

const StackNavigator = createStackNavigator(
  {
    DrawerStack,
    ModalData: {
      screen: ModalData,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ModalSettings: {
      screen: ModalSettings,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'DrawerStack',
    transitionConfig: ModalRoutes
  }
);

const App = createAppContainer(StackNavigator);

export default App;
