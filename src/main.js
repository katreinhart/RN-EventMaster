//  https://www.eventbriteapi.com/v3/users/me/?token=TDDPE2AQQTN3RD7ZTE

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';

import { API_KEY } from '../secrets';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search';

export default class App extends Component {
  componentDidMount() {
    this.searchEvents('hackathon', 'Seattle,WA');
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
      console.log(resJSON)
    });
  }

  render() {
    console.log('Render method');
    return(
      <View style={styles.container}>
        <Text>Event Expert</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
