"use client";

import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

// Define o tipo de ação que será executada
type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  // Define as opções para o hook useAction
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  // Define o hook useAction que gerencia o estado da ação
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      // Função para executar a ação
      setIsLoading(true);

      try {
        const result = await action(input); // Chama a ação com os dados de entrada

        if (!result) {
          return;
        }

        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors); // Atualiza os erros de campo
        }

        if (result.error) {
          setError(result.error); // Atualiza o erro geral
          options.onError?.(result.error); // Chama o callback de erro, se fornecido
        }

        if (result.data) {
          setData(result.data); // Atualiza os dados retornados
          options.onSuccess?.(result.data); // Chama o callback de sucesso, se fornecido
        }
      } finally {
        setIsLoading(false); // Define o estado de carregamento como falso após a execução
        options.onComplete?.(); // Chama o callback de conclusão, se fornecido
      }
    },
    [action, options]
  );

  return {
    execute, // Retorna a função de execução da ação
    fieldErrors, // Retorna os erros de campo
    error, // Retorna o erro geral
    data, // Retorna os dados retornados pela ação
    isLoading, // Retorna o estado de carregamento
  };
};
