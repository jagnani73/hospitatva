import React, { useState } from "react";
import { currencyFormatter } from "../../utils/functions";
import { Ticket } from "../../utils/interfaces/monitor";
import { Button, Header, Modal } from "../shared";

export interface TicketsProps {
  activeTickets: Ticket[];
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

const Tickets = ({ activeTickets }: TicketsProps) => {
  const [modalData, setModalData] = useState<{
    ticket: Ticket;
    context: "resolve" | "reject";
  } | null>(null);

  return (
    <section className="mx-auto mt-28 max-w-5xl p-4">
      <Header type="secondary" className="mb-0">
        Active Tickets
      </Header>
      <div className="mt-8">
        {activeTickets.map((ticket) => (
          <article className="mb-4 rounded-md border-2 border-accent-admin-stop px-4 py-4 transition-transform last:mb-0 hover:scale-105">
            <div>
              Ticket raised for <strong>{ticket.commodityName}</strong> as
              prescribed by <strong>{ticket.doctorName}</strong> at{" "}
              <strong>
                {ticket.hospitalName}, {ticket.address.join(" ").trim()}
              </strong>{" "}
              for{" "}
              <strong>
                {currencyFormatter.format(ticket.flaggedPrice / 100)}
              </strong>{" "}
              when expected price was{" "}
              <strong>
                {currencyFormatter.format(ticket.predictivePrice / 100)}
              </strong>
              .
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <Button
                onClick={() => setModalData({ ticket, context: "reject" })}
                size="small"
                outlined
              >
                Mark false
              </Button>
              <Button
                onClick={() => setModalData({ ticket, context: "resolve" })}
                size="small"
              >
                Mark as Resolved
              </Button>
            </div>
          </article>
        ))}
      </div>
      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        titleElement={
          <h3 className="text-lg font-medium">
            {modalData?.context === "resolve"
              ? "Resolve ticket"
              : "Mark as false"}
          </h3>
        }
        classNames={{
          content: "!bg-primaryLight !max-w-xl",
          header:
            "!bg-gradient-to-b !from-accent-admin-start !to-accent-admin-stop text-primaryLight",
        }}
      >
        <div className="mb-1">
          {modalData?.context === "resolve"
            ? "Are you sure you want to mark this ticket as resolved?"
            : "Are you sure you want to mark this ticket as false?"}
        </div>
        <div className="mb-5">
          {modalData?.context === "resolve"
            ? "You should only do this if the report has been confirmed and rectified."
            : "Only choose this option when you want to ignore false reports."}
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={() => setModalData(null)} size="small" outlined>
            No
          </Button>
          <Button
            onClick={() => {
              // call the apis, do the magic
            }}
            size="small"
          >
            Yes
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default Tickets;
