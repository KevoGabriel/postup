import { createBoard } from "@/actions/create-board";

import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
    const { execute, fieldErrors} = useAction(createBoard, {
        onSuccess(data) {
            console.log("Board created successfully:", data);
        },
        onError(error) => {
            console.error(error);
            
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title });
    }

    return (
        <form action={dispatch}>
            <div>
                <FormInput errors={fieldErrors} />
            </div>
            <FormButton />
        </form>
    );
}