import Link from "next/link";

import { CardProps } from "../../utils/interfaces/home";

const Card = ({ address, commodities, name, contract_address }: CardProps) => {
  return (
    <Link href={`/hospital/${contract_address}`}>
      <a>
        <article className="h-full rounded-lg border-2 border-patient-accent px-4 py-2 text-lg shadow-sm">
          <h3 className="font-semibold">{name}</h3>
          <p>
            {address[1]} {address[2]}
          </p>

          <p className="mt-2">
            {commodities.map((commodity) => (
              <span
                key={commodity}
                className="ml-2 rounded-full bg-patient-accent py-1 px-2 text-sm capitalize text-white first:ml-0"
              >
                {commodity}
              </span>
            ))}
          </p>
        </article>
      </a>
    </Link>
  );
};

export default Card;
