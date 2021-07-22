import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationScreenComponent,
} from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useAppSelector, useAppDispatch } from '../store';
import { changeFavorite } from '../store/slices/meals-slice';
import DefaultText from '../components/default-text';
import CustomHeaderButton from '../components/header-button';

export interface ExtraProps {}

export interface MealDetailProps {
  navigation: NavigationScreenProp<any, any>;
}

const ListItem: React.SFC<{ children: string }> = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

const MealDetail: NavigationScreenComponent<ExtraProps, MealDetailProps> = ({
  navigation,
}) => {
  const { meals } = useAppSelector((state) => state.meals);
  const mealId = navigation.getParam('mealId');
  const currentMealIsFav = useAppSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal: any = meals.find((meal) => meal.id === mealId);
  const dispatch = useAppDispatch();

  const toggleDispatchHandler = useCallback(() => {
    dispatch(changeFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ isFavorite: currentMealIsFav });
  }, [currentMealIsFav]);

  useEffect(() => {
    navigation.setParams({ toggleDispatch: toggleDispatchHandler });
  }, [selectedMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal?.ingredients.map((ingredient: string) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step: string) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
      <Text style={styles.title}>Dietic</Text>

      <View style={[styles.listItem, styles.diet]}>
        <Text style={styles.text}>Gluten:</Text>
        <Text style={styles.text}>{selectedMeal.isGlutenFree ? 'Yes' : 'No'}</Text>
      </View>
      <View style={[styles.listItem, styles.diet]}>
        <Text style={styles.text}>Lactose:</Text>
        <Text style={styles.text}>{selectedMeal.isLactoseFree ? 'Yes' : 'No'}</Text>
      </View>
      <View style={[styles.listItem, styles.diet]}>
        <Text style={styles.text}>Vegan:</Text>
        <Text style={styles.text}>{selectedMeal.isVegan ? 'Yes' : 'No'}</Text>
      </View>
      <View style={[styles.listItem, styles.diet]}>
        <Text style={styles.text}>Vegetarian:</Text>
        <Text style={styles.text}>{selectedMeal.isVegetarian ? 'Yes' : 'No'}</Text>
      </View>
    </ScrollView>
  );
};

MealDetail.navigationOptions = ({ navigation }) => {
  const selectedTitle = navigation.getParam('mealTitle');
  const toggleDispatch = navigation.getParam('toggleDispatch');
  const isFavorite = navigation.getParam('isFavorite');

  return {
    headerTitle: selectedTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorite'
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          color={Platform.OS === 'ios' ? '#f2ee0a' : '#f5f10f'}
          onPress={toggleDispatch}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  diet: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    fontFamily: 'open-sans-bold'
  }
});
export default MealDetail;
