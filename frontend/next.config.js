/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   //     NEXTAUTH_URL: "http://localhost:3000/",
  //   //     NEXTAUTH_SECRET: "5871ecc9e1aeabb8956cd52e4ccc597c",
  //   //     GOOGLE_CLIENT_ID: `56404310544-oo0jfckkaqsvvlhlivinfmmfqaq0dr53.apps.googleusercontent.com`,
  //   //     GOOGLE_CLIENT_SECRET: `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`,
  //   GITHUB_CLIENT_ID: "d3a3c4a7ba7ab7f5daa2",
  //   GITHUB_CLIENT_SECRET: "26f26a23a3484f2252cd634c82719152b47f95d5",
  // },
  images: {
    domains: ["cdn.pixabay.com", "media.istockphoto.com"],
  },
};

module.exports = nextConfig;
