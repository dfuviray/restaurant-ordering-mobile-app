import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

class Menu extends Component {
  renderBadge(item) {
    if (item.bestseller)
      return (
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
      );
    return null;
  }
  renderMenu = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('MenuDetails', {
            item: item,
            orderEvent: this.props.route.params.orderEvent,
          })
        }
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
            height: 120,
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
            width: Dimensions.get('window').width / 1.5,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 5,
              color: '#171A21',
              fontWeight: '600',
            }}
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 5, color: '#171A21' }}>
            {'$' + item.price}
          </Text>
          {this.renderBadge(item)}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <ScrollView>
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
              uri:
                'https://images.pexels.com/photos/3219483/pexels-photo-3219483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
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
        <Text
          style={{
            marginVertical: 10,
            fontSize: 30,
            paddingLeft: 5,
            color: '#171A21',
            fontWeight: '600',
          }}
        >
          Menu
        </Text>

        <FlatList
          data={this.props.route.params.data}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => this.renderMenu(item)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Menu;
