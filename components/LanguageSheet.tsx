import React, { useContext, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { DarkModeContext } from "@/DarkModeContext";

const languages = [
  "Bahasa",
  "Deutsch",
  "English",
  "Español",
  "Française",
  "Italiano",
  "Português",
  "Pусский",
  "Svenska",
  "Türkçe",
  "普通话",
  "‏العربية‏",
  "বাংলা",
];

const LanguageSheet = ({ closeSheet }: { closeSheet: () => void }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const { isDarkMode } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: isDarkMode ? "white" : "black",
    },
    title: {
      fontWeight: "700",
      fontSize: 18,
      color: isDarkMode ? "white" : "black",
    },
    closeButton: {
      backgroundColor: "#98A2B3",
      borderRadius: 4,
      padding: 3,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    languageText: {
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
  });

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Languages</Text>
        <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
          <Ionicons name="close-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setSelectedLanguage(item)}
          >
            <Text style={styles.languageText}>{item}</Text>
            <RadioButton
              value={item}
              status={selectedLanguage === item ? "checked" : "unchecked"}
              onPress={() => setSelectedLanguage(item)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LanguageSheet;
