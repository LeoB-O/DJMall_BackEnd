module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://localhost:27017/djmall',
        },
        production: {
            connectionString: ''
        }
    },
    jwt: {
        development: {
            secret: '123456',
            options: {
                cookie: 'DJ-express'
            }
        }
    }
}
