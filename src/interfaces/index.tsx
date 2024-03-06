export interface DataModel {
    full_name: string;
    contact_number: string;
    email: string;
    date_of_birth: {
        day: Number;
        month: Number;
        year: Number;
    }
    password: string;
    confirm_password: string;
}

export const EmptyModel: DataModel = {
    full_name: '',
    contact_number: '',
    email: '',
    date_of_birth: {
        day: 0,
        year: 0,
        month: 0,
    },
    password: '',
    confirm_password: ''
}

export interface Menu {
    label: any;
    value: any;
}