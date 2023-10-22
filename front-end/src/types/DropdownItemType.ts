export type DropdownItemType = {
    id: number;
    title: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    to?: string;
};
