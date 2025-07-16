import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import ProfileScreen from '../Screens/ProfileScreen';

export default function Routes() {
    const Stack = createNativeStackNavigator();



    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={navigationsStrings.PROFILE_SCREEN}
                    component={ProfileScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
