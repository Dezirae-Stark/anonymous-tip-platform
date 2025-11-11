import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🔒</Text>
          <Text style={styles.heroTitle}>Anonymous Tipping</Text>
          <Text style={styles.heroSubtitle}>
            Create privacy-first tip pages for X (Twitter) and social media
          </Text>
        </View>

        {/* Problem Section */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>⚠️ The Problem</Text>
          <Text style={styles.infoText}>
            Platforms like Venmo and Cash App expose your:{'\n'}
            • Real name{'\n'}
            • Profile picture{'\n'}
            • Transaction history{'\n'}
            • Social connections
          </Text>
        </View>

        {/* Solution Section */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>✅ The Solution</Text>
          <Text style={styles.infoText}>
            Create an anonymous tip page with:{'\n'}
            • Complete privacy protection{'\n'}
            • Cryptocurrency support{'\n'}
            • Unique shareable links{'\n'}
            • No personal data exposed
          </Text>
        </View>

        {/* CTA Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Setup')}
        >
          <Text style={styles.primaryButtonText}>
            Create My Tip Page 🚀
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MyLinks')}
        >
          <Text style={styles.secondaryButtonText}>
            View My Links 📱
          </Text>
        </TouchableOpacity>

        {/* Features */}
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Features</Text>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔐</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Complete Privacy</Text>
              <Text style={styles.featureText}>
                No tracking, no analytics, no personal data collection
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💰</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Multiple Payment Methods</Text>
              <Text style={styles.featureText}>
                Bitcoin, Monero, Lightning, Venmo, CashApp, PayPal
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔗</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Anonymous Links</Text>
              <Text style={styles.featureText}>
                Get unique token URLs with zero identifying information
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Easy Sharing</Text>
              <Text style={styles.featureText}>
                Share on X, Instagram, or anywhere else instantly
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built for privacy-conscious creators 🔒
          </Text>
        </View>
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
  hero: {
    alignItems: 'center',
    marginVertical: 30,
  },
  heroIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#00D9FF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00D9FF',
    marginVertical: 10,
  },
  secondaryButtonText: {
    color: '#00D9FF',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    marginTop: 40,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  footer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
