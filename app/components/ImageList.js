import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import Images from "../assets/images";

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
}

class ImageList extends React.Component {

  renderCarItem = (item) => {
    const { image } = item;

    let marginStyle;
    if (Platform.OS === 'ios') {
      marginStyle = { marginVertical: 2 };
    } else {
      marginStyle = { marginBottom: 4 };
    }

    return (
      <View style={[styles.carItemContainer, marginStyle]}>
        <Image
          style={styles.carItemImage}
          source={(image && image.length !== 0) ? { uri: image } : null}
        />
      </View>
    );
  };

  renderFloatingButton = () => (
    <TouchableWithoutFeedback onPress={this.props.onListClose}>
      <View style={styles.floatingButton}>
        <Image
          style={styles.floatingButtonImage}
          source={Images.infoIcon}
        />
      </View>
    </TouchableWithoutFeedback>
  )

  renderCarList = (cars) => (
    <View style={styles.carListContainer}>
      <FlatList
        data={cars}
        renderItem={({ item }) => {
          return this.renderCarItem(item);
        }}
        keyExtractor={item => item.id}
        ref={(ref) => { this.list = ref; }}
      />
      {this.renderFloatingButton()}
    </View>
  );

  render() {
    const { cars } = this.props;
    return this.renderCarList(cars);
  }
}

export default ImageList;

ImageList.propTypes = {
  cars: PropTypes.array,
  onListClose: PropTypes.func
};

const styles = StyleSheet.create({
  carItemContainer: {
    flex: 1,
  },
  carItemImage: {
    height: Screen.width * 0.8,
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  floatingButtonImage: { width: 16 },
  carListContainer: {
    flex: 1,
  }
});


