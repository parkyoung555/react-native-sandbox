import React, { Component } from 'react';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

export class GradientBackground extends Component {
  props: {
    stops: (string|{ color: string; offset: number, stopOpacity: number })[],
    style?: any,
    borderRadius?: number
  };

  constructor(props: any) {
    super(props);
    this.props.borderRadius = this.props.borderRadius || 0;
  }

  render() {
    return (
      <Svg style={this.props.style}>
        <Defs>
          <LinearGradient id='backgroundGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            {this.props.stops.map((stop, i) => {
              const color = typeof stop === 'object' ? stop.color : stop,
                offset = typeof stop === 'object' ? stop.offset : (i / (this.props.stops.length - 1)) * 100,
                stopOpacity = typeof stop === 'object' ? stop.stopOpacity : 1;
              return <Stop key={i} offset={`${offset}%`} stopColor={color} stopOpacity={stopOpacity} />
            })}
          </LinearGradient>
        </Defs>
        <Rect x='0' y='0' rx={this.props.borderRadius} ry={this.props.borderRadius} height='100%' width='100%' fill='url(#backgroundGradient)' rotate={45} />
      </Svg>
    );
  }
}
