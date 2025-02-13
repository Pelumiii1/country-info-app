import { Feather, Fontisto } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DarkModeContext } from "../DarkModeContext";
import { getData, storeData } from "@/utils/storage";

interface Country {
  name: { common: string; official: string };
  capital: string;
  flag: string;
  flags: { png: string };
  population: number;
  region: string;
  idd: { root: string; suffixes: string[] };
}

export default function HomeScreen() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getCountries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const responseData = response.data;
      setCountries(responseData);
      await storeData("Countries", JSON.stringify(responseData));
      setIsLoading(false);
    } catch (error) {
      console.log("Error getting all countries", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStoredCountries = async () => {
      try {
        const data = await getData("Countries");
        const retrievedData = data ? JSON.parse(data) : [];

        if (retrievedData.length === 0) {
          getCountries();
        } else {
          setCountries(retrievedData);
        }
      } catch (error) {
        console.error("Error retrieving countries:", error);
      }
    };

    fetchStoredCountries();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: isDarkMode ? "#000F24" : "white",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F2F4F7",
      borderRadius: 4,
      marginTop: 10,
      paddingHorizontal: 10,
    },
    search: {
      color: "#667085",
      textAlign: "left",
    },
    button: {
      borderColor: "#A9B8D4",
      borderRadius: 4,
      borderWidth: 0.5,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: !isDarkMode ? "black" : "white",
            fontFamily: "Roboto",
            fontSize: 25,
          }}
        >
          Explore
        </Text>
        <Pressable onPress={toggleDarkMode}>
          <Feather
            name={isDarkMode ? "moon" : "sun"}
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </Pressable>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#667085" />
        <TextInput
          placeholder="Search Country"
          style={styles.search}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Fontisto
            name="world-o"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text style={{ color: !isDarkMode ? "black" : "white" }}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather
            name="filter"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text style={{ color: !isDarkMode ? "black" : "white" }}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Country List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? "white" : "black"}
        />
      ) : (
        <FlatList
          data={filteredCountries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginVertical: 15,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              onPress={() =>
                router.push({
                  pathname: `/countries/country`,
                  params: {
                    name: item.name.common,
                    offiical: item.name.official,
                    flag: item.flags.png,
                    capital: item.capital,
                    population: item.population,
                    continent: item.region,
                    root: item.idd.root,
                    suffixes: item.idd.suffixes,
                  },
                })
              }
            >
              <Text style={{ fontSize: 40 }}>{item.flag}</Text>
              <View>
                <Text style={{ color: !isDarkMode ? "black" : "white" }}>
                  {item.name.common}
                </Text>
                <Text style={{ color: "#667085" }}>{item.capital}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {/* {isBottomSheetOpen && (
        <BottomSheet closeSheet={() => setIsBottomSheetOpen(false)} />
      )} */}
    </SafeAreaView>
  );
}
