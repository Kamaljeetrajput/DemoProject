import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Alert,
    ActivityIndicator,
    Animated,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import imagepath from '../constants/imagepath';
import { styles } from './styles';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../utils/permission';
import * as Haptics from 'react-native-haptic-feedback';

const ASYNC_KEY = 'PROFILE_IMAGE_URI';

const user = {
    name: 'John Doe',
};

const experiences = [
    { id: '1', title: 'Software Engineer at ABC Corp', years: '2019-2022' },
    { id: '2', title: 'Frontend Developer at XYZ Ltd', years: '2017-2019' },
    { id: '3', title: 'Intern at Example Inc', years: '2016-2017' },
];


const ProfileScreen = () => {
    const [profileImage, setProfileImage] = useState<any>(imagepath.profileLogo);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const cameraRef = useRef<Camera>(null);
    const isFocused = useIsFocused();
    const device = useCameraDevice('front');

    const profileScale = useRef(new Animated.Value(1)).current;
    const captureScale = useRef(new Animated.Value(1)).current;


    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const data = await AsyncStorage.getItem(ASYNC_KEY);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.image) {
                        setProfileImage({ uri: parsed.image });
                    }
                } catch (e) {
                    setProfileImage(imagepath.profileLogo);
                }
            } else {
                setProfileImage(imagepath.profileLogo);
            }
        })();
    }, []);

    const handleImagePress = () => {
        Haptics.trigger('impactHeavy');
        Animated.sequence([
            Animated.timing(profileScale, {
                toValue: 0.85,
                duration: 80,
                useNativeDriver: true,
            }),
            Animated.timing(profileScale, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start();
        if (!hasPermission) {
            Alert.alert('Camera permission not granted');
            return;
        }
        setCameraVisible(true);
    };

    const handleCapture = async () => {
        Haptics.trigger('impactHeavy');
        Animated.sequence([
            Animated.timing(captureScale, {
                toValue: 0.85,
                duration: 80,
                useNativeDriver: true,
            }),
            Animated.timing(captureScale, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start();
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePhoto();
            const uri = 'file://' + photo.path;
            const granted = await requestLocationPermission();
            if (!granted) {
                Alert.alert('Permission denied', 'Location permission is required.');
                setCameraVisible(false);
                return;
            }
            setIsFetchingLocation(true);
            Geolocation.getCurrentPosition(
                async (position) => {
                    setIsFetchingLocation(false);
                    const { latitude, longitude } = position.coords;
                    const dataToStore = {
                        image: uri,
                        location: { latitude, longitude },
                        experiences,
                    };
                    await AsyncStorage.setItem(ASYNC_KEY, JSON.stringify(dataToStore));
                    setProfileImage({ uri });
                    setCameraVisible(false);
                    Haptics.trigger('notificationError');
                },
                (error) => {
                    setIsFetchingLocation(false);
                    Alert.alert('Error', error.message);
                    setCameraVisible(false);
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
            );
        } catch (e) {
            setIsFetchingLocation(false);
            Alert.alert('Error', 'Failed to capture image.');
            setCameraVisible(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileSection}>
                <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
                    <Animated.Image
                        source={profileImage}
                        style={[styles.profileImage, { transform: [{ scale: profileScale }] }]}
                    />
                </TouchableOpacity>
                <Text style={styles.userName}>{user.name}</Text>
            </View>

            <Text style={styles.sectionTitle}>Experiences</Text>
            <FlatList
                data={experiences}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.experienceItem}>
                        <Text style={styles.experienceTitle}>{item.title}</Text>
                        <Text style={styles.experienceYears}>{item.years}</Text>
                    </View>
                )}
            />

            <Modal visible={cameraVisible} animationType="slide" onRequestClose={() => setCameraVisible(false)}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                    {device != null && isFocused ? (
                        <>
                            <Camera
                                style={{ flex: 1 }}
                                device={device}
                                isActive={cameraVisible}
                                photo={true}
                                ref={cameraRef}
                            />
                            {isFetchingLocation && (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#fff" />
                                    <Text style={{ color: '#fff', marginTop: 10 }}>Fetching your location...</Text>
                                </View>
                            )}
                        </>
                    ) : (
                        <Text style={styles.loadedCamera}>Loading Camera...</Text>
                    )}
                    <View style={styles.cameraControls}>
                        <Animated.View style={{ transform: [{ scale: captureScale }] }}>
                            <TouchableOpacity onPress={handleCapture} style={styles.captureButton} activeOpacity={0.8}>
                                <Text style={styles.captureText}>Capture</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <TouchableOpacity onPress={() => setCameraVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};
export default ProfileScreen;
