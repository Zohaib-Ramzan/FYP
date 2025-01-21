import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderComp from "../components/HeaderComp";

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const handleEmailPress = () => {
    Linking.openURL('mailto:abc@gmail.com');
  };
  return (
    <View style={styles.container}>
      <HeaderComp onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container_scrollView}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Personal Information:</Text> We do not
          collect personal information unless explicitly provided by you, such
          as your name or email.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Usage Data:</Text> We collect information
          about your interactions with the app, including device type, operating
          system, and usage statistics.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          The information collected is used solely to improve our app's
          functionality and enhance user experience.
        </Text>
        <Text style={styles.text}>
          We do not sell or share your data with third parties.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.text}>
          We implement appropriate technical and organizational measures to
          protect your information against unauthorized access, loss, or misuse.
        </Text>

        <Text style={styles.sectionTitle}>4. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to request access to or deletion of your data.
          Please contact us via the app for any inquiries.
        </Text>

        <Text style={styles.sectionTitle}>
          5. Changes to This Privacy Policy
        </Text>
        <Text style={styles.text}>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy in the app.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at{" "}
          <Text style={styles.link} onPress={handleEmailPress}>
            cosc212101057@Kfueit.edu.pk
          </Text>
          .
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container_scrollView: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#6200EE'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
