import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CustomButton from './CustomButton';

export default class MenuDetails extends Component {
  state = {
    orderButton: true,
    quantity: 0,
  };

  addOrder = () => {
    this.setState({
      orderButton: !this.state.orderButton,
      quantity: 1,
    });
  };

  handleIncreaseOrder = () => {
    let orderQuantity = this.state.quantity;
    orderQuantity++;
    this.setState({
      quantity: orderQuantity,
    });
  };

  handleDecreaseOrder = () => {
    let orderQuantity = this.state.quantity;
    orderQuantity--;
    this.setState({
      quantity: orderQuantity,
    });
  };

  handleAddToOrder = () => {
    this.props.route.params.orderEvent(
      this.props.route.params.item,
      this.state.quantity,
      this.generateId()
    );
    this.props.navigation.navigate('Menu');
  };

  generateId() {
    const range = 20;
    const randomNumber = Math.floor(Math.random() * Math.floor(range));
    const dateInMilliSeconds = Date.now().toString();
    return dateInMilliSeconds + randomNumber;
  }

  renderOrderButtons(item) {
    if (this.state.orderButton)
      return (
        <TouchableOpacity
          style={{
            backgroundColor: '#E83151',
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => this.addOrder()}
        >
          <Text style={{ color: '#fff' }}>Order</Text>
        </TouchableOpacity>
      );
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <CustomButton
            isDisabled={!(this.state.quantity != 0)}
            textLabel="-"
            event={() => this.handleDecreaseOrder()}
          />
          <Text style={{ marginHorizontal: 10 }}>{this.state.quantity}</Text>
          <CustomButton
            isDisabled={false}
            textLabel="+"
            event={() => this.handleIncreaseOrder()}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#E83151',
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => this.handleAddToOrder()}
        >
          <Text style={{ color: '#fff' }}>Add to order</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { item } = this.props.route.params;

    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ height: Dimensions.get('window').width / 2 }}>
          <ImageBackground
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            source={{
              uri: item.img_uri,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['rgba(255,255,255,.4)', 'rgba(255,255,255,.4)']}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            ></LinearGradient>
          </ImageBackground>
        </View>
        <View style={{ padding: 10 }}>
          {this.renderOrderButtons(item)}
          <Text
            style={{
              fontSize: 30,
              marginBottom: 5,
              color: '#171A21',
              fontWeight: '600',
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 5,
              color: '#171A21',
            }}
          >
            {'$' + item.price}
          </Text>
          {item.bestseller ? (
            <View
              style={{
                padding: 3,
                backgroundColor: '#FED766',
                width: 75,

                borderRadius: 5,
              }}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                Best Seller
              </Text>
            </View>
          ) : null}

          <Text style={{ marginBottom: 10 }}>Description:</Text>
          <Text style={{ textAlign: 'justify' }}>{item.description}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
