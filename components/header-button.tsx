import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

export interface CustomHeaderButtonProps {}

const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      title=''
      IconComponent={Ionicons}
      iconSize={28}
      color={Platform.OS === 'ios' ? '#f5730f' : '#fff'}
      {...props}
    />
  );
};

export default CustomHeaderButton;
