import { Controller, FormProvider, useForm } from "react-hook-form";

import { useUserApi } from "@/lib/api/user/useUserApi";
import { CompanySize, UsagePurpose } from "@/lib/api/user/user";
import { Modal } from "@/lib/components/ui/Modal/Modal";
import { useOnboardingContext } from "@/lib/context/OnboardingProvider/hooks/useOnboardingContext";

import styles from "./OnboardingModal.module.scss";

import { OnboardingProps } from "../OnboardingModal/types/types";
import { FieldHeader } from "../ui/FieldHeader/FieldHeader";
import { QuivrButton } from "../ui/QuivrButton/QuivrButton";
import { SingleSelector } from "../ui/SingleSelector/SingleSelector";
import { TextInput } from "../ui/TextInput/TextInput";

export const OnboardingModal = (): JSX.Element => {
  const { isOnboardingModalOpened, setIsOnboardingModalOpened } =
    useOnboardingContext();

  const methods = useForm<OnboardingProps>({
    defaultValues: {
      username: "",
      companyName: "",
      companySize: undefined,
      usagePurpose: "",
    },
  });
  const { watch } = methods;
  const username = watch("username");

  const { updateUserIdentity } = useUserApi();

  const companySizeOptions = Object.entries(CompanySize).map(([, value]) => ({
    label: value,
    value: value,
  }));

  const usagePurposeOptions = Object.entries(UsagePurpose).map(
    ([key, value]) => ({
      label: value,
      value: key,
    })
  );

  const submitForm = async () => {
    await updateUserIdentity({
      username: methods.getValues("username"),
      company: methods.getValues("companyName"),
      onboarded: false,
      company_size: methods.getValues("companySize"),
      usage_purpose: methods.getValues("usagePurpose") as
        | UsagePurpose
        | undefined,
    });
    window.location.reload();
  };

  return (
    <FormProvider {...methods}>
      <Modal
        title="Willkommen bei Dolphine.AI!"
        desc="Erzählen Sie uns ein wenig mehr über sich, damit wir beginnen können."
        isOpen={isOnboardingModalOpened}
        setOpen={setIsOnboardingModalOpened}
        CloseTrigger={<div />}
        unclosable={true}
      >
        <div className={styles.modal_content_wrapper}>
          <div className={styles.form_wrapper}>
            <div>
              <FieldHeader iconName="user" label="Benutzername" mandatory={true} />
              <Controller
                name="username"
                render={({ field }) => (
                  <TextInput
                    label="Wählen Sie einen Benutzernamen"
                    inputValue={field.value as string}
                    setInputValue={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <FieldHeader iconName="office" label="Firma" />
              <Controller
                name="companyName"
                render={({ field }) => (
                  <TextInput
                    label="Name Ihrer Firma"
                    inputValue={field.value as string}
                    setInputValue={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <FieldHeader iconName="goal" label="Verwendungszweck" />
              <Controller
                name="usagePurpose"
                render={({ field }) => (
                  <SingleSelector
                    iconName="goal"
                    options={usagePurposeOptions}
                    placeholder="In welchem Zusammenhang werden Sie Bear Byte KI verwenden?"
                    selectedOption={
                      field.value
                        ? {
                            label: field.value as string,
                            value: field.value as string,
                          }
                        : undefined
                    }
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <FieldHeader iconName="hashtag" label="Größe Ihrer Firma" />
              <Controller
                name="companySize"
                render={({ field }) => (
                  <SingleSelector
                    iconName="hashtag"
                    options={companySizeOptions}
                    placeholder="Anzahl der Beschäftigten in Ihrem Betrieb"
                    selectedOption={
                      field.value
                        ? {
                            label: field.value as string,
                            value: field.value as string,
                          }
                        : undefined
                    }
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <QuivrButton
              iconName="chevronRight"
              label="Einreichen"
              color="primary"
              onClick={() => submitForm()}
              disabled={!username}
            />
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};
