import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import API from '../utils/api';

export default function SetupScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  // Payment methods state
  const [bitcoin, setBitcoin] = useState({ enabled: false, address: '' });
  const [lightning, setLightning] = useState({ enabled: false, address: '' });
  const [monero, setMonero] = useState({ enabled: false, address: '' });
  const [venmo, setVenmo] = useState({ enabled: false, username: '' });
  const [cashapp, setCashapp] = useState({ enabled: false, username: '' });
  const [paypal, setPaypal] = useState({ enabled: false, username: '' });

  const handleCreateTipPage = async () => {
    // Validation
    if (!displayName.trim()) {
      Alert.alert('Error', 'Please enter a display name');
      return;
    }

    // Check if at least one payment method is enabled
    const paymentMethods = {};
    if (bitcoin.enabled && bitcoin.address) {
      paymentMethods.bitcoin = { enabled: true, address: bitcoin.address };
    }
    if (lightning.enabled && lightning.address) {
      paymentMethods.lightning = { enabled: true, address: lightning.address };
    }
    if (monero.enabled && monero.address) {
      paymentMethods.monero = { enabled: true, address: monero.address };
    }
    if (venmo.enabled && venmo.username) {
      paymentMethods.venmo = { enabled: true, username: venmo.username };
    }
    if (cashapp.enabled && cashapp.username) {
      paymentMethods.cashapp = { enabled: true, username: cashapp.username };
    }
    if (paypal.enabled && paypal.username) {
      paymentMethods.paypal = { enabled: true, username: paypal.username };
    }

    if (Object.keys(paymentMethods).length === 0) {
      Alert.alert('Error', 'Please enable and fill in at least one payment method');
      return;
    }

    setLoading(true);

    try {
      const response = await API.createTipPage({
        displayName: displayName.trim(),
        message: message.trim() || 'Support my work anonymously',
        paymentMethods,
      });

      if (response.success) {
        // Save token securely
        await SecureStore.setItemAsync(`tip_token_${response.token}`, JSON.stringify({
          token: response.token,
          displayName: displayName.trim(),
          createdAt: new Date().toISOString(),
        }));

        // Navigate to tip page screen
        navigation.navigate('TipPage', { token: response.token });
      } else {
        Alert.alert('Error', response.error || 'Failed to create tip page');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const PaymentMethodSection = ({ title, enabled, setEnabled, value, setValue, placeholder, privacyLevel }) => (
    <View style={styles.paymentSection}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentTitleRow}>
          <Text style={styles.paymentTitle}>{title}</Text>
          <View style={[styles.privacyBadge, privacyLevel === 'high' ? styles.privacyHigh : styles.privacyLow]}>
            <Text style={[styles.privacyText, privacyLevel === 'high' ? styles.privacyTextHigh : styles.privacyTextLow]}>
              {privacyLevel === 'high' ? 'High Privacy' : 'Low Privacy'}
            </Text>
          </View>
        </View>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ false: '#767577', true: '#00D9FF' }}
          thumbColor={enabled ? '#fff' : '#f4f3f4'}
        />
      </View>
      {enabled && (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Create your anonymous tip page and get a shareable link
        </Text>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Text style={styles.label}>Display Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Anonymous Creator"
            placeholderTextColor="#666"
            value={displayName}
            onChangeText={setDisplayName}
          />

          <Text style={styles.label}>Message (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g., Support my work anonymously"
            placeholderTextColor="#666"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Cryptocurrency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cryptocurrency 🔐</Text>

          <PaymentMethodSection
            title="Bitcoin (BTC)"
            enabled={bitcoin.enabled}
            setEnabled={(val) => setBitcoin({ ...bitcoin, enabled: val })}
            value={bitcoin.address}
            setValue={(val) => setBitcoin({ ...bitcoin, address: val })}
            placeholder="bc1..."
            privacyLevel="high"
          />

          <PaymentMethodSection
            title="Lightning Network"
            enabled={lightning.enabled}
            setEnabled={(val) => setLightning({ ...lightning, enabled: val })}
            value={lightning.address}
            setValue={(val) => setLightning({ ...lightning, address: val })}
            placeholder="lnurl..."
            privacyLevel="high"
          />

          <PaymentMethodSection
            title="Monero (XMR)"
            enabled={monero.enabled}
            setEnabled={(val) => setMonero({ ...monero, enabled: val })}
            value={monero.address}
            setValue={(val) => setMonero({ ...monero, address: val })}
            placeholder="4..."
            privacyLevel="high"
          />
        </View>

        {/* Traditional Payment Apps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traditional Payment Apps ⚠️</Text>

          <PaymentMethodSection
            title="Venmo"
            enabled={venmo.enabled}
            setEnabled={(val) => setVenmo({ ...venmo, enabled: val })}
            value={venmo.username}
            setValue={(val) => setVenmo({ ...venmo, username: val })}
            placeholder="@username"
            privacyLevel="low"
          />

          <PaymentMethodSection
            title="Cash App"
            enabled={cashapp.enabled}
            setEnabled={(val) => setCashapp({ ...cashapp, enabled: val })}
            value={cashapp.username}
            setValue={(val) => setCashapp({ ...cashapp, username: val })}
            placeholder="$cashtag"
            privacyLevel="low"
          />

          <PaymentMethodSection
            title="PayPal"
            enabled={paypal.enabled}
            setEnabled={(val) => setPaypal({ ...paypal, enabled: val })}
            value={paypal.username}
            setValue={(val) => setPaypal({ ...paypal, username: val })}
            placeholder="username or email"
            privacyLevel="low"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleCreateTipPage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitButtonText}>
              Generate My Tip Link 🚀
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.spacer} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00D9FF',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  paymentSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  privacyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  privacyHigh: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  privacyLow: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  privacyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  privacyTextHigh: {
    color: '#4CAF50',
  },
  privacyTextLow: {
    color: '#F44336',
  },
  submitButton: {
    backgroundColor: '#00D9FF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
});
