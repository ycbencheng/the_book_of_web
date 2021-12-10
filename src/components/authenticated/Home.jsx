import { useContext, useEffect, useState } from "react";
import { Link as Redirect } from "react-router-dom";
import { NativeBaseProvider, Stack, Link, Text, Divider, Button, Modal, FormControl, Input } from "native-base";

import { Get, Post, Delete } from "../../utils";
import { MainContext } from "../../utils/MainContext";

export const AddFriends = ({ email, setEmailState, showModal, setShowModal }) => {
  const { token } = useContext(MainContext);

  const addFriends = () => {
    setShowModal(false);

    Post("add_friends", { token: token, email: email }, () => {});
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Invite a friend</Modal.Header>
        <Modal.Body>
          <FormControl mt="3">
            <Input
              variant="underlined"
              p={2}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmailState(text)}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                addFriends();
              }}
            >
              Send
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const Home = ({ setToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmailState] = useState("");

  const { token, user, friends, updateContext } = useContext(MainContext);

  useEffect(() => {
    Get("friends", { token }, updateContext);
  }, []);

  const signOut = () => {
    setToken("");
    localStorage.removeItem("the-book-of");
    Delete("users/sign_out", token);
  };

  const deleteFriends = (friend) => {
    Delete("delete_friends", { token: token, id: friend.id });
  };

  return (
    <NativeBaseProvider>
      <Stack space={5}>
        <Stack>
          <Link onPress={() => signOut()}>Sign out</Link>
        </Stack>

        <Divider my="2" />

        <Text>Friends</Text>
        <Button
          onPress={() => {
            setShowModal(true);
          }}
        >
          Add
        </Button>
        <AddFriends showModal={showModal} setShowModal={setShowModal} email={email} setEmailState={setEmailState} />
        <Stack>
          {Object.values(friends).map((friend) => {
            return (
              <>
                <Text>
                  {friend.first_name} {""} {friend.last_name}
                </Text>
                <Link onPress={() => deleteFriends(friend)}>Delete</Link>
              </>
            );
          })}
        </Stack>
      </Stack>
    </NativeBaseProvider>
  );
};
