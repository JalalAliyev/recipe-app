import React from 'react';
import { FlatList } from 'react-native';
import {
  NavigationScreenProp,
  NavigationScreenComponent,
} from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useAppSelector } from '../store';
import CategoryGridTile from '../components/category-grid-tile';
import CustomHeaderButton from '../components/header-button';
import { CATEGORIES } from '../data/dummy-data';

interface ExtraProps {}

interface CategoriesProps {
  navigation: NavigationScreenProp<any, any>;
}

interface ItemCategory {
  item: {
    title: string;
    id: string;
    color: string;
  };
}

const Categories: NavigationScreenComponent<ExtraProps, CategoriesProps> = ({
  navigation,
}) => {
  const { meals } = useAppSelector((state) => state.meals);

  const renderGridItem = (itemData: ItemCategory) => {
    const { id, title, color } = itemData.item;

    return (
      <CategoryGridTile
        title={title}
        color={color}
        onSelect={() =>
          navigation.navigate({
            routeName: 'CategoryMeals',
            params: { categoryId: id },
          })
        }
      />
    );
  };
  return (
    <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} />
  );
};

Categories.navigationOptions = ({ navigation: { toggleDrawer } }) => {
  return {
    headerTitle: 'Categories',
    headerLeft: () => ( 
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => toggleDrawer()} />
      </HeaderButtons>
    ),
  };
};

export default Categories;
