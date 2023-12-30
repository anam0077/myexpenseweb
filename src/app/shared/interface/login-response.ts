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
