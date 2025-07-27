import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import FoodStatusScreen from '../Screens/FoodStatusScreen';

export default function Routes() {
    const Stack = createNativeStackNavigator();



    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={navigationsStrings.FOOD_STATUS_SCREEN}
                    component={FoodStatusScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
