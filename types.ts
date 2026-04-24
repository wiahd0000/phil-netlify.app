
import React from 'react';

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Achievement {
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  photo: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface GallerySession {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

// Added GalleryItem interface to fix import errors in constants.tsx and App.tsx
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface BoardMember {
  id: string;
  name: string;
  position: string;
  address: string;
  cell: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  image: string;
}
