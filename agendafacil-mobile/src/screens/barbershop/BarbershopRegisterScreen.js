import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import api from "../../services/api";

export default function BarbershopRegisterScreen() {
  // Estados para controlar os campos do formulário
  const [barberName, setBarberName] = useState('Barbearia Vintage');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState(
    'Barbearia premium com atendimento diferenciado, especializada em cortes modernos e clássicos...'
  );

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Seta de voltar (←) */}
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Cadastrar barbearia</Text>
          <Text style={styles.headerSubtitle}>Informações do negócio</Text>
        </View>
      </View>

      {/* Barra de Progresso */}
      <View style={styles.progressBarBg}>
        <View style={styles.progressBarActive} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Upload Logo da Barbearia */}
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logoBox}>
            {/* Ícone de Loja */}
            <Text style={styles.logoIcon}>🏪</Text>
            {/* Botão de Adicionar (+) */}
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.logoLabel}>Logo da barbearia</Text>
        </View>

        {/* Input: Nome da Barbearia */}
        <Text style={styles.label}>NOME DA BARBEARIA</Text>
        <View style={[styles.inputContainer, styles.inputActiveBorder]}>
          <Text style={styles.inputIcon}>✂️</Text>
          <TextInput
            style={styles.input}
            value={barberName}
            onChangeText={setBarberName}
            placeholder="Nome da barbearia"
            placeholderTextColor="#7a7a7a"
          />
        </View>

        {/* Input: Nome do Proprietário */}
        <Text style={styles.label}>NOME DO PROPRIETÁRIO</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Nome completo"
            placeholderTextColor="#7a7a7a"
          />
        </View>

        {/* Linha Dupla: Email e Telefone */}
        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.label}>E-MAIL</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@..."
                placeholderTextColor="#7a7a7a"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={[styles.flex1, { marginLeft: 12 }]}>
            <Text style={styles.label}>TELEFONE</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📞</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="(11) 9..."
                placeholderTextColor="#7a7a7a"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Divisor Visual de Seção */}
        <View style={styles.divider} />

        {/* Seção Localização */}
        <Text style={styles.sectionTitle}>LOCALIZAÇÃO</Text>

        {/* Input: Endereço */}
        <Text style={styles.label}>ENDEREÇO</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📍</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Rua, número"
            placeholderTextColor="#7a7a7a"
          />
        </View>

        {/* Linha Dupla: Cidade e Estado */}
        <View style={styles.row}>
          <View style={{ flex: 2 }}>
            <Text style={styles.label}>CIDADE</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🏢</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="Campinas"
                placeholderTextColor="#7a7a7a"
              />
            </View>
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.label}>ESTADO</Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text style={styles.selectText}>{state}</Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Confirmar Localização no Mapa */}
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapButtonText}>Confirmar localização no mapa</Text>
        </TouchableOpacity>

        {/* Divisor Visual de Seção */}
        <View style={styles.divider} />

        {/* Seção Sobre a Barbearia */}
        <Text style={styles.sectionTitle}>SOBRE A BARBEARIA</Text>

        {/* Input: Descrição (Multi-line) */}
        <Text style={styles.label}>DESCRIÇÃO</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botão Próximo */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Próximo: Horários</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro do app
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
  backText: {
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
    color: '#7a7a7a',
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
    backgroundColor: '#e5b642', // Amarelo/Dourado do design
    width: '35%', // Simulação do progresso atual
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoBox: {
    width: 100,
    height: 100,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e5b642',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  logoIcon: {
    fontSize: 36,
  },
  addButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5b642',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoLabel: {
    color: '#a1a1a1',
    marginTop: 8,
    fontSize: 13,
  },
  label: {
    color: '#7a7a7a',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  inputActiveBorder: {
    borderColor: '#e5b642', // Borda dourada para o input selecionado no print
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#2e2e2e',
    marginVertical: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'between',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  selectText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  selectArrow: {
    color: '#7a7a7a',
    fontSize: 10,
  },
  mapButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2e2e2e',
    height: 90,
    marginTop: 16,
  },
  mapIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  mapButtonText: {
    color: '#e5b642',
    fontSize: 13,
    fontWeight: 'bold',
  },
  textAreaContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  textArea: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});