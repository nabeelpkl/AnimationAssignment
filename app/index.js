import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
} from 'react-native';
import Interactable from 'react-native-interactable';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FirstTab from './components/FirstTab';
import SecondTab from './components/FirstTab';
import ImageList from './components/ImageList';
import Header from './components/Header';
import data from './data.json';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'General ' },
        { key: 'second', title: 'Pricing ' },
        { key: 'third', title: 'Parts ' },
        { key: 'fourth', title: 'Damages ' },
      ],
      cars: data.cars,
      translateInfoY: new Animated.Value(0),
      translateButtonY: new Animated.Value(0),
      _deltaY: new Animated.Value(Screen.width * 0.8)
    };
  }

  handleImagePress = () => {
    console.log("Image is being pressed");
    Animated.parallel([
      Animated.timing(this.state.translateInfoY, {
        toValue: Screen.height,
        duration: 600
      }),
      Animated.timing(this.state.translateButtonY, {
        toValue: Screen.height / 2,
        duration: 500
      })
    ]).start();
  };

  handleImageListClose = () => {
    Animated.parallel([
      Animated.spring(this.state.translateInfoY, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(this.state.translateButtonY, {
        toValue: 0,
        duration: 400
      })
    ]).start();
    this.child.list.scrollToIndex({ animated: true, index: 0 });
  }

  renderTabView = () => (
    <TabView
      navigationState={this.state}
      renderScene={SceneMap({
        first: FirstTab,
        second: SecondTab,
        third: SecondTab,
        fourth: SecondTab,
      })}
      onIndexChange={index => this.setState({ index })}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props =>
        <TabBar
          {...props}
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
          renderLabel={({ route, focused, color }) => (
            <Text style={[styles.tabTitle, { color: focused ? '#007AFF' : 'grey', }]}>
              {route.title}
            </Text>
          )}
        />
      }
    />
  );

  renderButton = () => {
    const buttonAnimatedStyle = {
      transform: [
        {
          translateY: this.state.translateButtonY
        }
      ]
    };
    return (
      <TouchableWithoutFeedback onPress={() => { }}>
        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <Text style={styles.buttonText}>
            Create RO
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  renderImageList = (cars) => (
    <View style={styles.map} >
      <ImageList
        cars={cars}
        ref={child => { this.child = child }}
        onListClose={this.handleImageListClose}
      />
    </View>
  );

  renderCarInfo = () => {
    const infoAnimatedStyle = {
      transform: [
        {
          translateY: this.state.translateInfoY
        }
      ]
    };

    const paddingAnimatedStyle = {
      borderTopLeftRadius: this.state._deltaY.interpolate({
        inputRange: [0, Screen.width * 0.8],
        outputRange: [0, 10]
      }),
      borderTopRightRadius: this.state._deltaY.interpolate({
        inputRange: [0, Screen.width * 0.8],
        outputRange: [0, 10]
      }),
    }
    return (
      <Animated.View
        style={[styles.panelContainer, infoAnimatedStyle]}
        pointerEvents={'box-none'}
      >
        <TouchableWithoutFeedback onPress={this.handleImagePress} style={styles.imageOverlay}>
          <View style={styles.imageOverlay} />
        </TouchableWithoutFeedback>
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{ y: 0 }, { y: Screen.width * 0.8 }]}
          boundaries={{ top: -300 }}
          dragWithSpring={{ tension: 1000, damping: 0.5 }}
          initialPosition={{ y: Screen.width * 0.8 }}
          animatedValueY={this.state._deltaY}>
          <Animated.View style={[styles.panel, paddingAnimatedStyle]}>
            {this.renderTabView()}
          </Animated.View>
        </Interactable.View>
      </Animated.View>
    );
  };

  render() {
    const { cars } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />

        <View style={styles.container}>
          {this.renderImageList(cars)}
          {this.renderCarInfo()}
          {this.renderButton()}
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: Screen.height,
    padding: 8,
    backgroundColor: '#efefef',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  map: {
    height: Platform.OS === 'ios' ? Screen.height - (Screen.height * 0.08) : Screen.height,
    width: Screen.width,
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    bottom: Screen.width * 0.8,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: -1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF"
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  tabTitle: {
    fontWeight: 'bold',
  },
  tabIndicator: { backgroundColor: '#007AFF', padding:8 },
  tabBar: { backgroundColor: '#efefef' }
});