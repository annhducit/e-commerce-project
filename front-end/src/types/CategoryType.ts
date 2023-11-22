interface FeaturedItem {
    name: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
}

export interface SectionItem {
    name: string;
    href: string;
}

export interface CategorySection {
    id: string;
    name: string;
    items: SectionItem[];
}

export interface Category {
    id: string;
    name: string;
    featured: FeaturedItem[];
    sections: CategorySection[];
}
