import React, {Component} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, NavigationScreenOptions} from 'react-navigation';
import Button from "./src/components/Button";
import {layout, typographyStyles} from "./src/styles";

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };
  props: {
    navigation: any;
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: layout.unit }}>
          <Text style={[ typographyStyles.heading1, { margin: layout.unit } ]}>Themeable buttons</Text>
          <Button variant='flat' label='Flat button' />
          <Button variant='outline' color='accent' label='Outline button' />
          <Button variant='raised' label='Raised button' />
          <Button variant='gradientFill' label='Gradient fill button' />
          <Button variant='gradientFill' label='React native vector icons' iconName='cake' />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button type='icon' iconName='favorite' />
            <Button type='icon' color='accent' variant='outline' iconName='cake' />
            <Button type='icon' variant='raised' iconName='cake' />
            <Button type='icon' variant='gradientFill' iconName='star' />
          </View>
          <Button color='accent' variant='raised' label='Go to profile page' iconName='arrow-forward' dir='rtl' onPress={() => navigate('Profile', { name: 'Young Park' })} />
        </ScrollView>
        <Button type='fab' iconName='favorite' label='FAB with label' style={{ margin: layout.unit * 3, position: 'absolute', bottom: 0, right: 0 }} />
        <Button type='fab' variant='gradientFill' iconName='cake' style={{ margin: layout.unit * 3, position: 'absolute', bottom: 0, left: 0 }} />
      </SafeAreaView>
    );
  }
}

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
  };
  props: {
    navigation: any;
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{ flex: 1, padding: layout.unit }}>
        <Text style={[ typographyStyles.heading1, { margin: layout.unit } ]}>{navigation.getParam('name')}</Text>
        <Button label='Go back home' onPress={() => navigation.goBack()} variant='gradientFill' iconName='home' />
      </View>
    );
  }
}

const mainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

const App = createAppContainer(mainNavigator);

export default App;

// class BlinkText extends Component {
//
//   props: {
//     label: string;
//   };
//   state = {
//     visible: false
//   };
//
//   componentDidMount(): void {
//     setInterval(() => {
//       this.setState((prevState: any) => ({
//         visible: !prevState.visible
//       }))
//     }, 1000);
//   }
//
//
//   render() {
//     return (
//       this.state.visible ? <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8, marginBottom: 8 }}>{this.props.label}</Text> : null
//     );
//   }
// }
//
// class Greetings extends Component {
//
//   props: {
//     name: string;
//   };
//
//   render () {
//     return (
//       <View style={{ alignItems: 'center' }}>
//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8, marginBottom: 8 }}>Hello, {this.props.name || 'No name'}!</Text>
//       </View>
//     );
//   }
// }
//
// export default class App extends Component {
//
//   state = {
//     text: ''
//   };
//
//   getPicElement(src: string) {
//     src = src || '';
//     return (
//       <Image source={{ uri: src }} style={{ width: 150, height: 150, margin: 16 }}/>
//     );
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput style={{ height: 40, position: 'absolute', top: 100, left: 16, right: 16, borderColor: 'rgba(0,0,0,.12)', borderWidth: 1, padding: 8, borderRadius: 8 }}
//                    onChangeText={text => this.setState({text})}
//                    placeholder='Type something' value={this.state.text} />
//         <Text>{this.state.text}</Text>
//         {this.getPicElement('https://media.giphy.com/media/8c14vDYQEMkx6zvLh1/giphy.gif')}
//         {/*{['Young Park', 'Dennis Chia Seed', 'Sam Hinkhouse'].map((name, index) => (*/}
//         {/*  <BlinkText key={index} label={name}/>*/}
//         {/*))}*/}
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
