export type menuItem = {
  name: string;
  path: string;
  hiddenWhenLoggedIn: boolean;
  hiddenWhenLoggedOut: boolean;
};

export const menuItems = [
  {
    name: "Workshop Details",
    path: "workshop-details",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Apply",
    path: "apply",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Resources",
    path: "resources",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Contact Callie",
    path: "contact-callie",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Sign Up",
    path: "sign-up",
    hiddenWhenLoggedIn: true,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Log  In",
    path: "log-in",
    hiddenWhenLoggedIn: true,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Account Details",
    path: "profile",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: true,
  },
];
