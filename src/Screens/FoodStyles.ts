import { StyleSheet } from "react-native";





export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    statusContainer: {
        marginBottom: 30
    },
    stageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 2,
    },
    circleText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    active: {
        backgroundColor: '#007bff',
        borderColor: '#007bff'
    },
    done: {
        backgroundColor: '#28a745',
        borderColor: '#28a745'
    },
    inactive: {
        backgroundColor: '#ccc',
        borderColor: '#ccc'
    },
    stageText: {
        fontSize: 16
    },
    activeText: {
        color: '#007bff',
        fontWeight: 'bold'
    },
    doneText: {
        color: '#28a745'
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    countdown: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#555'
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fakeMap: {
        width: 250,
        height: 150,
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pin: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#ff4136',
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff',
    },
});