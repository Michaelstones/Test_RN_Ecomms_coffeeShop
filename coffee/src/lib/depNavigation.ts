/* eslint-disable prettier/prettier */
// navigationUtils.js
import {CommonActions} from '@react-navigation/native';

export const navigateToTabScreen = (
  navigation: {dispatch: (arg0: CommonActions.Action) => void},
  tabName: any,
  screenName: any,
) => {
  navigation.dispatch(
    CommonActions.navigate({
      name: tabName,
      params: {
        screen: screenName,
      },
    }),
  );
};
