/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import HeaderBar from '../component/HeaderBar';
import CustomIconConfig from '../component/CustomIconConfig';
import BeansData from '../data/BeansData';
import CoffeCard from '../component/CoffeCard';
import {useQuery} from '@apollo/client';
import {GET_ALL_PRODUCTS} from '../lib/queries';

// experimental type
export type CoffeeType = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: {size: string; price: string; currency: string}[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};

const HomeScree = ({navigation}: {navigation: any}) => {
  const {error, data, fetchMore} = useQuery(GET_ALL_PRODUCTS, {
    variables: {first: 10, last: null, before: null, after: null},
  });
  const updateProd = useStore((state: any) => state?.updateProductLists);
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();
  const [prodList, setProdList] = useState({
    coffee: [] as CoffeeType[],
    bean: [] as CoffeeType[],
  });
  const bean = useStore((state: any) => state?.beansList);
  const addToCart = useStore((state: any) => state?.addToCart);
  const calcCartPrice = useStore((state: any) => state?.calcCartPrice);
  const [categories, setCategories] = useState(getItemCatFromData(prodList?.coffee));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedlist, setSortedlist] = useState(getList(categoryIndex.category, prodList?.coffee));
  const searchCoffe = (searchQuery: string) => {
    if (searchQuery !== '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });

      setCategoryIndex({index: 0, category: categories[0]});

      const filteredCoffee = prodList?.coffee?.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setSortedlist([...filteredCoffee]);
    }
  };

  const resetSearchCoffe = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });

    setCategoryIndex({index: 0, category: categories[0]});

    setSortedlist([...prodList.coffee]);

    setSearchText('');
  };

  const ProductCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calcCartPrice();
    ToastAndroid.showWithGravity(`${name} Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  useEffect(() => {
    const prod = data?.getAllProducts;
    const sortedd = sortProductsByType(prod);
    setProdList({
      coffee: [...sortedd?.coffee],
      bean: [...sortedd?.bean],
    });
    setCategories(getItemCatFromData(prodList?.coffee));
    setSortedlist(getList(categoryIndex.category, prodList?.coffee));
    updateProd(sortedd);
    if (error) {
      console.log(error);
      // handle toast
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {/* Top Header */}
        <HeaderBar />
        <Text style={styles.TileTitle}>You love coffee,{'\n'}We've got you covered </Text>
        {/* search-bar section */}
        <View style={styles.InputComponent}>
          <TouchableOpacity
            onPress={() => {
              searchCoffe(searchText);
            }}>
            <CustomIconConfig
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity>
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchCoffe();
              }}>
              <CustomIconConfig
                style={styles.InputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TextInput
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffe(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
        </View>
        {/*  first Category Scroller?? */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.CategoryScrollView}>
          {categories?.map((item: any, index: number) => (
            <View
              key={uniqueKey({prefix: 'category', item: {id: index, name: item}})}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: item});
                  setSortedlist(getList(item, prodList?.coffee));
                }}>
                <Text
                  style={[styles.CategoryText, categoryIndex.index === index ? {color: COLORS.primaryOrangeHex} : {}]}>
                  {item}
                </Text>
                {categoryIndex.index === index ? <View style={styles.ActiveCategory} /> : <></>}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Coffee Flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedlist}
          contentContainerStyle={styles.FlatContainer}
          keyExtractor={item => uniqueKey({prefix: 'coffee', item: item})}
          onEndReached={async () => {
            const datsss = await fetchMore({
              variables: {
                skip: 6, // Pass the current length of the list as the new skip value
              },
            });
            const prods = datsss.data.getAllProducts;
            const sortedd = sortProductsByType(prods);
            setProdList(prevState => ({
              coffee: [...prevState.coffee, ...sortedd?.coffee],
              bean: [...prevState.bean, ...sortedd?.bean],
            }));
            setCategories(getItemCatFromData([...prodList?.coffee, ...sortedd?.coffee]));
            setSortedlist(getList(sortedd.coffee.length, [...prodList?.coffee, ...sortedd?.coffee]));
            updateProd(sortedd);
          }}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item?.id,
                    type: item.type,
                  });
                }}>
                <CoffeCard
                  id={item?.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={ProductCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* bean flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          contentContainerStyle={[styles.FlatContainer, {marginBottom: tabBarHeight}]}
          // not necessary tho cause list is fixed
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Bean Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={BeansData}
          keyExtractor={item => uniqueKey({prefix: 'beans', item: item})}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item?.prices[2]}
                  buttonPressHandler={ProductCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  TileTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeanTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});
export default HomeScree;

const getItemCatFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data?.length; i++) {
    if (temp[data[i]?.name] === undefined) {
      temp[data[i]?.name] = 1;
    } else {
      temp[data[i]?.name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getList = (category: any, data: any) => {
  const cat = category === 'All' ? data : data?.filter((item: any) => item?.name === category);
  return cat;
};

const sortProductsByType = (data: any) => {
  const coffeeProducts: CoffeeType[] = [];
  const beanProducts: CoffeeType[] = [];

  data?.forEach((product: any) => {
    if (product?.type === 'Coffee') {
      coffeeProducts.push(product);
    } else if (product?.type === 'Bean') {
      beanProducts.push(product);
    }
  });

  return {
    coffee: coffeeProducts,
    bean: beanProducts,
    // Add more types as needed
  };
};

const uniqueKey = ({prefix, item}: {prefix: string; item: any}) =>
  `${prefix}_${item?.id}_${Math.floor(Math.random() * 1000)}`;
