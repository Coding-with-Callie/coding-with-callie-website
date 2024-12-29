export type menuItem = {
  name: string;
  path: string;
  hiddenWhenLoggedIn: boolean;
  hiddenWhenLoggedOut: boolean;
  visibleOnlyToAdmin: boolean;
};

export const menuItems = [
  {
    name: "Workshops",
    path: "workshops",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Checklists",
    path: "checklists",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: true,
    visibleOnlyToAdmin: true,
  },
  {
    name: "Jobs",
    path: "jobs",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Speakers",
    path: "guest-speakers",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Reviews",
    path: "reviews",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Contact",
    path: "contact",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Sign Up",
    path: "sign-up",
    hiddenWhenLoggedIn: true,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Log  In",
    path: "log-in",
    hiddenWhenLoggedIn: true,
    hiddenWhenLoggedOut: false,
    visibleOnlyToAdmin: false,
  },
  {
    name: "Account Details",
    path: "profile",
    hiddenWhenLoggedIn: false,
    hiddenWhenLoggedOut: true,
    visibleOnlyToAdmin: false,
  },
];
