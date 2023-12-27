export type menuItem = {
  name: string,
  path: string,
  hiddenWhenLoggedIn: boolean,
}


export const menuItems = [
  {name: "Workshop Details", path: "workshop-details", hiddenWhenLoggedIn: false},
  {name: "Apply", path: "apply", hiddenWhenLoggedIn: false},
  {name: "Resources", path: "resources", hiddenWhenLoggedIn: false},
  {name: "Contact Callie", path: "contact-callie", hiddenWhenLoggedIn: false},
  {name: "Sign Up", path: "sign-up", hiddenWhenLoggedIn: true},
  {name: "Log  In", path: "log-in", hiddenWhenLoggedIn: true},
  {name: "Account Details", path: "profile", hiddenWhenLoggedIn: false}
]