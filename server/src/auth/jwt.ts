export const jwtConfig = {
    secret: `${process.env.API_SECRET}` || 'secret',
    expiresIn: '30d',
};