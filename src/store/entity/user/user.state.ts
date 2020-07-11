export interface UserState {
  key: string;
  alias: string;
  name: string;
  lastName: string;
  email: string;
  selectedProfile: string|number;
  profiles: Array<any>;
  profileData: any;
}
