import { useContext, useState } from "react";
import { NativeBaseProvider, Stack, Link, Text, Button, Modal, FormControl, Input } from "native-base";

import { UserBar } from "./UserBar";

import { Post, Delete } from "../../utils";
import { MainContext } from "../../utils/MainContext";

export const AddFriends = ({ showModal, setShowModal }) => {
  const { token } = useContext(MainContext);
  const [email, setEmailState] = useState("");

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

export const Friends = ({ token, user, friends, showEntry, setShowEntry, setViewUser }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteFriends = (friend) => {
    Delete("delete_friends", { token: token, id: friend.id });
  };

  const setEntry = (friend) => {
    setShowEntry(true);

    setViewUser(friend);
  };

  return (
    <NativeBaseProvider>
      <Button h={100} borderWidth={1} onPress={() => setEntry(user)}>
        <UserBar user={user} />
      </Button>

      <Stack space={5}>
        <Text>Friends</Text>
        <Button
          onPress={() => {
            setShowModal(true);
          }}
        >
          Add
        </Button>
        <AddFriends showModal={showModal} setShowModal={setShowModal} />

        <Stack>
          {Object.values(friends).map((friend) => {
            return (
              <>
                <Button h={100} borderWidth={1} onPress={() => setEntry(friend)}>
                  <UserBar user={friend} />
                </Button>

                <Link onPress={() => deleteFriends(friend)}>Delete</Link>
              </>
            );
          })}
        </Stack>
      </Stack>
    </NativeBaseProvider>
  );
};
