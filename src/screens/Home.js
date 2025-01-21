import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Block from "../components/Block";
import ButtonComp from "../components/ButtonComp";
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import { AppContext } from "../hooks/Context";
import { collection, getDocs, query, where, deleteDoc, doc, onSnapshot, orderBy } from "firebase/firestore";
import { FIRESTORE_DB } from "../../config";
import DateFormat from "../components/DateFormat";
import CustomText from "../components/CustomText";

const Home = () => {
  const navigation = useNavigation();
  const { users } = useContext(AppContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteIcon, setShowDeleteIcon] = useState(null);
  const [isUserReady, setIsUserReady] = useState(false);

  const ItemSeparator = () => <View style={styles.separator} />;

  useEffect(() => {
    if (users && users.name) {
      setIsUserReady(true);
    }
  }, [users]);


  useEffect(() => {
    let unsubscribe; 
  
    const fetchPredictions = () => {
      if (!users || !users.uid) {
        return;
      }
  
      const q = query(
        collection(FIRESTORE_DB, 'BTPPredictions'),
        where('uid', '==', users.uid),
        orderBy('timestamp', 'desc')
      );
  
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userPredictions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPredictions(userPredictions);
        setLoading(false);
      });
    };
  
    fetchPredictions();
  
    return () => {
      if (unsubscribe) {
        unsubscribe(); 
      }
    };
  }, [users.uid]);

    const handleLongPress = (id) => {
      setShowDeleteIcon((prevId) => (prevId === id ? null : id))
    };

    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(FIRESTORE_DB, 'BTPPredictions', id));
        setPredictions((prev) => prev.filter((prediction => prediction.id !== id)));
        setShowDeleteIcon(null);
      } catch (error) {
        console.log("Error deleting prediction:", error);
        
      }
    }

    
  useEffect(() => {
    const backAction = () => {
      setShowDeleteIcon(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);
   

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6200EE" barStyle="dark-content" />
        <View style={styles.headingContainer}>
          <CustomText style={styles.headingStyle}>{`Welcome back, ${loading ? ' ...' : users.name}!`}</CustomText>
          <CustomText style={styles.subHeadingStyle}>{`Here’s your brain tumor prediction history:`}</CustomText>
        </View>
      <View style={styles.body_container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200EE" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {predictions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{'Try your First Prediction...'}</Text>
              </View>
            ) : (
              <FlatList
                data={predictions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  
                  <Block 
                  onLongPress={() => handleLongPress(item.id)}
                  type={item.type} 
                  imageUrl={item.imageUrl}
                  confidence={item.probability} 
                  dateComponent={<DateFormat timestamp={item.timestamp} />}
                  showDeleteIcon={showDeleteIcon === item.id}
                  onDelete={() => handleDelete(item.id)}
                />
                  
                )}
                ItemSeparatorComponent={ItemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.blockContainerStyle}
              />
            )}
          </View>
        )}
        <ButtonComp
          text={"New Prediction"}
          onPress={() => navigation.navigate("Prediction")}
          bgStyle={{ alignSelf: "center" }}
          btnStyle={styles.btnStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: responsiveHeight(2)
  },
  body_container: {
    flex: 1,
    alignSelf: "center",
  },
  btnStyle: {
    width: responsiveWidth(60),
  },
  blockContainerStyle: {
    paddingBottom: responsiveHeight(2),
  },
  separator: {
    height: responsiveHeight(1.5),
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#000",
    marginBottom: responsiveHeight(2),
  },
  listContainer: {
    flex: 1,
  },
  headingStyle: {
    fontSize: 24
  },
  subHeadingStyle: {
    fontSize: 14
  },
  headingContainer: {
    alignSelf:'center',
    marginBottom:responsiveWidth(5)
  }
});
