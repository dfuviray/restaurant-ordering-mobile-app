import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from '../Menu';
import MenuDetails from '../MenuDetails';

const MenuStack = createStackNavigator();

export default function menuStack(props) {
  const { data, orderEvent } = props.route.params;

  return (
    <MenuStack.Navigator headerMode="none">
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        initialParams={{
          data: data,
          orderEvent: orderEvent,
        }}
      />
      <MenuStack.Screen name="MenuDetails" component={MenuDetails} />
    </MenuStack.Navigator>
  );
}
