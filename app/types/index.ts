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
