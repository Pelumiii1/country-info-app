import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DarkModeContext } from "../../DarkModeContext";

interface CountryInfo {
  name: { common: string; official: string };
  capital: string;
  description?: string;
  continent?: string;
  current_president?: {
    name?: string;
  };
  population: number;
  currency: string;
  phone_code: string;
  size: string;
  independence_date?: string;
  flags: { svg: string; png: string };
}

const SingleCountry = () => {
  const { flag, offiical, capital, population, continent, suffixes, root } =
    useLocalSearchParams();
  const { isDarkMode } = useContext(DarkModeContext);
  const [countryInfo, setCountryInfo] = useState<CountryInfo>(
    {} as CountryInfo
  );

  //   try {
  //     const response = await axios.get(
  //       `https://restfulcountries.com/api/v1/countries/${country}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer 2086|hh3UjLISywjzPPvwIbxwOsIehwG7isUibctm4RGh`,
  //         },
  //       }
  //     );
  //     setCountryInfo(response.data.data);
  //     if (response?.data?.data?.href?.states) {
  //       const statesResponse = await axios.get(
  //         `${response?.data?.data?.href?.states}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer 2086|hh3UjLISywjzPPvwIbxwOsIehwG7isUibctm4RGh`,
  //           },
  //         }
  //       );
  //       setStates(statesResponse.data.data);
  //     }
  //   } catch (error) {
  //     console.log("Error fetch country", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (country) getCountryInfo();
  // }, [country]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    textContainer: {
      flexDirection: "row",
      gap: 5,
    },
    title: {
      fontWeight: 700,
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
    text: {
      fontWeight: 300,
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: `${flag}`,
          }}
          alt={`${offiical}`}
          style={{
            width: "100%",
            height: 180,
            borderRadius: 7,
            marginVertical: 20,
            objectFit: "cover",
          }}
        />
        <View style={{ marginVertical: 10, rowGap: 10 }}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Full name:</Text>
            <Text style={styles.text}>{offiical}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Capital:</Text>
            <Text style={styles.text}>{capital}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Population:</Text>
            <Text style={styles.text}>{population}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Region:</Text>
            <Text style={styles.text}>{continent}</Text>
          </View>
          {root && suffixes && (
            <View style={styles.textContainer}>
              <Text style={styles.title}>Phone Code:</Text>
              <Text style={styles.text}>{`${root}${suffixes}`}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleCountry;
