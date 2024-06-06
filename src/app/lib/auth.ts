export const verifyAuth = async (token: string) => {
    try {
        const [header, payload, signature] = token.split('.');
        if (!header || !payload || !signature) {
            throw new Error('Invalid token format');
        }

        const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
        const decodedToken = JSON.parse(decodedPayload);

        console.log("Token data:", decodedToken);
        return decodedToken;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null; // or throw error if needed
    }
};
