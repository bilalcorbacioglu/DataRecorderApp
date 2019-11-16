import { createAppContainer, createStackNavigator } from 'react-navigation';

// grab navigation
import DrawerStack from './DrawerStack';
import History from '../screens/History';

// grab screens
import RecordDetail from '../screens/RecordDetail';
import ModalData from '../screens/ModalData';
import ModalSettings from '../screens/ModalSettings';

// grab modal routes (dynamic transitions)
import ModalRoutes from './ModalRoutes';

const StackNavigator = createStackNavigator(
  {
    DrawerStack,
    History,
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
    },
    RecordDetail: {
      screen: RecordDetail
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
