import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function map() {
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
