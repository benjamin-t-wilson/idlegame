import React, {useState, useRef, useEffect} from 'react';
import {View, Pressable, Animated, Text} from 'react-native';

import styles from '../styles/components/SkillShotV2.Styles';

const SkillShotV2 = props => {
  const [disabled, setDisabled] = useState(false);

  const sliderRef = useRef();
  const sweetSpotRef = useRef();

  const overallWidth = props.container?.overallWidth || 400;
  const overallHeight = props.container?.overallHeight || overallWidth / 10;
  const interval = props.interval || 2000;

  const slideAnimation = useRef(new Animated.Value(0)).current;
  const resetAnim = anim => {
    anim.reset();
    anim.start(() => resetAnim(anim));
  };

  useEffect(() => {
    const timing = Animated.sequence([
      Animated.timing(slideAnimation, {
        toValue: overallWidth - (props.slider?.width || overallHeight / 2) - 40,
        duration: interval,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: interval,
        useNativeDriver: false,
      }),
    ]);
    timing.start(result => {
      if (result.finished) {
        resetAnim(timing);
      }
    });

    return () => {
      timing.stop();
      slideAnimation.stopAnimation();
    };
  }, [slideAnimation]);

  const execute = () => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), props.cooldown || 1000);

    let sliderRect = {};
    let sweetSpotRect = {};

    sliderRef.current.measure((fx, fy, width, height, px, py) => {
      sliderRect = {x: px, width: width};

      sweetSpotRef.current.measure((fx, fy, width, height, px, py) => {
        sweetSpotRect = {x: px, width: width};

        const isInSweetSpot =
          sliderRect.x >= sweetSpotRect.x &&
          sliderRect.x + sliderRect.width <=
            sweetSpotRect.x + sweetSpotRect.width;

        const distanceFromMiddle = Math.abs(
          sweetSpotRect.x +
            sweetSpotRect.width / 2 -
            (sliderRect.x + sliderRect.width),
        );

        return props.action(isInSweetSpot ? 0 : distanceFromMiddle);
      });
    });
  };

  return (
    <View style={{...styles.container, marginTop: 20}}>
      <View
        style={{
          ...styles.container,
          width: overallWidth - 40,
          height: overallHeight,
        }}>
        <View style={styles.mainBar}></View>
        <View
          ref={sweetSpotRef}
          style={{
            ...styles.sweetSpot,
            width: props.sweetSpot?.width || overallHeight,
            height: overallHeight,
            left: overallWidth / 2 - overallHeight / 2 - 20,
          }}></View>
        <Animated.View
          ref={sliderRef}
          style={{
            ...styles.slider,
            width: props.slider?.width || overallHeight / 2,
            height: props.slider?.height || overallHeight,
            left: slideAnimation,
          }}></Animated.View>
      </View>
      <Pressable
        style={
          props.disabled || disabled ? styles.buttonDisabled : styles.buttonAccent
        }
        disabled={props.disabled || disabled}
        onPress={execute}>
        <Text style={styles.text}>Perform Action</Text>
      </Pressable>
    </View>
  );
};

export default SkillShotV2;
