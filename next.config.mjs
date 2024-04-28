/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return[
            {
                source: "/",
                destination: "/productss",
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
