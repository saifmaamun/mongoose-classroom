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
  dueAmount?: number;
  advanceAmount?: number;
  receiversName: string;
};

export type TStudent = {
  id: string; // genereated and unique identifier
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: string;
  dateOfBirth: string;
  email?: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  profileImage: string;
  school: TSchoolCollage;
  collage?: TSchoolCollage;
  class: string;

  payment: {
    name: string;
    id: string;
    tutionFee: number;
    paymentInfo: TPayment[];
  };
  isDeleted: boolean;
};
