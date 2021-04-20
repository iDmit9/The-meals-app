import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaulText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
   return (
      <View style={styles.listItem}>
         <DefaulText>{props.children}</DefaulText>
      </View>
   )
}

const MealDetailScreen = props => {
   const availableMeals = useSelector(state => state.meals.meals);
   const mealId = props.route.params.mealId;
   const currentMealIsFavorite = useSelector(state =>
      state.meals.favoriteMeals.some(meal => meal.id === mealId)
   );

   const selectedMeal = availableMeals.find(meal => meal.id === mealId);

   const dispatch = useDispatch();

   const toggleFavoriteHandler = useCallback(() => {
      dispatch(toggleFavorite(mealId));
   }, [dispatch, mealId]);

   useEffect(() => {
      props.navigation.setOptions({ 
         headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Item title='Favorite' iconName={currentMealIsFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavoriteHandler} />
            </HeaderButtons>
         ) 
      })
   }, [toggleFavoriteHandler, currentMealIsFavorite]);

   return (
      <ScrollView >
         <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
         <View style={styles.details}>
            <DefaulText>{selectedMeal.duration}m</DefaulText>
            <DefaulText>{selectedMeal.complexity.toUpperCase()}</DefaulText>
            <DefaulText>{selectedMeal.affordability.toUpperCase()}</DefaulText>
         </View>
         <Text style={styles.title}>Ingredients</Text>
         {selectedMeal.ingredients.map(ingredient => (
            <ListItem key={ingredient}>{ingredient}</ListItem>
         ))}
         <Text style={styles.title}>Steps</Text>
         {selectedMeal.steps.map(step => (
            <ListItem key={step}>{step}</ListItem>
         ))}
      </ScrollView>
   );
};

export const mealDetailScreenOptions = (navigationData) => {
   const mealTitle = navigationData.route.params?.mealTitle ?? ''
   return {
      headerTitle: mealTitle      
   };
};

const styles = StyleSheet.create({
   image: {
      width: '100%',
      height: 200
   },
   details: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-around'
   },
   title: {
      fontFamily: 'open-sans-bold',
      fontSize: 20,
      textAlign: 'center'
   },
   listItem: {
      marginVertical: 10,
      marginHorizontal: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10
   }
});

export default MealDetailScreen;