import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './styles';

type Trade = {
    price: number;
    time: number;
};

const WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const CryptoLiveScreen = () => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [lastPrice, setLastPrice] = useState<number | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_URL);

        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const price = parseFloat(data.p);
            const time = data.T;
            setTrades((prev) => {
                const updated = [{ price, time }, ...prev];
                return updated.slice(0, 50);
            });
            setLastPrice((prev) => price);
        };

        ws.current.onerror = (e) => {
            console.log('WebSocket error:', e);
        };

        ws.current.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const getPriceColor = (price: number, index: number) => {
        if (index === trades.length - 1) return 'black';
        const prev = trades[index + 1]?.price;
        if (prev === undefined) return 'black';
        if (price > prev) return 'green';
        if (price < prev) return 'red';
        return 'black';
    };

    const pricePoints = trades
      .slice(0, 20)
      .reverse()
      .map((t) => t.price)
      .filter((n) => typeof n === 'number' && isFinite(n));

    const chartData = {
      labels: pricePoints.map((_, i) => ''),
      datasets: [
        {
          data: pricePoints.length > 0 ? pricePoints : [0],
        },
      ],
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>BTC/USDT Live Price</Text>
            <Text style={styles.price}>
                {trades[0]?.price ? trades[0].price.toLocaleString() : 'Loading...'}
            </Text>
            {pricePoints.length > 1 && (
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 32}
                height={180}
                yAxisLabel="$"
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                  labelColor: () => '#333',
                }}
                bezier
                style={styles.chart}
              />
            )}
            <FlatList
                data={trades}
                keyExtractor={(item, idx) => item.time.toString() + idx}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text
                            style={[
                                styles.tradePrice,
                                { color: getPriceColor(item.price, index) },
                            ]}
                        >
                            ${item.price}
                        </Text>
                        <Text style={styles.tradeTime}>
                            {new Date(item.time).toLocaleTimeString()}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Waiting for trades...</Text>}
            />
        </SafeAreaView>
    );
};



export default CryptoLiveScreen;