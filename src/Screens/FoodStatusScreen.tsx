import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import { styles } from './FoodStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const STAGES = [
    'Order Received',
    'Preparing',
    'Out for Delivery',
    'Delivered',
];

const STAGE_DURATION = 5;

const getRandomCoords = () => ({
    left: 40 + Math.random() * 120,
    top: 30 + Math.random() * 60,
});

const FoodStatusScreen = () => {
    const [stage, setStage] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(STAGE_DURATION);
    const [coords, setCoords] = useState(getRandomCoords());
    const progress = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (stage >= STAGES.length - 1) return;

        setSecondsLeft(STAGE_DURATION);
        progress.setValue(1);

        const interval = setInterval(() => {
            setSecondsLeft((s) => {
                if (s <= 1) {
                    setStage((prev) => prev + 1);
                    return STAGE_DURATION;
                }
                return s - 1;
            });
        }, 1000);

        Animated.timing(progress, {
            toValue: 0,
            duration: STAGE_DURATION * 1000,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start();

        const movePin = setInterval(() => {
            setCoords(getRandomCoords());
        }, 2000);

        return () => {
            clearInterval(interval);
            clearInterval(movePin);
        };
    }, [stage]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Order Status</Text>
            <View style={styles.statusContainer}>
                {STAGES.map((s, i) => (
                    <View key={s} style={styles.stageRow}>
                        <View
                            style={[
                                styles.circle,
                                i < stage
                                    ? styles.done
                                    : i === stage
                                        ? styles.active
                                        : styles.inactive,
                            ]}
                        >
                            <Text style={styles.circleText}>{i + 1}</Text>
                        </View>
                        <Text
                            style={[
                                styles.stageText,
                                i === stage && styles.activeText,
                                i < stage && styles.doneText,
                            ]}
                        >
                            {s}
                        </Text>
                    </View>
                ))}
            </View>
            {stage < STAGES.length - 1 && (
                <>
                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                {
                                    width: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%'],
                                    }),
                                },
                            ]}
                        />
                    </View>
                    <Text style={styles.countdown}>
                        Next stage in {secondsLeft}s
                    </Text>
                </>
            )}
            <View style={styles.mapContainer}>
                <View style={styles.fakeMap}>
                    <View
                        style={[
                            styles.pin,
                            coords,
                        ]}
                    />
                    <Text style={{ color: '#888', marginTop: 60 }}>Map View (Simulated)</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};



export default FoodStatusScreen; 