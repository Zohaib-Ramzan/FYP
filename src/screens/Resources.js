import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { memo , useEffect, useState, useCallback } from 'react'
import { API_TOKEN } from '../utills/API_TOKEN';
import CustomText from '../components/CustomText';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ArticleLayout from '../components/ArticleLayout';
import { WebView } from 'react-native-webview'; // Import WebView

const Resources  = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

useEffect(() => {
  fetchNewsApi();
 },[]);


  const fetchNewsApi = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=brain+tumor+types&apiKey=${API_TOKEN}`);
      const json = await response.json();
      const articlesWithImages = json.articles.filter(article => article.urlToImage && !article.urlToImage.toLowerCase().endsWith('.png'))
      setArticles(articlesWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const RenderItem = memo(({item}) => (
    
    <View style={styles.articleContainer}>
      <ArticleLayout 
        onPress={() => {
          setSelectedUrl(item.url);
          setModalVisible(true); // Show the modal when an article is pressed
        }}
        title={item.title} 
        description={item.description}
        image={item.urlToImage}
      />
    </View>
   
  ));
  
  const renderItem = useCallback(({item}) => <RenderItem item={item} />);

  const closeWebView = () => {
    setModalVisible(false); // Hide the modal
    setSelectedUrl(null); // Reset the selected URL
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.heading}>{'Featured Articles'}</CustomText>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={styles.loadingContainer.color} />
          <CustomText>{'loading...'}</CustomText>
        </View>
        
     ) :  (
      <FlatList 
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item) => item.url || item.id.toString()}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={7}
      />
    )}
    {/* Modal for WebView */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeWebView} // Close modal when back button is pressed
      >
        <View style={styles.modalContainer}>
          {selectedUrl && (
            <WebView
              source={{ uri: selectedUrl }}
              style={styles.webView}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={closeWebView}>
            <CustomText style={styles.closeButtonText}>Close</CustomText>
          </TouchableOpacity>
        </View>
      </Modal>    
    </View>
  )
}

export default Resources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  articleContainer: {
    alignSelf:'center',
    marginTop: responsiveHeight(2),
  },
  imgContainer: {
    width: responsiveWidth(20), 
    height: responsiveHeight(10)
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6200EE'
  },
  heading: {
    marginHorizontal: responsiveWidth(5),
    fontSize: 20,
    fontWeight: '700'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#6200EE',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  
})