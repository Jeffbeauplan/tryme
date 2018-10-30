export class User {
  $key: string
  lastName: string
  firstName: string
  userName: string
  location: Location
  isAdmin: boolean
}

class Location {
  city: string
  zipcode: string
  country: string
}
