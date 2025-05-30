"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: any; // Pode ser do tipo Organization ou qualquer outro tipo que você esteja usando
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  return (
    <AccordionItem
      value={organization.id} // Use o ID da organização como valor do AccordionItem
      className="border-none"
    >
      <AccordionTrigger
        onClick={() => onExpand(organization.id)} // Chama a função onExpand com o ID da organização
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization Logo"
              className="rounded-sm object-cover"
            />
          </div>
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
};
