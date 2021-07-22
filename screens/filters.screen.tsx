import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';
import {
  NavigationScreenProp,
  NavigationScreenComponent,
} from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { setFilters, resetMeals } from '../store/slices/meals-slice';
import { useAppDispatch } from '../store';
import CustomHeaderButton from '../components/header-button';

export interface ExtraProps {}

export interface FiltersProps {
  navigation: NavigationScreenProp<any, any>;
}

interface FilterSwitchProps {
  state: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
}

const FilterSwitch: React.FC<FilterSwitchProps> = ({
  state,
  label,
  onChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch value={state} onValueChange={onChange} />
    </View>
  );
};

const Filters: NavigationScreenComponent<ExtraProps, FiltersProps> = ({
  navigation,
}) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useAppDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  const resetMealsHandler = () => {
    setIsGlutenFree(false);
    setIsLactoseFree(false);
    setIsVegan(false);
    setIsVegetarian(false);
    dispatch(resetMeals());
  };

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>

      <View style={styles.filterContainer}>
        <Text>Gluten-free</Text>
        <Switch
          value={isGlutenFree}
          onValueChange={(newValue: boolean) => setIsGlutenFree(newValue)}
        />
      </View>
      {/* <FilterSwitch
        label='Gluten-free'
        state={isGlutenFree}
        onCahnge={(newValue: boolean) => setIsGlutenFree(newValue)}
      /> */}
      <View style={styles.filterContainer}>
        <Text>Lactose-free</Text>
        <Switch
          value={isLactoseFree}
          onValueChange={(newValue: boolean) => setIsLactoseFree(newValue)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Vagan</Text>
        <Switch
          value={isVegan}
          onValueChange={(newValue: boolean) => setIsVegan(newValue)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Vegetarian</Text>
        <Switch
          value={isVegetarian}
          onValueChange={(newValue: boolean) => setIsVegetarian(newValue)}
        />
      </View>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Reload'
          iconName='ios-reload-outline'
          iconSize={30}
          onPress={resetMealsHandler}
        />
      </HeaderButtons>
    </View>
  );
};

Filters.navigationOptions = ({ navigation }) => {
  const isIos = Platform.OS === 'ios' ? true : false;
  return {
    haederTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          iconSize={30}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {isIos ? (
          <Item
            title='Save'
            iconSize={30}
            color='#1f0ee3'
            onPress={navigation.getParam('save')}
          />
        ) : (
          <Item
            title='Save'
            iconName='ios-save'
            iconSize={30}
            onPress={navigation.getParam('save')}
          />
        )}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    marginVertical: 15,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Filters;
