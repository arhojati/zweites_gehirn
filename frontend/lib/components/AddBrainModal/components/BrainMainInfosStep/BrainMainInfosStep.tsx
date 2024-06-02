import { Controller, useFormContext } from "react-hook-form";

import { CreateBrainProps } from "@/lib/components/AddBrainModal/types/types";
import { FieldHeader } from "@/lib/components/ui/FieldHeader/FieldHeader";
import QuivrButton from "@/lib/components/ui/QuivrButton/QuivrButton";
import { TextAreaInput } from "@/lib/components/ui/TextAreaInput/TextAreaInput";
import { TextInput } from "@/lib/components/ui/TextInput/TextInput";

import styles from "./BrainMainInfosStep.module.scss";

import { useBrainCreationSteps } from "../../hooks/useBrainCreationSteps";

export const BrainMainInfosStep = (): JSX.Element => {
  const { currentStepIndex, goToNextStep, goToPreviousStep } =
    useBrainCreationSteps();

  const { watch } = useFormContext<CreateBrainProps>();
  const name = watch("name");
  const description = watch("description");

  const isDisabled = !name || !description;

  const next = (): void => {
    goToNextStep();
  };

  const previous = (): void => {
    goToPreviousStep();
  };

  if (currentStepIndex !== 1) {
    return <></>;
  }

  return (
    <div className={styles.brain_main_infos_wrapper}>
      <div className={styles.inputs_wrapper}>
        <span className={styles.title}>Definieren Sie die Gehirnidentität</span>
        <div>
          <FieldHeader iconName="brain" label="Name" mandatory={true} />
          <Controller
            name="name"
            render={({ field }) => (
              <TextInput
                label="Geben Sie den Namen Ihres Gehirns ein"
                inputValue={field.value as string}
                setInputValue={field.onChange}
              />
            )}
          />
        </div>
        <div>
          <FieldHeader
            iconName="paragraph"
            label="Beschreibung"
            mandatory={true}
          />
          <Controller
            name="description"
            render={({ field }) => (
              <TextAreaInput
                label="Geben Sie Ihre Gehirnbeschreibung ein"
                inputValue={field.value as string}
                setInputValue={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className={styles.buttons_wrapper}>
        <QuivrButton
          color="primary"
          label="Vorheriger Schritt"
          onClick={() => previous()}
          iconName="chevronLeft"
        />
        <QuivrButton
          color="primary"
          label="Nächster Schritt"
          onClick={() => next()}
          iconName="chevronRight"
          disabled={isDisabled}
          important={true}
        />
      </div>
    </div>
  );
};
