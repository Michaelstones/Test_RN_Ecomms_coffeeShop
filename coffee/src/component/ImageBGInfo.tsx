/* eslint-disable prettier/prettier */
import {ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIconConfig from './CustomIconConfig';
import GradientIcon from './GradientIcon';

interface IImgBGInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: string | ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBGInfo = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}: IImgBGInfoProps) => {
  // console.log(imagelink_portrait);
  return (
    <View>
      {type === 'Bean' ? (
        <ImageBackground source={imagelink_portrait as ImageProps} style={styles.ItemBGI}>
          {EnableBackHandler ? (
            <View style={styles.ImgHeaderBarContainerWithBack}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler();
                }}>
                <GradientIcon name="left" color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientIcon
                  name="like"
                  color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.ImgHeaderBarContainerWithoutBack}>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientIcon
                  name="like"
                  color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.ImgInfoOuterContainer}>
            <View style={styles.ImgInfoInnerContainer}>
              <View style={styles.InfoContainerRow}>
                <View>
                  <Text style={styles.ItemTitleText}>{name}</Text>
                  <Text style={styles.ItemSubtitleText}>{special_ingredient}</Text>
                </View>
                <View style={styles.ItemPropertiesContainer}>
                  <View style={styles.PropFirst}>
                    <CustomIconConfig
                      name={type === 'Bean' ? 'bean' : 'beans'}
                      size={type === 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text
                      style={[
                        styles.PropTextFirst,
                        {
                          marginTop: type == 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0,
                        },
                      ]}>
                      {type}
                    </Text>
                  </View>
                  <View style={styles.PropFirst}>
                    <CustomIconConfig
                      name={type === 'Bean' ? 'location' : 'drop'}
                      size={FONTSIZE.size_16}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text style={styles.PropTextLast}>{ingredients}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.InfoContainerRow}>
                <View style={styles.RatingContainer}>
                  <CustomIconConfig name={'star'} color={COLORS.primaryOrangeHex} size={FONTSIZE.size_20} />
                  <Text style={styles.RatingText}>{average_rating}</Text>
                  <Text style={styles.RatingCountText}>({ratings_count})</Text>
                </View>
                <View style={styles.RoastedContainer}>
                  <Text style={styles.RoastedText}>{roasted}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground source={{uri: `http://localhost:3000/images/${imagelink_portrait}`}} style={styles.ItemBGI}>
          {EnableBackHandler ? (
            <View style={styles.ImgHeaderBarContainerWithBack}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler();
                }}>
                <GradientIcon name="left" color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientIcon
                  name="like"
                  color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.ImgHeaderBarContainerWithoutBack}>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientIcon
                  name="like"
                  color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.ImgInfoOuterContainer}>
            <View style={styles.ImgInfoInnerContainer}>
              <View style={styles.InfoContainerRow}>
                <View>
                  <Text style={styles.ItemTitleText}>{name}</Text>
                  <Text style={styles.ItemSubtitleText}>{special_ingredient}</Text>
                </View>
                <View style={styles.ItemPropertiesContainer}>
                  <View style={styles.PropFirst}>
                    <CustomIconConfig
                      name={type == 'Bean' ? 'bean' : 'beans'}
                      size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text
                      style={[
                        styles.PropTextFirst,
                        {
                          marginTop: type == 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0,
                        },
                      ]}>
                      {type}
                    </Text>
                  </View>
                  <View style={styles.PropFirst}>
                    <CustomIconConfig
                      name={type == 'Bean' ? 'location' : 'drop'}
                      size={FONTSIZE.size_16}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text style={styles.PropTextLast}>{ingredients}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.InfoContainerRow}>
                <View style={styles.RatingContainer}>
                  <CustomIconConfig name={'star'} color={COLORS.primaryOrangeHex} size={FONTSIZE.size_20} />
                  <Text style={styles.RatingText}>{average_rating}</Text>
                  <Text style={styles.RatingCountText}>({ratings_count})</Text>
                </View>
                <View style={styles.RoastedContainer}>
                  <Text style={styles.RoastedText}>{roasted}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ItemBGI: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  ImgHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImgHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ImgInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  ImgInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ItemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  ItemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  ItemPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  PropFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  PropTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  PropTextLast: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_2 + SPACING.space_4,
  },
  RatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  RoastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});
export default ImageBGInfo;
