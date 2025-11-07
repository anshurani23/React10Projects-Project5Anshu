import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()),
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <NavBar></NavBar>
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute pl-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="cursor-pointer text-5xl text-white"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {contacts.length <= 0 ? (
            <NotFoundContact></NotFoundContact>
          ) : (
            contacts.map((contact) => {
              return (
                <ContactCard key={contact.id} contact={contact}></ContactCard>
              );
            })
          )}
        </div>
      </div>
      <AddAndUpdateContact
        isOpen={isOpen}
        onClose={onClose}
      ></AddAndUpdateContact>
      <ToastContainer position="bottom-center"></ToastContainer>
    </>
  );
};

export default App;
