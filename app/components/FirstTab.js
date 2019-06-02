import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

renderRow = (label, name) => (
  <View style={styles.rowContainer}>
    <Text style={styles.rowLabel}>
      {label}
    </Text>
    <Text style={styles.rowName}>
      {name}
    </Text>
  </View>
);

const FirstTab = (props) => (
  <View style={[{ backgroundColor: '#efefef', flex: 1, paddingHorizontal: 8 }]} >
    <View style={styles.carNameRowContainer}>
      <View style={styles.carNameContainer}>
        <Text numberOfLines={1} style={styles.carNameText}>
          2016 Infiniti Q50
        </Text>
        <View style={styles.pdiContainer}>
          <View style={styles.circle} />
          <Text style={styles.pdiText}>
            PDI
          </Text>
        </View>
      </View>
      <Text style={styles.carColorText}>
        Space Grey
      </Text>
    </View>
    {renderRow("Stock Number", "T3523")}
    {renderRow("VIN", "SHA7623611")}
    {renderRow("State", "Stocked-in")}
    {renderRow("Received on", "Aug 24, 2018")}
  </View>
);

export default FirstTab;

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
  rowLabel: {
    color: "grey",
    fontSize: 14,
  },
  rowName: {
    color: "black",
    fontSize: 14,
    marginTop: 4,
  },
  carNameRowContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  carNameContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  carColorText: {
    color: "black",
    fontSize: 14,
  },
  carNameText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  pdiContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 4,
  },
  circle: {
    backgroundColor: 'red',
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  pdiText: {
    color: "black",
    fontSize: 14,
  }
});