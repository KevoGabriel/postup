"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    // Esse efeito é executado quando o componente é montado ou quando o organizationId muda
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]); // Seta o organizationId ativo na lista de organizações do Clerk

  return null; // Esse componente não renderiza nada, apenas controla o estado da organização ativa
};
