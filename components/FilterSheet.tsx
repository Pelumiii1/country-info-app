import React, { useState } from "react";
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

  return (
    <View>
      <View style={styles.header}>
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
          <Text style={{ fontSize: 20 }}>Continent</Text>
          <AntDesign name={continentExpanded ? "up" : "down"} size={16} />
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
          <Text style={{ fontSize: 20 }}>Time Zone</Text>
          <AntDesign name={timeZoneExpanded ? "up" : "down"} size={16} />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 16,
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
