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

var moment = require('moment');
moment().format();

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
      selectedData: [],
      selectedDate: ''
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    if (selectedIndex == 0) {
      this.state.selectedData = data.dropoffs[0].deliveries;
    } else if (selectedIndex == 1) {
      this.state.selectedData = data.dropoffs[1].deliveries;
    } else if (selectedIndex == 2) {
      this.state.selectedData = data.dropoffs[2].deliveries;
    } else if (selectedIndex == 3) {
      this.state.selectedData = data.dropoffs[3].deliveries;
    } else if (selectedIndex == 4) {
      this.state.selectedData = data.dropoffs[4].deliveries;
    }
  }

  componentWillMount() {
    this.state.selectedData = data.dropoffs[0].deliveries;
  }

  checkCutoff(cutoffPassed) {
    if (cutoffPassed == true) {
      return 'Cut-Off Time Passed';
    } else {
      return 'Ordering Still Available';
    }
  }

  // Formats date
  formatDate(date) {
    var timeString = date;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = h < 12 || H === 24 ? ' AM' : ' PM';
    timeString = h + timeString.substr(2, 3) + ampm;

    return timeString;
  }

  render() {
    const buttons = ['Today', 'Tue', 'Wed', 'Thur', 'Fri'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            padding: 10,
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          5700 Boradmoor - Mission Towers {'\n'}
          5700 Boradmoor Street, Mission, KS
        </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 40 }}
          style={{ alignItems: 'flex-start' }}
          selectedButtonStyle={{ backgroundColor: 'skyblue' }}
        />

        <FlatList
          data={this.state.selectedData}
          renderItem={({ item }) =>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                padding: 10
              }}
            >
              <Image
                style={{ width: 125, height: 125 }}
                source={{
                  uri: item.logoUrl
                }}
              />
              <View style={{ paddingLeft: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    color: 'red',
                    paddingBottom: 5,
                    paddingTop: 5
                  }}
                >
                  {item.restaurantName}
                </Text>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                  <View style={{}}>
                    <Text>Order By:</Text>
                    <Text>Delivery Time:</Text>
                  </View>
                  <View style={{ paddingLeft: 25 }}>
                    <Text style={styles.timeBox}>
                      {this.formatDate(item.cutoff)}
                    </Text>
                    <Text style={styles.timeBox}>
                      {this.formatDate(item.dropoff)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: 'skyblue',
                    borderColor: 'black',
                    borderWidth: 1,
                    marginTop: 9
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingTop: 5,
                      paddingBottom: 5
                    }}
                  >
                    {this.checkCutoff(item.isPastCutoff)}
                  </Text>
                </View>
              </View>
            </View>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  timeBox: {
    borderWidth: 1,
    borderColor: 'black',
    paddingRight: 40,
    paddingLeft: 5
  }
});
