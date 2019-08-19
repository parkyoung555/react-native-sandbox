import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

export class StyleVariantComponent extends Component {

  static capitalize(text = '') {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  }

  getStyleVariant(styles: any, elementKey = '', typeKey = '', variantKey = '') {

    const styleSheet = StyleSheet.create(styles);

    return StyleSheet.flatten([
      styleSheet[`${elementKey}${StyleVariantComponent.capitalize(typeKey)}`],
      styleSheet[`${elementKey}${StyleVariantComponent.capitalize(typeKey)}${StyleVariantComponent.capitalize(variantKey)}`]
    ]);
  }
}
