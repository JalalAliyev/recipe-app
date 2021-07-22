import React from 'react';
import { StyleSheet, Text } from 'react-native';

export interface DefaultTextProps {}

const DefaultText: React.SFC<DefaultTextProps> = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
});

export default DefaultText;
