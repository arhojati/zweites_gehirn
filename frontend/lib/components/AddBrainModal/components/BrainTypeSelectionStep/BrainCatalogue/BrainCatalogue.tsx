import { IntegrationBrains } from "@/lib/api/brain/types";
import { BrainCard } from "@/lib/components/ui/BrainCard/BrainCard";
import { MessageInfoBox } from "@/lib/components/ui/MessageInfoBox/MessageInfoBox";
import { useUserData } from "@/lib/hooks/useUserData";

import styles from "./BrainCatalogue.module.scss";

import { useBrainCreationContext } from "../../../brainCreation-provider";

export const BrainCatalogue = ({
  brains,
  next,
}: {
  brains: IntegrationBrains[];
  next: () => void;
}): JSX.Element => {
  const { setCurrentSelectedBrain, currentSelectedBrain } =
    useBrainCreationContext();
  const { userIdentityData } = useUserData();

  return (
    <div className={styles.cards_wrapper}>
      <MessageInfoBox type="info">
        <span>
        Brain ist ein spezialisiertes KI-Tool, das für die Interaktion 
        mit bestimmten Anwendungsfällen oder Datenquellen.
        </span>
      </MessageInfoBox>
      {!userIdentityData?.onboarded && (
        <MessageInfoBox type="tutorial">
          <span>
            Beginnen wir mit der Erstellung eines Doku- und URL-Gehirns.<br></br>
            Natürlich können Sie während Ihrer App-Reise auch andere 
            Arten von Gehirnen erkunden.
          </span>
        </MessageInfoBox>
      )}
      <span className={styles.title}>Wählen Sie eine Gehirnart</span>
      <div className={styles.brains_grid}>
        {brains.map((brain) => {
          return (
            <BrainCard
              key={brain.id}
              tooltip={brain.description}
              brainName={brain.integration_display_name}
              tags={brain.tags}
              selected={currentSelectedBrain?.id === brain.id}
              imageUrl={brain.integration_logo_url}
              callback={() => {
                next();
                setCurrentSelectedBrain(brain);
              }}
              cardKey={brain.id}
              disabled={!userIdentityData?.onboarded && !brain.onboarding_brain}
            />
          );
        })}
      </div>
    </div>
  );
};
