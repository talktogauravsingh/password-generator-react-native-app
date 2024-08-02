import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type PasswordOptions = {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  specials: boolean;
};

const generatePassword = (length: number, options: PasswordOptions): string => {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specials = '!@#$%^&*()_+[]{}|;:,.<>?';
  
  let charset = '';
  if (options.lowercase) charset += lower;
  if (options.uppercase) charset += upper;
  if (options.numbers) charset += numbers;
  if (options.specials) charset += specials;

  if (charset.length === 0) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

const App: React.FC = () => {
  const [length, setLength] = useState<string>('12');
  const [includeSpecials, setIncludeSpecials] = useState<boolean>(false);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const handleGenerate = () => {
    const lengthNumber = parseInt(length, 10);
    if (lengthNumber < 1 || lengthNumber > 50) {
      Alert.alert('Invalid Length', 'Length must be between 1 and 50.');
      return;
    }
    const newPassword = generatePassword(lengthNumber, {
      lowercase: includeLowercase,
      uppercase: includeUppercase,
      numbers: includeNumbers,
      specials: includeSpecials,
    });
    setPassword(newPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Password Generator</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password Length:</Text>
        <Picker
          selectedValue={length}
          style={styles.picker}
          onValueChange={(itemValue: string) => setLength(itemValue)}
        >
          {[...Array(50).keys()].map(i => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.label}>Include Uppercase:</Text>
        <Button title={includeUppercase ? 'Yes' : 'No'} onPress={() => setIncludeUppercase(!includeUppercase)} />
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.label}>Include Lowercase:</Text>
        <Button title={includeLowercase ? 'Yes' : 'No'} onPress={() => setIncludeLowercase(!includeLowercase)} />
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.label}>Include Numbers:</Text>
        <Button title={includeNumbers ? 'Yes' : 'No'} onPress={() => setIncludeNumbers(!includeNumbers)} />
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.label}>Include Special Characters:</Text>
        <Button title={includeSpecials ? 'Yes' : 'No'} onPress={() => setIncludeSpecials(!includeSpecials)} />
      </View>

      <Button title="Generate Password" onPress={handleGenerate} color="#007bff" />
      
      {password ? (
        <Text style={styles.password}>{password}</Text>
      ) : null}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: width - 40,  // Adjust width based on screen size
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  password: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    width: '100%',
  },
});

export default App;
