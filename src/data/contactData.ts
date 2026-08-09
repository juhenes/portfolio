import { PERSONAL_INFO } from './aboutData';

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  leetcode: string;
  ctftime: string;
}

export const CONTACT_DATA: ContactInfo = {
  email: PERSONAL_INFO.email,
  phone: PERSONAL_INFO.phone,
  location: PERSONAL_INFO.location,
  linkedin: PERSONAL_INFO.linkedin,
  github: PERSONAL_INFO.github,
  leetcode: PERSONAL_INFO.leetcode,
  ctftime: PERSONAL_INFO.ctftime,
};
