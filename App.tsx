import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import RouteNavigation from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


export default function App() {

  return (
    <Provider store={store}>
      <RouteNavigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
