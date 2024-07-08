// defining bloodGroup type
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

//   defining the user role
export type TRole = "admin" | "faculty" | "student";

// defining user type
export type TUser = {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  bloodGroup?: TBloodGroup;
  role: TRole;
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};
