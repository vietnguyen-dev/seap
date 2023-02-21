export interface iContacts {
    id: string,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    date_created: Date,
    date_updated: Date,
    date_deleted: Date
}

export interface iReqContacts {
    first_name: string,
    last_name: string,
    phone: string,
    email: string
}
