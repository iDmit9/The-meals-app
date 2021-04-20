import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CategoriesScreen, { categoriesScreenOptions } from '../screens/CategoriesScreen';
import CategoryMealsScreen, { categoryMealScreenOptions } from '../screens/CategoryMealsScreen';
import MealDetailScreen, { mealDetailScreenOptions } from '../screens/MealDetailScreen';
import FavoritesScreen, { favoritesScreenOptions } from '../screens/FavoritesScreen';
import FiltersScreen, { filtersScreenOptions } from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
        fontWeight: 'normal'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
        fontWeight: undefined
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
}

const MealsStackNavigator = createStackNavigator();

const MealsNavigator = () => {
    return <MealsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
        <MealsStackNavigator.Screen 
            name='Categories'
            component={CategoriesScreen}
            options={categoriesScreenOptions}
        />
        <MealsStackNavigator.Screen 
            name='CategoryMeals'
            component={CategoryMealsScreen}
            options={categoryMealScreenOptions}
        />
        <MealsStackNavigator.Screen 
            name='MealDetail'
            component={MealDetailScreen}
            options={mealDetailScreenOptions}
        />
    </MealsStackNavigator.Navigator>
}

const FavoritesStackNavigator = createStackNavigator();

const FavNavigator = () => {
    return <FavoritesStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
        <FavoritesStackNavigator.Screen
            name='Favorites'
            component={FavoritesScreen}
            options={favoritesScreenOptions}
        />
        <FavoritesStackNavigator.Screen
            name='MealDetail'
            component={MealDetailScreen}
            options={mealDetailScreenOptions}
        />
    </FavoritesStackNavigator.Navigator>
}

const mealsTabOptions = {
    tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.color} />
    },
    tabBarColor: Colors.primaryColor,
    tabBarLabel: Platform.OS === 'android'
        ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        : 'Meals'
}

const favoritesTabOptions = {
    tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.color} />
    },
    tabBarColor: Colors.accentColor,
    tabBarLabel: Platform.OS === 'android'
        ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        : 'Favorites'
}

const MaterialBottomTabs = createMaterialBottomTabNavigator();

const MaterialTabs = () => {
    return (
        <MaterialBottomTabs.Navigator
            activeColor='white'            
            shifting={true}
        >
            <MaterialBottomTabs.Screen
                name="Meals"
                component={MealsNavigator}
                options={mealsTabOptions}
            />
            <MaterialBottomTabs.Screen
                name="Favorites"
                component={FavNavigator}
                options={favoritesTabOptions}
            />
        </MaterialBottomTabs.Navigator>
    ) 
}

const BottomTabs = createBottomTabNavigator();

const StandardTabs = () => {
    return (
        <BottomTabs.Navigator 
            tabBarOptions={{
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                },
                activeTintColor: Colors.accentColor,
            }}
        >
            <BottomTabs.Screen
                name="Meals"
                component={MealsNavigator}
                options={mealsTabOptions}
            />
            <BottomTabs.Screen
                name="Favorites"
                component={FavNavigator}
                options={favoritesTabOptions}
            />
        </BottomTabs.Navigator>
    )
}

const FiltersStackNavigator = createStackNavigator();

const FiltersNavigator = () => {
    return <FiltersStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
        <FiltersStackNavigator.Screen 
            name='Filters'
            component={FiltersScreen}
            options={filtersScreenOptions}
        />
    </FiltersStackNavigator.Navigator>
}

const MainDrawerNavigator = createDrawerNavigator();

const MainNavigator = () => {
    return <MainDrawerNavigator.Navigator        
        drawerContentOptions={{
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }}
    >
        <MainDrawerNavigator.Screen 
            name='MealsFavs'
            component={
                Platform.OS === 'android'
                    ? MaterialTabs
                    : StandardTabs 
            }
            options={{
                drawerLabel: 'Meals'
            }}
        />
        <MainDrawerNavigator.Screen 
            name='Filters'
            component={FiltersNavigator}
        />
    </MainDrawerNavigator.Navigator>
}

const AppNavigator = () => {    
    return <NavigationContainer>
       <MainNavigator />
    </NavigationContainer>
}

export default AppNavigator;
