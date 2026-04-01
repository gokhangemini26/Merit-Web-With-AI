export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductSlide {
  brand: string;
  badge?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  href?: string;
}
