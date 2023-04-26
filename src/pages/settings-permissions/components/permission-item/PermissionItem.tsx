import React from "react";
import { WithStyles } from "../../../../common/helpers/with-styles";
import styles from "./permission-item.module.scss";
import ButtonAction from "../../../../common/components/buttons/button-action/ButtonAction";

interface PermissionItemProps {
  name: string;
  description: string;
  onClick: () => Promise<void> | void;
  onDelete: () => Promise<void> | void;
  isActive?: boolean;
}

const PermissionItem = WithStyles<PermissionItemProps>(
  ({ name, description, onDelete, isActive = false, styles }) => {
    return (
      <div
        className={styles.getClass(
          "permission-item",
          isActive && "permission-item--active"
        )}
      >
        <div className={styles.getClass("permission-item__info-container")}>
          <h3 className={styles.getClass("permission-item__name")}>{name}</h3>
          <p className={styles.getClass("permission-item__description")}>
            {description}
          </p>
        </div>
        <div className={styles.getClass("permission-item__action-container")}>
          <ButtonAction
            label="Delete permission"
            icon="delete"
            onClick={onDelete}
          />
        </div>
      </div>
    );
  },
  styles
);

export default PermissionItem;
