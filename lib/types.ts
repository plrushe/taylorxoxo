export type Role='candidate'|'recruiter'|'organisation_admin'|'platform_admin';
export type ApplicationStatus='applied'|'viewed'|'rejected'|'whitelisted'|'chat_opened'|'interview_requested'|'interview_scheduled'|'offer_made'|'hired'|'withdrawn'|'expired';
export type Job={id:string;title:string;slug:string;country:string;city:string;location_text:string;school_type:string;salary_min:number;salary_max:number;salary_currency:string;visa_sponsorship:boolean;sponsored:boolean;status:string;description:string;organisation?:{name:string;verified_status:string}};
export type CandidateProfile={id:string;user_id:string;display_name:string;headline:string;current_country:string;current_city:string;profile_completion_percentage:number;is_profile_complete:boolean;employment_search_status:string};
export type Resource={id:string;title:string;slug:string;excerpt:string;category:string;country:string|null;visibility:string;published:boolean};
