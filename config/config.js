const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "5eqA?AoxU%Eh!vN@G-qw6Y(B|p]q2LC}~A%wI.Q 6 [iiQ69W2O^?M!Pmt)GK3R2",
  mongoUri: process.env.MONGODB_URI ||
            process.env.MONGO_HOST ||
            'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017')+'/mydb/'
}

export default config
