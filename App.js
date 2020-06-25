import React from 'react';
import { StyleSheet, Text, View, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Order from './Order';
import menuStack from './routes/menuStack';

import data from './data/menu';

const BottomNav = createBottomTabNavigator();

class App extends React.Component {
  state = {
    data: data,
    orders: [],
    tax: 5,
    tip: [5, 10, 15],
  };

  constructor(props) {
    super(props);
    this.getData();
  }

  removeItems = async () => {
    try {
      await AsyncStorage.removeItem('orders');
    } catch (err) {
      console.log(err);
    }
    const orders = this.getData();
    orders.then((res) => {
      this.setState({ orders: res });
    });
  };

  handleOrder = (item, quantity, id) => {
    const orders = [...this.state.orders];
    orders.push({ ...item, quantity, id });
    this.persistData(orders);
    this.setState({ orders });
  };

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('orders');

      return jsonValue != null
        ? this.setState({ orders: JSON.parse(jsonValue) })
        : [];
    } catch (err) {
      console.log(err);
    }
  };

  persistData = async (order) => {
    try {
      const jsonValue = JSON.stringify(order);
      await AsyncStorage.setItem('orders', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  handleDeleteOrder = (item) => {
    console.log('DELETE');
    const ordersObj = this.state.orders;
    const orders = ordersObj.filter((i) => i.id !== item.id);
    this.setState({ orders });
  };

  render() {
    return (
      <NavigationContainer>
        <BottomNav.Navigator tabBarOptions={{ activeTintColor: '#E83151' }}>
          <BottomNav.Screen
            name="Home"
            component={menuStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="food" size={30} color={color} />
              ),
            }}
            initialParams={{
              data: data,
              orderEvent: this.handleOrder,
            }}
          />
          <BottomNav.Screen
            name="Order"
            options={{
              tabBarIcon: ({ color }) => (
                <View>
                  {this.state.orders.length != 0 ? (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: '#FED766',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 5,
                        left: -20,
                      }}
                    >
                      <Text style={{}}>{this.state.orders.length}</Text>
                    </View>
                  ) : null}
                  <Icon name="cart" size={30} color={color} />
                </View>
              ),
            }}
          >
            {(props) => {
              return (
                <Order
                  {...props}
                  orders={this.state.orders}
                  handleDeleteOrder={this.handleDeleteOrder}
                  tip={this.state.tip}
                />
              );
              this.setState({ test: 'test' });
            }}
          </BottomNav.Screen>
        </BottomNav.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
