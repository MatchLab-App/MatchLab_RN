import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PokemonType } from '@/constants/pokemonTypes';
import {
  DEFAULT_LANGUAGE,
  getStrings,
  type AppLanguage,
  type TranslationStrings,
} from '@/constants/i18n';
import { MatchLabColors } from '@/constants/theme';
import {
  calculateMultiplier,
  searchPokemon,
  type PokemonSearchResult,
} from '@/services/pokemonDataStore';

export type HomeStep =
  | 'selectFirstOpponentType'
  | 'selectSecondOpponentType'
  | 'selectAttackType'
  | 'result';

export interface RecentMatchRecord {
  id: string;
  defenseTypes: PokemonType[];
  attackType: PokemonType;
  multiplier: number;
  createdAt: string;
}

export interface EffectivenessSummary {
  multiplier: number;
  title: string;
  description: string;
  tint: string;
}

export interface MatchLabContextType {
  // Step & selections
  step: HomeStep;
  setStep: (step: HomeStep) => void;
  selectedDefenseTypes: PokemonType[];
  setSelectedDefenseTypes: (types: PokemonType[]) => void;
  selectedAttackType: PokemonType;
  setSelectedAttackType: (type: PokemonType) => void;
  primaryDefenseType: PokemonType;
  secondaryDefenseType: PokemonType;

  // Menu
  isMenuPresented: boolean;
  setIsMenuPresented: (presented: boolean) => void;

  // Computed headers & effectiveness
  effectivenessSummary: EffectivenessSummary;
  title: string;
  subtitle: string;
  prompt: string;
  actionTitle: string;
  actionEnabled: boolean;

  // State transitions & actions
  selectType: (type: PokemonType) => void;
  addDefenseTypes: (types: PokemonType[]) => void;
  performPrimaryAction: () => void;
  goBackHomeStep: () => void;
  editDefenseSelection: () => void;
  resetHome: () => void;

  // Recent records
  recentRecords: RecentMatchRecord[];
  clearRecentRecords: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: PokemonSearchResult[];

  // Settings & Localization
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: TranslationStrings;
  isFileAccessEnabled: boolean;
  setIsFileAccessEnabled: (enabled: boolean) => void;
}

const RECENT_RECORDS_KEY = 'matchlab.recent.records';
const MAX_RECENT_RECORDS = 50;

function loadStoredRecentRecords(): RecentMatchRecord[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(RECENT_RECORDS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch {
    // ignore storage access errors
  }
  return [];
}

function persistRecentRecords(records: RecentMatchRecord[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(RECENT_RECORDS_KEY, JSON.stringify(records));
    }
  } catch {
    // ignore storage write errors
  }
}

const MatchLabContext = createContext<MatchLabContextType | null>(null);

export interface MatchLabProviderProps {
  children: ReactNode;
}

export function MatchLabProvider({ children }: MatchLabProviderProps) {
  // Settings & Localization
  const [language, setLanguage] = useState<AppLanguage>(DEFAULT_LANGUAGE);
  const [isFileAccessEnabled, setIsFileAccessEnabled] = useState<boolean>(true);

  // Home State
  const [step, setStep] = useState<HomeStep>('selectFirstOpponentType');
  const [selectedDefenseTypes, setSelectedDefenseTypes] = useState<PokemonType[]>([]);
  const [selectedAttackType, setSelectedAttackType] = useState<PokemonType>('noType');
  const [isMenuPresented, setIsMenuPresented] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('리자');

  // Recent Records
  const [recentRecords, setRecentRecords] = useState<RecentMatchRecord[]>([]);

  // Load persisted records on mount
  useEffect(() => {
    const stored = loadStoredRecentRecords();
    if (stored.length > 0) {
      setRecentRecords(stored);
    }
  }, []);

  // Current translation strings
  const t = useMemo(() => getStrings(language), [language]);

  // Primary and secondary defense types
  const primaryDefenseType = selectedDefenseTypes[0] ?? 'noType';
  const secondaryDefenseType = selectedDefenseTypes[1] ?? 'noType';

  // Search results
  const searchResults = useMemo(() => {
    return searchPokemon(searchQuery);
  }, [searchQuery]);

  // Effectiveness summary
  const effectivenessSummary = useMemo<EffectivenessSummary>(() => {
    const multiplier = calculateMultiplier(selectedAttackType, selectedDefenseTypes);
    let title = t.normalEffectivenessTitle;
    let description = t.normalEffectivenessDescription;
    let tint: string = MatchLabColors.neonCyan;

    switch (multiplier) {
      case 0:
        title = t.noEffectivenessTitle;
        description = t.noEffectivenessDescription;
        tint = MatchLabColors.weakRed;
        break;
      case 0.25:
        title = t.superWeakEffectivenessTitle;
        description = t.weakEffectivenessDescription;
        tint = MatchLabColors.weakRed;
        break;
      case 0.5:
        title = t.weakEffectivenessTitle;
        description = t.weakEffectivenessDescription;
        tint = MatchLabColors.weakRed;
        break;
      case 2:
        title = t.strongEffectivenessTitle;
        description = t.strongEffectivenessDescription;
        tint = MatchLabColors.neonCyan;
        break;
      case 4:
        title = t.superStrongEffectivenessTitle;
        description = t.strongEffectivenessDescription;
        tint = MatchLabColors.neonCyan;
        break;
      default:
        title = t.normalEffectivenessTitle;
        description = t.normalEffectivenessDescription;
        tint = MatchLabColors.neonCyan;
        break;
    }

    return {
      multiplier,
      title,
      description,
      tint,
    };
  }, [selectedAttackType, selectedDefenseTypes, t]);

  // Computed title and subtitle
  const title = useMemo(() => {
    switch (step) {
      case 'selectFirstOpponentType':
      case 'selectSecondOpponentType':
        return t.opponentTypeTitle;
      case 'selectAttackType':
        return t.attackTypeTitle;
      case 'result':
        return effectivenessSummary.title;
    }
  }, [step, t, effectivenessSummary.title]);

  const subtitle = useMemo(() => {
    switch (step) {
      case 'selectFirstOpponentType':
      case 'selectSecondOpponentType':
        return t.opponentTypeDescription;
      case 'selectAttackType':
        return t.attackTypeDescription;
      case 'result':
        return effectivenessSummary.description;
    }
  }, [step, t, effectivenessSummary.description]);

  // Computed prompt
  const prompt = useMemo(() => {
    switch (step) {
      case 'selectFirstOpponentType':
        return t.opponentFirstPrompt;
      case 'selectSecondOpponentType':
        return t.opponentSecondPrompt;
      case 'selectAttackType':
      case 'result':
        return t.attackTypePrompt;
    }
  }, [step, t]);

  // Computed action title and enabled status
  const actionTitle = useMemo(() => {
    switch (step) {
      case 'selectFirstOpponentType':
        return t.goNext;
      case 'selectSecondOpponentType':
        return t.goNext;
      case 'selectAttackType':
      case 'result':
        return t.goFirst;
    }
  }, [step, t]);

  const actionEnabled = step !== 'selectFirstOpponentType';

  // Reset Home state
  const resetHome = useCallback(() => {
    setSelectedDefenseTypes([]);
    setSelectedAttackType('noType');
    setStep('selectFirstOpponentType');
    setIsMenuPresented(false);
  }, []);

  // Select a Pokemon type
  const selectType = useCallback(
    (type: PokemonType) => {
      if (step === 'selectFirstOpponentType') {
        setSelectedDefenseTypes([type]);
        setStep('selectSecondOpponentType');
      } else if (step === 'selectSecondOpponentType') {
        let updated: PokemonType[];
        if (selectedDefenseTypes.includes(type)) {
          updated = selectedDefenseTypes.filter((item) => item !== type);
        } else if (selectedDefenseTypes.length < 2) {
          updated = [...selectedDefenseTypes, type];
        } else {
          updated = [selectedDefenseTypes[0], type];
        }
        setSelectedDefenseTypes(updated);
        if (updated.length === 0) {
          setStep('selectFirstOpponentType');
        }
      } else if (step === 'selectAttackType' || step === 'result') {
        setSelectedAttackType(type);
        setStep('result');

        const defense = selectedDefenseTypes.filter((item) => item !== 'noType');
        if (defense.length > 0 && type !== 'noType') {
          const mult = calculateMultiplier(type, defense);
          const newRecord: RecentMatchRecord = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            defenseTypes: defense,
            attackType: type,
            multiplier: mult,
            createdAt: new Date().toISOString(),
          };
          setRecentRecords((prev) => {
            const next = [newRecord, ...prev].slice(0, MAX_RECENT_RECORDS);
            persistRecentRecords(next);
            return next;
          });
        }
      }
    },
    [step, selectedDefenseTypes]
  );

  // Add defense types (from search result)
  const addDefenseTypes = useCallback((types: PokemonType[]) => {
    setSelectedDefenseTypes((prev) => {
      const updated = [...prev];
      for (const type of types) {
        if (type === 'noType') continue;
        if (updated.includes(type)) continue;

        if (updated.length < 2) {
          updated.push(type);
        } else {
          updated[1] = type;
        }
      }

      if (updated.length === 0) {
        setStep('selectFirstOpponentType');
      } else {
        setStep('selectSecondOpponentType');
      }

      return updated;
    });
  }, []);

  // Primary action button handler
  const performPrimaryAction = useCallback(() => {
    if (step === 'selectSecondOpponentType') {
      setStep('selectAttackType');
    } else if (step === 'selectAttackType' || step === 'result') {
      resetHome();
    }
  }, [step, resetHome]);

  // Back button handler
  const goBackHomeStep = useCallback(() => {
    if (isMenuPresented) {
      setIsMenuPresented(false);
      return;
    }

    switch (step) {
      case 'selectFirstOpponentType':
        break;
      case 'selectSecondOpponentType':
        setSelectedDefenseTypes([]);
        setStep('selectFirstOpponentType');
        break;
      case 'selectAttackType':
        setSelectedAttackType('noType');
        setStep('selectSecondOpponentType');
        break;
      case 'result':
        setSelectedAttackType('noType');
        setStep('selectAttackType');
        break;
    }
  }, [isMenuPresented, step]);

  // Edit defense types (returning from attack selection or result)
  const editDefenseSelection = useCallback(() => {
    setSelectedAttackType('noType');
    if (selectedDefenseTypes.length === 0) {
      setStep('selectFirstOpponentType');
    } else {
      setStep('selectSecondOpponentType');
    }
  }, [selectedDefenseTypes.length]);

  // Clear recent records
  const clearRecentRecords = useCallback(() => {
    setRecentRecords([]);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(RECENT_RECORDS_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  const value: MatchLabContextType = {
    step,
    setStep,
    selectedDefenseTypes,
    setSelectedDefenseTypes,
    selectedAttackType,
    setSelectedAttackType,
    primaryDefenseType,
    secondaryDefenseType,
    isMenuPresented,
    setIsMenuPresented,
    effectivenessSummary,
    title,
    subtitle,
    prompt,
    actionTitle,
    actionEnabled,
    selectType,
    addDefenseTypes,
    performPrimaryAction,
    goBackHomeStep,
    editDefenseSelection,
    resetHome,
    recentRecords,
    clearRecentRecords,
    searchQuery,
    setSearchQuery,
    searchResults,
    language,
    setLanguage,
    t,
    isFileAccessEnabled,
    setIsFileAccessEnabled,
  };

  return <MatchLabContext.Provider value={value}>{children}</MatchLabContext.Provider>;
}

export function useMatchLab(): MatchLabContextType {
  const context = useContext(MatchLabContext);
  if (!context) {
    throw new Error('useMatchLab must be used within a MatchLabProvider');
  }
  return context;
}
