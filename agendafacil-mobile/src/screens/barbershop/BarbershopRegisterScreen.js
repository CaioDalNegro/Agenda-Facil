import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import api from "../../services/api";

const UF_FALLBACK = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  const isMobile = digits.length === 11;
  const firstPartEnd = isMobile ? 7 : 6;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, firstPartEnd)}-${digits.slice(firstPartEnd)}`;
}

export default function BarbershopRegisterScreen({ navigation }) {
  const [barberName, setBarberName] = useState('Barbearia Vintage');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP'); // Iniciando com SP para bater com a foto
  const [description, setDescription] = useState(
    'Barbearia premium com atendimento diferenciado, especializada em cortes modernos e clássicos...'
  );

  const [statesList] = useState(UF_FALLBACK);
  const [loadingStates] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);

  function selectState(uf) {
    setState(uf);
    setStateModalVisible(false);
  }

  function handleNext() {
    // ... suas validações originais ...
    navigation.navigate("BarbershopScheduleScreen", {
      barbershopData: {
        barberName: barberName.trim(),
        ownerName: ownerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        description: description.trim(),
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={20} color="#ffffff" />
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

        {/* Upload de Logo */}
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logoBox}>
            <MaterialCommunityIcons name="storefront-outline" size={32} color="#e5b642" />
            <View style={styles.addButton}>
              <Feather name="plus" size={16} color="#121212" />
            </View>
          </TouchableOpacity>
          <Text style={styles.logoLabel}>Logo da barbearia</Text>
        </View>

        {/* Inputs */}
        <Text style={styles.label}>NOME DA BARBEARIA</Text>
        <View style={[styles.inputContainer, styles.inputActiveBorder]}>
          <Feather name="scissors" size={18} color="#e5b642" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={barberName}
            onChangeText={setBarberName}
            placeholder="Nome da barbearia"
            placeholderTextColor="#7a7a7a"
          />
        </View>

        <Text style={styles.label}>NOME DO PROPRIETÁRIO</Text>
        <View style={styles.inputContainer}>
          <Feather name="user" size={18} color="#7a7a7a" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Nome completo"
            placeholderTextColor="#7a7a7a"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.label}>E-MAIL</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={18} color="#7a7a7a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@..."
                placeholderTextColor="#7a7a7a"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={[styles.flex1, { marginLeft: 12 }]}>
            <Text style={styles.label}>TELEFONE</Text>
            <View style={styles.inputContainer}>
              <Feather name="phone" size={18} color="#7a7a7a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(value) => setPhone(formatPhone(value))}
                placeholder="(11) 99999-9999"
                maxLength={15}
                placeholderTextColor="#7a7a7a"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>LOCALIZAÇÃO</Text>

        <Text style={styles.label}>ENDEREÇO</Text>
        <View style={styles.inputContainer}>
          <Feather name="map-pin" size={18} color="#7a7a7a" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Rua, número"
            placeholderTextColor="#7a7a7a"
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 2 }}>
            <Text style={styles.label}>CIDADE</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="office-building-outline" size={18} color="#7a7a7a" style={styles.inputIcon} />
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
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setStateModalVisible(true)}
              disabled={loadingStates}
            >
              <Text style={styles.selectText}>
                {loadingStates ? "..." : (state || "UF")}
              </Text>
              <Feather name="chevron-down" size={16} color="#7a7a7a" />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={stateModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setStateModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setStateModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>SELECIONE O ESTADO</Text>
              <FlatList
                data={statesList}
                keyExtractor={(item) => item}
                numColumns={4}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.ufTag,
                      state === item && styles.ufTagSelected,
                    ]}
                    onPress={() => selectState(item)}
                  >
                    <Text
                      style={[
                        styles.ufTagText,
                        state === item && styles.ufTagTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Botão de Mapa */}
        <TouchableOpacity style={styles.mapButton}>
          <MaterialCommunityIcons name="map-marker-path" size={28} color="#e5b642" style={{ marginBottom: 6 }} />
          <Text style={styles.mapButtonText}>Confirmar localização no mapa</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>SOBRE A BARBEARIA</Text>

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

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Próximo: Horários</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  headerSubtitle: { color: '#7a7a7a', fontSize: 13, marginTop: 2 },
  progressBarBg: { height: 3, backgroundColor: '#1e1e1e', width: '100%' },
  progressBarActive: { height: '100%', backgroundColor: '#e5b642', width: '35%' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginVertical: 24 },
  logoBox: { width: 88, height: 88, borderRadius: 16, borderWidth: 1.5, borderColor: '#e5b642', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', position: 'relative' },
  addButton: { position: 'absolute', bottom: -8, right: -8, width: 26, height: 26, borderRadius: 13, backgroundColor: '#e5b642', justifyContent: 'center', alignItems: 'center' },
  logoLabel: { color: '#a1a1a1', marginTop: 12, fontSize: 13 },
  label: { color: '#7a7a7a', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 8, marginTop: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 14, height: 52, borderWidth: 1, borderColor: '#2e2e2e' },
  inputActiveBorder: { borderColor: '#e5b642' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#ffffff', fontSize: 15 },
  row: { flexDirection: 'row' },
  flex1: { flex: 1 },
  divider: { height: 1, backgroundColor: '#2e2e2e', marginVertical: 24 },
  sectionTitle: { color: '#e5b642', fontSize: 13, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  selectContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 14, height: 52, borderWidth: 1, borderColor: '#2e2e2e' },
  selectText: { color: '#ffffff', fontSize: 15 },
  mapButton: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, borderWidth: 1, borderColor: '#2e2e2e', height: 100, marginTop: 20 },
  mapButtonText: { color: '#a1a1a1', fontSize: 13 },
  textAreaContainer: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, minHeight: 110, borderWidth: 1, borderColor: '#2e2e2e' },
  textArea: { color: '#ffffff', fontSize: 15, lineHeight: 22 },
  nextButton: { backgroundColor: '#121212', borderRadius: 12, height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 32, borderWidth: 1, borderColor: '#2e2e2e' },
  nextButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  // Modal 
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1e1e1e', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '60%' },
  ufTag: { borderWidth: 1, borderColor: '#2e2e2e', paddingVertical: 12, borderRadius: 8, margin: 4, alignItems: 'center', flex: 1, backgroundColor: '#1a1a1a' },
  ufTagSelected: { borderColor: '#e5b642', backgroundColor: 'rgba(229, 182, 66, 0.1)' },
  ufTagText: { color: '#a1a1a1', fontWeight: '500', fontSize: 15 },
  ufTagTextSelected: { color: '#e5b642', fontWeight: 'bold' },
});
