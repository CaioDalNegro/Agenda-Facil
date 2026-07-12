import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Check } from 'lucide-react-native';

export default function RegisterSuccessScreen({ navigation, route }) {
  const barberData = route?.params?.barberData;
  const barberName = barberData?.name || 'Barbeiro';
  const specialtyList = barberData?.specialty
    ? barberData.specialty.split(',').map((item) => item.trim()).filter(Boolean)
    : [];
  const avatarInitials = barberName
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Check color="#22C55E" size={48} strokeWidth={3} />
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Cadastro concluído!</Text>
        <Text style={styles.subtitle}>
          Seu perfil foi criado com sucesso. Bem-vindo ao Blade!
        </Text>

        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarInitials}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{barberName}</Text>
              <Text style={styles.profileRole}>Barbeiro · Ativo</Text>
            </View>
          </View>

          {/* Tags Container */}
          <View style={styles.tagsContainer}>
            {specialtyList.length > 0 ? (
              specialtyList.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tag}>
                <Text style={styles.tagText}>Geral</Text>
              </View>
            )}
          </View>
        </View>

        {/* Availability Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>DISPONIBILIDADE</Text>
          <View style={styles.daysGrid}>
            {barberData?.availability?.length > 0 ? (
              barberData.availability.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.dayBadge,
                    item.active ? styles.dayBadgeActive : styles.dayBadgeInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      item.active ? styles.dayTextActive : styles.dayTextInactive,
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhum horário configurado ainda.</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })}
        >
          <Text style={styles.primaryButtonText}>Ir para o início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#14291B',
    borderWidth: 2,
    borderColor: '#1E4620',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5B842',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#121212',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileRole: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#E5B842',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#201C14',
  },
  tagText: {
    color: '#E5B842',
    fontSize: 13,
    fontWeight: '500',
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  dayBadge: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 54,
    alignItems: 'center',
    borderWidth: 1,
  },
  dayBadgeActive: {
    backgroundColor: '#14291B',
    borderColor: '#1E4620',
  },
  dayBadgeInactive: {
    backgroundColor: '#1C1C1E',
    borderColor: '#2C2C2E',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dayTextActive: {
    color: '#22C55E',
  },
  dayTextInactive: {
    color: '#48484A',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  primaryButton: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});