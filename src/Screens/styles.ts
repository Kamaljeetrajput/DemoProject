import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: Platform.OS === 'android' ? 20 : 0
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        marginHorizontal:20
    },
    experienceItem: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginHorizontal:20
    },
    experienceTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    experienceYears: {
        fontSize: 14,
        color: '#666',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    captureButton: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 40,
        marginBottom: 16,
    },
    captureText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelText: {
        color: 'red',
        fontSize: 16,
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    loadedCamera: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 40
    }
});