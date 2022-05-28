import React from 'react';
import {Modal, Text, View, Pressable} from 'react-native';

import styles from '../styles/components/IdleRewardsModal.Styles';

const IdleRewardsModal = ({
  modalVisible,
  setModalVisible,
  modalInfo,
  charName,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.text}>Hi {charName}</Text>
        <Text style={styles.text}>Since you been gone:</Text>
        <View style={styles.subContainer}>
          <Text style={styles.text}>
            You performed action: {modalInfo.activeSkillName || ''} -{' '}
            {modalInfo.activeNodeType || ''} a total of{' '}
            {modalInfo.timesSkilled || ''} times.
          </Text>
          <Text style={{...styles.text, marginTop: 20}}>
            You gained {modalInfo.xpGained || ''}{' '}
            {modalInfo.activeSkillName || ''} experience.
          </Text>
          {modalInfo.prevLvl < modalInfo.lvl ? (
            <Text style={{...styles.text, marginTop: 20}}>
              That brings you from level {modalInfo.prevLvl || ''} to{' '}
              {modalInfo.lvl || ''}
            </Text>
          ) : null}
          {modalInfo.dropsGained &&
          Object.keys(modalInfo.dropsGained).length > 0 ? (
            <View>
              <Text style={{...styles.text, marginTop: 20}}>
                You gained the following drops:
              </Text>
              {Object.keys(modalInfo.dropsGained).map(drop => {
                return (
                  <Text style={styles.itemContainer} key={drop}>
                    {modalInfo.dropsGained[drop]}x {drop}
                  </Text>
                );
              })}
            </View>
          ) : null}
        </View>
        <Pressable
          style={styles.buttonAccent}
          onPress={() => setModalVisible(false)}>
          <Text style={styles.text}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default IdleRewardsModal;
