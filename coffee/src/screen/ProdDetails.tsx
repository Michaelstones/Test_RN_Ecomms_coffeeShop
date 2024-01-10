/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {useStore} from '../store/store';
import ImageBGInfo from '../component/ImageBGInfo';
import PaymentFooter from '../component/PaymentFooter';

const ProdDetails = ({navigation, route}: {navigation: any; route: any}) => {
  const ItemOfIndex = useStore((state: any) =>
    route?.params?.type === 'Coffee' ? state?.coffeeList : state?.beansList,
  )[route?.params?.index];

  const addToFavList = useStore((state: any) => state?.addToFavList);
  const deleteFromFavList = useStore((state: any) => state?.deleteFromFavList);
  const addToCart = useStore((state: any) => state?.addToCart);
  const calcCartPrice = useStore((state: any) => state?.calcCartPrice);

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavList(type, id) : addToFavList(type, id);
  };

  const BackHandler = () => {
    navigation?.pop();
  };

  const addToCarthandler = ({id, index, name, roasted, imagelink_square, special_ingredient, type, price}: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });

    calcCartPrice();

    navigation?.navigate('Cart');
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
        <ImageBGInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex?.imagelink_portrait}
          type={ItemOfIndex?.type}
          id={ItemOfIndex?.id}
          favourite={ItemOfIndex?.favourite}
          name={ItemOfIndex?.name}
          special_ingredient={ItemOfIndex?.special_ingredient}
          ingredients={ItemOfIndex?.ingredients}
          average_rating={ItemOfIndex?.average_rating}
          ratings_count={ItemOfIndex?.ratings_count}
          roasted={ItemOfIndex?.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescText}>{ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContent}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: ItemOfIndex.type === 'Bean' ? FONTSIZE.size_14 : FONTSIZE.size_16,
                      color: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  //missed flutter sha
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
export default ProdDetails;
