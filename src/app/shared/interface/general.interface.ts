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
