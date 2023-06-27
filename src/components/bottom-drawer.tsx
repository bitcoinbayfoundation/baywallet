import {Icon, Text, useTheme} from '@ui-kitten/components';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';

const {height} = Dimensions.get('window');
export enum DrawerState {
  Open = height - 175,
  Closed = 0,
}

interface Props {
  children?: React.ReactNode;
}

export const BottomDrawer = ({children}: Props) => {
  const [label, setLabel] = useState(false);
  const theme = useTheme();
  const y = useRef(new Animated.Value(DrawerState.Closed)).current;
  const state = useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = height * 0.05;
  const movementValue = (moveY: number) => height - moveY;

  const onPanResponderMove = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  const onPanResponderRelease = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const valueToMove = movementValue(moveY);
    //@ts-ignore
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState);
  };

  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    {dy}: PanResponderGestureState,
  ) => Math.abs(dy) >= 10;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  const getNextState = (
    currentState: DrawerState,
    val: number,
    margin: number,
  ) => {
    switch (currentState) {
      case DrawerState.Open:
        setLabel(false);
        return val >= currentState ? DrawerState.Open : DrawerState.Closed;
      case DrawerState.Closed:
        setLabel(true);
        return val >= currentState + margin
          ? DrawerState.Open
          : DrawerState.Closed;
      default:
        return currentState;
    }
  };

  const HorizontalLine = () => {
    return (
      <View
        style={{
          marginVertical: 3,
          // backgroundColor: "#FFF",
          height: 25,
          width: '50%',
          alignSelf: 'center',
          borderRadius: 100,
        }}>
        {label ? (
          <Text style={{textAlign: 'center'}}>Transactions</Text>
        ) : (
          <Icon name="arrow-ios-upward-outline" fill="#FFF" />
        )}
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        width: '100%',
        backgroundColor: theme['background-basic-color-1'],
        height: height,
        borderRadius: 25,
        position: 'absolute',
        bottom: -height + 40,
        transform: [{translateY: y}],
      }}
      {...panResponder.panHandlers}>
      <HorizontalLine />
      {children}
    </Animated.View>
  );
};

const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: any,
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start(finished => {
    finished && callback && callback();
  });
};
