import { NativeBaseProvider, Stack, Button } from "native-base";

export const UserBar = ({ user }) => {
  return (
    <NativeBaseProvider>
      <Stack space={5}>
        <Button h={100} borderWidth={1} href={`/entry?user_id=${user.id}`}>
          {user.first_name}
        </Button>
      </Stack>
    </NativeBaseProvider>
  );
};
