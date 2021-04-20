import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {

   const renderGridItem = (itemData) => {
      return <CategoryGridTile
         title={itemData.item.title}
         color={itemData.item.color}
         onSelect={() => {
            props.navigation.navigate('CategoryMeals', {categoryId: itemData.item.id});
         }} />
   };

   return (
      <FlatList
         keyExtractor={(item, index) => item.id}
         data={CATEGORIES}
         renderItem={renderGridItem}
         numColumns={2} />
   );
};

export const categoriesScreenOptions = (navData) => {
   return {
      headerTitle: 'Meal categories',
      headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
            title='Menu'
            iconName='ios-menu'
            onPress={() => { navData.navigation.toggleDrawer() }}
         />
      </HeaderButtons>
   }
}

export default CategoriesScreen;