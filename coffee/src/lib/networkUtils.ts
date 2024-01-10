/* eslint-disable prettier/prettier */
import {NetworkInfo} from 'react-native-network-info';
// may be needin this file
export const getIpAddress = NetworkInfo?.getIPAddress().then(ipAddress => {
  return ipAddress;
});
