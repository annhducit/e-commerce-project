// Interface for the featured items in a category
interface FeaturedItem {
    name: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
}

// Interface for an item in a category section
export interface SectionItem {
    name: string;
    href: string;
}

// Interface for a section in a category
export interface CategorySection {
    id: string;
    name: string;
    items: SectionItem[];
}

// Interface for a category
export interface Category {
    id: string;
    name: string;
    featured: FeaturedItem[];
    sections: CategorySection[];
}

// Define the data with the specified types
