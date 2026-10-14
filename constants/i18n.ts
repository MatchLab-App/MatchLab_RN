import type { PokemonType } from '@/constants/pokemonTypes';

export type AppLanguage = 'ko' | 'en' | 'ja';

export interface TranslationStrings {
  accessibilityBack: string;
  accessibilityCloseMenu: string;
  accessibilityLogo: string;
  accessibilityMenu: string;
  accessibilitySearch: string;
  accessibilitySelectedAttack: string;
  accessibilitySelectedDefense: string;
  confirmed: string;
  goNext: string;
  goFirst: string;
  attackTypeTitle: string;
  attackTypeDescription: string;
  attackTypePrompt: string;
  opponentTypeTitle: string;
  opponentTypeDescription: string;
  opponentFirstPrompt: string;
  opponentSecondPrompt: string;
  roleAttack: string;
  roleDefense: string;
  searchPlaceholder: string;
  noEffectivenessTitle: string;
  noEffectivenessDescription: string;
  superWeakEffectivenessTitle: string;
  weakEffectivenessTitle: string;
  weakEffectivenessDescription: string;
  normalEffectivenessTitle: string;
  normalEffectivenessDescription: string;
  strongEffectivenessTitle: string;
  superStrongEffectivenessTitle: string;
  strongEffectivenessDescription: string;
  menuRecent: string;
  menuTypeChart: string;
  menuSettings: string;
  settingsLanguage: string;
  languageKorean: string;
  languageEnglish: string;
  languageJapanese: string;
  fileAccessPermission: string;
  appServiceTitle: string;
  appServiceDescription1: string;
  appServiceDescription2: string;
  appServiceDescription3: string;
  readFullNotice: string;
  contact: string;
  contactEmail: string;
  welcome: string;
  touchTheScreen: string;
  version: string;
  startDisclaimer: string;
  typeLabels: Record<PokemonType, string>;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationStrings> = {
  ko: {
    accessibilityBack: '뒤로',
    accessibilityCloseMenu: '메뉴 닫기',
    accessibilityLogo: '매치랩 로고',
    accessibilityMenu: '메뉴 열기',
    accessibilitySearch: '이름으로 검색',
    accessibilitySelectedAttack: '선택한 공격 타입',
    accessibilitySelectedDefense: '선택한 상대 타입',
    confirmed: '확인했습니다',
    goNext: '다음으로',
    goFirst: '처음으로',
    attackTypeTitle: '시전 기술 타입',
    attackTypeDescription: '1개를 선택하세요',
    attackTypePrompt: '아래의 타입 아이콘에서\n시전 기술의 타입을 고르세요',
    opponentTypeTitle: '상대 타입',
    opponentTypeDescription: '1~2개를 선택하세요',
    opponentFirstPrompt: '상대의 첫번째 타입을 고르세요',
    opponentSecondPrompt: '두 번째 타입을 고르거나 다음으로 버튼을 눌러\n상대 타입 선택을 종료하세요',
    roleAttack: '공격',
    roleDefense: '수비',
    searchPlaceholder: '이름으로 타입 검색',
    noEffectivenessTitle: '0배 데미지',
    noEffectivenessDescription: '효과가 없다',
    superWeakEffectivenessTitle: '0.25배 데미지',
    weakEffectivenessTitle: '0.5배 데미지',
    weakEffectivenessDescription: '효과가 별로다',
    normalEffectivenessTitle: '1배 데미지',
    normalEffectivenessDescription: '중립 상성',
    strongEffectivenessTitle: '2배 데미지',
    superStrongEffectivenessTitle: '4배 데미지',
    strongEffectivenessDescription: '효과가 굉장하다!',
    menuRecent: '최근 기록',
    menuTypeChart: '상성표 보기 (6세대 이후)',
    menuSettings: '설정',
    settingsLanguage: '언어 설정',
    languageKorean: '한국어',
    languageEnglish: '영어',
    languageJapanese: '일본어',
    fileAccessPermission: '파일 접근 권한',
    appServiceTitle: '이 앱은 공식 서비스가 아닙니다',
    appServiceDescription1:
      '본 애플리케이션은 Nintendo, Game Freak, Creatures Inc., 또는 The Pokemon Company와 어떠한 공식적 제휴, 승인, 보증 관계도 없습니다.',
    appServiceDescription2:
      'Pokemon 및 그 관련 캐릭터의 저작권은 해당 소유자에게 귀속됩니다. 본 앱은 팬 프로젝트로서 순수한 비상업적 목적 하에 개발되었습니다.',
    appServiceDescription3:
      '이 앱에 사용된 모든 리소스(아이콘, 데이터, 그래픽 등)는 The Pokemon Company의 공식 자료를 사용하지 않고, 독자적으로 재구성 및 제작된 비공식 리소스입니다. 자유로운 공유 및 사용이 가능합니다.',
    readFullNotice: '안내문 전문 읽기',
    contact: '문의하기',
    contactEmail: 'a40654212@gmail.com',
    welcome: '환영합니다',
    touchTheScreen: '화면을 터치하세요',
    version: '1.0.1',
    startDisclaimer:
      '본 애플리케이션은 Nintendo, Game Freak, Creatures Inc.,\n또는 The Pokemon Company와 어떠한 공식적 제휴,\n승인, 보증 관계도 없습니다.',
    typeLabels: {
      grass: '풀',
      fire: '불꽃',
      fighting: '격투',
      flying: '비행',
      fairy: '페어리',
      ground: '땅',
      ice: '얼음',
      bug: '벌레',
      rock: '바위',
      poison: '독',
      water: '물',
      dragon: '드래곤',
      electric: '전기',
      ghost: '고스트',
      normal: '노말',
      psychic: '에스퍼',
      steel: '강철',
      dark: '악',
      noType: '미선택',
    },
  },
  en: {
    accessibilityBack: 'Back',
    accessibilityCloseMenu: 'Close menu',
    accessibilityLogo: 'MatchLab logo',
    accessibilityMenu: 'Open menu',
    accessibilitySearch: 'Search by name',
    accessibilitySelectedAttack: 'Selected attack type',
    accessibilitySelectedDefense: 'Selected opponent type',
    confirmed: 'I understand',
    goNext: 'Next',
    goFirst: 'Start over',
    attackTypeTitle: 'Move type',
    attackTypeDescription: 'Choose one',
    attackTypePrompt: 'Choose the move type from the icons below',
    opponentTypeTitle: 'Opponent type',
    opponentTypeDescription: 'Choose one or two',
    opponentFirstPrompt: "Choose the opponent's first type",
    opponentSecondPrompt: 'Choose a second type or press Next to finish',
    roleAttack: 'Attack',
    roleDefense: 'Defense',
    searchPlaceholder: 'Search type by name',
    noEffectivenessTitle: '0x damage',
    noEffectivenessDescription: 'No effect',
    superWeakEffectivenessTitle: '0.25x damage',
    weakEffectivenessTitle: '0.5x damage',
    weakEffectivenessDescription: 'Not very effective',
    normalEffectivenessTitle: '1x damage',
    normalEffectivenessDescription: 'Neutral matchup',
    strongEffectivenessTitle: '2x damage',
    superStrongEffectivenessTitle: '4x damage',
    strongEffectivenessDescription: 'Super effective!',
    menuRecent: 'Recent records',
    menuTypeChart: 'Type chart (Gen 6+)',
    menuSettings: 'Settings',
    settingsLanguage: 'Language',
    languageKorean: 'Korean',
    languageEnglish: 'English',
    languageJapanese: 'Japanese',
    fileAccessPermission: 'File access permission',
    appServiceTitle: 'This app is unofficial',
    appServiceDescription1:
      'This app is not affiliated with, endorsed by, or sponsored by Nintendo, Game Freak, Creatures Inc., or The Pokemon Company.',
    appServiceDescription2:
      'Pokemon and related characters belong to their respective owners. This app is a fan project developed for non-commercial purposes.',
    appServiceDescription3:
      'All resources used by this app are independently recreated unofficial resources and may be shared and used freely.',
    readFullNotice: 'Read full notice',
    contact: 'Contact',
    contactEmail: 'a40654212@gmail.com',
    welcome: 'Welcome!',
    touchTheScreen: 'Touch the screen',
    version: '1.0.1',
    startDisclaimer:
      'This app is not affiliated with, endorsed by, or sponsored by Nintendo, Game Freak, Creatures Inc., or The Pokemon Company.',
    typeLabels: {
      grass: 'Grass',
      fire: 'Fire',
      fighting: 'Fighting',
      flying: 'Flying',
      fairy: 'Fairy',
      ground: 'Ground',
      ice: 'Ice',
      bug: 'Bug',
      rock: 'Rock',
      poison: 'Poison',
      water: 'Water',
      dragon: 'Dragon',
      electric: 'Electric',
      ghost: 'Ghost',
      normal: 'Normal',
      psychic: 'Psychic',
      steel: 'Steel',
      dark: 'Dark',
      noType: 'None',
    },
  },
  ja: {
    accessibilityBack: '戻る',
    accessibilityCloseMenu: 'メニューを閉じる',
    accessibilityLogo: 'MatchLab ロゴ',
    accessibilityMenu: 'メニューを開く',
    accessibilitySearch: '名前で検索',
    accessibilitySelectedAttack: '選択した攻撃タイプ',
    accessibilitySelectedDefense: '選択した相手タイプ',
    confirmed: '確認しました',
    goNext: '次へ',
    goFirst: '最初から',
    attackTypeTitle: '技タイプ',
    attackTypeDescription: '1つ選択してください',
    attackTypePrompt: '下のタイプアイコンから\n技のタイプを選んでください',
    opponentTypeTitle: '相手タイプ',
    opponentTypeDescription: '1〜2つ選択してください',
    opponentFirstPrompt: '相手の1つ目のタイプを選んでください',
    opponentSecondPrompt: '2つ目のタイプを選ぶか、次へを押して終了してください',
    roleAttack: '攻撃',
    roleDefense: '防御',
    searchPlaceholder: '名前でタイプ検索',
    noEffectivenessTitle: '0倍ダメージ',
    noEffectivenessDescription: '効果がない',
    superWeakEffectivenessTitle: '0.25倍ダメージ',
    weakEffectivenessTitle: '0.5倍ダメージ',
    weakEffectivenessDescription: '効果はいまひとつ',
    normalEffectivenessTitle: '1倍ダメージ',
    normalEffectivenessDescription: '等倍相性',
    strongEffectivenessTitle: '2倍ダメージ',
    superStrongEffectivenessTitle: '4倍ダメージ',
    strongEffectivenessDescription: '効果は抜群!',
    menuRecent: '最近の記録',
    menuTypeChart: '相性表を見る (第6世代以降)',
    menuSettings: '設定',
    settingsLanguage: '言語設定',
    languageKorean: '韓国語',
    languageEnglish: '英語',
    languageJapanese: '日本語',
    fileAccessPermission: 'ファイルアクセス許可',
    appServiceTitle: 'このアプリは公式サービスではありません',
    appServiceDescription1:
      '本アプリは Nintendo、Game Freak、Creatures Inc.、The Pokemon Company とは公式の提携、承認、保証関係にありません。',
    appServiceDescription2:
      'Pokemon および関連キャラクターの著作権は各権利者に帰属します。本アプリは非営利目的のファンプロジェクトです。',
    appServiceDescription3:
      '本アプリのリソースは公式素材ではなく、独自に再構成した非公式リソースです。自由に共有および利用できます。',
    readFullNotice: '案内文を全文読む',
    contact: 'お問い合わせ',
    contactEmail: 'a40654212@gmail.com',
    welcome: 'ようこそ!',
    touchTheScreen: '画面をタッチしてください',
    version: '1.0.1',
    startDisclaimer:
      '本アプリは Nintendo、Game Freak、Creatures Inc.、The Pokemon Company とは公式の提携、承認、保証関係にありません。',
    typeLabels: {
      grass: 'くさ',
      fire: 'ほのお',
      fighting: 'かくとう',
      flying: 'ひこう',
      fairy: 'フェアリー',
      ground: 'じめん',
      ice: 'こおり',
      bug: 'むし',
      rock: 'いわ',
      poison: 'どく',
      water: 'みず',
      dragon: 'ドラゴン',
      electric: 'でんき',
      ghost: 'ゴースト',
      normal: 'ノーマル',
      psychic: 'エスパー',
      steel: 'はがね',
      dark: 'あく',
      noType: '未選択',
    },
  },
};

export const DEFAULT_LANGUAGE: AppLanguage = 'ko';

export function getStrings(lang: AppLanguage = DEFAULT_LANGUAGE): TranslationStrings {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.ko;
}

export function getTypeLabel(type: PokemonType, lang: AppLanguage = DEFAULT_LANGUAGE): string {
  const strings = getStrings(lang);
  return strings.typeLabels[type] ?? type;
}
