/* eslint-disable node/prefer-global/process */
export const databaseConfig = {
  url: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/dida',
}
