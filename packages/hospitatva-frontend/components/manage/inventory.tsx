import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Button, Header, Input, Modal } from "../shared";
import { Controls } from "./";
import { InventoryItem, InventoryProps } from "../../utils/interfaces/manage";
import { currencyFormatter } from "../../utils/functions";

const Inventory = ({ items: initialItems }: InventoryProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modal, setModal] = useState<{
    visible: boolean;
    context: "add" | "edit";
  }>({ visible: false, context: "add" });

  const CommodityValidationSchema = Yup.object({
    name: Yup.string().trim().required(),
    total: Yup.number().required().min(1),
    available: Yup.number().required().min(1),
    cost: Yup.number().required().min(1),
  });

  const handleSubmit = async (values: Partial<InventoryItem>) => {
    try {
      setLoading(true);
      if (modal.context === "add") {
        setItems([...items, values as InventoryItem]);
      } else if (modal.context === "edit") {
        setItems([
          ...items.filter((item) => item.id !== values.id),
          values as InventoryItem,
        ]);
      }
      setSelectedIds([]);
      setModal({ ...modal, visible: false });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModal({ visible: true, context: "add" });
  };

  const handleEdit = () => {
    setModal({ visible: true, context: "edit" });
  };

  const handleDelete = () => {
    setItems((prevState) => {
      const newState: InventoryItem[] = [];
      prevState.forEach((item) => {
        if (!selectedIds.find((id) => id === item.id)) {
          newState.push(item);
        }
      });
      return newState;
    });
  };

  const handleCheck =
    (itemId: number): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      if (e.target.checked) {
        setSelectedIds((state) => [...state, itemId]);
      } else {
        setSelectedIds((state) => state.filter((item) => item !== itemId));
      }
    };

  return (
    <section className="mx-auto mt-28 flex max-w-5xl flex-col items-center p-4">
      {/* <div className="relative mb-16 w-full max-w-sm">
         <input
          placeholder="Search commodities"
          className="w-full rounded-md border-2 border-accent-hospital-start bg-primaryDark px-4 py-2 pr-10 text-secondary shadow-inner outline-none"
        /> 
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <path
            d="M15.9891 15.0205L11.424 10.4555C12.1324 9.53965 12.5156 8.41992 12.5156 7.24219C12.5156 5.83242 11.9654 4.51055 10.9705 3.51387C9.97559 2.51719 8.6502 1.96875 7.24219 1.96875C5.83418 1.96875 4.50879 2.51895 3.51387 3.51387C2.51719 4.50879 1.96875 5.83242 1.96875 7.24219C1.96875 8.6502 2.51895 9.97559 3.51387 10.9705C4.50879 11.9672 5.83242 12.5156 7.24219 12.5156C8.41992 12.5156 9.53789 12.1324 10.4537 11.4258L15.0188 15.9891C15.0321 16.0025 15.048 16.0131 15.0655 16.0203C15.083 16.0276 15.1018 16.0313 15.1207 16.0313C15.1396 16.0313 15.1584 16.0276 15.1759 16.0203C15.1934 16.0131 15.2093 16.0025 15.2227 15.9891L15.9891 15.2244C16.0025 15.211 16.0131 15.1951 16.0203 15.1776C16.0276 15.1601 16.0313 15.1414 16.0313 15.1225C16.0313 15.1035 16.0276 15.0848 16.0203 15.0673C16.0131 15.0498 16.0025 15.0339 15.9891 15.0205ZM10.0266 10.0266C9.28125 10.7701 8.29336 11.1797 7.24219 11.1797C6.19102 11.1797 5.20313 10.7701 4.45781 10.0266C3.71426 9.28125 3.30469 8.29336 3.30469 7.24219C3.30469 6.19102 3.71426 5.20137 4.45781 4.45781C5.20313 3.71426 6.19102 3.30469 7.24219 3.30469C8.29336 3.30469 9.28301 3.7125 10.0266 4.45781C10.7701 5.20313 11.1797 6.19102 11.1797 7.24219C11.1797 8.29336 10.7701 9.28301 10.0266 10.0266Z"
            fill="black"
            fillOpacity="0.5"
          />
        </svg>
      </div> */}
      <div className="mb-8 flex w-full flex-wrap items-center gap-6">
        <Header type="secondary" className="mb-0">
          Inventory
        </Header>
        <Controls
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={selectedIds.length === 1}
          canDelete={selectedIds.length > 0}
        />
      </div>
      <div>
        <table className="box-border w-full table-fixed border-collapse border border-secondary">
          <thead className="bg-gradient-to-b from-accent-hospital-start to-accent-hospital-stop">
            <tr>
              <th className="w-12 border-collapse border border-secondary py-2 px-1 font-semibold text-primaryLight"></th>
              <th className="border-collapse border border-secondary py-2 px-1 font-semibold text-primaryLight">
                Item Name
              </th>
              <th className="border-collapse border border-secondary py-2 px-1 font-semibold text-primaryLight">
                Availability
              </th>
              <th className="border-collapse border border-secondary py-2 px-1 font-semibold text-primaryLight">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border-collapse border border-secondary py-1 px-2">
                  <input type="checkbox" onChange={handleCheck(item.id)} />
                </td>
                <td className="border-collapse border border-secondary py-1 px-2">
                  {item.name}
                </td>
                <td className="border-collapse border border-secondary py-1 px-2 text-center">
                  {item.available}/{item.total}
                </td>
                <td className="border-collapse border border-secondary py-1 px-2 text-right">
                  {currencyFormatter.format(item.cost / 100)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modal?.visible}
        enterAnimation="fade-right"
        exitAnimation="fade-right"
        onClose={() => setModal((state) => ({ ...state, visible: false }))}
        titleElement={
          <h3 className="text-lg font-medium">
            {modal?.context === "add"
              ? "Create new entry"
              : "Edit item details"}
          </h3>
        }
        classNames={{
          content: "!bg-primaryLight !max-w-xl",
          header:
            "!bg-gradient-to-b !from-accent-hospital-start !to-accent-hospital-stop text-primaryLight",
        }}
      >
        <h2 className="mb-5 text-xl font-semibold">
          {modal?.context === "add" ? "Create new" : "Edit item"}
        </h2>

        <Formik
          initialValues={
            modal?.context === "add"
              ? {}
              : {
                  ...items.find((item) => item.id === selectedIds[0]),
                  cost:
                    items.find((item) => item.id === selectedIds[0])?.cost! /
                    100,
                }!
          }
          onSubmit={handleSubmit}
          validationSchema={CommodityValidationSchema}
        >
          {({ errors, touched, isValid, isSubmitting }) => (
            <Form className="col-2 relative grid grid-cols-2 gap-4 text-gray-300">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter item name"
                label="Item Name"
                classNames={{
                  label: "text-secondary text-sm mb-1 block",
                  wrapper: "col-span-2",
                  input:
                    "bg-primaryLight outline-none w-full text-secondary px-4 py-2 rounded-md border-2 border-primaryDark focus:border-accent-hospital-start",
                }}
              />
              <Input
                id="available"
                name="available"
                type="number"
                placeholder="--"
                label="Available Stock"
                classNames={{
                  label: "text-secondary text-sm mb-1 block",
                  input:
                    "bg-primaryLight outline-none outline-none w-full text-secondary px-4 py-2 rounded-md border-2 border-primaryDark focus:border-accent-hospital-start",
                }}
              />
              <Input
                id="total"
                name="total"
                type="number"
                placeholder="--"
                label="Total Stock"
                classNames={{
                  label: "text-secondary text-sm mb-1 block",
                  input:
                    "bg-primaryLight outline-none outline-none w-full text-secondary px-4 py-2 rounded-md border-2 border-primaryDark focus:border-accent-hospital-start",
                }}
              />
              <Input
                id="cost"
                name="cost"
                type="number"
                placeholder="Enter cost in ₹"
                label="Cost (in ₹)"
                classNames={{
                  wrapper: "col-span-2",
                  label: "text-secondary text-sm mb-1 block",
                  input:
                    "bg-primaryLight outline-none outline-none w-full text-secondary px-4 py-2 rounded-md border-2 border-primaryDark focus:border-accent-hospital-start",
                }}
              />
              <footer className="col-span-2 mt-6 flex justify-center gap-4">
                <Button
                  outlined
                  size="small"
                  type="reset"
                  onClick={() => setModal({ ...modal, visible: false })}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  {!loading ? (
                    "Confirm"
                  ) : (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                </Button>
              </footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </section>
  );
};

export default Inventory;
