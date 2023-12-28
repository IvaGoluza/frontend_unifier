import React, { ChangeEvent, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface noteDataType {
  id: number;
  note: string;
}

interface recensionDataType {
  id: number;
  recension: string;
}

interface NoteModalProps {
  noteType: string;
  dealId: number;
}

const NoteModal = ({ noteType, dealId }: NoteModalProps) => {
  const [note, setNote] = useState("");

  const handleNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const updateNote = async (data: noteDataType) => {
    const response = await axios.put("http://localhost:8080/api/deals/note", data);
    return response.data;
  };

  const updateRecension = async (data: recensionDataType) => {
    const response = await axios.put("http://localhost:8080/api/deals/recension", data);
    return response.data;
  };

  const updateMutationNote = useMutation(updateNote);
  const updateMutationRecension = useMutation(updateRecension);

  const sendNote = async () => {
    if (noteType === "poruka") {
      const data = {
        id: dealId,
        note: note,
      };
      try {
        await updateMutationNote.mutateAsync(data);
        toast.success("Poruka je poslana! ", {
          position: "bottom-center",
          duration: 3000,
          className: "scale-125",
        });
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      const data = {
        id: dealId,
        recension: note,
      };
      try {
        await updateMutationRecension.mutateAsync(data);
        toast.success("Recenzija je poslana! ", {
          position: "bottom-center",
          duration: 3000,
          className: "scale-125",
        });
      } catch (error) {
        console.error("Error updating recension:", error);
      }
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="mx-3 rounded-3xl bg-indigo-400 px-7 py-2 font-bold uppercase text-white hover:bg-orange-300">
          {noteType}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent bgImage">
          <Dialog.Title className="DialogTitle capitalize">{noteType}</Dialog.Title>
          {noteType === "recenzija" && (
            <Dialog.Description className="DialogDescription">
              Napišite recenziju za volontera koji Vam je pružio pomoć i tako pomozite drugima da upoznaju njega i
              njegov rad.
            </Dialog.Description>
          )}
          {noteType === "poruka" && (
            <Dialog.Description className="DialogDescription">
              Ako mislite da će neke informacije o korisniku kojem ste pomogli biti korisne ostalim volonterima,
              napišite ih u poruci. Poruke će biti prikazane na njegovom profilu.
            </Dialog.Description>
          )}
          <fieldset className="Fieldset">
            <textarea className="Input" id="note" onChange={handleNote}></textarea>
          </fieldset>
          <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              <button
                className="mx-3 rounded-3xl bg-indigo-400 px-7 py-2 font-bold text-white hover:bg-orange-300"
                onClick={sendNote}
              >
                POŠALJI
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NoteModal;
