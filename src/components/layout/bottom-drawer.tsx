import React, { useRef, useState } from "react"
import { View, Colors, Text } from "react-native-ui-lib"
import { Animated, Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState, StyleSheet } from "react-native"
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

const { height } = Dimensions.get("window")
export enum DrawerState {
  Open = height - 250,
  Closed = 0
}

interface Props {
  children?: React.ReactNode
}

export const BottomDrawer = ({ children }: Props) => {
  const [label, setLabel] = useState(false)
  const { height } = Dimensions.get("window")
  const y = useRef(new Animated.Value(DrawerState.Closed)).current
  const state = useRef(new Animated.Value(DrawerState.Closed)).current
  const margin = height * .05
  const movementValue = (moveY: number) => height - moveY

  const onPanResponderMove = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const val = movementValue(moveY)
    animateMove(y, val)
  }

  const onPanResponderRelease = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const valueToMove = movementValue(moveY);
    //@ts-ignore
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState);
  };

  const onMoveShouldSetPanResponder = (_: GestureResponderEvent, { dy }: PanResponderGestureState) => Math.abs(dy) >= 10

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder,
    onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
    onPanResponderMove,
    onPanResponderRelease,
  })).current

  const getNextState = (currentState: DrawerState, val: number, margin: number) => {
    switch (currentState) {
      case DrawerState.Open:
        setLabel(false)
        return val >= currentState
          ? DrawerState.Open
          : DrawerState.Closed
      case DrawerState.Closed:
        setLabel(true)
        return val >= currentState + margin
          ? DrawerState.Open
          : DrawerState.Closed;
      default:
        return currentState;
    }
  }

  const Title = () => {
    return (
      <View style={styles.title} center>
        {label ? <Text style={{ fontSize: 18 }}>Transactions</Text> : <CommunityIcon name="chevron-up" size={30} color="#FFF" />}
      </View>
    )
  }

  return (
    <Animated.View
      style={{
        width: "100%",
        backgroundColor: Colors.screenBG,
        height: height,
        borderRadius: 25,
        position: "absolute",
        bottom: -height + 40,
        alignItems: "center",
        borderWidth: 1,
        transform: [{ translateY: y }],
      }}
      {...panResponder.panHandlers}
    >
      <Title />
      {children}
    </Animated.View>
  )
}

const animateMove = (y: Animated.Value, toValue: number | Animated.Value, callback?: any) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true
  }).start(finished => {
    finished && callback && callback()
  })
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 3,
    height: 25,
    width: "50%",
    borderRadius: 100
  }
})