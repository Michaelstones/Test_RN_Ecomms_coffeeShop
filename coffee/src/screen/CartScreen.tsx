/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {useStore} from '../store/store';
import {CoffeeType} from '../screen/HomeScree';
import {COLORS, SPACING} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../component/HeaderBar';
import ListEmpty from '../component/ListEmpty';
import {TouchableOpacity} from 'react-native';
import CartItm from '../component/CartItm';
import PaymentFooter from '../component/PaymentFooter';

const CartScreen = ({navigation}: any) => {
  const cart: CoffeeType[] = useStore((state: any) => state?.cart);
  const CartPrice = useStore((state: any) => state?.price);
  const incrementCartItemQuantity = useStore((state: any) => state?.incrementCartItemQty);
  const decrementCartItemQuantity = useStore((state: any) => state?.decrementCartItemQty);
  const calculateCartPrice = useStore((state: any) => state?.calcCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  const incItemQty = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decItemQty = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
            {cart.length === 0 ? (
              <ListEmpty title="Y've nothing in cart" />
            ) : (
              <>
                {cart?.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data?.id}>
                    <CartItm
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={incItemQty}
                      decrementCartItemQuantityHandler={decItemQty}
                    />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
          {cart.length !== 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={{price: CartPrice, currency: '$'}}
            />
          ) : (
            <></>
          )}
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

export default CartScreen;
