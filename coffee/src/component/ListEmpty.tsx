/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

interface ListProp {
  title: string;
}

const EmptyList = ({title}: ListProp) => {
  return (
    <View style={styles.EmptyCart}>
      <LottieView style={styles.LottieStyle} source={require('../lottie/coffeecup.json')} autoPlay loop />
      <Text style={styles.LottieTextAnime}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCart: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle: {
    height: 300,
  },
  LottieTextAnime: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default EmptyList;
