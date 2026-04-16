export interface RawPlace {
  source: 'overpass' | 'google' | 'nhs' | 'manual';
  sourceId?: string;
  name: string;
  website?: string;
  phone?: string;
  address?: string;
  postcode?: string;
  city?: string;
  lat?: number;
  lon?: number;
  rating?: number;
  reviewCount?: number;
}

export interface WebsiteFindings {
  url: string;
  fetchedUrls: string[];
  emails: string[];
  phones: string[];
  invisalignMentions: number;
  postcode?: string;
  owners: OwnerCandidate[];
  rawTitle?: string;
  error?: string;
}

export interface OwnerCandidate {
  name: string;
  role?: string;
  source: 'website' | 'companies-house';
  confidence: number; // 0..1
}

export interface CompaniesHouseOfficer {
  companyNumber: string;
  companyName: string;
  name: string;
  role?: string;
  appointedOn?: string;
  resignedOn?: string;
}

export interface Lead {
  rank?: number;
  practiceName: string;
  ownerName?: string;
  ownerRole?: string;
  ownerSource?: string;
  phones: string[];
  primaryPhone?: string;
  emails: string[];
  primaryEmail?: string;
  website?: string;
  address?: string;
  postcode?: string;
  city?: string;
  lat?: number;
  lon?: number;
  rating?: number;
  reviewCount?: number;
  invisalignMentions: number;
  distanceKmFromBham: number;
  popularityScore: number;
  proximityScore: number;
  invisalignScore: number;
  score: number;
  sources: string[];
  notes: string[];
}
