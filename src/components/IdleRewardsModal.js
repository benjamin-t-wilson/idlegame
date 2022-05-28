import React from 'react';
import {Modal, Text, View} from 'react-native';

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
      <View>
        <Text>Hi {charName}</Text>
        <Text>Since you been gone:</Text>
        <View>
          <Text>
            You performed action: {modalInfo.activeSkillName || ''} -{' '}
            {modalInfo.activeNodeType || ''} a total of{' '}
            {modalInfo.timesSkilled || ''} times.
          </Text>
          <Text>
            You gained {modalInfo.xpGained || ''}{' '}
            {modalInfo.activeSkillName || ''} experience.
          </Text>
          {modalInfo.prevLvl < modalInfo.lvl ? (
            <Text>
              That brings you from level {modalInfo.prevLvl || ''} to{' '}
              {modalInfo.lvl || ''}
            </Text>
          ) : null}
          {modalInfo.dropsGained &&
          Object.keys(modalInfo.dropsGained).length > 0 ? (
            <View>
              <Text>You gained the following drops:</Text>
              {Object.keys(modalInfo.dropsGained).map(drop => {
                return (
                  <Text key={drop}>
                    {modalInfo.dropsGained[drop]}x {drop}
                  </Text>
                );
              })}
            </View>
          ) : null}
        </View>
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
};

export default IdleRewardsModal;
