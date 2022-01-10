export interface Record{
    id?: number;
}

export interface Order extends Record {
    id?: number;
    contact_name: string;
    contact_phone: string;
    real_estate: string;
    description: string;
    deadline: string;
    company_id?: Company;
    category_i?: Category;
}

export interface Company extends Record {
    id?: number;
    name: string;
    tag: string;
    description: string;
    orders?: Order[];
}

export interface Category extends Record {
    id?: number;
    name: string;
    tag: string;
    description: string;
    orders?: Order[];
}
