export type menuItem = {
  name: string;
  path: string;
  hiddenWhenLoggedIn: boolean;
  hiddenWhenLoggedOut: boolean;
};

export const menuItems = [
  {
    name: "Workshops",
    path: "workshops",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Projects",
    path: "project",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: true,
  },
  {
    name: "Jobs",
    path: "jobs",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Guest Speakers",
    path: "guest-speakers",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
  },
  {
    name: "Reviews",
    path: "reviews",
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
