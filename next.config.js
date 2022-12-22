/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
  publicRuntimeConfig: {    
    apiUrl:
      process.env.NEXT_PUBLIC_IS_VERCEL ?
        'https://milempresas.netlify.app/api/' :
        process.env.NEXT_PUBLIC_IS_NETLIFY ?
          '/api/' :
          (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_IS_LOCAL_HOST) ?
            'http://milempresas-env.eba-dydv263j.us-east-1.elasticbeanstalk.com/api/auth/' :
            'http://milempresas-env.eba-dydv263j.us-east-1.elasticbeanstalk.com/api/auth/'
  },
}

module.exports = nextConfig
