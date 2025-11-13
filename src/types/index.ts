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
  keywords: string[];
  keywordsEnabled: boolean;
  groupBy: "domain" | "none" | "count";
  groupByCount?: number;
  removeNumeric: boolean;
  extractionType: "email" | "url";
  filterType: "include" | "exclude";
  filterStrings: string[];
  lowercase: boolean;
  customSeparator?: string;
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
  keywordsEnabled: boolean; // persist keyword filter toggle state
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
  keywordsEnabled: false,
  removeNumeric: true,
  privacyNoticeShown: false,
};

// Storage key
export const STORAGE_KEY = "whois_mail:settings";

// Default filter keywords for UI (optimized - removes duplicates and redundant patterns)
export const DEFAULT_FILTER_KEYWORDS = "whois,domain,dns,proxy,priv,regi,webmaster,protection,obsc,anonymiz,@contac,host,gandi,support,qq.com,naver.com,hxmail.com,pro.net,xell.hk,corp.com,wix,.html,163,139,126,post,hello,service,.pk,.ru,.ra,.za,.in,kontakt,contacto,admin,hola,office,reservation,help,cust,mail,outloo,yahoo,reception,frontdesk,dpo,hr@,enquiries,realestate@,subscribe,filler,aol,gmx,client,amministrazione@,order,mysite,reply,.com.br,.com.bd,blog,podcast,test,destek,abc,xyz,cs@,referral,bookings@,ticket@,license@,paypal,payment@,website,appointments,hi@,team@,membership@,shop@,sales@,marketing@,newsletter,news,billing@,accounts@,accounting@,supporto@,service@,security@,abuse@,noc@,postmaster@,hostmaster@";

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
