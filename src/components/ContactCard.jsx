import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between rounded-lg bg-yellow-200 p-2"
      >
        <div className="flex gap-2">
          <HiOutlineUserCircle className="text-4xl text-orange-500" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleFill onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => {
              deleteContact(contact.id);
            }}
            className="cursor-pointer text-orange-600"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      ></AddAndUpdateContact>
    </>
  );
};

export default ContactCard;
