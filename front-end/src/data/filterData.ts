export const color = [
    "White",
    "Black",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Grey",
];

export const filter = [
    {
        id: "color",
        name: "Color",
        options: [
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "red", label: "Red" },
            { value: "green", label: "Green" },
            { value: "blue", label: "Blue" },
            { value: "yellow", label: "Yellow" },
            { value: "orange", label: "Orange" },
            { value: "purple", label: "Purple" },
            { value: "pink", label: "Pink" },
            { value: "brown", label: "Brown" },
            { value: "gray", label: "Grey" },
        ],
    },
    {
        id: "size",
        name: "Size",
        options: [
            { value: "s", label: "S" },
            { value: "m", label: "M" },
            { value: "l", label: "L" },
        ],
    },
];

export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            { value: "159-339", label: "$159 to $339" },
            { value: "339-999", label: "$339 to $999" },
            { value: "999-1999", label: "$999 to $1999" },
            { value: "1999-2999", label: "$1999 to $2999" },
            { value: "2999-4999", label: "$2999 to $4999" },
        ],
    },
    {
        id: "discount",
        name: "Discount Range",
        options: [
            { value: "10", label: "10% and above" },
            { value: "20", label: "20% and above" },
            { value: "30", label: "30% and above" },
            { value: "40", label: "40% and above" },
            { value: "50", label: "50% and above" },
            { value: "60", label: "60% and above" },
            { value: "70", label: "70% and above" },
            { value: "80", label: "80% and above" },
        ],
    },
    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "in_stock", label: "In Stock" },
            { value: "out_of_stock", label: "Out Of Stock" },
        ],
    },
];
