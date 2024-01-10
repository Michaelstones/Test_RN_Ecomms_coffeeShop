/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/store';
import HeaderBar from '../component/HeaderBar';
import EmptyList from '../component/ListEmpty';
import FavItemCard from '../component/FavItemCard';

const FavouriteScreen = ({navigation}: any) => {
  const FavList = useStore((state: any) => state?.favList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavList = useStore((state: any) => state?.addToFavList);
  const delFromFavList = useStore((state: any) => state?.deleteFromFavList);
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? delFromFavList(type, id) : addToFavList(type, id);
  };
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favourites" />

            {FavList?.length === 0 ? (
              <EmptyList title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavList?.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={data.favourite}
                      ToggleFavouriteItem={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
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
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
export default FavouriteScreen;
