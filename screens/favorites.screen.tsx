import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  NavigationScreenProp,
  NavigationScreenComponent,
} from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useAppSelector } from '../store';
import CustomHeaderButton from '../components/header-button';
import MealList from '../components/meal-list';

export interface ExtraProps {}

export interface FavoritesProps {
  navigation: NavigationScreenProp<any>;
}

const Favorites: NavigationScreenComponent<ExtraProps, FavoritesProps> = ({
  navigation,
}) => {
  const { favoriteMeals } = useAppSelector((state) => state.meals);

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>You don't have any favorite meals.</Text>
        <Text style={styles.text}>Add Now!</Text>
      </View>
    );
  }

  return <MealList navigation={navigation} listData={favoriteMeals} />;
};

Favorites.navigationOptions = ({ navigation: { toggleDrawer } }) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => toggleDrawer()} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 17,
    textAlign: 'center',
    color: '#f5730f',
  },
});

export default Favorites;
