export type ILogin = {
    phoneNumber: string;
    password: string;
}
export type IRefreshTokenResponse = {
    accessToken: string;
};
export type ILoginAdminResponse = {
    accessToken: string;
    refreshToken?: string;
}