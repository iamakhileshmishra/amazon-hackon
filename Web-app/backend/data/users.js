import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane User',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name:"Raju",
    email:"raju@chacha.com",
    password: bcrypt.hashSync('123456', 10),
    isDeliveryBoy:true
  }
]

export default users
