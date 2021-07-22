import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import DefaultText from './default-text';

export interface MealItemProps {
  title: string;
  duration: number;
  complexity: string;
  affordability: string;
  imageSrc: string;
  onSelect: () => void;
}

const MealItem: React.SFC<MealItemProps> = ({
  title,
  duration,
  complexity,
  affordability,
  imageSrc,
  onSelect,
}) => {

  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelect}>
        <View>
          <View style={[styles.mealRow, styles.mealHeader]}>
            <ImageBackground source={{ uri: imageSrc }} style={styles.bgImage}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            </ImageBackground>
          </View>
          <View style={[styles.mealRow, styles.mealDetail]}>
            <DefaultText>{duration}m</DefaultText>
            <DefaultText>{complexity.toUpperCase()}</DefaultText>
            <DefaultText>{affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    width: '100%',
    height: 200,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 4,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    paddingHorizontal: 20,
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 5,
    textAlign: 'center',
  },
  mealRow: {
    flexDirection: 'row',
    backgroundColor: '#f0932b',
  },
  mealHeader: {
    height: '87%',
  },
  mealDetail: {
    height: '13%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MealItem;
