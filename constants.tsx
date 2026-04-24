
import React from 'react';
import { 
  Heart, Shield, Users, Lightbulb, Handshake, Smile, 
  Activity, Brain, Droplets, Baby, Utensils, GraduationCap, LifeBuoy, Zap
} from 'lucide-react';
import { Program, Value, Achievement, Testimonial, NewsItem, GalleryItem, BoardMember, Partner } from './types';

export const CORE_VALUES: Value[] = [
  { title: 'Equity', description: 'Fair access to health services for all.', icon: <Heart className="w-8 h-8" /> },
  { title: 'Integrity', description: 'Honesty and transparency in all we do.', icon: <Shield className="w-8 h-8" /> },
  { title: 'Collaboration', description: 'Working together for a healthier future.', icon: <Handshake className="w-8 h-8" /> },
  { title: 'Empowerment', description: 'Giving communities the tools to thrive.', icon: <Users className="w-8 h-8" /> },
  { title: 'Innovation', description: 'Modern solutions for complex health issues.', icon: <Lightbulb className="w-8 h-8" /> },
  { title: 'Compassion', description: 'Care that respects human dignity.', icon: <Smile className="w-8 h-8" /> },
];

export const PROGRAMS: Program[] = [
  { id: '1', title: 'Public Health Promotion', description: 'Education and awareness campaigns on major health issues and disease prevention.', icon: <Activity /> },
  { id: '2', title: 'Mental Health & Psychosocial Support', description: 'Providing essential support systems and counseling for mental well-being.', icon: <Brain /> },
  { id: '3', title: 'Water, Sanitation & Hygiene (WASH)', description: 'Ensuring access to clean water and maintaining sanitary environments.', icon: <Droplets /> },
  { id: '4', title: 'Sexual and Reproductive Health', description: 'Comprehensive services and education for reproductive rights and safety.', icon: <LifeBuoy /> },
  { id: '5', title: 'Maternal and Child Health', description: 'Specialized care for mothers and children to reduce mortality and improve outcomes.', icon: <Baby /> },
  { id: '6', title: 'Nutrition', description: 'Fighting malnutrition through community programs and dietary education.', icon: <Utensils /> },
  { id: '7', title: 'Youth Empowerment and Education', description: 'Training the next generation of leaders in health and community development.', icon: <GraduationCap /> },
  { id: '8', title: 'Emergency Health Response', description: 'Rapid humanitarian assistance during health crises and emergencies.', icon: <Zap /> },
];

export const ACHIEVEMENTS: Achievement[] = [
  { label: 'Communities Reached', value: 20, suffix: '+' },
  { label: 'Programs Conducted', value: 10, suffix: '+' },
  { label: 'People Impacted', value: 1000, suffix: '+' },
  { label: 'Volunteers Engaged', value: 50, suffix: '+' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Sara",
    role: "Public Health Advocate",
    text: "Through the work of Progressive Health Initiative Liberia (PHIL Inc.), menstrual hygiene and community health have been placed at the forefront of public health advocacy. The organization is not only promoting awareness and practical interventions, but also driving meaningful conversations that address long-standing gaps in access, education, and dignity. PHIL Inc.’s efforts underscore the urgent need for coordinated action. I strongly call for immediate collaboration among health-focused NGOs in Liberia and across the globe to strengthen partnerships, share resources, and scale sustainable solutions that improve the health and well-being of our communities.",
    photo: "https://res.cloudinary.com/dysfuy1yx/image/upload/v1772060717/jzwpxagckl8xrn1iiu5x.jpg"
  },
  {
    name: "Mrs. Suku",
    role: "Gender Coordinator, Maryland County",
    text: "Partnering with Progressive Health Initiative Liberia (PHIL Inc.) to advance public health and gender equality is foundational to building a balanced and inclusive society. By addressing health disparities and promoting equal opportunities for women and men, PHIL Inc. is strengthening families, empowering communities, and laying the groundwork for sustainable social development.",
    photo: "https://res.cloudinary.com/dysfuy1yx/image/upload/v1772060717/nnlluzzfsqsjpmdbuoso.jpg"
  },
  {
    name: "Mrs. Caroline Gonleh",
    role: "Officer-in-Charge, Barriken Clinic, Maryland County",
    text: "What Progressive Health Initiative Liberia (PHIL Inc.) has accomplished through the donation of essential sanitation materials, particularly as a young and growing health organization, is truly exceptional. Their support has significantly strengthened our capacity to maintain hygiene standards and improve patient care. With PHIL Inc. as a partner, we are confident that even greater impact and continued support will follow in the future.",
    photo: "https://res.cloudinary.com/dysfuy1yx/image/upload/v1772060716/rorlidhjx67kmdo7apxy.jpg"
  }
];

export const NEWS_UPDATES: NewsItem[] = [
  { id: 'n1', title: 'Community Health Seminar 2024', category: 'Event', date: 'Sept 15, 2024', image: 'https://picsum.photos/seed/news1/600/400' },
  { id: 'n2', title: 'Improve Health, Save Lives Project Launch', category: 'Project', date: 'March 10, 2025', image: 'https://picsum.photos/seed/news2/600/400' },
  { id: 'n3', title: 'Radio Program Reaches New Heights', category: 'Announcement', date: 'Jan 22, 2025', image: 'https://picsum.photos/seed/news3/600/400' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', title: 'Traditional Hand-Dug Well Structure', category: 'Hygiene', image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1771101507/hyience1_f0rl1o.jpg' },
  { id: 'g2', title: 'Water Source Inspection with Storage Containers', category: 'Hygiene', image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1771101505/hyience2_t6b3ne.jpg' },
  { id: 'g3', title: 'Deep Well Interior and Infrastructure', category: 'Hygiene', image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1771101503/hyience3_kr2jim.jpg' },
  { id: 'g4', title: 'Community Water Point with Collection Bucket', category: 'Hygiene', image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1771101508/hyience4_wqkmps.jpg' },
  { id: 'g5', title: 'Protected Well with Sanitation Cover', category: 'Hygiene', image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1771101505/hyience5_zdbev5.jpg' },
  { id: 'g6', title: 'Classroom Health Awareness Session', category: 'Engagement', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070265/domaspdusby4qh5wk8i9.jpg' },
  { id: 'g7', title: 'Student Engagement and Health Education', category: 'Engagement', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070265/cttsrtpfube7cn07v5we.jpg' },
  { id: 'g8', title: 'PHIL Branded Hygiene Bucket Distribution', category: 'Donations', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070264/i409upyjmxzlgb1dm0iy.jpg' },
  { id: 'g9', title: 'Community Outreach Team Group Photo', category: 'Donations', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070264/ww3blktrjuutmtpsfxls.jpg' },
  { id: 'g10', title: 'Stakeholder and Community Consultation', category: 'Donations', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070265/qjgdmeogtg8dqqacmdoz.jpg' },
  { id: 'g11', title: 'Dedicated PHIL Field Staff and Volunteers', category: 'Staff', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070265/szgz2pqbdrh5zn44wd3q.jpg' },
  { id: 'g12', title: 'Organizational Planning and Strategy Meeting', category: 'Staff', image: 'https://res.cloudinary.com/dysfuy1yx/image/upload/v1772070264/zoweadl9w6oaqrbdx58y.jpg' },
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'b1',
    name: 'Isaac M. Bleh, Jr.',
    position: 'Founder',
    address: 'Harper City, Maryland County, Liberia, West Africa',
    cell: '0881-812-883 / 0775-001-972',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221754/WhatsApp_Image_2026-02-27_at_19.47.58_peohhe.jpg'
  },
  {
    id: 'b2',
    name: 'G. Cary Karzon',
    position: 'Founding Member',
    address: 'Monrovia, Montserrado County, Liberia, West Africa',
    cell: '0777-266-419 / 0886-693-974',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221754/WhatsApp_Image_2026-02-27_at_19.47.57_1_rorxbn.jpg'
  },
  {
    id: 'b3',
    name: 'Abednego V. Johnson',
    position: 'Founding Member',
    address: 'Harper City, Maryland County, Liberia, West Africa',
    cell: '0880-971-470 / 0777-052-683',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221754/WhatsApp_Image_2026-02-27_at_19.47.57_obkfp6.jpg'
  },
  {
    id: 'b4',
    name: 'Gertrude Z. Gonleh',
    position: 'Founding Member',
    address: 'Rehab Community, Paynesville City, Montserrado County, Liberia, West Africa',
    cell: '0770-341-531 / 0886-415-681',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221754/WhatsApp_Image_2026-02-27_at_19.47.56_hnrmat.jpg'
  },
  {
    id: 'b5',
    name: 'Summerhill J. K. Karzon',
    position: 'Founding Member',
    address: 'Monrovia, Montserrado County, Liberia, West Africa',
    cell: '0886-548-269 / 0777-548-269',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221754/WhatsApp_Image_2026-02-27_at_19.47.57_2_pmzox6.jpg'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Ministry of Health Republic of Liberia',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221442/WhatsApp_Image_2026-02-27_at_12.17.21_p8hipn.jpg'
  },
  {
    id: 'p2',
    name: 'Ministry of Gender, Children & Social Protection, Maryland County Chapter',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221442/WhatsApp_Image_2026-02-27_at_12.18.51_ka9njb.jpg'
  },
  {
    id: 'p3',
    name: 'Health Horizons Liberia (HHL)',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772221442/WhatsApp_Image_2026-02-27_at_12.19.56_mbyifw.jpg'
  },
  {
    id: 'p4',
    name: 'Maryland County Health Team (MCHT)',
    image: 'https://res.cloudinary.com/dew5uptfr/image/upload/v1772225038/01_bnqz1n.jpg'
  }
];


