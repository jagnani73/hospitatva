import { Button, Header } from "../shared";
import Controls from "./controls";

const Inventory = () => {
  const handleAdd = () => {
    console.log("Add");
  };

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <section className="mx-auto mt-28 flex max-w-5xl flex-col items-center p-4">
      <div className="relative mb-16 w-full max-w-sm">
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
            fill-opacity="0.5"
          />
        </svg>
      </div>
      <div className="mb-8 flex w-full flex-wrap items-center gap-6">
        <Header type="secondary" className="mb-0">
          Inventory
        </Header>
        <Controls
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Inventory;
