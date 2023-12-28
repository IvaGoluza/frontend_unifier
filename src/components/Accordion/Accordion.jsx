import React from "react";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import "./accordion.css";

const AccordionDemo = () => (
  <Accordion.Root className="AccordionRoot" type="single" collapsible>
    <Accordion.Item className="AccordionItem" value="item-1">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames("AccordionTrigger")}>
          Postani dio UNIFIER zajednice
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={classNames("AccordionContent")}>
        <div className="AccordionContentText">
          Jednostavno se registriraj kao udruga, volonter ili osoba koja traži pomoć.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-2">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames("AccordionTrigger")}>
          Stvori svoj profil
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={classNames("AccordionContent")}>
        <div className="AccordionContentText">
          Uz svoje kontakt informacije predstavi sebe kako bi Vas ostali bolje upoznali.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames("AccordionTrigger")}>
          Potraži/pruži pomoć oglasom
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={classNames("AccordionContent")}>
        <div className="AccordionContentText">
          Objavi oglas i objasni kakvu pomoć tražiš/pružaš. Odaberi kategorije koje najbolje opisuju tu pomoć.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-4">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames("AccordionTrigger")}>
          Pronađi oglase za sebe
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={classNames("AccordionContent")}>
        <div className="AccordionContentText">
          Pregledaj oglase drugih, profile tih korisnika i pošalji zahtjeve za pomoć.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-5">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames("AccordionTrigger")}>
          Prihvati zahtjeve
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={classNames("AccordionContent")}>
        <div className="AccordionContentText">
          Pregledajte Vama poslane zahtjeve i profile njihovih korisnika. Kontaktirajte ih, a zatim prihvatite ili
          odbacite oglas.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-6">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames("AccordionTrigger")}>
          Napiši recenziju
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={classNames("AccordionContent")}>
        <div className="AccordionContentText">
          Nakon pružanja/primanja pomoći nekog korisnika, na njegovom profilu ostavite poruku i opišite vašu suradnju.
          Ove recenzije pomažu ostalim korisnicima.
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);
export default AccordionDemo;
