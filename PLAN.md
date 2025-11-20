# PLAN.md - Development Roadmap

## Phase 1 コンセプト & プロトタイプ設計 [CURRENT]
 世界観・プロット構築 完了
 キャラクター設定 主要キャラ・敵組織完了
 コアシステム設計
     バトルシステム（スチームゲージ、発明、時魔法）のロジック確定
     UIイメージの策定
 アセットリスト作成 必要なドット絵、BGM、SEの洗い出し

## Phase 2 バーティカル・スライス (Vertical Slice) 作成 [DONE]
 目標 「オープニング～最初のボス撃破」までを実際にプレイ可能な状態にする。
 実装範囲
     マップ 下層区ガレージ、スラム街、市街地脱出ルート
     イベント オープニング演出、リリィとの出会い（列車イベントの前倒し含む可能性あり）
     バトル 雑魚敵、中ボス（スチーム・トルーパー隊長）
     システム メニュー画面、簡易ショップ、発明システム（基礎）

## Phase 3 本編コンテンツ制作 [DONE]
 ダンジョン実装
     大陸横断列車「アイアン・サーペント」（vs リリィ）
     廃棄物処理プラント「ロッテン・コア」（vs ギギ）
     天空の塔「アトラス」（vs ガルド）
 フィールド ワールドマップ移動、飛空艇入手イベント

## Phase 4 クライマックス & ポリッシュ [DONE]
 ラストダンジョン 空中要塞「バベル・ギア」
 最終決戦 vs ヴィクトル総帥、マザー・ギア
 エンディング 分岐・演出の実装
 バランス調整 敵のパラメータ、発明品のドロップ率調整

## Phase 5 リリース準備 [CURRENT]
 デバッグ
 プラットフォーム対応

---

# WebUIメニュー開発計画 (feature/webui-menu)

## 📋 プロジェクト概要

**目的**: 既存のCLIベースRPGゲームに、ブラウザで動作するWebUIレイヤーを追加し、プレイ可能なゲームとして完成させる。

**スコープ**: フェーズ1では、ゲームの主要メニューとUIコンポーネントを実装し、既存のTypeScriptゲームロジックと統合する。

---

## 🎯 WebUI開発フェーズ

### WebUIフェーズ1: 基盤構築とメニューシステム（本ブランチの対象）
- Webフロントエンド環境のセットアップ
- コアUIフレームワークの選定と導入
- 基本メニューシステムの実装
- 既存ゲームロジックとの統合インターフェース

### WebUIフェーズ2: ゲーム画面の実装（将来）
- バトル画面
- マップ移動画面
- ショップ/クラフティング画面

### WebUIフェーズ3: アセット統合とポリッシュ（将来）
- グラフィック、サウンドの統合
- アニメーション実装
- パフォーマンス最適化

---

## 🛠️ 技術スタック選定

### フロントエンド
- **UIフレームワーク**: React 18+
  - 理由: コンポーネントベースの設計、豊富なエコシステム、TypeScript対応
- **ビルドツール**: Vite
  - 理由: 高速な開発サーバー、HMR、TypeScript標準サポート
- **スタイリング**: CSS Modules + Sass
  - 理由: スコープ化されたスタイル、16bitレトロRPG風のピクセルアート対応

### 状態管理
- **グローバルステート**: Zustand
  - 理由: 軽量、既存の`GameState`シングルトンとの統合が容易
- **UI状態**: React Hooks（useState, useReducer）

### 型安全性
- **TypeScript**: strict mode継続
- 既存の型定義（`src/types/`）を再利用

### レンダリング
- **Canvas or DOM**: DOM based (初期フェーズ)
  - 理由: メニューUI実装が容易、CSS transitionsでレトロ感を演出可能
  - 将来的にバトル画面でCanvas/PixiJSを検討

---

## 📁 ディレクトリ構造（新規追加部分）

```
steampunk_rpg/
├── src/
│   ├── web/                    # 新規: Web UI層
│   │   ├── components/         # Reactコンポーネント
│   │   │   ├── common/         # 共通UIパーツ
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── DialogBox.tsx
│   │   │   │   └── PixelBorder.tsx
│   │   │   ├── menus/          # メニュー画面
│   │   │   │   ├── TitleMenu.tsx
│   │   │   │   ├── MainMenu.tsx
│   │   │   │   ├── GameMenu.tsx
│   │   │   │   ├── InventoryMenu.tsx
│   │   │   │   └── SettingsMenu.tsx
│   │   │   ├── screens/        # ゲーム画面
│   │   │   │   ├── BattleScreen.tsx
│   │   │   │   ├── MapScreen.tsx
│   │   │   │   └── ShopScreen.tsx
│   │   │   └── App.tsx         # ルートコンポーネント
│   │   ├── hooks/              # カスタムフック
│   │   │   ├── useGameState.ts
│   │   │   └── useBattle.ts
│   │   ├── stores/             # Zustand store
│   │   │   └── gameStore.ts
│   │   ├── styles/             # グローバルスタイル
│   │   │   ├── global.scss
│   │   │   ├── variables.scss  # カラーパレット、フォント定義
│   │   │   └── mixins.scss
│   │   └── main.tsx            # エントリーポイント
│   ├── systems/                # 既存: ゲームロジック（変更なし）
│   ├── data/                   # 既存: ゲームデータ（変更なし）
│   └── types/                  # 既存: 型定義（拡張）
├── public/                     # 新規: 静的アセット
│   ├── index.html
│   ├── fonts/                  # ピクセルフォント
│   └── assets/                 # 画像、サウンド（将来）
├── dist/                       # ビルド出力
└── vite.config.ts              # 新規: Vite設定
```

---

## 🎨 UI/UX設計方針

### デザインコンセプト
- **スーパーファミコン後期（1994-1996年代）のUIを再現**
  - ピクセルフォント使用
  - ウィンドウ枠はドット絵風のボーダー
  - カラーパレット: 錆、蒸気、油を連想させる色
    - ベース: `#2B2A28`（ダークグレー）
    - アクセント: `#D4A574`（錆色）、`#6B8E9E`（スチームブルー）
    - テキスト: `#F5E6D3`（アンティークホワイト）

### レスポンシブ対応
- 基本解像度: 1280x720（16:9）
- 最小解像度: 640x480
- モバイルは将来対応（フェーズ3以降）

---

## 🔧 実装する主要コンポーネント

### 1. タイトルメニュー (`TitleMenu.tsx`)
```
┌─────────────────────────────────┐
│  GEAR CHRONICLE                 │
│  ～錆びついた空の歌～             │
│                                 │
│  > NEW GAME                     │
│    CONTINUE                     │
│    SETTINGS                     │
│                                 │
└─────────────────────────────────┘
```

**機能**:
- ニューゲーム開始
- セーブデータからの継続（localStorage使用）
- 設定画面への遷移

### 2. ゲーム内メニュー (`GameMenu.tsx`)
```
┌─────────────────────────────────┐
│  MENU                           │
│  ├─ PARTY                       │
│  ├─ INVENTORY                   │
│  ├─ EQUIPMENT                   │
│  ├─ STATUS                      │
│  ├─ SAVE                        │
│  └─ SETTINGS                    │
└─────────────────────────────────┘
```

**機能**:
- インベントリ管理
- キャラクターステータス表示
- セーブ/ロード機能

### 3. インベントリメニュー (`InventoryMenu.tsx`)
```
┌─────────────────────────────────┐
│  INVENTORY            GOLD: 150G│
│                                 │
│  [Consumable]                   │
│  > Oil Potion x3                │
│    Scrap Metal x10              │
│                                 │
│  [Material]                     │
│    Rusty Gear x5                │
│                                 │
│  Description: Heals 50 HP       │
└─────────────────────────────────┘
```

**機能**:
- アイテムリスト表示（カテゴリ別）
- アイテム詳細表示
- アイテム使用（戦闘外）

### 4. 設定メニュー (`SettingsMenu.tsx`)
```
┌─────────────────────────────────┐
│  SETTINGS                       │
│                                 │
│  BGM Volume:    [====------] 40%│
│  SE Volume:     [========--] 80%│
│  Text Speed:    [FAST/MID/SLOW] │
│  Window Color:  [DARK/LIGHT]    │
│                                 │
└─────────────────────────────────┘
```

**機能**:
- 音量調整（将来実装）
- テキスト速度設定
- ウィンドウカラー変更

---

## 🔄 ゲームロジックとの統合

### 既存コードの活用
現在の`src/systems/`配下のロジックはそのまま利用可能:
- `GameState`: Zustand storeでラップ
- `BattleEngine`: React hooksでラップ
- `ShopSystem`: React hooksでラップ
- `EventManager`: React hooksでラップ

### 統合パターン例
```typescript
// src/web/hooks/useGameState.ts
import { GameState } from '../../systems/core/gameState';
import { useEffect, useState } from 'react';

export const useGameState = () => {
  const gameState = GameState.getInstance();
  const [party, setParty] = useState(gameState.party);
  const [gold, setGold] = useState(gameState.gold);

  // リアクティブな更新処理
  const refresh = () => {
    setParty([...gameState.party]);
    setGold(gameState.gold);
  };

  return { party, gold, refresh, gameState };
};
```

---

## 📊 マイルストーン

### マイルストーン1: 環境構築（1-2日）
- [ ] Viteプロジェクトのセットアップ
- [ ] ReactとTypeScriptの設定
- [ ] ディレクトリ構造の作成
- [ ] 基本的なスタイルシステムの構築

### マイルストーン2: 共通コンポーネント（2-3日）
- [ ] PixelBorderコンポーネント
- [ ] Buttonコンポーネント
- [ ] DialogBoxコンポーネント
- [ ] メニューナビゲーションロジック

### マイルストーン3: メニュー画面実装（3-4日）
- [ ] TitleMenu実装
- [ ] GameMenu実装
- [ ] InventoryMenu実装
- [ ] SettingsMenu実装

### マイルストーン4: ゲームロジック統合（2-3日）
- [ ] GameStateとReactの統合
- [ ] セーブ/ロード機能（localStorage）
- [ ] イベントシステムとの連携

### マイルストーン5: テストとポリッシュ（2日）
- [ ] 動作確認とデバッグ
- [ ] スタイル調整
- [ ] ドキュメント更新

**合計見積もり**: 10-14日

---

## ⚠️ 技術的課題と解決策

### 課題1: 既存のシングルトンパターンとReactの相性
**解決策**:
- Zustand storeで`GameState`をラップ
- 変更通知をイベントエミッターで実装

### 課題2: レトロな見た目の再現
**解決策**:
- CSSフィルター（pixelated rendering）
- カスタムピクセルフォントの導入
- ドット絵風ボーダー画像の使用

### 課題3: パフォーマンス
**解決策**:
- React.memoで不要な再レンダリング防止
- 仮想スクロール（インベントリが大量の場合）

### 課題4: 状態の永続化
**解決策**:
- localStorage APIで簡易セーブ
- 将来的にIndexedDBへの移行を検討

---

## 🧪 テスト戦略

### 単体テスト
- React Testing Libraryでコンポーネントテスト
- 既存のゲームロジックテストは維持

### 統合テスト
- ユーザーフロー（タイトル→ゲーム開始→メニュー操作）のE2Eテスト
- Playwrightの導入を検討

### 手動テスト
- 各ブラウザでの動作確認（Chrome, Firefox, Safari）

---

## 📚 参考資料

### デザイン参考
- スーパーファミコン: ファイナルファンタジーVI（メニューUI）
- スーパーファミコン: クロノ・トリガー（戦闘UI）
- Steamワールドシリーズ（スチームパンク表現）

### 技術参考
- [Vite公式ドキュメント](https://vitejs.dev/)
- [React公式ドキュメント](https://react.dev/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🎓 学習目標

このプロジェクトを通じて以下を習得:
1. TypeScriptでのフルスタック開発（ロジック+UI）
2. Reactでのゲームメニュー設計パターン
3. レガシーコードとモダンフロントエンドの統合
4. レトロゲームUIの実装技法

---

## 📝 備考

- **コードの実装は次のステップ**: 本ドキュメント承認後に実装開始
- **デザインモックアップ**: Figmaでのモックアップは不要（直接実装）
- **アクセシビリティ**: 基本的なキーボードナビゲーションを実装
- **国際化**: 将来的にi18nを検討（現在は日本語/英語混在で可）