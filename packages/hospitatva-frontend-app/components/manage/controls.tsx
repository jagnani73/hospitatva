import React from "react";
import { ManageControlProps } from "../../utils/interfaces/manage";
import { Button } from "../shared";

const Controls = ({
  onAdd,
  onDelete,
  onEdit,
  canDelete,
  canEdit,
}: ManageControlProps) => {
  return (
    <div className="ml-auto grid grid-cols-3 gap-4">
      <Button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-1 !px-4 text-base font-normal"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99996 14V8.33335M7.99996 8.33335V2.66669M7.99996 8.33335H13.3333M7.99996 8.33335H2.66663"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        Add
      </Button>
      <Button
        onClick={onEdit}
        disabled={!canEdit}
        className="flex w-full items-center justify-center gap-1 !px-4 text-base font-normal"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7001 3.24183L12.7788 0.300417C12.5858 0.108011 12.3245 0 12.0522 0C11.7799 0 11.5187 0.108011 11.3256 0.300417L0.969226 10.6602L0.0236625 14.7482C-0.0089563 14.8977 -0.0078381 15.0525 0.0269353 15.2015C0.0617087 15.3504 0.129259 15.4897 0.224651 15.6092C0.320043 15.7286 0.440868 15.8252 0.578299 15.8919C0.715729 15.9586 0.866293 15.9937 1.01899 15.9946C1.09014 16.0018 1.16184 16.0018 1.23299 15.9946L5.35863 15.0474L15.7001 4.69758C15.8922 4.5042 16 4.2425 16 3.9697C16 3.69691 15.8922 3.43521 15.7001 3.24183V3.24183ZM4.86097 14.15L0.99411 14.9626L1.87498 11.1637L9.62362 3.43128L12.6096 6.42254L4.86097 14.15ZM13.2765 5.69965L10.2905 2.70839L12.0224 0.983423L14.9586 3.97469L13.2765 5.69965Z"
            fill="white"
          />
        </svg>
        Edit
      </Button>
      <Button
        onClick={onDelete}
        disabled={!canDelete}
        className="flex w-full items-center justify-center gap-1 !px-4 text-base font-normal"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66659 2.66665V1.33331H11.3333V2.66665H14.6666V3.99998H13.3333V14C13.3333 14.1768 13.263 14.3464 13.138 14.4714C13.013 14.5964 12.8434 14.6666 12.6666 14.6666H3.33325C3.15644 14.6666 2.98687 14.5964 2.86185 14.4714C2.73682 14.3464 2.66659 14.1768 2.66659 14V3.99998H1.33325V2.66665H4.66659ZM3.99992 3.99998V13.3333H11.9999V3.99998H3.99992ZM5.99992 5.99998H7.33325V11.3333H5.99992V5.99998ZM8.66659 5.99998H9.99992V11.3333H8.66659V5.99998Z"
            fill="white"
          />
        </svg>
        Delete
      </Button>
    </div>
  );
};

export default Controls;
