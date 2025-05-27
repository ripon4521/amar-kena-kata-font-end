const dev = process.env.NODE_ENV !== "production";

export const server = dev 
    ? "http://localhost:3000" 
    : "https://amar-kena-kata-font-end.vercel.app/";
