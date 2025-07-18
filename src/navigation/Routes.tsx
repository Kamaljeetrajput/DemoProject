import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import CryptoLiveScreen from '../Screens/CryptoLiveScreen/CryptoLiveScreen';

export default function Routes() {
    const Stack = createNativeStackNavigator();



    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={navigationsStrings.CRYPTO_SCREEN}
                    component={CryptoLiveScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
