import React from 'react';
import {Platform, Text, TouchableNativeFeedback, TouchableOpacity, View, StyleSheet} from 'react-native';
import theme, {layout, uiDims} from '../styles';
import {StyleVariantComponent} from '../shared/StyleVariantComponent';
import {GradientBackground} from './Gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class AppButton extends StyleVariantComponent {
  props: {
    label?: string;
    color?: 'primary' | 'accent' | 'warn';
    variant?: 'flat' | 'raised' | 'outline' | 'gradientFill' | 'gradientBorder';
    type?: 'text' | 'icon' | 'fab';
    iconName?: string;
    // svgIcon?: any;
    onPress?: () => void;
    style?: any;
    dir?: 'rtl' | 'ltr'
  };
  static defaultProps = {
    color: 'primary',
    variant: 'flat',
    type: 'text',
    dir: 'ltr'
  };
  styles = {
    buttonText: {
      alignItems: 'center',
      borderRadius: theme.roundness,
      flexDirection: 'row',
      height: uiDims.textButton,
      justifyContent: 'center',
      margin: layout.unit,
      paddingHorizontal: layout.unit * 2
    },
    buttonIcon: {
      alignItems: 'center',
      borderRadius: uiDims.iconButton / 2,
      flexDirection: 'row',
      height: uiDims.iconButton,
      justifyContent: 'center',
      margin: layout.unit,
      width: uiDims.iconButton
    },
    buttonFab: {
      alignItems: 'center',
      borderRadius: uiDims.fab / 2,
      backgroundColor: '',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 12,
      flexDirection: 'row',
      flexGrow: 0,
      height: uiDims.fab,
      justifyContent: 'center',
      margin: layout.unit,
      minWidth: uiDims.fab,
      paddingHorizontal: layout.unit * 2
    },
    buttonTextRaised: {
      backgroundColor: '',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8
    },
    buttonTextOutline: {
      borderColor: '',
      borderWidth: StyleSheet.hairlineWidth
    },
    // @ts-ignore
    get buttonTextGradientFill() {
      return this.buttonTextRaised;
    },
    // @ts-ignore
    get buttonIconRaised() {
      return this.buttonTextRaised;
    },
    // @ts-ignore
    get buttonIconOutline() {
      return this.buttonTextOutline;
    },
    // @ts-ignore
    get buttonIconGradientFill() {
      return this.buttonTextRaised;
    },
    typographyText: {
      color: '',
      fontSize: 16,
      fontWeight: '600'
    },
    typographyTextRaised: {
      color: ''
    },
    typographyTextGradientFill: {
      color: ''
    },
    // @ts-ignore
    get typographyIcon() {
      return this.typographyText;
    },
    // @ts-ignore
    get typographyIconRaised() {
      return this.typographyTextRaised;
    },
    // @ts-ignore
    get typographyIconGradientFill() {
      return this.typographyTextGradientFill;
    },
    // @ts-ignore
    get typographyFab() {
      return {...this.typographyTextRaised,
        fontSize: 16,
        fontWeight: '600'
      };
    },
    // @ts-ignore
    get typographyFabGradientFill() {
      return this.typographyTextGradientFill;
    }
  };

  constructor(props: any) {
    super(props);
    this.styles.buttonText.flexDirection = this.props.dir === 'ltr' ? 'row' : 'row-reverse';
    this.styles.buttonFab.flexDirection = this.props.dir === 'ltr' ? 'row' : 'row-reverse';
    this.styles.buttonTextRaised.backgroundColor = theme.colors[this.props.color];
    this.styles.buttonFab.backgroundColor = theme.colors[this.props.color];
    this.styles.buttonTextOutline.borderColor = theme.colors.divider;
    this.styles.typographyText.color = theme.colors[this.props.color];
    this.styles.typographyTextRaised.color = theme.colors[`${this.props.color}Contrast`];
    this.styles.typographyTextGradientFill.color = theme.colors[`${this.props.color}Contrast`];
  }

  render() {
    const Gradient = GradientBackground,
      borderRadius =  this.props.type === 'icon' ? uiDims.iconButton / 2 : (this.props.type === 'fab' ? uiDims.fab / 2 : theme.roundness),
      iconMarginRight = this.props.type === 'text' && this.props.dir === 'ltr' ? layout.unit : (this.props.type === 'fab' && this.props.label && this.props.dir === 'ltr' ? layout.unit + 4 : 0),
      iconMarginLeft = this.props.type === 'text' && this.props.dir === 'rtl' ? layout.unit : (this.props.type === 'fab' && this.props.label && this.props.dir === 'rtl' ? layout.unit + 4 : 0),
      iconSize = this.props.type === 'text' ? 18 : 24,
      label = this.props.type === 'text' ? (this.props.label || 'Button') : (this.props.type === 'fab' && this.props.label ? this.props.label : null);
    const content = <View style={[this.getStyleVariant(this.styles, 'button', this.props.type, this.props.variant), this.props.style]}>
      {this.props.variant === 'gradientFill' ? <Gradient style={StyleSheet.absoluteFill} stops={[ theme.colors.primary, theme.colors.accent ]} borderRadius={borderRadius} /> : null}
      {this.props.iconName ? <Icon style={[this.getStyleVariant(this.styles, 'typography', this.props.type, this.props.variant), { marginLeft: iconMarginLeft, marginRight: iconMarginRight, fontSize: iconSize, fontWeight: 'normal'}]} name={this.props.iconName} /> : null}
      {this.props.type !== 'icon' && (this.props.type === 'fab' ? this.props.label : true) ? <Text style={this.getStyleVariant(this.styles, 'typography', this.props.type, this.props.variant)}>{label}</Text> : null}
    </View>;
    return Platform.select({
      ios: () => <TouchableOpacity onPress={this.props.onPress}>{content}</TouchableOpacity>,
      android: () => <TouchableNativeFeedback onPress={this.props.onPress}>{content}</TouchableNativeFeedback>
    })()
  }
}
