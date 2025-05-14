import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import './global.css';

import HomeScreen from 'screens/HomeScreen';
import ItemsScreen from 'screens/item/ItemsScreen';
import OutfitsScreen from 'screens/outfit/OutfitsScreen';
import ProfileScreen from 'screens/auth/ProfileScreen';
import ItemOverviewScreen from 'screens/item/ItemOverviewScreen';
import OutfitOverviewScreen from 'screens/outfit/OutfitOverviewScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';

const ItemStack = createStackNavigator();
const OutfitStack = createStackNavigator();

const MainTabs = createBottomTabNavigator()
const AuthenticationStack = createStackNavigator()

const isAuthenticated = true;

function ItemStackNavigator() {
  return (
    <ItemStack.Navigator>
      <ItemStack.Screen name='Items' component={ItemsScreen} options={{ headerTitle: "Your Items" }} />
      <ItemStack.Screen name='ItemOverview' component={ItemOverviewScreen} options={{ headerTitle: "Item Overview" }} />
    </ItemStack.Navigator>
  )
}

function OutfitStackNavigator() {
  return(
    <OutfitStack.Navigator>
      <OutfitStack.Screen name="Outfits" component={OutfitsScreen} options={{ headerTitle: "Your Outfits" }} />
      <OutfitStack.Screen name='OutfitOverview' component={OutfitOverviewScreen} options={{ headerTitle: "Outfit Overview" }} />
    </OutfitStack.Navigator>
  )
}

function AuthenticationStackNavigator() {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <AuthenticationStack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
    </AuthenticationStack.Navigator>
  )
}

function MainTabNavigator() {
  return (
      <MainTabs.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Items') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            } else if (route.name === 'Outfits') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        >
        <MainTabs.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Home' }} />
        <MainTabs.Screen name="Items" component={ItemStackNavigator} options={{ headerShown: false, tabBarLabel: 'Items' }} />
        <MainTabs.Screen name="Outfits" component={OutfitStackNavigator} options={{ headerShown: false, tabBarLabel: 'Outfits' }} />
        <MainTabs.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, tabBarLabel: 'Profile' }} />
      </MainTabs.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      { isAuthenticated ? <MainTabNavigator /> : <AuthenticationStackNavigator /> }
    </NavigationContainer>
  );
}
