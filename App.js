import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  List,
  ListItem,
  Button,
  Image
} from 'react-native';

// Library so ButtonGroup can be used instead of individual buttons
import { ButtonGroup } from 'react-native-elements';

// Import dropoffs data
var data = require('./deliveries-sample.json');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      currentData: [],
      tueData: [],
      wedData: [],
      thurData: [],
      friData: [],
      selectedData: []
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  componentWillMount() {
    this.state.currentData = data.dropoffs[0].deliveries;
    this.state.tueData = data.dropoffs[1].deliveries;
    this.state.wedData = data.dropoffs[2].deliveries;
    this.state.thurData = data.dropoffs[3].deliveries;
    this.state.friData = data.dropoffs[4].deliveries;
    this.state.selectedData = this.state.currentData;
  }

  tuePress() {
    this.state.selectedData = data.dropoffs[1].deliveries;
  }

  render() {
    const buttons = ['Today', 'Tue', 'Wed', 'Thur', 'Fri'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            padding: 10,
            justifyContent: 'center'
          }}
        >
          5700 Boradmoor - Mission Towers {'\n'}
          5700 Boradmoor Street, Mission, KS
        </Text>
        <Button
          onPress={this.tuePress}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 40 }}
          style={{ alignItems: 'flex-start' }}
          selectedButtonStyle={{ backgroundColor: 'powderblue' }}
        />

        <FlatList
          data={this.state.selectedData}
          renderItem={({ item }) =>
            <View
              style={{
                display: 'flex',
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: item.logoUrl
                }}
              />
              <Text
                style={{
                  paddingBottom: 10
                }}
              >
                {item.restaurantName} {'\n'} Order By: {item.cutoff} {'\n'}{' '}
                Delivery Time: {item.dropoff}
              </Text>
            </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  }
});
