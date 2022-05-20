import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated, BackHandler} from 'react-native';

const IdleSkillBar = props => {
  const overallWidth = props.container?.overallWidth || 400;
  const overallHeight = props.container?.overallHeight || overallWidth / 10;
  const interval = props.interval || 2000;

  const fillAnimation = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(fillAnimation, {
        toValue: overallWidth,
        duration: interval,
        useNativeDriver: false,
      }),
      Animated.timing(fillAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ]).start(result => {
      if (result.finished) {
        animate();
        props.action();
      }
    });
  };

  useEffect(() => {
    animate();
  }, []);

  const styles = StyleSheet.create({
    containerStyles: {
      width: overallWidth,
      height: overallHeight,
      display: 'flex',
      marginVertical: 20,
    },
    mainBarStyles: {
      width: '100%',
      height: '100%',
      backgroundColor: props.mainBar?.background || 'lightgray',
    },
    progressBarStyles: {
      backgroundColor: 'green',
      width: fillAnimation,
      height: overallHeight,
      position: 'absolute',
    },
  });

  return (
    <View style={styles.containerStyles}>
      <View style={styles.mainBarStyles}></View>
      <Animated.View style={styles.progressBarStyles}></Animated.View>
    </View>
  );
};

export default IdleSkillBar;
