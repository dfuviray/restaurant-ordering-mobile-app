import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomButton from './CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Order extends Component {
  state = { orders: [], selectedTip: 5 };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      const orders = this.getData();
      orders.then((res) => {
        this.setState({ orders: res });
      });
    });
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('orders');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (err) {
      console.log(err);
    }
  };

  handleDecreaseOrder = (item) => {
    const orders = [...this.state.orders];
    const index = orders.findIndex((order) => order == item);
    const order = orders[index];
    order.quantity--;
    this.persistData(orders);
    this.setState({ orders });
  };
  handleIncrease = (item) => {
    const orders = [...this.state.orders];
    const index = orders.findIndex((order) => order == item);
    const order = orders[index];
    order.quantity++;
    this.persistData(orders);
    this.setState({ orders });
  };

  handleDeleteOrder = (item) => {
    const ordersObj = this.state.orders;
    const orders = ordersObj.filter((i) => i.id !== item.id);
    this.setState({ orders });
    this.persistData(orders);
    this.props.handleDeleteOrder(item);
  };

  getGrandTotal() {
    const { orders } = this.state;
    return orders
      .map((item) => item)
      .reduce((total, item) => total + item.quantity * item.price, 0);
  }

  persistData = async (order) => {
    try {
      const jsonValue = JSON.stringify(order);
      await AsyncStorage.setItem('orders', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  renderOrder(item) {
    return (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          borderRadius: 6,
          backgroundColor: '#fff',
          padding: 5,
          margin: 5,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: 70,
            width: Dimensions.get('window').width / 3,
          }}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              alignSelf: 'stretch',
              borderRadius: 5,
            }}
            source={{ uri: item.img_uri }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}
        >
          <Text>{item.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <CustomButton
              isDisabled={!(item.quantity != 0)}
              textLabel="-"
              event={() => this.handleDecreaseOrder(item)}
            />
            <Text style={{ paddingHorizontal: 10 }}>{item.quantity}</Text>
            <CustomButton
              isDisabled={false}
              textLabel="+"
              event={() => this.handleIncrease(item)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ marginRight: 5 }}>
            <Text>Price: {item.price}</Text>
            <Text>Total: {item.price * item.quantity}</Text>
          </View>
          <CustomButton
            isDisabled={false}
            textLabel="x"
            event={() => this.handleDeleteOrder(item)}
          />
        </View>
      </View>
    );
  }

  handleSelectTip = (value) => {
    this.setState({ selectedTip: value });
  };

  renderTip() {
    return this.props.tip.map((value, index) => (
      <TouchableOpacity
        onPress={() => this.handleSelectTip(value)}
        key={index}
        style={{
          backgroundColor:
            this.state.selectedTip == value
              ? '#E83151'
              : 'rgba(232, 49, 81, .4)',
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: 'center', color: '#fff' }}> {value}</Text>
      </TouchableOpacity>
    ));
  }

  getTip() {
    return (this.state.selectedTip / 100) * this.getGrandTotal();
  }

  handleCheckOut = async () => {
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
  render() {
    const { orders } = this.state;
    return (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 30,
            paddingLeft: 5,
          }}
        >
          Orders
        </Text>
        <View>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => this.renderOrder(item)}
          />
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ marginBottom: 10, marginTop: 20 }}>
              Select Tip %:{' '}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {this.renderTip()}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 20 }}>Total: </Text>
            <Text style={{ fontSize: 25 }}>{this.getGrandTotal()}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 20 }}>Grand Total: </Text>
            <Text style={{ fontSize: 25 }}>
              {this.getGrandTotal() + this.getTip()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#E83151',
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 5,
            marginVertical: 40,
            backgroundColor: !(this.state.orders.length == 0)
              ? '#E83151'
              : 'rgba(232, 49, 81, .4)',
          }}
          onPress={() => this.handleCheckOut()}
          disabled={this.state.orders.length == 0}
        >
          <Text style={{ color: '#fff' }}>Check out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
