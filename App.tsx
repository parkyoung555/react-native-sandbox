import React, {Component, RefObject} from 'react';
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, NavigationScreenOptions} from 'react-navigation';
import AppButton from "./src/components/AppButton";
import {layout, typographyStyles} from "./src/styles";

const styles = StyleSheet.create({
  buttonMargin: {
    margin: layout.unit
  }
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };
  props: {
    navigation: any;
  };
  state = {
    isCollapsed: false
  };

  toggleFabCollapse() {
    this.setState((state: any) => ({
      isCollapsed: !state.isCollapsed
    }));
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: layout.unit, flex: 1, height: '100%' }}>
          <Text style={typographyStyles.heading1}>Themeable buttons</Text>
          <AppButton style={styles.buttonMargin} variant='flat' label='Flat button' />
          <AppButton style={styles.buttonMargin} variant='outline' color='accent' label='Outline button' />
          <AppButton style={styles.buttonMargin} variant='raised' label='Raised button' />
          <AppButton style={styles.buttonMargin} variant='gradientFill' label='Gradient fill button' />
          <AppButton style={styles.buttonMargin} variant='gradientFill' label='React native vector icons' iconName='cake' />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <AppButton style={styles.buttonMargin} type='icon' iconName='favorite' />
            <AppButton style={styles.buttonMargin} type='icon' color='accent' variant='outline' iconName='cake' />
            <AppButton style={styles.buttonMargin} type='icon' variant='raised' iconName='cake' />
            <AppButton style={styles.buttonMargin} type='icon' variant='gradientFill' iconName='star' />
          </View>
          <AppButton style={styles.buttonMargin} color='accent' variant='raised' label='Go to profile page' iconName='arrow-forward' dir='rtl' onPress={() => navigate('Profile', { name: 'Young Park' })} />
          <AppButton style={styles.buttonMargin} label='Toggle fab with label' variant='outline' onPress={this.toggleFabCollapse.bind(this)} />
        </ScrollView>
        <AppButton type='fab' iconName='favorite' label='FAB with label' style={{ margin: layout.unit * 3, position: 'absolute', bottom: 0, right: 0 }} isFabCollapsed={this.state.isCollapsed} />
        <AppButton type='fab' variant='gradientFill' iconName='cake' style={{ margin: layout.unit * 3, position: 'absolute', bottom: 0, left: 0 }} />
      </SafeAreaView>
    );
  }
}

class ProfileScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
      headerRight: <Button title='+1' onPress={navigation.getParam('increaseCount')} />
    };
  };
  props: {
    navigation: any;
  };
  state = {
    count: 0
  };

  componentDidMount() {
    this.props.navigation.setParams({
      increaseCount: this.increaseCount.bind(this)
    });
  }

  private increaseCount() {
    this.setState({
      count: this.state.count+=1
    })
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{ flex: 1, padding: layout.unit }}>
        <Text style={typographyStyles.heading1}>{navigation.getParam('name')}</Text>
        <Text style={typographyStyles.body1}>Likes: {this.state.count}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AppButton label='Go back home' onPress={() => navigation.goBack()} variant='gradientFill' iconName='home' />
        </View>
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
