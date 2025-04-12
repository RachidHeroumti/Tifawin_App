import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layout/Header';
import { COLORS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const Question1 = ({ setModalVisible, setModalVisible2 }: any) => {
  const dispatch = useDispatch();
  const { translations } = useSelector((state: any) => state.languageTracker);
  const { colors } = useTheme();

  const [answers, setAnswers] = useState<Record<string, number | null>>({
    g1: null, g2: null, g3: null, a1: null, a2: null, a3: null,
    f1: null, f2: null, f3: null, f4: null
  });

  const sections = [
    {
      title: "Gouvernance",
      questions: [
        { id: 'g1', text: "Tenez-vous des réunions régulières ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Rarement' }, { value: 3, label: 'De temps en temps' }, { value: 4, label: 'Fréquemment' }, { value: 5, label: 'Très fréquemment' }] },
        { id: 'g2', text: "Y-a-t-il un règlement intérieur ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Partiellement' }, { value: 3, label: 'Moyennement' }, { value: 4, label: 'Oui, complet' }, { value: 5, label: 'Oui, très détaillé' }] },
        { id: 'g3', text: "Avez-vous des fiches de postes pour les membres ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Partiellement' }, { value: 3, label: 'Moyennement' }, { value: 4, label: 'Oui, mais pas détaillées' }, { value: 5, label: 'Oui, très détaillées' }] },
      ]
    },
    {
      title: "Gestion administrative",
      questions: [
        { id: 'a1', text: "Avez-vous des procédures internes ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Partiellement' }, { value: 3, label: 'Moyennement' }, { value: 4, label: 'Oui, bien établies' }, { value: 5, label: 'Oui, très bien documentées' }] },
        { id: 'a2', text: "Avez-vous un responsable administratif identifié ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Non, mais ça devrait être fait' }, { value: 3, label: 'Oui, mais pas régulièrement impliqué' }, { value: 4, label: 'Oui, très impliqué' }, { value: 5, label: 'Oui, responsable et très impliqué' }] },
        { id: 'a3', text: "Gardez-vous des justificatifs des dépenses de la coopérative ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Rarement' }, { value: 3, label: 'Parfois' }, { value: 4, label: 'Oui, régulièrement' }, { value: 5, label: 'Oui, systématiquement' }] },
      ]
    },
    {
      title: "Gestion financière",
      questions: [
        { id: 'f1', text: "Quel est le chiffre d'affaires annuel de la coopérative ?", options: [{ value: 1, label: 'Moins de 50 000 MAD' }, { value: 2, label: '50 000 - 100 000 MAD' }, { value: 3, label: '100 000 - 500 000 MAD' }, { value: 4, label: '500 000 - 1 000 000 MAD' }, { value: 5, label: 'Plus de 1 000 000 MAD' }] },
        { id: 'f2', text: "Quelle est la rentabilité nette de la coopérative (bénéfice / chiffre d'affaires) sur les 12 derniers mois ?", options: [{ value: 1, label: 'Moins de 1%' }, { value: 2, label: '1% - 3%' }, { value: 3, label: '3% - 10%' }, { value: 4, label: '10% - 20%' }, { value: 5, label: 'Plus de 20%' }] },
        { id: 'f3', text: "Quel est le montant de votre trésorerie disponible ?", options: [{ value: 1, label: 'Moins de 10 000 MAD' }, { value: 2, label: '10 000 - 50 000 MAD' }, { value: 3, label: '50 000 - 100 000 MAD' }, { value: 4, label: '100 000 - 500 000 MAD' }, { value: 5, label: 'Plus de 500 000 MAD' }] },
        { id: 'f4', text: "Comparez-vous régulièrement les prix de vente avec les coûts de production ?", options: [{ value: 1, label: 'Pas du tout' }, { value: 2, label: 'Rarement' }, { value: 3, label: 'Parfois' }, { value: 4, label: 'Fréquemment' }, { value: 5, label: 'Toujours' }] },
      ]
    }
  ];

  const handleOptionSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    console.log(answers);
    setModalVisible(false);
    setModalVisible2(true);
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
            <Text style={styles.sectionTitle}>II. Diagnostic Opérationnel</Text>
            <Text style={styles.sectionSubtitle}>Évaluez vos opérations internes</Text>
          </LinearGradient>

          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>{section.title}</Text>
              {section.questions.map((question, index) => (
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
                          activeOpacity={0.8}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, flexGrow: 1 },
  content: { gap: 25 },
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
  sectionContainer: { gap: 15 },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.primary,
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
    width: '48%', // Responsive width for two-column layout
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

export default Question1;