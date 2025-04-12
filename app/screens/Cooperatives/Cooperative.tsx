import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layout/Header';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS } from '../../constants/theme';

type CooperativeScreenProps = StackScreenProps<RootStackParamList, 'Cooperative'>;

const cooperativesData = [
  {
    name: 'Coopérative Zaitoune Atlas',
    location: 'Taroudant, Morocco',
    founder: 'Latifa Ben Ali',
    description: 'Producing high-quality olive oil using traditional methods.',
  },
  {
    name: 'Aknari Sud',
    location: 'Tiznit, Morocco',
    founder: 'Youssef Mernissi',
    description: 'Specialists in prickly pear seed oil and natural skincare.',
  },
  {
    name: 'Tamghart Noujoum',
    location: 'Ouarzazate, Morocco',
    founder: 'Salma Oukacha',
    description: 'Empowering Berber women through artisanal crafts and weaving.',
  },
  {
    name: 'Beldi Essence',
    location: 'Essaouira, Morocco',
    founder: 'Karim El Idrissi',
    description: 'Crafting eco-friendly soaps and essential oils.',
  },
  {
    name: 'Arfoud Dattes Coop',
    location: 'Arfoud, Morocco',
    founder: 'Noura El Habib',
    description: 'Producing organic dates and promoting local agriculture.',
  },
];


const Cooperative: React.FC<CooperativeScreenProps> = ({ navigation }) => {
  const { translations } = useSelector((state: any) => state.languageTracker);
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoop, setSelectedCoop] = useState(cooperativesData[0]);

  const handleEditCoop = (coop: typeof cooperativesData[0]) => {
    console.log('Editing cooperative:', coop.name);
    // Add navigation or logic to edit the cooperative here
  };

  const handleShowDetails = (coop: typeof cooperativesData[0]) => {
    console.log('Showing details for:', coop.name);
  
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Cooperatives"
        leftIcon="back"
        titleLeft
        rightIcon={
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FeatherIcon name="list" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Display all cooperatives */}
        {cooperativesData.map((coop) => (
          <View key={coop.name} style={styles.coopCard}>
            <View style={styles.coopInfo}>
              <Text style={styles.coopName}>{coop.name}</Text>
              <Text style={styles.coopDetail}>
                <FeatherIcon name="map-pin" size={14} color={COLORS.gray} />{' '}
                {coop.location}
              </Text>
              <Text style={styles.coopDetail}>
                <FeatherIcon name="user" size={14} color={COLORS.gray} />{' '}
                {coop.founder}
              </Text>
              <Text style={styles.coopDescription}>{coop.description}</Text>
            </View>
            <View style={styles.coopActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShowDetails(coop)}
              >
                <FeatherIcon name="eye" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditCoop(coop)}
              >
                <FeatherIcon name="edit-2" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Questions')}
      >
        <FeatherIcon name="clipboard" size={18} color="#fff" />
      </TouchableOpacity>

      {/* Cooperative Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Cooperative</Text>
            <ScrollView style={styles.coopList}>
              {cooperativesData.map((coop) => (
                <View key={coop.name} style={styles.modalCoopItemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.modalCoopItem,
                      selectedCoop.name === coop.name && styles.modalCoopItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedCoop(coop);
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.modalCoopInfo}>
                      <Text style={styles.modalCoopName}>{coop.name}</Text>
                      <Text style={styles.modalCoopDetail}>{coop.location}</Text>
                      <Text style={styles.modalCoopDetail}>{coop.founder}</Text>
                    </View>
                    {selectedCoop.name === coop.name && (
                      <FeatherIcon name="check" size={20} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                  <View style={styles.modalCoopActions}>
                    <TouchableOpacity
                      style={styles.modalActionButton}
                      onPress={() => handleShowDetails(coop)}
                    >
                      <FeatherIcon name="eye" size={18} color={COLORS.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalActionButton}
                      onPress={() => handleEditCoop(coop)}
                    >
                      <FeatherIcon name="edit-2" size={18} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 80, // Extra padding to avoid overlap with FAB
  },
  coopCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
    marginBottom: 15, // Space between cards
  },
  coopInfo: {
    flex: 1,
  },
  coopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  coopDetail: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 3,
  },
  coopDescription: {
    fontSize: 12,
    color: COLORS.grayDark,
    marginTop: 5,
  },
  coopActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 72,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 15,
  },
  coopList: {
    maxHeight: 400,
  },
  modalCoopItemContainer: {
    marginBottom: 10,
    position: 'relative',
  },
  modalCoopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  modalCoopItemSelected: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  modalCoopImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  modalCoopInfo: {
    flex: 1,
  },
  modalCoopName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  modalCoopDetail: {
    fontSize: 12,
    color: COLORS.gray,
  },
  modalCoopActions: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    gap: 10,
  },
  modalActionButton: {
    padding: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Cooperative;