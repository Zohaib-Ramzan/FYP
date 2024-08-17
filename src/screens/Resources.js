import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_TOKEN } from '../utills/API_TOKEN';
import CustomText from '../components/CustomText';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ArticleLayout from '../components/ArticleLayout';

const Resources = () => {

  const [articles, setArticles] = useState([]);

useEffect(() => {
  fetchNewsApi();
},[]);

  const fetchNewsApi = async () => {
    fetch(`https://newsapi.org/v2/everything?q=brain+tumor&apiKey=${API_TOKEN}`)
    .then((response) => response.json())
    .then((json) => {
      setArticles(json.articles);
    })
    .catch((error) => console.log(error))
  };

  const renderItem = ({item}) => (
    <View style={styles.articleContainer}>
      <ArticleLayout 
    title={item.title} 
    description={item.description}
    image={item.urlToImage}
    />
    </View>
  )
  return (
    <View style={styles.container}>
      <Text>Resources</Text>
      <FlatList 
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item) => item.url}
      />
    </View>
  )
}

export default Resources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  articleContainer: {
    alignSelf:'center'
  },
  imgContainer: {
    width: responsiveWidth(20), 
    height: responsiveHeight(10)
  }
  
})