import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        paddingTop:50
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    },
    chart: {
        marginBottom: 16,
        borderRadius: 8
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        marginBottom: 4,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
    },
    tradePrice: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    tradeTime: {
        fontSize: 14,
        color: '#666'
    },
});