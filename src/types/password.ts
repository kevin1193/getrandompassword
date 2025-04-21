export interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  customCharacters: string;
}

export interface PasswordStats {
  entropy: number;
  characterTypes: {
    lowercase: number;
    uppercase: number;
    numbers: number;
    symbols: number;
    custom: number;
  };
}

export interface PasswordAnalytics {
  totalGenerated: number;
  totalCopied: number;
  averageStrength: number;
  popularLengths: Record<number, number>;
  characterTypeUsage: {
    lowercase: number;
    uppercase: number;
    numbers: number;
    symbols: number;
    custom: number;
  };
  sessionStart: number;
  lastUsed: number;
}