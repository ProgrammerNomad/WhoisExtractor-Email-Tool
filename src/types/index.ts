// Message types for communication between components
export type MessageType =
  | "start"
  | "start-direct"
  | "start-worker"
  | "batch"
  | "complete"
  | "cancel"
  | "error"
  | "memoryWarning";

// Extraction options
export interface ExtractionOptions {
  sort: boolean;
  dedupe: boolean;
  separator: string;
  keywords?: string[];
  groupBy?: "domain" | "none";
}

// Start extraction message (Popup → Background)
export interface StartMessage {
  type: "start";
  id: string;
  input: string | Uint8Array;
  options: ExtractionOptions;
}

// Start direct extraction (Background → Offscreen)
export interface StartDirectMessage {
  type: "start-direct";
  id: string;
  input: string;
  options: ExtractionOptions;
}

// Start worker extraction (Background → Offscreen)
export interface StartWorkerMessage {
  type: "start-worker";
  id: string;
  input: string;
  options: ExtractionOptions;
}

// Batch results message (Worker/Offscreen → Background → Popup)
export interface BatchMessage {
  type: "batch";
  id: string;
  emails: string[];
  progressPercent: number;
  totalCount: number;
}

// Completion message
export interface CompleteMessage {
  type: "complete";
  id: string;
  totalCount: number;
  sorted: boolean;
}

// Cancel message
export interface CancelMessage {
  type: "cancel";
  id: string;
}

// Error message
export interface ErrorMessage {
  type: "error";
  id: string;
  message: string;
  code?: string;
}

// Memory warning message (Worker → UI)
export interface MemoryWarningMessage {
  type: "memoryWarning";
  id: string;
  currentSetSize: number;
  message: string;
  options: ("continue" | "cancel" | "serverOption")[];
}

// Union type for all messages
export type Message =
  | StartMessage
  | StartDirectMessage
  | StartWorkerMessage
  | BatchMessage
  | CompleteMessage
  | CancelMessage
  | ErrorMessage
  | MemoryWarningMessage;

// Settings stored in chrome.storage.local
export interface Settings {
  chunkSize: number; // bytes (default 256 KB = 262144)
  batchSize: number; // emails per batch (default 1000)
  sortThreshold: number; // max emails to sort (default 50000)
  maxSetSize: number; // pause if Set exceeds (default 200000)
  keywords: string[]; // saved keyword filters
  removeNumeric: boolean; // remove numeric-only emails
  privacyNoticeShown: boolean; // first-run privacy notice flag
}

// Default settings
export const DEFAULT_SETTINGS: Settings = {
  chunkSize: 262144, // 256 KB
  batchSize: 1000,
  sortThreshold: 50000,
  maxSetSize: 200000,
  keywords: [],
  removeNumeric: true,
  privacyNoticeShown: false,
};

// Storage key
export const STORAGE_KEY = "whois_mail:settings";

// Separator options
export type SeparatorType = "comma" | "newline" | "semicolon" | "pipe" | "tab";

export const SEPARATOR_OPTIONS: Record<SeparatorType, string> = {
  comma: ",",
  newline: "\n",
  semicolon: ";",
  pipe: "|",
  tab: "\t",
};

// Extraction status
export type ExtractionStatus = "idle" | "processing" | "completed" | "error" | "cancelled";

// Component props interfaces
export interface InputSectionProps {
  onTextChange: (text: string) => void;
  onFileChange: (file: File | null) => void;
  disabled: boolean;
}

export interface OptionsPanelProps {
  options: ExtractionOptions;
  onOptionsChange: (options: ExtractionOptions) => void;
  disabled: boolean;
  emailCount: number;
}

export interface ResultsDisplayProps {
  emails: string[];
  isProcessing: boolean;
}

export interface ProgressBarProps {
  progress: number;
  totalCount: number;
  status: ExtractionStatus;
}

export interface ExportButtonsProps {
  emails: string[];
  disabled: boolean;
  separator: string;
}

// Helper type for chunk processing
export interface ChunkResult {
  emails: string[];
  chunkIndex: number;
  totalChunks: number;
}
