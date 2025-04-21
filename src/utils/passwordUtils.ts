import { PasswordOptions, PasswordStats } from '../types/password';

export const generatePassword = (options: PasswordOptions): string => {
  const { length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, customCharacters } = options;
  
  let charset = customCharacters || '';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  // Fallback to lowercase if no options selected
  if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';
  
  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    const randomIndex = array[i] % charset.length;
    password += charset[randomIndex];
  }
  
  return password;
};

export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution (up to 40%)
  strength += Math.min(password.length * 2, 40);
  
  // Character variety (up to 60%)
  if (/[a-z]/.test(password)) strength += 10; // lowercase
  if (/[A-Z]/.test(password)) strength += 15; // uppercase
  if (/[0-9]/.test(password)) strength += 15; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) strength += 20; // symbols
  
  return Math.min(strength, 100);
};

export const calculatePasswordStats = (password: string): PasswordStats => {
  const stats: PasswordStats = {
    entropy: 0,
    characterTypes: {
      lowercase: 0,
      uppercase: 0,
      numbers: 0,
      symbols: 0,
      custom: 0,
    },
  };

  // Calculate character type counts
  for (const char of password) {
    if (/[a-z]/.test(char)) stats.characterTypes.lowercase++;
    else if (/[A-Z]/.test(char)) stats.characterTypes.uppercase++;
    else if (/[0-9]/.test(char)) stats.characterTypes.numbers++;
    else if (/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(char)) stats.characterTypes.symbols++;
    else stats.characterTypes.custom++;
  }

  // Calculate entropy
  const charsetSize = 
    (stats.characterTypes.lowercase > 0 ? 26 : 0) +
    (stats.characterTypes.uppercase > 0 ? 26 : 0) +
    (stats.characterTypes.numbers > 0 ? 10 : 0) +
    (stats.characterTypes.symbols > 0 ? 32 : 0);
  
  stats.entropy = Math.floor(password.length * Math.log2(Math.max(charsetSize, 1)));

  return stats;
};

export const getStrengthLabel = (strength: number): { label: string; color: string } => {
  if (strength < 30) return { label: 'Weak', color: '#EF4444' };
  if (strength < 60) return { label: 'Moderate', color: '#F59E0B' };
  if (strength < 80) return { label: 'Strong', color: '#10B981' };
  return { label: 'Very Strong', color: '#059669' };
};