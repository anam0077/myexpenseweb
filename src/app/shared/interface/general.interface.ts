export interface LoginResponse {
    status:string;
    message:string;
    payload: Credential;
    properties:string[];
}

export interface Credential{
        clientId:string;
        clientSecret:string;
}

export interface Token{
    status:string;
    token:string;
    type:string;
    expired_in:string;
}


export interface Expense{
    no:string;
    client:string;
    item:string;
    amount:string;
    date:string;
}

export interface BodyExpense{
    searchAmount:string;
    searchRow:string;
    totalAmount:string;
    totalRows:string;
    offsetPrev:string;
    offsetNext:string;
    itemList:Expense[];
}

export interface GenericExpenseResponse{
    status:string;
    message:string;
    body:BodyExpense;
}

export interface AccountResponse{
    index:string;
    email:string;
    username:string;
    storage_size:StorageSize;
}

export interface StorageSize{
    current:string;
    max:number;
}

export interface DefaultResponse{
    status:string;
    message:string;
}

export interface Account{
    username:string;
    password:string;
}

export interface dataDialog{
    operation:string;
    payload:any;
}

export interface DefaultResponseUniversal<T>{
    status:string;
    message:string;
    body:T;
}


export interface SummaryData{
    startPeriod:string;
    endPeriod:string;
    totalAmount:string;
    lowestAmount:string;
    highestAmount:string;
    data:expenseSummaryAmount[];
}

export interface expenseSummaryAmount{
    period:string;
    amount:string;
}