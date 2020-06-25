import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class CustomButton extends Component {
  render() {
    const { isDisabled, textLabel, event } = this.props;
    const { buttonStyle, activeStyle, disabledStyle } = styles;
    return (
      <TouchableOpacity
        disabled={isDisabled}
        style={[isDisabled ? disabledStyle : activeStyle, buttonStyle]}
        onPress={event}
      >
        <Text style={{ color: '#fff' }}>{textLabel}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 20,
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeStyle: { backgroundColor: '#E83151' },
  disabledStyle: { backgroundColor: 'rgba(232, 49, 81, .4)' },
});
