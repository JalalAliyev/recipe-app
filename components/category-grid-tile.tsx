import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

export interface CategoryGridTileProps {
  title: string;
  color: string;
  onSelect: () => void;
}

const CategoryGridTile: React.FC<CategoryGridTileProps> = ({
  title,
  color,
  onSelect,
}) => {
  const TouchableComp: any =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.gridItem}>
      <TouchableComp onPress={onSelect} style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableComp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: '95%',
    flex: 1,
    margin: 8,
    height: 160,
    elevation: 5,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'right',
  },
});

export default CategoryGridTile;
