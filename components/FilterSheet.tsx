import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { DarkModeContext } from "@/DarkModeContext";

const continents = [
  "Africa",
  "Antarctica",
  "Asia",
  "Australia",
  "Europe",
  "North America",
  "South America",
];
const timeZones = [
  "GMT+1:00",
  "GMT+2:00",
  "GMT+3:00",
  "GMT+4:00",
  "GMT+5:00",
  "GMT+6:00",
  "GMT-6:00",
];

const FilterSheet = ({ closeSheet }: { closeSheet: () => void }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [continentExpanded, setContinentExpanded] = useState(false);
  const [timeZoneExpanded, setTimeZoneExpanded] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    selectedList: string[],
    setSelected: Function
  ) => {
    if (selectedList.includes(item)) {
      setSelected(selectedList.filter((i) => i !== item));
    } else {
      setSelected([...selectedList, item]);
    }
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontWeight: "700",
      fontSize: 18,
      color: isDarkMode ? "white" : "black",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      color: isDarkMode ? "white" : "black",
    },
    filterItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      color: isDarkMode ? "white" : "black",
    },
    filterText: {
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
    bottomContainer: {
      flexDirection: "row",
      gap: 20,
    },
    resetButton: {
      borderWidth: 1,
      borderColor: "black",
      padding: 15,
      textAlign: "center",
      width: "20%",
    },
    resultButton: {
      borderWidth: 1,
      borderColor: "black",
      padding: 15,
      textAlign: "center",
      width: "80%",
    },
  });

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={[styles.header, { paddingBottom: 10 }]}>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={closeSheet}>
          <AntDesign name="close" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Continent Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setContinentExpanded(!continentExpanded)}
        >
          <Text style={{ fontSize: 20, color: isDarkMode ? "white" : "black" }}>
            Continent
          </Text>
          <AntDesign
            name={continentExpanded ? "up" : "down"}
            size={16}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        {continentExpanded &&
          continents.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.filterItem}
              onPress={() =>
                toggleSelection(item, selectedContinents, setSelectedContinents)
              }
            >
              <Text style={styles.filterText}>{item}</Text>
              <Checkbox
                status={
                  selectedContinents.includes(item) ? "checked" : "unchecked"
                }
                onPress={() =>
                  toggleSelection(
                    item,
                    selectedContinents,
                    setSelectedContinents
                  )
                }
              />
            </TouchableOpacity>
          ))}

        {/* Time Zone Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setTimeZoneExpanded(!timeZoneExpanded)}
        >
          <Text style={{ fontSize: 20, color: isDarkMode ? "white" : "black" }}>
            Time Zone
          </Text>
          <AntDesign
            name={timeZoneExpanded ? "up" : "down"}
            size={16}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        {timeZoneExpanded &&
          timeZones.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.filterItem}
              onPress={() =>
                toggleSelection(item, selectedTimeZones, setSelectedTimeZones)
              }
            >
              <Text style={styles.filterText}>{item}</Text>
              <Checkbox
                status={
                  selectedTimeZones.includes(item) ? "checked" : "unchecked"
                }
                onPress={() =>
                  toggleSelection(item, selectedTimeZones, setSelectedTimeZones)
                }
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default FilterSheet;
