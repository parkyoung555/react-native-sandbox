import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

class BlinkText extends Component {

  props: {
    label: string;
  };
  state = {
    visible: false
  };

  componentDidMount(): void {
    setInterval(() => {
      this.setState((prevState: any) => ({
        visible: !prevState.visible
      }))
    }, 1000);
  }


  render() {
    return (
      this.state.visible ? <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8, marginBottom: 8 }}>{this.props.label}</Text> : null
    );
  }
}

class Greetings extends Component {

  props: {
    name: string;
  };

  render () {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8, marginBottom: 8 }}>Hello, {this.props.name || 'No name'}!</Text>
      </View>
    );
  }
}

export default class App extends Component {

  state = {
    text: ''
  };

  getPicElement(src: string) {
    src = src || '';
    return (
      <Image source={{ uri: src }} style={{ width: 150, height: 150, margin: 16 }}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{ height: 40, position: 'absolute', top: 100, left: 16, right: 16, borderColor: 'rgba(0,0,0,.12)', borderWidth: 1, padding: 8, borderRadius: 8 }}
                   onChangeText={text => this.setState({text})}
                   placeholder='Type something' value={this.state.text} />
        <Text>{this.state.text}</Text>
        {this.getPicElement('https://media.giphy.com/media/8c14vDYQEMkx6zvLh1/giphy.gif')}
        {['Young Park', 'Dennis Chia Seed', 'Sam Hinkhouse'].map((name, index) => (
          <BlinkText key={index} label={name}/>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
