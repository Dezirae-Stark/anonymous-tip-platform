import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import API from '../utils/api';

export default function ViewTipScreen({ route }) {
  const { token } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadTipPage();
  }, [token]);

  const loadTipPage = async () => {
    try {
      const response = await API.getTipPage(token);
      if (response.success) {
        setData(response);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = async (address) => {
    await Clipboard.setStringAsync(address);
    Alert.alert('Copied!', 'Address copied to clipboard');
  };

  const openPaymentLink = async (url) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open payment app');
    }
  };

  const PaymentMethodCard = ({ method, data, config }) => {
    const isLowPrivacy = ['venmo', 'cashapp', 'paypal'].includes(method);

    return (
      <View style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <Text style={styles.paymentLabel}>{config.label}</Text>
          <View style={[styles.privacyBadge, isLowPrivacy ? styles.privacyLow : styles.privacyHigh]}>
            <Text style={[styles.privacyText, isLowPrivacy ? styles.privacyTextLow : styles.privacyTextHigh]}>
              {isLowPrivacy ? 'Low Privacy' : 'High Privacy'}
            </Text>
          </View>
        </View>

        {/* Address-based (Crypto) */}
        {data.address && (
          <>
            <View style={styles.addressContainer}>
              <Text style={styles.address}>{data.address}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyAddress(data.address)}
            >
              <Text style={styles.copyButtonText}>📋 Copy Address</Text>
            </TouchableOpacity>
            <View style={styles.qrContainer}>
              <QRCode value={data.address} size={200} />
            </View>
          </>
        )}

        {/* Username-based (Venmo, CashApp, PayPal) */}
        {data.username && (
          <>
            <View style={styles.usernameDisplay}>
              <Text style={styles.username}>@{data.username}</Text>
            </View>
            <TouchableOpacity
              style={styles.paymentLinkButton}
              onPress={() => openPaymentLink(config.link + data.username)}
            >
              <Text style={styles.paymentLinkButtonText}>
                Open {config.label} →
              </Text>
            </TouchableOpacity>
            <View style={styles.qrContainer}>
              <QRCode value={config.link + data.username} size={200} />
            </View>
          </>
        )}

        {config.note && (
          <Text style={styles.note}>{config.note}</Text>
        )}
      </View>
    );
  };

  const paymentMethodConfig = {
    bitcoin: {
      label: 'Bitcoin (BTC)',
      note: 'Most private when using a new address for each payment',
    },
    lightning: {
      label: 'Bitcoin Lightning',
      note: 'Instant, low-fee payments with enhanced privacy',
    },
    monero: {
      label: 'Monero (XMR)',
      note: 'Maximum privacy - transactions are untraceable',
    },
    venmo: {
      label: 'Venmo',
      note: '⚠️ Lower privacy - may expose personal information',
      link: 'https://venmo.com/',
    },
    cashapp: {
      label: 'Cash App',
      note: '⚠️ Lower privacy - may expose username and profile',
      link: 'https://cash.app/$',
    },
    paypal: {
      label: 'PayPal',
      note: '⚠️ Lower privacy - links to name and email',
      link: 'https://paypal.me/',
    },
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00D9FF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>❌</Text>
        <Text style={styles.errorTitle}>Invalid Link</Text>
        <Text style={styles.errorText}>
          This tip page doesn't exist or has been removed
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.privacyBadgeHeader}>
            <Text style={styles.privacyBadgeText}>🔒 100% Anonymous</Text>
          </View>
          <Text style={styles.displayName}>{data.displayName}</Text>
          <Text style={styles.message}>{data.message}</Text>
        </View>

        {/* Warning Box */}
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            <Text style={styles.warningBold}>Privacy Protection:</Text> This page does not collect any personal information. Your payment details are never shared beyond what your chosen payment method reveals.
          </Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethods}>
          {Object.entries(data.paymentMethods).map(([key, methodData]) => {
            const config = paymentMethodConfig[key];
            if (!config) return null;
            return (
              <PaymentMethodCard
                key={key}
                method={key}
                data={methodData}
                config={config}
              />
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            No tracking. No analytics. No data collection.
          </Text>
        </View>

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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  content: {
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  privacyBadgeHeader: {
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  privacyBadgeText: {
    color: '#00D9FF',
    fontSize: 14,
  },
  displayName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  warningBox: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  warningText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  warningBold: {
    color: '#FFC107',
    fontWeight: 'bold',
  },
  paymentMethods: {
    marginBottom: 24,
  },
  paymentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
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
    fontSize: 12,
    fontWeight: '600',
  },
  privacyTextHigh: {
    color: '#4CAF50',
  },
  privacyTextLow: {
    color: '#F44336',
  },
  addressContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.2)',
    marginBottom: 12,
  },
  address: {
    color: '#00D9FF',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  usernameDisplay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.2)',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    color: '#00D9FF',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  copyButtonText: {
    color: '#00D9FF',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentLinkButton: {
    backgroundColor: '#00D9FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentLinkButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  note: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  spacer: {
    height: 40,
  },
});
