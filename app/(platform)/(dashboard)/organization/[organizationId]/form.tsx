import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { FormSubmit } from "@/components/form/form-submit";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log("Board created successfully:", data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={dispatch}>
      <div>
        <FormInput id="title" errors={fieldErrors} />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
