import { Stack } from "native-base";

export const UserBar = ({ user }) => {
  return <Stack space={5}>{user.first_name}</Stack>;
};
