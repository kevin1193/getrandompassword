import { useState, useEffect } from 'react';
import { PasswordAnalytics, PasswordOptions, PasswordStats } from '../types/password';
import { supabase, fetchAnalyticsBySession } from '../lib/supabase';

const STORAGE_KEY = 'password-generator-analytics';

const getInitialAnalytics = async (): Promise<PasswordAnalytics> => {
  const sessionId = localStorage.getItem('session_id')!;
  const stored = localStorage.getItem(STORAGE_KEY);
  let analytics = stored ? JSON.parse(stored) : null;

  if (!analytics) {
    try {
      const events = await fetchAnalyticsBySession(sessionId);

      if (events && events.length > 0) {
        const generated = events.filter(e => e.event_type === 'password_generated');
        const copied = events.filter(e => e.event_type === 'password_copied');
        
        const characterTypeUsage = generated.reduce((acc, curr) => {
          const types = curr.character_types || {};
          return {
            lowercase: acc.lowercase + (types.lowercase || 0),
            uppercase: acc.uppercase + (types.uppercase || 0),
            numbers: acc.numbers + (types.numbers || 0),
            symbols: acc.symbols + (types.symbols || 0),
            custom: acc.custom + (types.custom || 0),
          };
        }, {
          lowercase: 0,
          uppercase: 0,
          numbers: 0,
          symbols: 0,
          custom: 0,
        });

        analytics = {
          totalGenerated: generated.length,
          totalCopied: copied.length,
          averageStrength: generated.reduce((acc, curr) => acc + (curr.password_strength || 0), 0) / (generated.length || 1),
          popularLengths: generated.reduce((acc, curr) => {
            if (curr.password_length) {
              acc[curr.password_length] = (acc[curr.password_length] || 0) + 1;
            }
            return acc;
          }, {} as Record<number, number>),
          characterTypeUsage,
          sessionStart: events[0].created_at,
          lastUsed: events[events.length - 1].created_at,
        };
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  }

  if (!analytics) {
    analytics = {
      totalGenerated: 0,
      totalCopied: 0,
      averageStrength: 0,
      popularLengths: {},
      characterTypeUsage: {
        lowercase: 0,
        uppercase: 0,
        numbers: 0,
        symbols: 0,
        custom: 0,
      },
      sessionStart: Date.now(),
      lastUsed: Date.now(),
    };
  }

  return analytics;
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<PasswordAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAnalytics = async () => {
      const initialAnalytics = await getInitialAnalytics();
      setAnalytics(initialAnalytics);
      setIsLoading(false);
    };

    initializeAnalytics();
  }, []);

  useEffect(() => {
    if (analytics) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
    }
  }, [analytics]);

  const trackPasswordGeneration = (options: PasswordOptions, strength: number, stats: PasswordStats) => {
    if (!analytics) return;

    setAnalytics(prev => {
      if (!prev) return prev;

      const newTotal = prev.totalGenerated + 1;
      const newAverage = (prev.averageStrength * prev.totalGenerated + strength) / newTotal;
      
      const popularLengths = { ...prev.popularLengths };
      popularLengths[options.length] = (popularLengths[options.length] || 0) + 1;

      return {
        ...prev,
        totalGenerated: newTotal,
        averageStrength: newAverage,
        popularLengths,
        characterTypeUsage: {
          lowercase: prev.characterTypeUsage.lowercase + (options.includeLowercase ? 1 : 0),
          uppercase: prev.characterTypeUsage.uppercase + (options.includeUppercase ? 1 : 0),
          numbers: prev.characterTypeUsage.numbers + (options.includeNumbers ? 1 : 0),
          symbols: prev.characterTypeUsage.symbols + (options.includeSymbols ? 1 : 0),
          custom: prev.characterTypeUsage.custom + (options.customCharacters ? 1 : 0),
        },
        lastUsed: Date.now(),
      };
    });
  };

  const trackPasswordCopy = () => {
    if (!analytics) return;

    setAnalytics(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        totalCopied: prev.totalCopied + 1,
        lastUsed: Date.now(),
      };
    });
  };

  const getSessionDuration = () => {
    if (!analytics) return 0;
    return Math.floor((Date.now() - new Date(analytics.sessionStart).getTime()) / 1000);
  };

  const getMostPopularLength = () => {
    if (!analytics) return null;
    const entries = Object.entries(analytics.popularLengths);
    if (entries.length === 0) return null;
    return Number(entries.sort(([, a], [, b]) => b - a)[0][0]);
  };

  return {
    analytics: analytics || {
      totalGenerated: 0,
      totalCopied: 0,
      averageStrength: 0,
      popularLengths: {},
      characterTypeUsage: {
        lowercase: 0,
        uppercase: 0,
        numbers: 0,
        symbols: 0,
        custom: 0,
      },
      sessionStart: Date.now(),
      lastUsed: Date.now(),
    },
    isLoading,
    trackPasswordGeneration,
    trackPasswordCopy,
    getSessionDuration,
    getMostPopularLength,
  };
};