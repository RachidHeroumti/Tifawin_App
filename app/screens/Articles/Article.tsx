import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../../layout/Header';
import { useTheme } from 'react-native-paper';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';

type ArticleScreenProps = StackScreenProps<RootStackParamList, 'Article'>;

const { width } = Dimensions.get('window'); 

const Article: React.FC<ArticleScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();

  const articlesData = [
    {
      image: IMAGES.m1,
      title: 'Reviving Traditional Weaving in the Atlas',
      date: '12/03/2024',
      description: 'A look at how local cooperatives are preserving ancient weaving techniques in the High Atlas mountains.',
    },
    {
      image: IMAGES.m2,
      title: 'Sustainable Farming in Southern Morocco',
      date: '28/02/2024',
      description: 'Farmers in the Souss-Massa region are embracing eco-friendly agriculture to fight climate change.',
    },
    {
      image: IMAGES.m3,
      title: 'Women Leading the Argan Oil Revolution',
      date: '05/01/2024',
      description: 'Meet the women transforming their communities through argan oil cooperatives.',
    },
    {
      image: IMAGES.m4,
      title: 'Pottery Traditions of Safi',
      date: '22/12/2023',
      description: 'Safi’s pottery heritage continues to thrive thanks to young artisans embracing old techniques.',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Articles" leftIcon="back" titleLeft />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* First Article with Full Width Image */}
        <TouchableOpacity 
          style={styles.featuredCard}
          onPress={() => {/* Add navigation if needed */}}
        >
          <Image 
            source={articlesData[0].image} 
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>{articlesData[0].title}</Text>
            <Text style={styles.featuredDate}>{articlesData[0].date}</Text>
            <Text 
              style={styles.featuredDescription}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {articlesData[0].description}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Remaining Articles */}
        <View style={styles.articlesContainer}>
          {articlesData.slice(1).map((article, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.articleCard}
              onPress={() => {/* Add navigation if needed */}}
            >
              <Image 
                source={article.image} 
                style={styles.articleImage}
                resizeMode="cover"
              />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDate}>{article.date}</Text>
                <Text 
                  style={styles.articleDescription}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {article.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 15,
  },
  // Featured Article Styles (First Article)
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: width - 30, // Full width minus padding
    height: 200, // Adjust height as needed
  },
  featuredContent: {
    padding: 15,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 5,
  },
  featuredDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  // Regular Articles Styles
  articlesContainer: {
    gap: 15,
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleContent: {
    flex: 1,
    padding: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 5,
  },
  articleDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default Article;