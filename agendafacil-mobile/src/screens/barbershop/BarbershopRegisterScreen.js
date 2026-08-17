// Importa React e o hook usado para armazenar os valores dos campos do formulário.
import React, { useState } from 'react';
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
} from 'react-native'; // Componentes visuais nativos usados nesta tela.
// Área segura para evitar sobreposição pela barra de status ou recorte do aparelho.
import { SafeAreaView } from 'react-native-safe-area-context';
// Ícones usados nos campos, botões e cabeçalho.
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Cliente HTTP configurado para se comunicar com a API da aplicação.
import api from "../../services/api";

// Lista local de UFs exibida no seletor de estado.
const UF_FALLBACK = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

// Recebe o texto digitado e devolve o telefone no padrão brasileiro.
function formatPhone(value) {
  // Remove tudo que não for número e limita o valor a DDD + 9 dígitos.
  const digits = value.replace(/\D/g, '').slice(0, 11);

  // Enquanto o DDD ainda está sendo digitado, mantém somente o parêntese de abertura.
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  // Após o DDD, exibe os primeiros dígitos do telefone sem o hífen.
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  // Telefones celulares possuem 11 dígitos; fixos possuem 10.
  const isMobile = digits.length === 11;
  // Define onde inserir o hífen, conforme o tipo de telefone.
  const firstPartEnd = isMobile ? 7 : 6;

  // Monta o resultado final: (11) 99999-9999 ou (11) 9999-9999.
  return `(${digits.slice(0, 2)}) ${digits.slice(2, firstPartEnd)}-${digits.slice(firstPartEnd)}`;
}

// Exporta a tela de cadastro e recebe a navegação para avançar ou voltar de rota.
export default function BarbershopRegisterScreen({ navigation }) {
  // Guarda o nome da barbearia preenchido no formulário.
  const [barberName, setBarberName] = useState('Barbearia Vintage');
  // Guarda o nome do proprietário.
  const [ownerName, setOwnerName] = useState('');
  // Guarda o e-mail de contato.
  const [email, setEmail] = useState('');
  // Guarda o telefone já formatado para exibição.
  const [phone, setPhone] = useState('');
  // Guarda o endereço da barbearia.
  const [address, setAddress] = useState('');
  // Guarda a cidade da barbearia.
  const [city, setCity] = useState('');
  // Guarda a UF selecionada, iniciando com São Paulo.
  const [state, setState] = useState('SP'); // Iniciando com SP para bater com a foto
  // Guarda a descrição apresentada no campo "Sobre a barbearia".
  const [description, setDescription] = useState(
    'Barbearia premium com atendimento diferenciado, especializada em cortes modernos e clássicos...'
  );

  // Disponibiliza a lista de UFs para o componente de seleção.
  const [statesList] = useState(UF_FALLBACK);
  // Indica se a lista de estados está sendo carregada; hoje permanece falsa por usar lista local.
  const [loadingStates] = useState(false);
  // Controla se o modal de seleção de UF está aberto.
  const [stateModalVisible, setStateModalVisible] = useState(false);

  // Salva a UF escolhida e fecha o modal.
  function selectState(uf) {
    setState(uf);
    setStateModalVisible(false);
  }

  // Reúne os dados preenchidos e segue para a etapa de horários.
  function handleNext() {
    // Envia os textos sem espaços extras no início ou fim.
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
    // Mantém o conteúdo dentro da área segura do dispositivo.
    <SafeAreaView style={styles.container}>
      {/* Configura a aparência da barra de status para combinar com o tema escuro. */}
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Cabeçalho: botão de retorno e textos de contexto da etapa atual. */}
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

      {/* Barra visual que informa o avanço no cadastro. */}
      <View style={styles.progressBarBg}>
        <View style={styles.progressBarActive} />
      </View>

      {/* Permite rolar os campos em telas menores e esconde a barra de rolagem. */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Área reservada para o futuro upload do logo da barbearia. */}
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logoBox}>
            <MaterialCommunityIcons name="storefront-outline" size={32} color="#e5b642" />
            <View style={styles.addButton}>
              <Feather name="plus" size={16} color="#121212" />
            </View>
          </TouchableOpacity>
          <Text style={styles.logoLabel}>Logo da barbearia</Text>
        </View>

        {/* Campo controlado para informar o nome comercial da barbearia. */}
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

        {/* Organiza os campos de e-mail e telefone lado a lado. */}
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

        {/* Separa visualmente os dados de contato da localização. */}
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

        {/* Agrupa cidade e UF na mesma linha. */}
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

        {/* Modal aberto ao tocar no seletor de UF. */}
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

        {/* Botão visual para futura confirmação da localização em mapa. */}
        <TouchableOpacity style={styles.mapButton}>
          <MaterialCommunityIcons name="map-marker-path" size={28} color="#e5b642" style={{ marginBottom: 6 }} />
          <Text style={styles.mapButtonText}>Confirmar localização no mapa</Text>
        </TouchableOpacity>

        {/* Separa localização e descrição. */}
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

        {/* Avança para a configuração de horários, levando os dados preenchidos. */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Próximo: Horários</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Centraliza os estilos usados pelos componentes desta tela.
const styles = StyleSheet.create({
  // Fundo e ocupação total da tela.
  container: { flex: 1, backgroundColor: '#121212' },
  // Layout do cabeçalho e seus elementos.
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  headerSubtitle: { color: '#7a7a7a', fontSize: 13, marginTop: 2 },
  // Fundo e preenchimento da barra de progresso.
  progressBarBg: { height: 3, backgroundColor: '#1e1e1e', width: '100%' },
  progressBarActive: { height: '100%', backgroundColor: '#e5b642', width: '35%' },
  // Espaçamentos do conteúdo rolável.
  scrollContent: { padding: 16, paddingBottom: 40 },
  // Estilos da área visual do logo.
  logoContainer: { alignItems: 'center', marginVertical: 24 },
  logoBox: { width: 88, height: 88, borderRadius: 16, borderWidth: 1.5, borderColor: '#e5b642', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', position: 'relative' },
  addButton: { position: 'absolute', bottom: -8, right: -8, width: 26, height: 26, borderRadius: 13, backgroundColor: '#e5b642', justifyContent: 'center', alignItems: 'center' },
  logoLabel: { color: '#a1a1a1', marginTop: 12, fontSize: 13 },
  // Estilos compartilhados por rótulos, campos e linhas do formulário.
  label: { color: '#7a7a7a', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 8, marginTop: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 14, height: 52, borderWidth: 1, borderColor: '#2e2e2e' },
  inputActiveBorder: { borderColor: '#e5b642' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#ffffff', fontSize: 15 },
  row: { flexDirection: 'row' },
  flex1: { flex: 1 },
  divider: { height: 1, backgroundColor: '#2e2e2e', marginVertical: 24 },
  sectionTitle: { color: '#e5b642', fontSize: 13, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  // Estilos do seletor de estado e do botão de mapa.
  selectContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 14, height: 52, borderWidth: 1, borderColor: '#2e2e2e' },
  selectText: { color: '#ffffff', fontSize: 15 },
  mapButton: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, borderWidth: 1, borderColor: '#2e2e2e', height: 100, marginTop: 20 },
  mapButtonText: { color: '#a1a1a1', fontSize: 13 },
  textAreaContainer: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, minHeight: 110, borderWidth: 1, borderColor: '#2e2e2e' },
  textArea: { color: '#ffffff', fontSize: 15, lineHeight: 22 },
  nextButton: { backgroundColor: '#121212', borderRadius: 12, height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 32, borderWidth: 1, borderColor: '#2e2e2e' },
  nextButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  // Estilos usados pelo modal e pelas opções de UF.
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1e1e1e', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '60%' },
  ufTag: { borderWidth: 1, borderColor: '#2e2e2e', paddingVertical: 12, borderRadius: 8, margin: 4, alignItems: 'center', flex: 1, backgroundColor: '#1a1a1a' },
  ufTagSelected: { borderColor: '#e5b642', backgroundColor: 'rgba(229, 182, 66, 0.1)' },
  ufTagText: { color: '#a1a1a1', fontWeight: '500', fontSize: 15 },
  ufTagTextSelected: { color: '#e5b642', fontWeight: 'bold' },
});
