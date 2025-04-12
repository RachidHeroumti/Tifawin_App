import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import { useTheme } from '@react-navigation/native';
  import Header from '../../layout/Header';
  import { COLORS, FONTS } from '../../constants/theme';
  import { StackScreenProps } from '@react-navigation/stack';
  import { RootStackParamList } from '../../navigation/RootStackParamList';
  import Icon from 'react-native-vector-icons/Feather'; // Import Feather icons
  
  type ResultatScreenProps = StackScreenProps<RootStackParamList, 'Resultat'>;
  
  const Resultat = ({ navigation }: ResultatScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
  
    const handleAIConsulting = () => {
      console.log('AI Consulting pressed');
    };
  
    const handleExportData = () => {
      console.log('Export Data pressed');
    };
  
    const handleDownloadToPhone = () => {
      console.log('Download Data to Phone pressed');
    };
  
    const handleGoToHome = () => {
      console.log('Go to Home pressed');
      navigation.navigate('Home');
    };
  
    return (
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {/* Top Buttons */}
        <Header title="Rapport Final" leftIcon="back" titleLeft />
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            style={[styles.topButton, { backgroundColor: COLORS.primary }]}
            onPress={handleAIConsulting}
          >
            <Text style={styles.buttonText}>AI Consulting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.topButton, { backgroundColor: COLORS.secondary }]}
            onPress={handleGoToHome}
          >
            <Text style={[styles.buttonText,{backgroundColor:COLORS.secondary}]}>Go to Home</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Title Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.title }]}>
              Rapport Final de Diagnostic : Coopérative Argan d’Or
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Date : Avril 2025
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Association bénéficiaire : [Nom de l’association]
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Objectif : Évaluer la performance de la coopérative et proposer des recommandations.
            </Text>
          </View>
  
          {/* Diagnostic Marketing Digital */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: COLORS.primary }]}>
              I. Diagnostic Marketing Digital
            </Text>
            <Text style={[styles.score, { color: colors.text }]}>
              Score moyen global : <Text style={styles.bold}>2.8 / 5</Text> (Niveau moyen)
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                <Text style={styles.tableHeader}>Sous-axe</Text>
                <Text style={styles.tableHeader}>Score</Text>
                <Text style={styles.tableHeader}>Observation</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Publicité</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2</Text>
                <Text style={styles.tableCell}>Peu de publicité, manque de stratégie.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Branding</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>3</Text>
                <Text style={styles.tableCell}>Nom moyennement mémorisable, logo distinctif.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Produit</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>3.3</Text>
                <Text style={styles.tableCell}>Bon conditionnement, étiquette peu informative.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Distribution</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.7</Text>
                <Text style={styles.tableCell}>Prix inadaptés, distribution limitée.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Marketing Digital</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.3</Text>
                <Text style={styles.tableCell}>Site peu visité, faible conversion.</Text>
              </View>
            </View>
            <Text style={[styles.recommendationTitle, { color: colors.title }]}>
              Recommandations :
            </Text>
            <Text style={[styles.recommendation, { color: colors.text }]}>
              Flyers locaux, améliorer l’étiquetage, présence sur réseaux sociaux.
            </Text>
          </View>
  
          {/* Diagnostic Opérationnel */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: COLORS.primary }]}>
              II. Diagnostic Opérationnel
            </Text>
            <Text style={[styles.score, { color: colors.text }]}>
              Score moyen global : <Text style={styles.bold}>2.9 / 5</Text> (Niveau moyen)
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                <Text style={styles.tableHeader}>Sous-axe</Text>
                <Text style={styles.tableHeader}>Score</Text>
                <Text style={styles.tableHeader}>Observation</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Gouvernance</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>3.0</Text>
                <Text style={styles.tableCell}>Réunions rares, règlement partiel.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Gestion Administrative</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.7</Text>
                <Text style={styles.tableCell}>Procédures partielles, justificatifs parfois conservés.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Gestion Financière</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>3.0</Text>
                <Text style={styles.tableCell}>CA 100K-500K MAD, rentabilité 3-10%.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Ressources Humaines</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.7</Text>
                <Text style={styles.tableCell}>Compétences partielles, peu de formation.</Text>
              </View>
            </View>
            <Text style={[styles.recommendationTitle, { color: colors.title }]}>
              Recommandations :
            </Text>
            <Text style={[styles.recommendation, { color: colors.text }]}>
              Réunions mensuelles, responsable administratif dédié, formation.
            </Text>
          </View>
  
          {/* Diagnostic Stratégique */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: COLORS.primary }]}>
              III. Diagnostic Stratégique
            </Text>
            <Text style={[styles.score, { color: colors.text }]}>
              Score moyen global : <Text style={styles.bold}>2.4 / 5</Text> (Niveau faible)
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                <Text style={styles.tableHeader}>Sous-axe</Text>
                <Text style={styles.tableHeader}>Score</Text>
                <Text style={styles.tableHeader}>Observation</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Connaissance du marché</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.0</Text>
                <Text style={styles.tableCell}>Marché peu connu, pas d’analyse.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Analyse concurrentielle</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>3</Text>
                <Text style={styles.tableCell}>Concurrents moyennement identifiés.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Stratégie de marque</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.5</Text>
                <Text style={styles.tableCell}>Peu d’outils, image un peu claire.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Recherche de partenaires</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>2.5</Text>
                <Text style={styles.tableCell}>Recherche rare, besoins connus.</Text>
              </View>
            </View>
            <Text style={[styles.recommendationTitle, { color: colors.title }]}>
              Recommandations :
            </Text>
            <Text style={[styles.recommendation, { color: colors.text }]}>
              Étude de marché, identifier concurrents, partenariats avec ONG.
            </Text>
          </View>
  
          {/* État Global */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: COLORS.primary }]}>
              État Global
            </Text>
            <Text style={[styles.score, { color: colors.text }]}>
              Score global : <Text style={styles.bold}>2.7 / 5</Text> (Niveau moyen)
            </Text>
            <Text style={[styles.recommendationTitle, { color: colors.title }]}>
              Recommandations générales :
            </Text>
            <Text style={[styles.recommendation, { color: colors.text }]}>
              Marketing digital, structurer la gestion, collaborer avec [Nom de l’association].
            </Text>
          </View>
  
          {/* Conclusion */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.title }]}>
              Conclusion
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              La "Coopérative Argan d’Or" a un potentiel réel mais nécessite un accompagnement pour améliorer sa visibilité, sa gestion et sa compétitivité.
            </Text>
          </View>
        </ScrollView>
  
        {/* Bottom Buttons with Feather Icons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.secondary }]}
            onPress={handleExportData}
          >
            <View style={styles.buttonContent}>
              <Icon name="upload" size={20} color={COLORS.white} style={styles.icon} />
              <Text style={styles.buttonText}>Export Data</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.success }]}
            onPress={handleDownloadToPhone}
          >
            <View style={styles.buttonContent}>
              <Icon name="download" size={20} color={COLORS.white} style={styles.icon} />
              <Text style={styles.buttonText}>Download Data</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.grayLight,
    },
    topButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 100, // Space for bottom buttons
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      ...FONTS.fontBold,
      fontSize: 20,
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    subtitle: {
      ...FONTS.fontRegular,
      fontSize: 15,
      lineHeight: 22,
      opacity: 0.9,
    },
    card: {
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
    },
    cardTitle: {
      ...FONTS.fontBold,
      fontSize: 18,
      marginBottom: 12,
    },
    score: {
      ...FONTS.fontRegular,
      fontSize: 15,
      marginBottom: 15,
    },
    bold: {
      ...FONTS.fontBold,
    },
    table: {
      borderWidth: 1,
      borderColor: COLORS.grayLight,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 15,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.grayLight,
    },
    tableHeaderRow: {
      backgroundColor: COLORS.grayLight,
    },
    tableHeader: {
      ...FONTS.fontBold,
      fontSize: 14,
      flex: 1,
      textAlign: 'center',
      color: COLORS.title,
    },
    tableCell: {
      ...FONTS.fontRegular,
      fontSize: 13,
      flex: 1,
      textAlign: 'center',
      paddingHorizontal: 5,
    },
    scoreCell: {
      ...FONTS.fontBold,
      color: COLORS.primary,
    },
    recommendationTitle: {
      ...FONTS.fontMedium,
      fontSize: 15,
      marginBottom: 5,
    },
    recommendation: {
      ...FONTS.fontRegular,
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.85,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: COLORS.white,
      borderTopWidth: 1,
      borderTopColor: COLORS.grayLight,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 8, // Space between icon and text
    },
    buttonText: {
      ...FONTS.fontBold,
      fontSize: 16,
      color: COLORS.white,
    },
  });
  
  export default Resultat;