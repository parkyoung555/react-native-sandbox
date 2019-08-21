import React, { Component } from 'react';
import { Animated, Easing, View, StyleSheet, Text } from 'react-native';

const animationDuration = 400;
const initialRippleSizePercentage = .2;

export default class AppRipple extends Component {
  static defaultProps = {
    color: '#000',
    opacity: .24,
  };
  props: {
    color?: string;
    opacity: number;
    children?: any;
    style?: any;
    onPress?: () => void;
  };
  state = {
    ripples: []
  };
  height: number;
  width: number;
  clearRippleTimeout;

  setContainerDims(event) {
    this.height = event.nativeEvent.layout.height;
    this.width = event.nativeEvent.layout.width;
  }

  addRippleElement(event) {
    clearTimeout(this.clearRippleTimeout);
    const [x, y] = [event.nativeEvent.locationX, event.nativeEvent.locationY];
    const sizeBasis = this.height > this.width ? this.height : this.width;
    const pointBasis = this.height > this.width ? y : x;
    const initialSize = sizeBasis * initialRippleSizePercentage;
    const scale = ((Math.abs(pointBasis - (sizeBasis / 2)) + (sizeBasis / 2)) / (initialSize / 2)) + (initialRippleSizePercentage * 0.45);
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(1);
    const ripple = {
      element: <Animated.View key={new Date().getTime()} pointerEvents='none' style={{
        backgroundColor: this.props.color,
        borderRadius: initialSize / 2,
        height: initialSize,
        left: x - (initialSize / 2),
        position: 'absolute',
        opacity: fadeAnim,
        top: y - (initialSize / 2),
        transform: [{ scale: scaleAnim }],
        width: initialSize
      }} />,
      animationValues: {
        opacity: fadeAnim,
        transformScale: scaleAnim
      },
      animationDone: false
    };
    this.setState({
      ripples: this.state.ripples.concat(ripple)
    }, () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(
            ripple.animationValues.opacity,
            {
              toValue: this.props.opacity,
              easing: Easing.bezier(.25, .8, .25, 1),
              duration: animationDuration
            }
          )
        ]),
        Animated.timing(
          ripple.animationValues.transformScale,
          {
            toValue: scale,
            easing: Easing.bezier(.25, .8, .25, 1),
            duration: animationDuration
          }
        )
      ]).start(() => {
        ripple.animationDone = true;
        this.forceUpdate();
      });
    });
  }

  clearRipples() {
    this.clearRippleTimeout = setTimeout(() => {
      this.setState({
        ripples: []
      });
    }, animationDuration);
    this.state.ripples.forEach(ripple => {
      const clearRipplesInterval = setInterval(() => {
        if (ripple.animationDone) {
          clearInterval(clearRipplesInterval);
          Animated.timing(
            ripple.animationValues.opacity,
            {
              toValue: 0,
              easing: Easing.bezier(.25, .8, .25, 1),
              duration: animationDuration * .5
            }
          ).start(() => {
            // TODO: Figure out why updating ripples array causes all ripples to be destroyed at once
            // setTimeout(() => {
            //   this.setState((state: any) => ({
            //     ripples: state.ripples.slice(0, state.ripples.length - 1)
            //   }));
            // }, animationDuration);
          });
        }
      });
    });
  }

  handlePress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <View style={this.props.style} onStartShouldSetResponder={(e) => ( true )} onResponderRelease={() => {this.handlePress();this.clearRipples.bind(this)();}} onResponderTerminate={this.clearRipples.bind(this)} onResponderStart={this.addRippleElement.bind(this)} onLayout={this.setContainerDims.bind(this)}>
        <View pointerEvents='none'>{this.props.children}</View>
        <View pointerEvents='none' style={[StyleSheet.absoluteFill, { borderRadius: this.props.style ? this.props.style.borderRadius : null, overflow: 'hidden', zIndex: 1 }]}>
          {this.state.ripples.map(ripple => (
            ripple.element
          ))}
        </View>
      </View>
    );
  }
}