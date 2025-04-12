import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';
import { openDrawer } from '../../redux/actions/drawerAction';
// import BottomSheet2 from '../Components/BottomSheet2';
import BasicPieChart from '../../components/Charts/PieChart';
import BasicLineChart from '../../components/Charts/LineChart';
import BasicBarChart from '../../components/Charts/BarChart';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import RadarComponent from '../../components/Charts/RadarComponent';
import ProductDropdown from '../../components/Selectes/Dropdown';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeScreenProps) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const moresheet2 = useRef<any>(null);
  const { translations } = useSelector((state: any) => state.languageTracker);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoop, setSelectedCoop] = useState<string | null>(null);

  const[dropselected,setDropselected] =useState('')
  const cooperatives = [
    'Manahil Tardodant',
    'ARGAN INO',
    'TAAWNYAN AL AMAL',
  ];

  const Drop = [
    'Diagnostic Marketing digital ',
    'Diagnostic strategique ',
    'Diagnostic operationnel',
    
  ];


  const StatCard = ({ title, icon }: { title: string; icon: string }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <FontAwesome5 name={icon} size={24} color={COLORS.primary} />
    </View>
  );

  const handleSelectCoop = (coop: string) => {
    setSelectedCoop(coop);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => dispatch(openDrawer())}
        >
          <FeatherIcon name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TAAWONYAT AMAL</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.editButton}
        >
          <FeatherIcon name="disc" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <View style={styles.statsGrid}>
          <StatCard title="Top Ranked" icon="trophy" />
          <StatCard title="Low Ranked" icon="award" />
        </View>
           */}
     

        <View style={styles.chartsContainer}>
        <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Radar de diagnostique</Text>
            </View>
            <ProductDropdown
                       options={Drop.map(item => ({
                         label: item,
                         value: item,
                       }))}
                       onSelect={value =>setDropselected(value) }
                       placeholder="Selectionner un diagnostic"
                       index={3}
                     />
            <RadarComponent />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>L'etat global de la cooperative </Text>
            
            </View>
            <BasicPieChart />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Evolution des vents</Text>

            </View>
            <BasicLineChart />
          </View>

          <View style={[styles.chartCard,{marginBottom:64}]}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Performance</Text>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>
            <BasicBarChart />
          </View>

          
        </View>
      </ScrollView>

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
              {cooperatives.map((coop) => (
                <TouchableOpacity
                  key={coop}
                  style={[
                    styles.coopItem,
                    selectedCoop === coop && styles.coopItemSelected,
                  ]}
                  onPress={() => handleSelectCoop(coop)}
                >
                  <Text
                    style={[
                      styles.coopText,
                      selectedCoop === coop && styles.coopTextSelected,
                    ]}
                  >
                    {coop}
                  </Text>
                  {selectedCoop === coop && (
                    <FeatherIcon name="check" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  !selectedCoop && styles.disabledButton,
                ]}
                disabled={!selectedCoop}
                onPress={() => {
                  if (selectedCoop) {
                    console.log('Selected Cooperative:', selectedCoop);
                    setModalVisible(false);
                  }
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* <BottomSheet2 ref={moresheet2} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  menuButton: {
    padding: 10,
  },
  editButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  chartsContainer: {
    gap: 15,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
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
    maxHeight: 300,
  },
  coopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
  },
  coopItemSelected: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  coopText: {
    fontSize: 16,
    color: COLORS.dark,
  },
  coopTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.grayLight,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Home;