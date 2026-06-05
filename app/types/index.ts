export interface Listing {
  id: string;
  slug: string;
  displayName: string;
  city: string;
  state: string;
  ageRange?: string;
  height?: string;
  build?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  bio?: string;
  ratesText?: string;
  phoneNumber?: string;
  incallOutcall?: "incall" | "outcall" | "both";
  services: string[];
  tier: "free" | "standard" | "premium" | "platinum";
  status: "draft" | "pending" | "live" | "paused";
  primaryImage?: string;
  images: string[];
  isVerified: boolean;
  isNew: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  status: "pending" | "verified" | "active" | "suspended";
  role: "advertiser" | "admin" | "moderator";
  createdAt: Date;
}

export interface Verification {
  id: string;
  userId: string;
  idDocumentUrl?: string;
  selfieUrl?: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: "standard" | "premium" | "platinum";
  amount: number;
  interval: "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
  status: "active" | "cancelled" | "expired" | "past_due";
}

export interface Tour {
  id: string;
  listingId: string;
  city: string;
  startDate: Date;
  endDate: Date;
}

export interface Location {
  state: string;
  cities: string[];
}

export const australianLocations: Location[] = [
  {
    state: "New South Wales",
    cities: ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Byron Bay", "Coffs Harbour", "Parramatta", "Bondi Junction", "Port Macquarie", "Wagga Wagga", "Albury", "Tamworth"]
  },
  {
    state: "Queensland",
    cities: ["Brisbane", "Gold Coast", "Sunshine Coast", "Cairns", "Surfers Paradise", "Townsville", "Toowoomba", "Mackay", "Rockhampton", "Airlie Beach", "Port Douglas"]
  },
  {
    state: "Victoria",
    cities: ["Melbourne", "Geelong", "Ballarat", "Mornington Peninsula", "Shepparton", "Mildura", "Echuca", "Phillip Island"]
  },
  {
    state: "Western Australia",
    cities: ["Perth", "Bunbury", "Mandurah", "Geraldton", "Broome", "Albany", "Busselton", "Kalgoorlie", "Margaret River", "Port Hedland"]
  },
  {
    state: "South Australia",
    cities: ["Adelaide", "Riverland"]
  },
  {
    state: "Tasmania",
    cities: ["Hobart", "Launceston", "Devonport", "Strahan"]
  },
  {
    state: "Northern Territory",
    cities: ["Darwin", "Katherine"]
  },
  {
    state: "ACT",
    cities: ["Canberra"]
  }
];

export const serviceCategories = {
  "For Women": ["Male companions for women", "Straight male escorts", "Straight male companions"],
  "For Men": ["Male companions for men", "Gay male escorts", "Gay male companions"],
  "Bi/Versatile": ["Bi companions", "Versatile companions", "Open to all"],
  "Touring": ["Touring companions", "Visiting companions", "International companions"]
};

export const attributes = {
  ageRange: ["18-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51-60", "60+"],
  height: ["Under 5'6\"", "5'6\" - 5'8\"", "5'9\" - 5'11\"", "6'0\" - 6'2\"", "6'3\" - 6'5\"", "Over 6'5\""],
  build: ["Slim", "Athletic", "Muscular", "Average", "Stocky", "Large", "Toned"],
  ethnicity: ["Caucasian", "African", "Asian", "Hispanic", "Middle Eastern", "Mixed", "Other"],
  hairColor: ["Black", "Brown", "Blonde", "Red", "Grey", "Bald", "Other"],
  eyeColor: ["Brown", "Blue", "Green", "Hazel", "Grey", "Amber"]
};

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth types
export interface RegisterPayload {
  email: string
  password: string
  display_name: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SessionUser {
  id: string
  email: string
  display_name?: string
  role: string
}

// Database schema types for Supabase
export interface DBUser {
  id: string
  email: string
  password_hash: string
  display_name: string | null
  status: 'active' | 'inactive' | 'banned'
  role: 'user' | 'moderator' | 'admin'
  created_at: string
  updated_at: string
}

export interface DBListing {
  id: string
  user_id: string
  display_name: string
  city?: string
  state?: string
  age_range?: string
  height?: string
  build?: string
  ethnicity?: string
  hair_color?: string
  eye_color?: string
  bio?: string
  rates_text?: string
  phone_number?: string
  incall_outcall?: string
  services?: string[]
  tier: 'basic' | 'standard' | 'premium'
  status: 'pending' | 'active' | 'inactive' | 'flagged' | 'banned'
  primary_image?: string
  is_verified: boolean
  created_at: string
  updated_at: string
  expires_at?: string
}

export interface DBListingPhoto {
  id: string
  listing_id: string
  url: string
  is_verified: boolean
  sort_order: number
  created_at: string
}

export interface DBVerification {
  id: string
  user_id: string
  id_document_url?: string
  selfie_url?: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_at?: string
  created_at: string
  updated_at: string
}

export interface DBSubscription {
  id: string
  user_id: string
  tier: string
  amount?: number
  interval: 'monthly' | 'quarterly' | 'yearly'
  start_date: string
  end_date?: string
  status: 'active' | 'cancelled' | 'expired'
  created_at: string
  updated_at: string
}

export interface DBModerationItem {
  id: string
  content_type: 'listing' | 'photo' | 'user' | 'report'
  content_id: string
  status: 'pending' | 'approved' | 'rejected'
  flags?: Record<string, unknown>
  created_at: string
  updated_at: string
}

// Supabase database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: DBUser
        Insert: Omit<DBUser, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<DBUser>
      }
      listings: {
        Row: DBListing
        Insert: Omit<DBListing, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<DBListing>
      }
      listing_photos: {
        Row: DBListingPhoto
        Insert: Omit<DBListingPhoto, 'id' | 'created_at'>
        Update: Partial<DBListingPhoto>
      }
      verifications: {
        Row: DBVerification
        Insert: Omit<DBVerification, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<DBVerification>
      }
      subscriptions: {
        Row: DBSubscription
        Insert: Omit<DBSubscription, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<DBSubscription>
      }
      moderation_queue: {
        Row: DBModerationItem
        Insert: Omit<DBModerationItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<DBModerationItem>
      }
    }
  }
}
