import { Icon } from "@/lib/components/ui/Icon/Icon";

import styles from "./SocialsButtons.module.scss";

export const SocialsButtons = (): JSX.Element => {
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.socials_buttons_wrapper}>
      <Icon
        name="github"
        color="black"
        size="small"
        handleHover={true}
        onClick={() => handleClick("https://dolphine.ai/")}
      />
      <Icon
        name="linkedin"
        color="black"
        size="small"
        handleHover={true}
        onClick={() => handleClick("https://dolphine.ai/")}
      />
      <Icon
        name="twitter"
        color="black"
        size="small"
        handleHover={true}
        onClick={() => handleClick("https://dolphine.ai/")}
      />
      <Icon
        name="discord"
        color="black"
        size="small"
        handleHover={true}
        onClick={() => handleClick("https://dolphine.ai/")}
      />
    </div>
  );
};
