import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';
import API from '../utils/api';

export default function MyLinksScreen({ navigation }) {
  const [links, setLinks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const allKeys = await SecureStore.getAllKeysAsync?.() || [];
      const tipTokenKeys = allKeys.filter(key => key.startsWith('tip_token_'));

      const linkPromises = tipTokenKeys.map(async (key) => {
        const data = await SecureStore.getItemAsync(key);
        return JSON.parse(data);
      });

      const loadedLinks = await Promise.all(linkPromises);
      // Sort by creation date, newest first
      loadedLinks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLinks(loadedLinks);
    } catch (error) {
      console.error('Error loading links:', error);
      // Fallback for systems without getAllKeysAsync
      setLinks([]);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLinks();
    setRefreshing(false);
  };

  const copyLink = async (token) => {
    const url = API.getTipPageUrl(token);
    await Clipboard.setStringAsync(url);
    Alert.alert('Copied!', 'Link copied to clipboard');
  };

  const deleteLink = async (token) => {
    Alert.alert(
      'Delete Link',
      'Are you sure you want to delete this tip page link? This will only remove it from your device, not from the server.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync(`tip_token_${token}`);
              await loadLinks();
              Alert.alert('Deleted', 'Link removed from your device');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete link');
            }
          },
        },
      ]
    );
  };

  const viewTipPage = (token) => {
    navigation.navigate('ViewTip', { token });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (links.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyTitle}>No Tip Links Yet</Text>
        <Text style={styles.emptyText}>
          Create your first anonymous tip page to get started
        </Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Setup')}
        >
          <Text style={styles.createButtonText}>
            Create Tip Page 🚀
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#00D9FF"
        />
      }
    >
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Your saved anonymous tip page links
        </Text>

        {links.map((link) => (
          <View key={link.token} style={styles.linkCard}>
            <View style={styles.linkHeader}>
              <Text style={styles.linkTitle}>{link.displayName}</Text>
              <TouchableOpacity
                onPress={() => deleteLink(link.token)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.linkDate}>
              Created: {formatDate(link.createdAt)}
            </Text>

            <View style={styles.linkUrlContainer}>
              <Text style={styles.linkUrl} numberOfLines={1}>
                {API.getTipPageUrl(link.token)}
              </Text>
            </View>

            <View style={styles.linkActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => copyLink(link.token)}
              >
                <Text style={styles.actionButtonText}>📋 Copy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.viewButton]}
                onPress={() => viewTipPage(link.token)}
              >
                <Text style={[styles.actionButtonText, styles.viewButtonText]}>
                  👁️ View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.createAnotherButton}
          onPress={() => navigation.navigate('Setup')}
        >
          <Text style={styles.createAnotherButtonText}>
            + Create Another Tip Page
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  createButton: {
    backgroundColor: '#00D9FF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  linkDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  linkUrlContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  linkUrl: {
    fontSize: 12,
    color: '#00D9FF',
    fontFamily: 'monospace',
  },
  linkActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00D9FF',
  },
  actionButtonText: {
    color: '#00D9FF',
    fontSize: 14,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#00D9FF',
    borderColor: '#00D9FF',
  },
  viewButtonText: {
    color: '#000',
  },
  createAnotherButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 8,
  },
  createAnotherButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});
