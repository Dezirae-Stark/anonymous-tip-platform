import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import API from '../utils/api';

export default function TipPageScreen({ route, navigation }) {
  const { token } = route.params;
  const [copied, setCopied] = useState(false);

  const tipUrl = API.getTipPageUrl(token);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(tipUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied!', 'Link copied to clipboard');
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Support my work anonymously! 🔒\n\nNo personal info, complete privacy.\n\n${tipUrl}`,
        title: 'Anonymous Tip Page',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const viewTipPage = () => {
    navigation.navigate('ViewTip', { token });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Success Message */}
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>
            Your Anonymous Tip Page is Ready!
          </Text>
          <Text style={styles.successText}>
            Share this link on X (Twitter) or anywhere else
          </Text>
        </View>

        {/* Link Display */}
        <View style={styles.linkBox}>
          <Text style={styles.linkLabel}>Your Anonymous Link:</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.link} selectable>{tipUrl}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={copyToClipboard}
        >
          <Text style={styles.primaryButtonText}>
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={shareLink}
        >
          <Text style={styles.secondaryButtonText}>
            📤 Share Link
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={viewTipPage}
        >
          <Text style={styles.secondaryButtonText}>
            👁️ Preview Tip Page
          </Text>
        </TouchableOpacity>

        {/* Info Boxes */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🔒 Privacy Protected</Text>
          <Text style={styles.infoText}>
            Anyone who visits this link will see your payment methods but NO personal information.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📱 Share on X (Twitter)</Text>
          <Text style={styles.infoText}>
            Example post:{'\n\n'}
            "Support my work anonymously! 🔒{'\n'}
            No personal info, no tracking{'\n'}
            {tipUrl}"
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💾 Keep This Link Safe</Text>
          <Text style={styles.infoText}>
            This is your unique anonymous tip page. It's saved in "My Links" for easy access.
          </Text>
        </View>

        {/* Navigation Button */}
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate('MyLinks')}
        >
          <Text style={styles.outlineButtonText}>
            View All My Links
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.outlineButtonText}>
            Back to Home
          </Text>
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
  successBox: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  linkBox: {
    marginBottom: 24,
  },
  linkLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  linkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00D9FF',
  },
  link: {
    fontSize: 14,
    color: '#00D9FF',
    fontFamily: 'monospace',
  },
  primaryButton: {
    backgroundColor: '#00D9FF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00D9FF',
    marginVertical: 8,
  },
  secondaryButtonText: {
    color: '#00D9FF',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    marginVertical: 8,
  },
  outlineButtonText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  spacer: {
    height: 40,
  },
});
