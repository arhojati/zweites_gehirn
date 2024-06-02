import { capitalCase } from "change-case";
import { useEffect, useState } from "react";

import { KnowledgeToFeed } from "@/app/chat/[chatId]/components/ActionsBar/components";
import { useUserApi } from "@/lib/api/user/useUserApi";
import { MessageInfoBox } from "@/lib/components/ui/MessageInfoBox/MessageInfoBox";
import QuivrButton from "@/lib/components/ui/QuivrButton/QuivrButton";
import { TextInput } from "@/lib/components/ui/TextInput/TextInput";
import { useKnowledgeToFeedContext } from "@/lib/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useUserData } from "@/lib/hooks/useUserData";

import styles from "./CreateBrainStep.module.scss";
import { useBrainCreationApi } from "./hooks/useBrainCreationApi";

import { useBrainCreationContext } from "../../brainCreation-provider";
import { useBrainCreationSteps } from "../../hooks/useBrainCreationSteps";

export const CreateBrainStep = (): JSX.Element => {
  const { currentStepIndex, goToPreviousStep } = useBrainCreationSteps();
  const { createBrain, fields, setFields } = useBrainCreationApi();
  const { creating, setCreating, currentSelectedBrain } =
    useBrainCreationContext();
  const [createBrainStepIndex, setCreateBrainStepIndex] = useState<number>(0);
  const { knowledgeToFeed } = useKnowledgeToFeedContext();
  const { userIdentityData } = useUserData();
  const { updateUserIdentity } = useUserApi();

  useEffect(() => {
    if (currentSelectedBrain?.connection_settings) {
      const newFields = Object.entries(
        currentSelectedBrain.connection_settings
      ).map(([key, type]) => {
        return { name: key, type, value: "" };
      });
      setFields(newFields);
    }

    setCreateBrainStepIndex(Number(!currentSelectedBrain?.connection_settings));
  }, [currentSelectedBrain?.connection_settings]);

  const handleInputChange = (name: string, value: string) => {
    setFields(
      fields.map((field) => (field.name === name ? { ...field, value } : field))
    );
  };

  const previous = (): void => {
    goToPreviousStep();
  };

  const feed = async (): Promise<void> => {
    if (!userIdentityData?.onboarded) {
      await updateUserIdentity({
        ...userIdentityData,
        username: userIdentityData?.username ?? "",
        onboarded: true,
      });
    }
    setCreating(true);
    createBrain();
  };

  const renderSettings = () => {
    return (
      <>
        <MessageInfoBox type="warning">
          {currentSelectedBrain?.information}
        </MessageInfoBox>
        {fields.map(({ name, value }) => (
          <TextInput
            key={name}
            inputValue={value}
            setInputValue={(inputValue) => handleInputChange(name, inputValue)}
            label={capitalCase(name)}
          />
        ))}
      </>
    );
  };

  const renderFeedBrain = () => {
    return (
      <>
        {!userIdentityData?.onboarded && (
          <MessageInfoBox type="tutorial">
            <span>
            Laden Sie Dokumente hoch oder fügen Sie URLs hinzu, um Ihrem Gehirn Wissen hinzuzufügen.
            </span>
          </MessageInfoBox>
        )}
        <div>
          <span className={styles.title}>Füttern Sie Ihr Gehirn</span>
          <KnowledgeToFeed hideBrainSelector={true} />
        </div>
      </>
    );
  };

  const renderCreateButton = () => {
    return (
      <MessageInfoBox type="info">
        <div className={styles.message_content}>
          Klicken Sie auf
          <QuivrButton
            label="Erstellen"
            color="primary"
            iconName="add"
            onClick={feed}
            isLoading={creating}
          />
          um die Erstellung Ihres Gehirns abzuschließen.
        </div>
      </MessageInfoBox>
    );
  };

  const renderButtons = () => {
    return (
      <div className={styles.buttons_wrapper}>
        <QuivrButton
          label="Vorheriger Schritt"
          color="primary"
          iconName="chevronLeft"
          onClick={previous}
        />
        {(!currentSelectedBrain?.max_files && !createBrainStepIndex) ||
        createBrainStepIndex ? (
          <QuivrButton
            label="Erstellen"
            color="primary"
            iconName="add"
            onClick={feed}
            disabled={
              knowledgeToFeed.length === 0 && !userIdentityData?.onboarded
            }
            isLoading={creating}
            important={true}
          />
        ) : (
          <QuivrButton
            label="Füttern Sie Ihr Gehirn"
            color="primary"
            iconName="add"
            onClick={() => setCreateBrainStepIndex(1)}
            isLoading={creating}
            important={true}
          />
        )}
      </div>
    );
  };

  if (currentStepIndex !== 2) {
    return <></>;
  }

  return (
    <div className={styles.brain_knowledge_wrapper}>
      {!createBrainStepIndex && renderSettings()}
      {!!currentSelectedBrain?.max_files &&
        !!createBrainStepIndex &&
        renderFeedBrain()}
      {!currentSelectedBrain?.max_files &&
        !currentSelectedBrain?.connection_settings &&
        renderCreateButton()}

      {renderButtons()}
    </div>
  );
};
