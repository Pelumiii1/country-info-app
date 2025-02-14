import React, { useEffect } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  useAnimatedValue,
} from "react-native";
import FilterSheet from "./FilterSheet";
import LanguageSheet from "./LanguageSheet";

const BottomSheet = ({
  closeSheet,
  type,
}: {
  closeSheet: () => void;
  type: string;
}) => {
  const slide = useAnimatedValue(900);

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 900,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideUp();
  }, []);

  // Close bottom sheet
  const handleClose = () => {
    closeSheet();
    slideDown();
  };
  return (
    <Pressable onPress={handleClose} style={styles.backdrop}>
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
      >
        {type === "language" ? (
          <LanguageSheet closeSheet={handleClose} />
        ) : (
          <FilterSheet closeSheet={handleClose} />
        )}
      </Animated.View>
    </Pressable>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "120%",
    height: "110%",
    paddingHorizontal: 0,
    paddingTop: 0,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    height: "auto",
    maxHeight: "80%",
    width: "93%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 50,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  languageText: {
    fontSize: 16,
  },
});
