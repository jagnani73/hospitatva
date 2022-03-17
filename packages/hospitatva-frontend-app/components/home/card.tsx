import Link from "next/link";
import { ROUTES } from "../../utils/constants";

import { CardProps } from "../../utils/interfaces/home";

const Card = ({ address, commodities, name, contract_address }: CardProps) => {
  return (
    <Link href={`${ROUTES.HOSPITAL}/${contract_address}`}>
      <a>
        <article className="h-full rounded-lg border-2 border-accent-patient-start bg-primaryLight px-4 py-2 text-lg shadow-sm">
          <h3 className="font-semibold">{name}</h3>
          <p>
            {address[1]} {address[2]}
          </p>

          <p className="mt-2 flex flex-wrap items-center gap-1">
            {commodities.slice(0, 4).map((commodity) => (
              <span
                key={commodity}
                className="mt-1 whitespace-nowrap rounded-full bg-gradient-to-r from-accent-patient-start to-accent-patient-stop py-1 px-2 text-xs capitalize text-white first:ml-0"
              >
                {commodity}
              </span>
            ))}
            {commodities.length > 4 && (
              <span className="ml-2 mt-1 text-xs font-bold text-accent-patient-start underline">
                + {commodities.length - 4} more
              </span>
            )}
          </p>
        </article>
      </a>
    </Link>
  );
};

export default Card;
