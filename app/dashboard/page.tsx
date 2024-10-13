"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const DashboardPage = () => {
  const [newName, setNewName] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [name, setName] = useState("");
  const [editData, setEditData] = useState<CardProps | null>(null);
  const [cards, setCards] = useState([]);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const {
    onOpen: onEditOpen,
    isOpen: isEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const getName = async () => {
    try {
      const resp = await axios.get("/api/name");
      if (resp) {
        setName(resp.data?.nameCard?.name ?? "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCards = async () => {
    try {
      const resp = await axios.get("/api/card/getall");
      if (resp) {
        setCards(resp.data?.cards ?? []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignName = async () => {
    if (newName === "") return alert("Please enter a name");
    try {
      const resp = await axios.put("/api/name", { name: newName });
      if (resp) {
        setNewName("");
        setNameEdit(false);
        getName();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = async (id: string) => {
    const conf = await window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!conf) return;
    try {
      await axios.delete(`/api/card/delete/${id}`);
      getCards();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  useEffect(() => {
    getCards();
  }, [onOpenChange, onEditOpenChange]);
  return (
    <div className="min-h-screen w-full text-white bg-[#212121] py-3">
      <div className="py-2 px-3 mt-5">
        <h2 className="text-3xl text-white font-semibold">
          Welcome to{" "}
          <span className="text-sky-200 font-bold font-fredoka">
            Habibteey!
          </span>
        </h2>
      </div>
      <div className="py-4 px-2">
        <h3 className="text-2xl tracking-widest font-mono text-gray-200">
          Here you can customize your frontend project:
        </h3>
        <div className="w-full py-4 flex items-center justify-center">
          {nameEdit ? (
            <div className="w-full flex gap-2 items-center justify-center max-w-[500px]">
              <Input
                type="text"
                className="w-full max-w-[350px]"
                label="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button
                onClick={() => setNameEdit(false)}
                variant="solid"
                color="default"
                size="lg"
              >
                Cancel
              </Button>
              <Button
                onClick={assignName}
                variant="solid"
                color="secondary"
                size="lg"
              >
                Save
              </Button>
            </div>
          ) : (
            <h4 className="font-semibold text-2xl flex items-center gap-2">
              Name:{" "}
              <span
                onClick={() => {
                  setNameEdit(true);
                  setNewName(name);
                }}
                className="italic cursor-pointer hover:text-gray-300 text-3xl tracking-wide"
              >
                {name === "" ? "Not Selected Yet" : name}
              </span>
            </h4>
          )}
        </div>
        <div>
          <Button onClick={onOpen} size="lg" variant="ghost" color="secondary">
            Create New Card
          </Button>
          <div className="py-3 mt-3 md:flex h-full flex-wrap overflow-y-auto items-center justify-center gap-2">
            {cards.map((card: CardProps) => (
              <CardComp
                key={card._id}
                frontText={card.frontText}
                backText={card.backText}
                backTitle={card.backTitle}
                handleDelete={() => deleteCard(card._id as string)}
                handleEdit={() => {
                  setEditData(card);
                  onEditOpen();
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <EditCardModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        editData={editData}
        setEditData={setEditData}
      />
      <CreateCardModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default DashboardPage;

interface CardModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function CreateCardModal({ isOpen, onOpenChange }: CardModalProps) {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [backTitle, setBackTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCard = async (onClose: () => void) => {
    if (frontText === "" || backText === "" || backTitle === "") {
      alert("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await axios.post("/api/card/create", {
        frontText,
        backText,
        backTitle,
      });
      if (resp) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create New Card</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Front Text"
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
              />
              <Input
                type="text"
                label="Back Title"
                value={backTitle}
                onChange={(e) => setBackTitle(e.target.value)}
              />
              <Textarea
                type="text"
                label="Back Text"
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button disabled={isLoading} onClick={onClose}>
                Close
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => handleCreateCard(onClose)}
                color="primary"
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

interface EditCardModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  editData: CardProps | null;
  setEditData: (data: CardProps | null) => void;
}

function EditCardModal({
  isOpen,
  onOpenChange,
  editData,
  setEditData,
}: EditCardModalProps) {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [backTitle, setBackTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateCard = async (onClose: () => void) => {
    if (frontText === "" || backText === "" || backTitle === "") {
      alert("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await axios.put(`/api/card/update/${editData?._id}`, {
        frontText,
        backText,
        backTitle,
      });
      if (resp) {
        setEditData(null);
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFrontText(editData?.frontText ?? "");
    setBackTitle(editData?.backTitle ?? "");
    setBackText(editData?.backText ?? "");
  }, [editData]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Update Card</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Front Text"
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
              />
              <Input
                type="text"
                label="Back Title"
                value={backTitle}
                onChange={(e) => setBackTitle(e.target.value)}
              />
              <Textarea
                type="text"
                label="Back Text"
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button disabled={isLoading} onClick={onClose}>
                Close
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => handleUpdateCard(onClose)}
                color="primary"
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

interface CardProps {
  _id?: string;
  frontText: string;
  backTitle: string;
  backText: string;
  handleDelete?: () => void;
  handleEdit?: () => void;
}

function CardComp({
  frontText,
  backText,
  backTitle,
  handleDelete,
  handleEdit,
}: CardProps) {
  return (
    <Card className="w-full min-w-[200px] my-2 max-w-[300px] mx-auto">
      <CardHeader className="flex justify-between">
        <h2 className=" flex-1 text-md">{frontText}</h2>
        <div className="gap-1 flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            color="secondary"
          >
            <FaEdit />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            color="danger"
          >
            <MdDelete />
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <h3 className="font-semibold text-lg">{backTitle}</h3>
        <p>{backText}</p>
      </CardBody>
    </Card>
  );
}
