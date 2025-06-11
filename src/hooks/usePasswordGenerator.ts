import { useState, useEffect } from 'react';
import { PasswordOptions, PasswordStats } from '../types/password';
import { generatePassword, calculatePasswordStrength, calculatePasswordStats } from '../utils/passwordUtils';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  customCharacters: '',
};

export const usePasswordGenerator = () => {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [stats, setStats] = useState<PasswordStats | null>(null);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    generateNewPassword();
  }, [options]);

  useEffect(() => {
    const newStrength = calculatePasswordStrength(password);
    const newStats = calculatePasswordStats(password);
    setStrength(newStrength);
    setStats(newStats);
  }, [password]);

  const generateNewPassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;
    
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy password: ', err);
      });
  };

  const updateOption = (key: keyof PasswordOptions, value: boolean | number | string) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return {
    password,
    strength,
    stats,
    options,
    copied,
    generateNewPassword,
    copyToClipboard,
    updateOption,
  };
};