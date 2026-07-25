import { Cookie, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  readCookiePreferences,
  saveCookiePreferences,
  type CookiePreferenceSelection,
} from "../../../services/analytics";
import { Button } from "../../ui/Button/Button";
import { Modal } from "../../ui/Modal/Modal";
import styles from "./CookieBanner.module.scss";

type CookieBannerProps = {
  isPreferencesOpen: boolean;
  onPreferencesClose: () => void;
  onPreferencesOpen: () => void;
};

const REJECTED_PREFERENCES: CookiePreferenceSelection = {
  analytics: false,
  advertising: false,
};

const ACCEPTED_PREFERENCES: CookiePreferenceSelection = {
  analytics: true,
  advertising: true,
};

export function CookieBanner({
  isPreferencesOpen,
  onPreferencesClose,
  onPreferencesOpen,
}: CookieBannerProps) {
  const [initialPreferences] = useState(() => readCookiePreferences());
  const [hasDecision, setHasDecision] = useState(
    initialPreferences !== null,
  );
  const [preferences, setPreferences] =
    useState<CookiePreferenceSelection>(
      initialPreferences ?? REJECTED_PREFERENCES,
    );

  const choosePreferences = (
    nextPreferences: CookiePreferenceSelection,
  ) => {
    saveCookiePreferences(nextPreferences);
    setPreferences(nextPreferences);
    setHasDecision(true);
    onPreferencesClose();
  };
  const closePreferences = () => {
    setPreferences(
      readCookiePreferences() ?? REJECTED_PREFERENCES,
    );
    onPreferencesClose();
  };

  return (
    <>
      {!hasDecision ? (
        <section
          aria-label="Cookie preferences"
          className={styles.banner}
          role="region"
        >
          <div className={styles.bannerIcon} aria-hidden="true">
            <Cookie />
          </div>
          <div className={styles.bannerCopy}>
            <p className={styles.eyebrow}>Your privacy, your choice</p>
            <h2>Choose how AVELIS uses cookies</h2>
            <p>
              Necessary storage keeps the site working. With your
              permission, analytics helps us understand storefront use and
              advertising supports campaign measurement. You can change your
              choice at any time.
            </p>
            <p className={styles.policyLinks}>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/cookies">Cookie policy</Link>
            </p>
          </div>
          <div className={styles.bannerActions}>
            <Button
              onClick={() => choosePreferences(REJECTED_PREFERENCES)}
              variant="secondary"
            >
              Reject optional
            </Button>
            <Button onClick={onPreferencesOpen} variant="ghost">
              Manage choices
            </Button>
            <Button
              onClick={() => choosePreferences(ACCEPTED_PREFERENCES)}
              variant="secondary"
            >
              Accept all
            </Button>
          </div>
        </section>
      ) : null}

      <Modal
        className={styles.preferencesModal}
        description="Necessary storage is always active. Choose whether AVELIS may use analytics and advertising storage."
        footer={
          <>
            <Button
              onClick={() => choosePreferences(REJECTED_PREFERENCES)}
              variant="secondary"
            >
              Reject optional
            </Button>
            <Button
              onClick={() => choosePreferences(ACCEPTED_PREFERENCES)}
              variant="secondary"
            >
              Accept all
            </Button>
            <Button onClick={() => choosePreferences(preferences)}>
              Save preferences
            </Button>
          </>
        }
        isOpen={isPreferencesOpen}
        onClose={closePreferences}
        title="Cookie preferences"
      >
        <div className={styles.preferenceList}>
          <section className={styles.preference}>
            <div className={styles.preferenceHeading}>
              <span className={styles.preferenceIcon} aria-hidden="true">
                <ShieldCheck />
              </span>
              <div>
                <h3>Strictly necessary</h3>
                <p>
                  Required for core site behavior and remembering your
                  privacy choice. These cannot be switched off.
                </p>
              </div>
            </div>
            <span className={styles.alwaysActive}>Always active</span>
          </section>

          <PreferenceToggle
            checked={preferences.analytics}
            description="Allows privacy-safe storefront and ecommerce measurement through Google Tag Manager."
            label="Analytics"
            onChange={(checked) =>
              setPreferences((current) => ({
                ...current,
                analytics: checked,
              }))
            }
          />

          <PreferenceToggle
            checked={preferences.advertising}
            description="Allows campaign measurement and advertising-related Google storage. No payment or account details are included."
            label="Advertising"
            onChange={(checked) =>
              setPreferences((current) => ({
                ...current,
                advertising: checked,
              }))
            }
          />
        </div>
      </Modal>
    </>
  );
}

function PreferenceToggle({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.preference}>
      <span>
        <strong>{label}</strong>
        <span>{description}</span>
      </span>
      <span className={styles.switch}>
        <input
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span aria-hidden="true" />
      </span>
    </label>
  );
}
