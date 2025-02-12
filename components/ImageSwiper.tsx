import React from "react";
import { Image, StyleSheet, View } from "react-native";

const ImageSwiper = ({ countryFlag }: { countryFlag: string }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${countryFlag}` }}
        style={{
          width: "100%",
          height: 180,
          borderRadius: 7,
          marginVertical: 20,
          objectFit: "cover",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { maxHeight: 200 },
});

export default ImageSwiper;
