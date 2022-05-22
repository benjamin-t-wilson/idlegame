import React, {useState, useRef, useEffect} from 'react';

import {StyleSheet, View, Button, Animated} from 'react-native';

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
        toValue: overallWidth - (props.slider?.width || overallHeight / 2),
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

  const styles = StyleSheet.create({
    containerStyles: {
      width: overallWidth,
      height: overallHeight,
      display: 'flex',
    },
    mainBarStyles: {
      width: '100%',
      height: '100%',
      backgroundColor: props.mainBar?.background || 'lightgray',
    },
    sweetSpotStyles: {
      width: props.sweetSpot?.width || overallHeight,
      height: props.sweetSpot?.height || overallHeight,
      backgroundColor: props.sweetSpot?.background || 'lightgreen',
      position: 'absolute',
      left: overallWidth / 2 - overallHeight / 2,
    },
    sliderStyles: {
      width: props.slider?.width || overallHeight / 2,
      height: props.slider?.height || overallHeight,
      backgroundColor: props.slider?.background || 'red',
      opacity: props.slider?.opacity || 0.5,
      position: 'absolute',
      left: slideAnimation,
    },
  });

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
    <View>
      <View style={styles.containerStyles}>
        <View style={styles.mainBarStyles}></View>
        <View ref={sweetSpotRef} style={styles.sweetSpotStyles}></View>
        <Animated.View
          ref={sliderRef}
          style={styles.sliderStyles}></Animated.View>
      </View>
      <Button
        disabled={props.disabled || disabled}
        title="smash"
        onPress={execute}>
        smash
      </Button>
    </View>
  );
};

export default SkillShotV2;
