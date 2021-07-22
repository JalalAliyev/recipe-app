import React from 'react';
import {
  NavigationScreenProp,
  NavigationScreenComponent,
} from 'react-navigation';

import { useAppSelector } from '../store';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/meal-list';

export interface ExtraProps {}

export interface CategoryMealsProps {
  navigation: NavigationScreenProp<any>;
}

const CategoryMeals: NavigationScreenComponent<ExtraProps, CategoryMealsProps> =
  ({ navigation }) => {
    const catId = navigation.getParam('categoryId');
    const { filteredMeals } = useAppSelector((state) => state.meals);

    const displayedMeals = filteredMeals.filter(
      (meal) => meal.categoryIds.indexOf(catId) >= 0
    );

    return <MealList navigation={navigation} listData={displayedMeals} />;
  };

CategoryMeals.navigationOptions = ({ navigation }) => {
  const catId = navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory?.title,
  };
};

export default CategoryMeals;
