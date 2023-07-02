import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Colors, TouchableOpacity, Text } from "react-native-ui-lib"

export const BottomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomTab} centerH>
      <View row width="75%">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Use Platfrom for android specific
          const styles = StyleSheet.create({
            tab: {
              flex: 1,
              textAlign: 'center',
              margin: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: isFocused ? Colors.primary : "#555",
              height: 50,
              shadowOffset: isFocused ? { width: 0, height: 0 } : undefined,
              shadowColor: isFocused ? Colors.primary : undefined,
              shadowOpacity: 1,
              shadowRadius: 5,
            },
            text: {
              color: isFocused ? Colors.primary : Colors.white,
            }
          })

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              activeOpacity={1.0}
              backgroundColor={Colors.screenBG}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              key={`bottom-tab-${label}`}
              row
              center
            >
              <Text style={styles.text}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: "transparent",
  }
})
