import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import MealItem from './meal-item';
import {
  NavigationScreenProp,
  NavigationScreenComponent,
} from 'react-navigation';
import { useAppSelector } from '../store';

export interface ExtraProps {
  listData: any;
}

export interface MealListProps {
  navigation: NavigationScreenProp<any>;
}

const MealList: NavigationScreenComponent<MealListProps, ExtraProps> = ({
  navigation,
  listData,
}) => {
  const { favoriteMeals } = useAppSelector((state) => state.meals);
  
  const renderCategoryMeals = (itemData: any) => {
    const { id, title, duration, affordability, complexity, imageUrl } =
      itemData.item;
    const isFavorite = favoriteMeals.some((meal) => id === meal.id);

    return (
      <MealItem
        title={title}
        duration={duration}
        affordability={affordability}
        complexity={complexity}
        imageSrc={imageUrl}
        onSelect={() =>
          navigation.navigate({
            routeName: 'MealDetail',
            params: { mealId: id, mealTitle: title, isFavorite },
          })
        }
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        renderItem={renderCategoryMeals}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealList;
