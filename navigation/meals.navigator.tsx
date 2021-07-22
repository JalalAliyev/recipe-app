import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import Categories from '../screens/categories.screen';
import CategoryMeals from '../screens/category-meals.screen';
import Favorites from '../screens/favorites.screen';
import Filters from '../screens/filters.screen';
import MealDetail from '../screens/meal-detail.screen';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? '#f5730f' : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : '#f5730f',
  headerTitle: 'Filter by diet',
};

const MealsNavigator = createStackNavigator(
  {
    Categories: Categories,
    CategoryMeals: {
      screen: CategoryMeals,
    },
    MealDetail: MealDetail,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: Favorites,
    MealDetail: MealDetail,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          const iconName = tabInfo.focused
            ? 'ios-fast-food'
            : 'ios-fast-food-outline';
          return (
            <Ionicons name={iconName} size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        title: 'Your Favorites',
        tabBarLabel: 'Favorites',
        tabBarIcon: (tabInfo) => {
          const iconName = tabInfo.focused ? 'ios-star' : 'ios-star-outline';
          return (
            <Ionicons name={iconName} size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#ff6f00',
    },
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: Filters,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: '#ff6f00',
    },
  }
);

export default createAppContainer(MainNavigator);
