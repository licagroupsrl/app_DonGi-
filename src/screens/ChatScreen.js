import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, COMMON_STYLES } from '../constants/theme';

// Import Firestore functions (conceptual/structural)
// import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { db } from '../services/firebase';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Benvenuto! Scrivi qui per parlare con Don Giorgio.', sender: 'don', timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  // EFFECT: Mocking Real-time subscription
  useEffect(() => {
    // FIREBASE IMPLEMENTATION GUIDE:
    /*
      const q = query(collection(db, "chats/userId/messages"), orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
        }));
        setMessages(msgs);
      });
      return unsubscribe;
    */
  }, []);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: Date.now(),
    };

    // Optimistic Update
    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // FIREBASE IMPLEMENTATION GUIDE:
    /*
      try {
        await addDoc(collection(db, "chats/userId/messages"), {
          text: inputText,
          sender: 'user',
          timestamp: new Date()
        });
      } catch (e) {
        console.error("Error sending message: ", e);
      }
    */

    // Simulate Don Giorgio typing/replying
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: 'Pace e bene. Ti risponderò appena possibile.',
        sender: 'don',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.donBubble
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : styles.donText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={COMMON_STYLES.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Scrivi un messaggio..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary, // Gold for user
    borderBottomRightRadius: 0,
  },
  donBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: COLORS.white,
  },
  donText: {
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  sendButton: {
    backgroundColor: COLORS.accent, // Bordeaux
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
