export enum Tone {
  FORMAL = 'FORMAL',
  FRIENDLY = 'FRIENDLY',
  URGENT = 'URGENT',
}

export enum Format {
  NEWSLETTER = 'NEWSLETTER',
  WEB_POST = 'WEB_POST',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
}

export interface AnnouncementInput {
  title: string;
  target: string;
  content: string;
  tone: Tone;
  format: Format;
}

export interface GeneratedAnnouncement {
  title: string;
  content: string;
  imageUrl: string;
}