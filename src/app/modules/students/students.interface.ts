export type TSchoolCollage = {
  name: string;
  class: string;
  group?: "Science" | "Commerce" | "Arts" | "Vocational";
  section?: string;
};

export type TGuardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNumber: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContactNumber: string;
};

export type TPayment = {
  month: string;
  paidAmount: number;
  dueAmount: number;
  advanceAmount: number;
  receiversName: string;
};

export type TStudent = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  id: string;
  password: string;
  rollNo: string;
  school: TSchoolCollage;
  collage?: TSchoolCollage;
  contactNumber?: string;



  
  bloodGroup?:| "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";;
  presentAddress: string;
  permanentAddress?: string;
  guardian: TGuardian;
  email?: string;
  payment: {
    name: string;
    id: string;
    tutionFee: number;
    paymentInfo: TPayment[];
  };
  isActive: boolean;
};
