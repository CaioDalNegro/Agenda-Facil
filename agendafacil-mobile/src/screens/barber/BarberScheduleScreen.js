import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api';
import { ArrowLeft, Info } from 'lucide-react-native';

const INITIAL_DAYS = [
  { id: 'seg', label: 'Seg', start: '08:00', end: '18:00', active: true },
  { id: 'ter', label: 'Ter', start: '08:00', end: '18:00', active: true },
  { id: 'qua', label: 'Qua', start: '08:00', end: '18:00', active: true },
  { id: 'qui', label: 'Qui', start: '08:00', end: '18:00', active: true },
  { id: 'sex', label: 'Sex', start: '08:00', end: '19:00', active: true },
  { id: 'sab', label: 'Sáb', start: '09:00', end: '17:00', active: true },
  { id: 'dom', label: 'Dom', start: '--:--', end: '--:--', active: false },
];

export default function BarberScheduleScreen({ navigation, route }) {
  // Lista de dias da semana com horários e status de ativação.
  const [days, setDays] = useState(INITIAL_DAYS);
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const barberData = route.params?.barberData;

  // Ativa ou desativa um dia de atendimento ao alternar o switch.
  const toggleSwitch = (id) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === id ? { ...day, active: !day.active } : day
      )
    );
  };

  const openTimePicker = (dayId, field) => {
    setSelectedDayId(dayId);
    setSelectedField(field);
    setPickerVisible(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'dismissed') {
      setPickerVisible(false);
      return;
    }

    if (selectedTime && selectedDayId && selectedField) {
      const formattedTime = selectedTime.toTimeString().slice(0, 5);

      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id === selectedDayId
            ? {
                ...day,
                [selectedField]: formattedTime,
              }
            : day
        )
      );
    }

    setPickerVisible(false);
  };

  // Finaliza o cadastro, envia a disponibilidade para a API e navega para a tela de sucesso.
  async function handleFinishRegistration() {
    if (!barberData?.name) {
      Alert.alert('Erro', 'Dados do barbeiro não encontrados.');
      return;
    }

    const availability = days.map((day) => ({
      day: day.label,
      active: day.active,
      start: day.start,
      end: day.end,
    }));

    try {
      setLoading(true);

      await api.post('/barbers', {
        name: barberData.name,
        email: barberData.email,
        phone: barberData.phone,
        password: barberData.password,
        specialty: barberData.specialty || 'Geral',
        availability,
      });

      navigation.navigate('RegisterSuccessScreen', {
        barberData: {
          ...barberData,
          availability,
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o barbeiro no banco de dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft color="#FFFFFF" size={20} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Horários de atendimento</Text>
          <Text style={styles.headerSubtitle}>Configure sua disponibilidade</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Info Box */}
        <View style={styles.infoBox}>
          <Info color="#D4A373" size={20} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Ative os dias e ajuste o horário de início e término.
          </Text>
        </View>

        {/* Schedule List */}
        <View style={styles.listContainer}>
          {days.map((day) => (
            <View key={day.id} style={styles.dayRow}>
              {/* Day Label */}
              <Text style={[styles.dayLabel, !day.active && styles.disabledText]}>
                {day.label}
              </Text>

              {/* Time Pickers Container */}
              <View style={styles.timeContainer}>
                <TouchableOpacity 
                  disabled={!day.active} 
                  style={[styles.timeButton, !day.active && styles.disabledTimeButton]}
                  onPress={() => openTimePicker(day.id, 'start')}
                >
                  <Text style={[styles.timeText, !day.active && styles.disabledText]}>
                    {day.active ? day.start : '—'}
                  </Text>
                </TouchableOpacity>
                
                <Text style={[styles.hyphen, !day.active && styles.disabledText]}>-</Text>
                
                <TouchableOpacity 
                  disabled={!day.active} 
                  style={[styles.timeButton, !day.active && styles.disabledTimeButton]}
                  onPress={() => openTimePicker(day.id, 'end')}
                >
                  <Text style={[styles.timeText, !day.active && styles.disabledText]}>
                    {day.active ? day.end : '—'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Toggle Switch */}
              <Switch
                trackColor={{ false: '#333333', true: '#E5B842' }}
                thumbColor={day.active ? '#FFFFFF' : '#888888'}
                ios_backgroundColor="#333333"
                onValueChange={() => toggleSwitch(day.id)}
                value={day.active}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {pickerVisible && (
        <DateTimePicker
          value={new Date(2024, 0, 1, 12, 0)}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          themeVariant="dark"
          accentColor="#D9AF37"
          textColor="#FFFFFF"
          onChange={handleTimeChange}
        />
      )}

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFinishRegistration}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Cadastrando...' : 'Finalizar cadastro'}
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 2,
  },
  progressBarBackground: {
    height: 2,
    backgroundColor: '#262626',
    width: '100%',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E5B842',
    width: '70%', // Ajuste o progresso aqui
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#1A1610',
    borderWidth: 1,
    borderColor: '#3D301A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    color: '#A89278',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  listContainer: {
    gap: 12,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  dayLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    width: 50,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  timeButton: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  disabledTimeButton: {
    backgroundColor: '#121212',
    borderColor: '#1C1C1E',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  hyphen: {
    color: '#48484A',
    fontSize: 16,
  },
  disabledText: {
    color: '#48484A',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  submitButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});