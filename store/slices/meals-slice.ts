import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MEALS } from '../../data/dummy-data';

interface InitialState {
  id: string;
  categoryIds: string[];
  title: string;
  affordability: string;
  complexity: string;
  imageUrl: string;
  duration: number;
  ingredients: string[];
  steps: string[];
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLoctoseFree: boolean;
}

interface DietActionProps {
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
}

let favoriteMeals: InitialState[] = [];

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    changeFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const currentIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === id
      );

      if (currentIndex >= 0) {
        const updatedMeals = state.favoriteMeals.filter(
          (meal, index) => index !== currentIndex
        );

        state.favoriteMeals = updatedMeals;
      } else {
        const addedMeal = state.meals.find((meal) => meal.id === id);
        if (addedMeal) {
          state.favoriteMeals = [...state.favoriteMeals, addedMeal];
        }
      }
    },
    setFilters: (state, action: PayloadAction<DietActionProps>) => {
      const { isGlutenFree, isLactoseFree, isVegan, isVegetarian } =
        action.payload;
      const filteredMeals = state.meals.filter((meal) => {
        if (meal.isGlutenFree && !isGlutenFree) return false;
        if (meal.isLoctoseFree && !isLactoseFree) return false;
        if (meal.isVegan && !isVegan) return false;
        if (meal.isVegetarian && !isVegetarian) return false;
        return true;
      });
      state.filteredMeals = filteredMeals;
    },
    resetMeals: (state) => {
      state.filteredMeals = state.meals;
    },
  },
});

export const { changeFavorite, setFilters, resetMeals } = mealsSlice.actions;

export default mealsSlice.reducer;
