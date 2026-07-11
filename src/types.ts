/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorSwatch {
  name: string;
  hex: string;
  variable: string;
  description: string;
  textClass: string;
  contrastWhite: string;
  contrastCharcoal: string;
}

export interface ColorGroup {
  title: string;
  description: string;
  swatches: ColorSwatch[];
}

export interface TypographyItem {
  tag: string;
  name: string;
  font: "Poppins" | "Inter";
  sizeMobile: string;
  sizeDesktop: string;
  weight: string;
  tracking: string;
  usage: string;
  example: string;
}

export interface ButtonStateSpec {
  name: string;
  className: string;
  description: string;
}

export interface ButtonVariantSpec {
  name: string;
  description: string;
  primaryClass: string;
  secondaryClass: string;
  states: ButtonStateSpec[];
}

export interface SpacingItem {
  token: string;
  size: string;
  pixels: number;
  usage: string;
}

export interface BorderRadiusItem {
  token: string;
  value: string;
  usage: string;
}

export interface ShadowItem {
  token: string;
  value: string;
  usage: string;
}

export interface BadgeItem {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  usage: string;
}

export interface EventTagItem {
  label: string;
  bgClass: string;
  textClass?: string;
  iconName: string;
}

export interface MockEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  hostName: string;
  hostAvatar: string;
  image: string;
  category: "Technology" | "Business" | "Education" | "Culture" | "Community";
  price: string;
  isFree: boolean;
  rsvpCount: number;
  description: string;
  colorTheme: string;
  patternType: "vibrant" | "subtle" | "none";
}
