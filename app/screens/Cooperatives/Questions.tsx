import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layout/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS } from '../../constants/theme';
import Quest2 from '../../components/QusetionS/Qus2';
import Qus3 from '../../components/QusetionS/Qus3';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/Input/Input';

type QuestionsScreenProps = StackScreenProps<RootStackParamList, 'Questions'>;

const Questions: React.FC<QuestionsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { translations } = useSelector((state: any) => state.languageTracker);
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    q1: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null, q8: null, q9: null, q10: null, q11: null, q12: null
  });
  const [isinfoCopp,setIsinfoCopp]=useState(true)

  const toResult = () => {
    setModalVisible2(false);
    navigation.navigate('Resultat');
  };

  const questions = [
    { id: 'q1', text: "Est-ce que vous faites de la publicité, promotion commerciale, la vente personnelle, les relations publiques et le marketing direct ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Un peu' }, { value: 3, label: 'Moyennement' }, { value: 4, label: 'Bien' }, { value: 5, label: 'Très bien' }] },
    { id: 'q2', text: "Avez-vous choisi le nom de coopérative qui est facile à mémoriser dans l’esprit des consommateurs ?", options: [{ value: 1, label: 'Pas du tout facile à mémoriser' }, { value: 2, label: 'Un peu facile à mémoriser' }, { value: 3, label: 'Moyennement facile à mémoriser' }, { value: 4, label: 'Facile à mémoriser' }, { value: 5, label: 'Très facile à mémoriser' }] },
    { id: 'q3', text: "Est-ce que votre logo de la coopérative est simple, distinctif et illustre spécifiquement les activités et les produits ?", options: [{ value: 1, label: 'Pas du tout simple et distinctif' }, { value: 2, label: 'Un peu simple et distinctif' }, { value: 3, label: 'Moyennement simple et distinctif' }, { value: 4, label: 'Simple et distinctif' }, { value: 5, label: 'Très simple, distinctif et représente bien les activités' }] },
  ];

  const handleOptionSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    setModalVisible(true);
    console.log(answers);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={translations['request']} leftIcon="back" titleLeft />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primary + 'CC']} // Gradient effect
            style={styles.headerCard}
          >
            <Text style={styles.sectionTitle}>Diagnostic Marketing Digital</Text>
            <Text style={styles.sectionSubtitle}>Évaluez votre stratégie marketing</Text>
          </LinearGradient>

          {questions.map((question, index) => (
            <View key={question.id} style={[styles.questionCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.questionNumber, { color: COLORS.primary }]}>{index + 1}</Text>
              <View style={styles.questionContent}>
                <Text style={[styles.questionText, { color: colors.text }]}>{question.text}</Text>
                <View style={styles.optionsContainer}>
                  {question.options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.optionButton,
                        answers[question.id] === option.value && styles.optionButtonSelected,
                      ]}
                      onPress={() => handleOptionSelect(question.id, option.value)}
                      activeOpacity={0.8} // Subtle press feedback
                    >
                      <View style={[
                        styles.radioCircle,
                        { borderColor: COLORS.primary },
                        answers[question.id] === option.value && styles.radioCircleSelected,
                      ]}>
                        {answers[question.id] === option.value && <View style={styles.selectedDot} />}
                      </View>
                      <Text style={[
                        styles.optionText,
                        { color: answers[question.id] === option.value ? COLORS.primary : colors.text },
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}

          <View style={styles.nextButtonContainer}>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary + '99']}
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>Suivant</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={modalVisible} animationType="slide">
          <Quest2 setModalVisible={setModalVisible} setModalVisible2={setModalVisible2} />
        </Modal>
        <Modal visible={modalVisible2} animationType="slide">
          <Qus3 setModalVisible2={setModalVisible2} toResult={toResult} />
        </Modal>

        <Modal
  transparent={true}
  animationType="slide"
  visible={isinfoCopp} // control this with state
>
  <View
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text style={[styles.sectionTitle, { color: COLORS.green }]}>
        Add Cooperative
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Text style={styles.labelText}>Name of Cooperative</Text>
        <View style={styles.inputWrapperGreen}>
          <Input
            placeholder="Enter cooperative name"
            style={styles.input}

          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={styles.labelText}>Creation Date</Text>
        <View style={styles.inputWrapperGreen}>
          <Input
            placeholder="DD/MM/YYYY"
            style={styles.input}
            
          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={styles.labelText}>Founder's Full Name</Text>
        <View style={styles.inputWrapperGreen}>
          <Input
            placeholder="Enter full name"
            style={styles.input}

          />
        </View>
      </View>

      <TouchableOpacity
  onPress={() => setIsinfoCopp(false)}
  style={[
    styles.topbarbtn,
    {
      backgroundColor: COLORS.success,
      borderRadius: 10,
      alignItems: 'center', // Corrected here
      justifyContent: 'center', // Corrected here
    },
  ]}
>
  <Text style={{ color: 'white', fontWeight: 'bold', padding: 15 }}>
    Suivant
  </Text>
</TouchableOpacity>

    </View>
  </View>
</Modal>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapperGreen: {
    borderRadius: 10,

    borderColor: COLORS.success,
  },
  
  input: {
    fontSize: 16,
    color: COLORS.title,
  },
  
  labelText: {
    fontSize: 14,
    color: COLORS.success,
    marginBottom: 6,
    fontWeight: '600',
  },
  
  
  container: { flex: 1 },
  scrollContent: { padding: 20, flexGrow: 1 },
  content: { gap: 20 },
  headerCard: {
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.white,
    opacity: 0.85,
  },
  questionCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  questionNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 15,
    marginTop: 5,
  },
  questionContent: { flex: 1 },
  questionText: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 15,
  },
  optionsContainer: { gap: 12, flexWrap: 'wrap' },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primary + '22', // Subtle highlight
  },
  radioCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioCircleSelected: {
    backgroundColor: COLORS.primary,
  },
  selectedDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    flexShrink: 1,
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Questions;