export interface DataModel {
    full_name: string;
    contact_number: string;
    email: string;
    date_of_birth: {
        day: string;
        month: string;
        year: string;
    }
    password: string;
    confirm_password: string;
}

export const EmptyModel: DataModel = {
    full_name: '',
    contact_number: '',
    email: '',
    date_of_birth: {
        day: '',
        year: '',
        month: '',
    },
    password: '',
    confirm_password: ''
}

export interface Menu {
    label: any;
    value: any;
}