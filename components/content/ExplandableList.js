import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

const SECTIONS = [
  {
    title: 'Subscription',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Customer Service',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Review',
    content: 'Lorem ipsum...',
  },
];

const ExpandableList = () => {
  const [activeSections, setActiveSections] = useState([]);

  const _renderHeader = (section, index) => {
    const isActive = activeSections.includes(index);

    return (
      <TouchableOpacity
        style={styles.header}
        onPress={() => _toggleSection(index)}
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </TouchableOpacity>
    );
  };

  const _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _toggleSection = (index) => {
    const isActive = activeSections.includes(index);
    const newActiveSections = isActive
      ? activeSections.filter((i) => i !== index)
      : [...activeSections, index];
    setActiveSections(newActiveSections);
  };

  return (
    <View>
      {SECTIONS.map((section, index) => (
        <View key={index}>
          {_renderHeader(section, index)}
          <Collapsible collapsed={!activeSections.includes(index)}>
            {_renderContent(section)}
          </Collapsible>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerText: {
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
});

export default ExpandableList;