"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
    storageKey?: string;
}

export const Sidebar = ({
    storageKey = "pu-sidebar-state",
}: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {}) // Usa o hook useLocalStorage para gerenciar o estado de expansão dos itens do sidebar
    const {
        organization: activeOrganization, 
        isLoaded: isLoadedOrg

    } = useOrganization();
    const {
        userMemberships,
        isLoaded: isLoadedOrgList,
    } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => { // Cria um array com as chaves dos itens que estão expandidos
        if (expanded[key]) {
            acc.push(key);
        }
        return acc; 
    }, []);

    const onExpand = (id: string) => { // Função para alternar o estado de expansão de um item
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
    }));
    };

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <Skeleton /> 
            </>
        );
    }
    

    return (
        <>
        <div className="font-medium text-xs flex items-center justify-between px-4 mb-1">
  <span className="text-black">Workspaces</span>
  <Button
    asChild
    type="button"
    size="icon"
    variant="ghost"
  >
    <Link href="/select-org">
      <Plus className="h-4 w-4" />
    </Link>
  </Button>
</div>
        <Accordion
            type="multiple"
            defaultValue={defaultAccordionValue}
            className="space-y-2"
            >
                {userMemberships.data.map(({ organization }) => (
                    <NavItem 
                    key={organization.id}
                    isActive={activeOrganization?.id === organization.id} // Verifica se a organização é a ativa
                    isExpanded={expanded[organization.id]}
                    organization={organization as Organization}
                    onExpand={onExpand}
                    />

                ))}
            </Accordion>
        </>
    );
};