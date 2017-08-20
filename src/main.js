//  https://www.eventbriteapi.com/v3/users/me/?token=TDDPE2AQQTN3RD7ZTE

import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ListView
} from 'react-native';

import { API_KEY } from '../secrets';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Event 1'
          },
          url: 'www.google.com'
        }
      ]),
      eventType: '',
      city: ''
    }
  }
  componentDidMount() {
    this.searchEvents('JavaScript', 'Seattle,WA');
  }
  searchEvents(cat, city) {
    const FETCH_URL = `${ROOT_URL}?q=${cat}&location.address=${city}&token=GVCZ5BVAU6FGWU2EG6QL`;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY
      }
    }).then((res) => res.json())
    .then((resJSON) => {
      this.setState({dataSource: ds.cloneWithRows(resJSON.events)})
    });
  }

  renderRow(rowData) {
    const defaultImage = "http://placebeyonce.com/450-300"
    let img = rowData.logo != null ? rowData.logo.url : defaultImage;

    return(
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{uri: img}}
        />
        <View style={styles.rowDetails}>
          <Text>{rowData.name.text.length > 30 ?
            rowData.name.text.substring(0, 30) + "..." :
            rowData.name.text
          }</Text>
          <Text>More details</Text>
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Event Expert</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Type of event...'
            onChangeText={(text) => this.setState({eventType: text})}
          />
          <TextInput
            style={styles.input}
            placeholder='City'
            onChangeText={(text) => this.setState({city: text})}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.searchEvents(this.state.eventType, this.state.city)}
          >
            <Text style={styles.button}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 5,
  },
  form: {
    height: 120
  },
  list: {
    flex: 8,
    borderTopWidth: 1,
    borderTopColor: '#444'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  rowDetails: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLogo: {
    flex: 1,
    width: 50,
    height: 50,
    borderColor: '#000',
    borderWidth: 1
  },
  input: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    borderColor: '#00f',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    margin: 5,
    color: '#00f'
  },
  buttonContainer: {
    flex: 2
  }
})
