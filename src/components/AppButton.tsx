import React from 'react';
import {Animated, Text, View, StyleSheet, Easing} from 'react-native';
import theme, {layout, uiDims, elevation} from '../styles';
import {StyleVariantComponent} from '../shared/StyleVariantComponent';
import {GradientBackground} from './Gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppRipple from './AppRipple';

type buttonVariants = 'flat' | 'raised' | 'outline' | 'gradientFill';
type buttonTypes = 'text' | 'icon' | 'fab';
type buttonColors = 'primary' | 'accent' | 'warn';

const buttonsWithShadows = [
  'raised',
  'gradientFill',
  'fab'
];

export default class AppButton extends StyleVariantComponent {
  props: {
    label?: string;
    color?: buttonColors;
    variant?: buttonVariants;
    type?: buttonTypes;
    shadow?: boolean;
    iconName?: string;
    // svgIcon?: any;
    onPress?: () => void;
    style?: any;
    dir?: 'rtl' | 'ltr',
    isFabCollapsed?: boolean;
  };
  static defaultProps = {
    color: 'primary',
    variant: 'flat',
    type: 'text',
    dir: 'ltr',
    isFabCollapsed: false
  };
  styles = {
    buttonText: {
      alignItems: 'center',
      borderRadius: theme.roundness,
      flexDirection: 'row',
      height: uiDims.textButton,
      justifyContent: 'center',
      overflow: 'hidden',
      paddingHorizontal: layout.unit * 2
    },
    buttonIcon: {
      alignItems: 'center',
      borderRadius: uiDims.iconButton / 2,
      flexDirection: 'row',
      height: uiDims.iconButton,
      justifyContent: 'center',
      overflow: 'hidden',
      width: uiDims.iconButton
    },
    buttonFab: {
      alignItems: 'center',
      borderRadius: uiDims.fab / 2,
      backgroundColor: '',
      flexDirection: 'row',
      flexGrow: 0,
      height: uiDims.fab,
      justifyContent: 'center',
      minWidth: uiDims.fab,
      overflow: 'hidden',
      paddingHorizontal: (layout.unit * 2) + (layout.unit / 2)
    },
    buttonTextRaised: {
      backgroundColor: '',
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
      fontWeight: '600',
      textAlign: 'center'
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
  fabLabelWidth;
  rippleColor: string;
  fabLabelWidthAnim;

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
    this.rippleColor = this.props.variant === 'raised' || this.props.variant === 'gradientFill' || this.props.type === 'fab' ? theme.colors[`${this.props.color}Contrast`] : theme.colors[this.props.color];
  }

  // UNSAFE_componentWillUpdate(nextProps) {
  //   console.log(nextProps);
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isFabCollapsed !== this.props.isFabCollapsed) {
      this.toggleFabCollapse();
    }
  }

  render() {
    const Gradient = GradientBackground,
      borderRadius =  this.props.type === 'icon' ? uiDims.iconButton / 2 : (this.props.type === 'fab' ? uiDims.fab / 2 : theme.roundness),
      iconMarginRight = this.props.type === 'text' && this.props.dir === 'ltr' ? layout.unit : 0,
      iconMarginLeft = this.props.type === 'text' && this.props.dir === 'rtl' ? layout.unit : 0,
      iconSize = this.props.type === 'text' ? 18 : 24,
      label = this.props.type === 'text' ? (this.props.label || 'Button') : (this.props.type === 'fab' && this.props.label ? this.props.label : null),
      shadowVisible = typeof this.props.shadow === 'boolean' ? this.props.shadow : (buttonsWithShadows.indexOf(this.props.variant) > -1 || buttonsWithShadows.indexOf(this.props.type) > -1);
    const content = <View style={[this.getStyleVariant(this.styles, 'button', this.props.type, this.props.variant)]}><Text>{this.props.isFabCollapsed}</Text>
      {this.props.variant === 'gradientFill' ? <Gradient style={StyleSheet.absoluteFill} stops={[ theme.colors.primary, theme.colors.accent ]} /> : null}
      {this.props.iconName ? <Icon style={[this.getStyleVariant(this.styles, 'typography', this.props.type, this.props.variant), { marginLeft: iconMarginLeft, marginRight: iconMarginRight, fontSize: iconSize, fontWeight: 'normal'}]} name={this.props.iconName} /> : null}
      {this.props.type === 'text' ? <Text numberOfLines={1} style={this.getStyleVariant(this.styles, 'typography', this.props.type, this.props.variant)}>{label}</Text> : null}
      {this.props.type === 'fab' && this.props.label ? <Animated.View style={{ flexDirection: this.props.dir === 'rtl' ? 'row-reverse' : 'row', width: this.fabLabelWidthAnim }} onLayout={this.setExpandedWidth.bind(this)}><View style={{ width: layout.unit + (layout.unit / 2) }} /><Text numberOfLines={1} style={[this.getStyleVariant(this.styles, 'typography', this.props.type, this.props.variant)]}>{label}</Text></Animated.View> : null}
    </View>;
    return <View style={this.props.style}>
      {shadowVisible ? <View style={[StyleSheet.absoluteFill, elevation.z2, { borderRadius: borderRadius }]} /> : null}
      <AppRipple style={{ borderRadius: borderRadius, zIndex: 10 }} color={this.rippleColor} onPress={this.props.onPress}>{content}</AppRipple>
    </View>;
  }

  private setExpandedWidth(event) {
    if (this.fabLabelWidth === void(0)) {
      this.fabLabelWidth = event.nativeEvent.layout.width;
      this.fabLabelWidthAnim = new Animated.Value(this.fabLabelWidth);
    }
  }

  private toggleFabCollapse() {
    if (this.props.isFabCollapsed) {
      Animated.timing(
        this.fabLabelWidthAnim,
        {
          toValue: this.fabLabelWidth,
          easing: Easing.bezier(.25, .8, .25, 1),
          duration: 400
        }
      ).start();
    } else {
      Animated.timing(
        this.fabLabelWidthAnim,
        {
          toValue: 0,
          easing: Easing.bezier(.25, .8, .25, 1),
          duration: 400
        }
      ).start();
    }
  }
}
