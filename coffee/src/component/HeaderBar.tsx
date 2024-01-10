/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientIcon from './GradientIcon';
import ProfileP from './ProfileP';
interface HProps {
  title?: string;
}
const HeaderBar = ({title}: HProps) => {
  return (
    <View style={styles.HeaderContent}>
      <GradientIcon name="menu" color={COLORS.primaryDarkGreyHex} size={FONTSIZE.size_16} />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfileP />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContent: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
export default HeaderBar;
