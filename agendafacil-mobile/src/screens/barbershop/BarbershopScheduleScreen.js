import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';

export default function BarbershopScheduleScreen() {
  // Estado para gerenciar os horários de cada dia
  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Seg', start: '08:00', end: '18:00', active: true },
    { id: 2, day: 'Ter', start: '08:00', end: '18:00', active: true },
    { id: 3, day: 'Qua', start: '08:00', end: '18:00', active: true },
    { id: 4, day: 'Qui', start: '08:00', end: '18:00', active: true },
    { id: 5, day: 'Sex', start: '08:00', end: '19:00', active: true },
    { id: 6, day: 'Sáb', start: '09:00', end: '17:00', active: true },
    { id: 7, day: 'Dom', start: '--', end: '--', active: false },
  ]);

  // Função para alternar o switch de um dia específico
  const toggleSwitch = (id) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIconText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Horários de atendimento</Text>
          <Text style={styles.headerSubtitle}>Configure sua disponibilidade</Text>
        </View>
      </View>

      {/* Barra de Progresso (75% concluído) */}
      <View style={styles.progressBarBg}>
        <View style={styles.progressBarActive} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Informativo */}
        <View style={styles.infoBanner}>
          <View style={styles.infoCircle}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <Text style={styles.infoText}>
            Ative os dias e ajuste o horário de início e término.
          </Text>
        </View>

        {/* Lista de Horários */}
        <View style={styles.listContainer}>
          {schedule.map((item) => (
            <View key={item.id} style={styles.rowWrapper}>
              <View style={[styles.row, !item.active && styles.rowDisabled]}>
                
                {/* Nome do Dia */}
                <Text style={[styles.dayLabel, !item.active && styles.textDisabled]}>
                  {item.day}
                </Text>

                {/* Seletor de Horários */}
                <View style={styles.timeInputsWrapper}>
                  <TouchableOpacity 
                    style={[styles.timeBox, !item.active && styles.timeBoxDisabled]}
                    disabled={!item.active}
                  >
                    <Text style={[styles.timeText, !item.active && styles.textDisabled]}>
                      {item.start}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.timeSeparator}>-</Text>

                  <TouchableOpacity 
                    style={[styles.timeBox, !item.active && styles.timeBoxDisabled]}
                    disabled={!item.active}
                  >
                    <Text style={[styles.timeText, !item.active && styles.textDisabled]}>
                      {item.end}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Switch de Ativação */}
                <Switch
                  trackColor={{ false: '#3f3f46', true: '#ca8a04' }}
                  thumbColor={item.active ? '#eab308' : '#71717a'}
                  ios_backgroundColor="#3f3f46"
                  onValueChange={() => toggleSwitch(item.id)}
                  value={item.active}
                />
              </View>
              {/* Linha divisória entre os dias */}
              <View style={styles.lineDivider} />
            </View>
          ))}
        </View>

        {/* Botão Finalizar */}
        <TouchableOpacity style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Finalizar cadastro</Text>
        </TouchableOpacity>

      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backIconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#71717a',
    fontSize: 14,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: '#1e1e1e',
    width: '100%',
    marginTop: 8,
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#eab308',
    width: '70%', // Simulação de progresso maior que a tela anterior
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1a1a10', // Tom levemente amarelado/escuro
    borderWidth: 1,
    borderColor: '#423b10',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  infoCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#eab308',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIconText: {
    color: '#eab308',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#a1a1aa',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  rowWrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowDisabled: {
    opacity: 0.5,
  },
  dayLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    width: 50,
  },
  timeInputsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBox: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
    minWidth: 80,
    alignItems: 'center',
  },
  timeBoxDisabled: {
    backgroundColor: '#121212',
  },
  timeText: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '500',
  },
  timeSeparator: {
    color: '#27272a',
    marginHorizontal: 8,
    fontSize: 18,
  },
  textDisabled: {
    color: '#3f3f46',
  },
  lineDivider: {
    height: 1,
    backgroundColor: '#1e1e1e',
    width: '100%',
  },
  finishButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  finishButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});