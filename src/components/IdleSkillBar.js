import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';

import styles from '../styles/components/IdleSkillBar.Styles';

const IdleSkillBar = props => {
  const overallWidth = props.container?.overallWidth || 400;
  const overallHeight = props.container?.overallHeight || overallWidth / 10;
  const interval = props.interval || 2000;

  const fillAnimation = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(fillAnimation, {
        toValue: overallWidth - 25,
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
    return () => {
      fillAnimation.stopAnimation();
    };
  }, []);

  return (
    <View
      style={{...styles.container, width: overallWidth, height: overallHeight}}>
      <View style={styles.mainBar}></View>
      <Animated.View
        style={{
          ...styles.progressBar,
          width: fillAnimation,
          height: overallHeight,
        }}></Animated.View>
    </View>
  );
};

export default IdleSkillBar;
