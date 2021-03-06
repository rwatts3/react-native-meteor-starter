'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Accounts from '../../config/db/accounts';
import Router from '../../config/router';


// Using _loggedOutEmitterSet property on global
// to prevent emitter being set multiple times
// TODO: Find more elegant solution
let __global = this;

export default React.createClass({
  componentWillMount() {
    if (!__global._loggedOutEmitterSet) {
      Accounts.emitter.on('loggedOut', ()=> {
        console.log('emit');
        this.props.navigator.resetTo(Router.getOnboarding())
      })
      __global._loggedOutEmitterSet = true;
    }
  },
  handlePress(route, rightButton) {
    this.props.navigator.push(route.route)
  },
  getInitialState: function() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let nav = this.props.navigator;
    return {
      dataSource: ds.cloneWithRows([
        {
          title: "Tinder",
          description: "Like dating, with colors",
          imgQuery: 'fire',
          route: Router.getTinder({
            user: this.props.user
          })
        },
        {
          title: "CRUD",
          description: "A work in progress",
          imgQuery: 'gears',
          route: Router.getCrud({
            user: this.props.user
          })
        },
        {
          title: "Chat",
          description: "Hurl abuse",
          imgQuery: 'chat',
          route: Router.getChat({
            user: this.props.user
          })
        }
      ]),
    };
  },
  renderRow(route, rightButton) {
    return (
      <TouchableOpacity ref={route.title} style={styles.row} onPress={() => this.handlePress(route, rightButton) }>
        <Image
          source={{uri: `http://loremflickr.com/g/320/240/${route.imgQuery}`}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{route.title}</Text>
          <Text style={styles.subtitle}>{route.description}</Text>
        </View>
      </TouchableOpacity>
    )
  },
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
   subtitle: {
    textAlign: 'center',
  },
});
