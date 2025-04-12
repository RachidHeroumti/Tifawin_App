import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layout/Header';
import { COLORS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const Qus3 = ({ setModalVisible, toResult }: any) => {
  const dispatch = useDispatch();
  const { translations } = useSelector((state: any) => state.languageTracker);
  const { colors } = useTheme();

  const [answers, setAnswers] = useState<Record<string, number | null>>({
    s1: null,
    s2: null,
    s3: null,
    s4: null,
    s5: null,
    s6: null,
    s7: null,
  });

  const questions = [
    {
      id: 's1',
      text: 'Connaissez-vous votre marché cible ?',
      options: [
        { value: 1, label: 'Pas du tout' },
        { value: 2, label: 'Un peu' },
        { value: 3, label: 'Moyennement' },
        { value: 4, label: 'Bien' },
        { value: 5, label: 'Très bien' },
      ],
    },
    {
      id: 's2',
      text: 'Avez-vous effectué une analyse de marché ?',
      options: [
        { value: 1, label: 'Pas du tout' },
        { value: 2, label: 'Non, mais ça devrait être fait' },
        { value: 3, label: 'Oui, mais superficiellement' },
        { value: 4, label: 'Oui, de manière détaillée' },
        { value: 5, label: 'Oui, très détaillée et régulière' },
      ],
    },
    {
      id: 's3',
      text: 'Connaissez-vous vos principaux concurrents ?',
      options: [
        { value: 1, label: 'Pas du tout' },
        { value: 2, label: 'Un peu' },
        { value: 3, label: 'Moyennement' },
        { value: 4, label: 'Bien' },
        { value: 5, label: 'Très bien' },
      ],
    },
    {
      id: 's4',
      text: 'Utilisez-vous des outils de diagnostic stratégique ?',
      options: [
        { value: 1, label: 'Pas du tout' },
        { value: 2, label: 'Un peu' },
        { value: 3, label: 'Moyennement' },
        { value: 4, label: 'Bien' },
        { value: 5, label: 'Très bien' },
      ],
    },
    {
      id: 's5',
      text: 'Avez-vous une idée sur votre image de marque ?',
      options: [
        { value: 1, label: 'Pas du tout claire' },
        { value: 2, label: 'Un peu claire' },
        { value: 3, label: 'Moyennement claire' },
        { value: 4, label: 'Bien définie' },
        { value: 5, label: 'Très claire et définie' },
      ],
    },
    {
      id: 's6',
      text: 'Cherchez-vous à établir des liens avec de nouveaux partenaires ?',
      options: [
        { value: 1, label: 'Pas du tout' },
        { value: 2, label: 'Rarement' },
        { value: 3, label: 'Parfois' },
        { value: 4, label: 'Fréquemment' },
        { value: 5, label: 'Toujours' },
      ],
    },
    {
      id: 's7',
      text: 'Connaissez-vous vos besoins en termes de ressources financières ?',
      options: [
        { value: 1, label: 'Pas du tout' },
        { value: 2, label: 'Un peu' },
        { value: 3, label: 'Moyennement' },
        { value: 4, label: 'Bien' },
        { value: 5, label: 'Très bien' },
      ],
    },
  ];

  const handleOptionSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={translations['request']} leftIcon="back" titleLeft />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primary + 'CC']}
            style={styles.headerCard}
          >
            <Text style={styles.sectionTitle}>III. Diagnostic Stratégique</Text>
            <Text style={styles.sectionSubtitle}>Évaluez votre positionnement stratégique</Text>
          </LinearGradient>

          {questions.map((question, index) => (
            <View
              key={question.id}
              style={[styles.questionCard, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.questionNumber, { color: COLORS.primary }]}>
                {index + 1}
              </Text>
              <View style={styles.questionContent}>
                <Text style={[styles.questionText, { color: colors.text }]}>
                  {question.text}
                </Text>
                <View style={styles.optionsContainer}>
                  {question.options.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.optionButton,
                        answers[question.id] === option.value && styles.optionButtonSelected,
                      ]}
                      onPress={() => handleOptionSelect(question.id, option.value)}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          { borderColor: COLORS.primary },
                          answers[question.id] === option.value && styles.radioCircleSelected,
                        ]}
                      >
                        {answers[question.id] === option.value && (
                          <View style={styles.selectedDot} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: answers[question.id] === option.value
                              ? COLORS.primary
                              : colors.text,
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}

          <View style={styles.doneButtonContainer}>
            <TouchableOpacity onPress={toResult} style={styles.doneButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary + '99']}
                style={styles.doneButtonGradient}
              >
                <Text style={styles.doneButtonText}>Terminé</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: '48%', // Two-column layout
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primary + '22',
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
  doneButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  doneButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  doneButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  doneButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Qus3;